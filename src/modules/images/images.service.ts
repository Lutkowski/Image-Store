import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Image } from '../../common/entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as fs from 'fs/promises';
import { UpdateImageDto } from './dto/update-description.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private configService: ConfigService,
  ) {
  }

  async create(
    file: Express.Multer.File,
    createImageDto: CreateImageDto,
  ): Promise<Image> {
    const normalizedPath = file.path.replace(/\\/g, '/').replace(/^\.\//, '');
    const baseUrl =
      this.configService.get<string>('APP_URL') || 'http://localhost:3000';
    const url = `${baseUrl}/${normalizedPath}`;

    const image = this.imagesRepository.create({
      filename: file.filename,
      path: normalizedPath,
      url,
      description: createImageDto.description,
    });
    return this.imagesRepository.save(image);
  }

  async findAll(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imagesRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException('Изображение не найдено');
    }
    return image;
  }

  async update(id: number, updateData: UpdateImageDto): Promise<Image> {
    const image = await this.findOne(id);
    Object.assign(image, updateData);
    return this.imagesRepository.save(image);
  }

  async remove(id: number): Promise<DeleteResult> {
    const image = await this.findOne(id);
    const absoluteFilePath = join(__dirname, '..', '..', '..', image.path);

    try {
      await fs.unlink(absoluteFilePath);
    } catch (error) {
      throw new InternalServerErrorException(`Ошибка при удалении файла: ${error.message}`);
    }

    const result = await this.imagesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Изображение не найдено');
    }
    return result;
  }

}

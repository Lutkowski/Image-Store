import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async create(
    file: Express.Multer.File,
    createImageDto: CreateImageDto,
  ): Promise<Image> {
    const image = this.imagesRepository.create({
      filename: file.filename,
      path: file.path,
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

  async update(id: number, updateData: Partial<Image>): Promise<Image> {
    const image = await this.findOne(id);
    Object.assign(image, updateData);
    return this.imagesRepository.save(image);
  }

  async remove(id: number): Promise<void> {
    const result = await this.imagesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Изображение не найдено');
    }
  }
}

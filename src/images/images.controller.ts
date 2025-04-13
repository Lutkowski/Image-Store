import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateImageDto } from './dto/create-image.dto';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadFolder = './uploads';
          if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
          }
          callback(null, uploadFolder);
        },
        filename: (req, file, callback) => {
          const timestamp = Date.now();
          const randomNumber = Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `file${timestamp}and${randomNumber}${ext}`);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ) {
    return this.imagesService.create(file, createImageDto);
  }

  @Get()
  async getAllImages() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  async getImage(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findOne(id);
  }

  @Put(':id')
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<{ description: string }>,
  ) {
    return this.imagesService.update(id, updateData);
  }

  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.remove(id);
  }
}

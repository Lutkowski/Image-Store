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
import { CreateImageDto } from './dto/create-image.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Image } from '../../common/entities/image.entity';
import { UploadFileInterceptor } from '../../common/interceptors/upload-file.interceptor';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiOperation({ summary: 'Загрузка изображения с описанием' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Данные для загрузки изображения',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Файл изображения',
        },
        description: {
          type: 'string',
          description: 'Описание изображения',
        },
      },
      required: ['file'],
    },
  })
  @ApiOkResponse({
    description: 'Изображение успешно загружено',
    type: Image,
  })
  @UseInterceptors(UploadFileInterceptor)
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ) {
    return this.imagesService.create(file, createImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех изображений' })
  @ApiOkResponse({
    description: 'Список изображений успешно получен',
    type: [Image],
  })
  async getAllImages() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить изображение по идентификатору' })
  @ApiOkResponse({
    description: 'Изображение успешно получено',
    type: Image,
  })
  @ApiNotFoundResponse({ description: 'Изображение не найдено' })
  async getImage(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить описание изображения по идентификатору' })
  @ApiOkResponse({
    description: 'Изображение успешно обновлено',
    type: Image,
  })
  @ApiNotFoundResponse({ description: 'Изображение не найдено' })
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<{ description: string }>,
  ) {
    return this.imagesService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить изображение по идентификатору' })
  @ApiOkResponse({ description: 'Изображение успешно удалено' })
  @ApiNotFoundResponse({ description: 'Изображение не найдено' })
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.remove(id);
  }
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateImageDto {
  @ApiProperty({
    description: 'Описание изображения',
    example: 'Новое описание изображения',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

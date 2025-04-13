import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiPropertyOptional(
    { description: 'Описание изображения' },
  )
  @IsOptional()
  @IsString()
  readonly description?: string;
}

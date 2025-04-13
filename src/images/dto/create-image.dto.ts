import { IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @IsOptional()
  @IsString()
  readonly description?: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Image {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор изображения' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'file123456.jpg', description: 'Имя файла' })
  @Column()
  filename: string;

  @ApiProperty({ example: '/uploads/file123456.jpg', description: 'Путь к файлу' })
  @Column()
  path: string;

  @ApiProperty({ example: 'http://localhost:3000/uploads/file123456.jpg', description: 'URL для доступа к файлу' })
  @Column()
  url: string;

  @ApiProperty({ example: 'Фото объекта', description: 'Описание изображения', required: false })
  @Column({ nullable: true })
  description?: string;
}

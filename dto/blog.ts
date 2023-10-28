// Dada Ki Jay Ho

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  coverImageUrl?: string;
}

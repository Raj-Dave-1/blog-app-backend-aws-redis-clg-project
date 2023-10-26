// Dada Ki Jay Ho

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  coverImageUrl: string;

  @Column()
  likes: string;

  @Column()
  views: string;
}

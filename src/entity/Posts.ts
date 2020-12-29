import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
@Entity("post")
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;

  @Column()
  image: string;
  @Column()
  desc: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.post)
  user: User;
}

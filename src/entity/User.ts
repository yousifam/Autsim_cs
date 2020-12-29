import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Posts } from "./Posts";
@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ nullable: true })
  admin: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  desc: string;

  @Column()
  active: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @CreateDateColumn()
  updatedAt: Date;

  /**********************relation**************/
  @OneToMany((type) => Posts, (post) => post.user)
  post: Posts[];
}

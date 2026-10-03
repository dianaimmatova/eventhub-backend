import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../helper/base.entity.js";

@Entity()
export class Category extends BaseEntity {
    @Column()
    name: string
}
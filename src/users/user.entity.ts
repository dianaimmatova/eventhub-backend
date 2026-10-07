import { Column, Entity } from "typeorm";
import { BaseEntity } from "../helper/base.entity.js";



@Entity()
export class User extends BaseEntity {
    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column({
        select: false
    })
    password: string
}
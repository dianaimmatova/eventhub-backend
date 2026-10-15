import { Column, Entity } from "typeorm";
import { BaseEntity } from "../helper/base.entity.js";
import { ApiHideProperty } from "@nestjs/swagger";



@Entity()
export class User extends BaseEntity {
    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string


    @ApiHideProperty()
    @Column({
        select: false
    })
    password: string
}
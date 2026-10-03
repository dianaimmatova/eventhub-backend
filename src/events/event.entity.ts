import { Column, Entity, ManyToOne} from "typeorm";
import { BaseEntity } from "../helper/base.entity.js";
import { User } from "../users/user.entity.js";
import { Category } from "../categories/category.entity.js";

@Entity()
export class Event extends BaseEntity {
    @Column()
    title: string

    @Column()
    description: string

    @Column()
    date: Date

    @Column()
    address: string

    @Column()
    price: number

    @Column()
    capacity: number

    @Column()
    image: string

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Category)
    category: Category
}

import { Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from "../helper/base.entity.js";
import { User } from "../users/user.entity.js";
import { Category } from "../categories/category.entity.js";
import { Registration } from "../registrations/registration.entity.js";

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
    @JoinColumn({name: 'userId'})
    user: User

    @Column('uuid')
    userId: string

    @ManyToOne(() => Category)
    category: Category

    @OneToMany(() => Registration, (registration) => registration.event)
    registrations: Registration[];
}

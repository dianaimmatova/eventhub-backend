import { Entity, ManyToOne, type Relation, Unique } from "typeorm";
import { BaseEntity } from "../helper/base.entity.js";
import { User } from "../users/user.entity.js";
import { Event } from "../events/event.entity.js";



@Entity()
@Unique(["user", "event"])
export class Registration extends BaseEntity{
    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Event, (event) => event.registrations)
    event: Relation<Event>
}

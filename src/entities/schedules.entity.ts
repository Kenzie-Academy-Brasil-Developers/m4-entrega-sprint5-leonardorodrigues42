import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Properties from "./properties.entity";
import User from "./user.entity";

@Entity()
class Schedules {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({type: "date"})
    date: Date | string

    @Column({type: "time"})
    hour: Date | string

    @ManyToOne(() => Properties, propertie => propertie.id)
    property: Properties | string

    @ManyToOne(() => User, user => user.id, { eager: true})
    user: User | string

}

export default Schedules
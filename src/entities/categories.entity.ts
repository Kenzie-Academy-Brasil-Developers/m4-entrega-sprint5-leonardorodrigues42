import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Properties from "./properties.entity";

@Entity()
class Categories {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({unique: true})
    name: string

    @OneToMany(type => Properties, property => property.category)
    properties: Properties[] 

}

export default Categories
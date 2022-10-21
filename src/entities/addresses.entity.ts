import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

@Entity()
class Addresses {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    district: string

    @Column()
    zipCode: string

    @Column({nullable: true})
    number: string

    @Column()
    city: string

    @Column()
    state: string
}

export default Addresses
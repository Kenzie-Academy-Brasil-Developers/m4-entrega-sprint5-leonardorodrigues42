import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Addresses from "./addresses.entity";
import Categories from "./categories.entity";
import Schedules from "./schedules.entity";

@Entity()
class Properties {
    
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({default: true})
    sold: boolean

    @Column({
        type: "decimal",
        precision: 12,
        scale: 2
    })
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Addresses, {
        eager: true,
        nullable: false
    }) @JoinColumn()
    address: Addresses

    @Column()
    categoryId: string

    @ManyToOne(() => Categories, cat => cat.properties)
    category: Categories

    @OneToMany(() => Schedules, schedules => schedules.property)
    schedules: Schedules[]
}

export default Properties
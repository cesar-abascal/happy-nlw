import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
// OneToMany -> Make the relationship from 1 to N
// JoinColumn -> To make the orphanage relationship with images
import Image from './Image';


@Entity('Orphanages') // The typeorm will understand that this class is associated with the orphanages table
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    // Nao e um campo que existe no db
    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update'] // To register or automatically update images that are related to a particular orphanage
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[];
}

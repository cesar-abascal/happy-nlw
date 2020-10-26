import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// ManyToOne -> Make the relationship from N to 1
// JoinColumn -> To make the image relationship with an orphanage
import Orphanage from './Orphanage';


@Entity('images') // The typeorm will understand that this class is associated with the orphanages table
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage;
}

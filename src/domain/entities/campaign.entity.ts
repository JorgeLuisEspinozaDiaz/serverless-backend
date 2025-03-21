import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Message } from "./message.entity";
import { CampaignStatus } from "../enums/campaign-status.enum";

 
@Entity('campaigns')
export class Campaign {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => User, user  => user.campaigns)
    @JoinColumn({ name: "user_id" }) // Clave foránea
    user: User;

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'date' })
    process_date: Date

    @Column({ type: 'time' })
    process_hour: string

    @Column({
        type: 'int',
        default: CampaignStatus.PENDING,
    })
    process_status: CampaignStatus

    @Column({ type: 'varchar', length: 255 })
    phone_list: string

    @Column({ type: 'text' })
    message_text: string

    @OneToMany(() => Message, message => message.campaign)
    messages: Message[];
}
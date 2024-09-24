import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';
import { BaseEntity } from 'src/core/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'userId' };

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'boolean', default: false })
  emailVerified!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName!: string;

  @Column({ type: 'enum', enum: SexEnum, nullable: false })
  sex!: SexEnum;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine2: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.BUYER })
  role!: RoleEnum;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}

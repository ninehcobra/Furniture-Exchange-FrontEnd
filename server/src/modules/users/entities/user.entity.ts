import { Role } from 'src/common/enums/role.enum';
import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'userId' };

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  phoneNumber!: string;

  @Column({ type: 'boolean', default: false })
  phoneNumberVerified: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.BUYER })
  role: Role;
}

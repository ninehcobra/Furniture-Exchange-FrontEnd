import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'userId' };

  @Column({ type: 'varchar', length: 255 })
  name: string;
}

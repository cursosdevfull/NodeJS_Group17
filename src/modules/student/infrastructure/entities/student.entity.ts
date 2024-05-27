import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "student" })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  lastname: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  phone: string;

  @Column({ type: "varchar", length: 255 })
  address: string;

  @Column({ type: "varchar", length: 255 })
  city: string;

  @Column({ type: "varchar", length: 255 })
  country: string;

  @Column({ type: "varchar", length: 255 })
  gender: string;

  @Column({ type: "varchar", length: 255 })
  career: string;

  @Column({ type: "int" })
  semester: number;

  @Column({ type: "timestamp", nullable: false })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date | undefined | null;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | undefined | null;
}

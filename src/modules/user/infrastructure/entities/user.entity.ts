import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Index("idx1", ["name", "lastname"], { unique: true })
@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn({ type: "varchar", length: 64 })
  userId: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100 })
  refreshToken: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  secret: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  image: string;

  @Column({ type: "timestamp", nullable: false })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}

import {Table, Column, Model, DataType, BeforeCreate, BeforeUpdate, Unique} from 'sequelize-typescript';

// configure database like this! https://www.npmjs.com/package/sequelize-typescript#usage

@Table
class Image extends Model<Image> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column
  title: string

  @Column({
    unique: true
  })
  imagePath: string

  @Column
  mimetype: string

  @Column
  encoding: string

  @Column
  altText: string

  @Column
  svg?: string

  @Column({
    type: DataType.DATE
  })
  createdAt: Date

  @Column({
    type: DataType.DATE
  })
  updatedAt: Date

  @BeforeCreate
  static setCreatedAt(instance: Image) {
    instance.createdAt = new Date();
    instance.updatedAt = new Date();
  }

  @BeforeUpdate
  static setUpdatedAt(instance: Image) {
    instance.updatedAt = new Date();
  }
}

export default Image
import {Table, Column, Model, AfterCreate, DataType} from 'sequelize-typescript';

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
  imagePath: string

  @Column
  mimetype: string

  @Column
  encoding: string

  @Column
  altText: string

  @Column
  svg?: string
}

export default Image
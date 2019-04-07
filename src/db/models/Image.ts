import {Table, Column, Model, AfterCreate, DataType} from 'sequelize-typescript';
import traceImage from '../../lib/trace-image'

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

  @AfterCreate
  static traceImage(instance: Image) {
    console.log('starting afterCreate hook on', instance.imagePath);

    return traceImage(instance.imagePath)
      .then((svg: string) => {
        console.log('heres the svg', svg);
        
        instance.svg = svg;
        return instance.update({svg})
      })
    // console.log('about to update with', svg);
    
    // return instance.update({svg})
  }
}

export default Image
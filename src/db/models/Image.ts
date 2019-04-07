import {Table, Column, Model, AfterCreate} from 'sequelize-typescript';
import traceImage from '../../lib/trace-image'

// configure database like this! https://www.npmjs.com/package/sequelize-typescript#usage

@Table
class Image extends Model<Image> {

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
    console.log('starting afterCreate hook', instance.imagePath);

    traceImage(instance.imagePath)
      .then((svg: string) => {
        instance.svg = svg;
        instance.save().then(() => {
          console.log('SVG added to image')
        }).catch((err) => {
          throw new Error(err)
        })
      })
  }
}

export default Image
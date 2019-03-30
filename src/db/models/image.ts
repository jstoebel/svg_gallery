import { Model } from 'sequelize';
import 
class Image extends Model {}

Image.init({
  title: Sequelize.STRING,
  svg: Sequelize.TEXT,
}, {} )
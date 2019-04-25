import Image from '../models/Image'

export async function uploads() {
  return await Image.findAll({raw: true})
}
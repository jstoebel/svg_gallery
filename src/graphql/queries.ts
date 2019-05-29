import Image from '../models/Image'

export async function uploads() {
  return await Image.findAll({raw: true})
}

export async function upload(_parent, {id}) {
  return await Image.findOne({where: {id}})
}
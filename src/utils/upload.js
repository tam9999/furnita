'use strict'

const fs = require('fs')
const utils = require('./')
const path = 'src/public/img/products'

const getStoragePath = (id) => {
  let dir

  for (const key in utils.paths) {
    if (id.includes(key)) {
      const pathFolder = `${path}/${utils.paths[key]}`
      const category = utils.paths[key].split('/')[0]
      dir = `${pathFolder}/${id}`

      if (category && !fs.existsSync(`${path}/${category}`)) {
        fs.mkdirSync(`${path}/${category}`)
      }

      if (!fs.existsSync(pathFolder)) {
        fs.mkdirSync(pathFolder)
      }
    }
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  return dir
}

const upload = (req, res) => {
  const files = req.files.images
  const images = []

  files.forEach(async (file, index) => {
    try {
      const fileFormat = file.mimetype.split('/')[1]
      const storagePath = getStoragePath(req.body.id) + `/${req.body.id}-${index}.${fileFormat}`

      images.push(storagePath.split('src/public')[1])

      // Create upload
      await file.mv(storagePath)
    } catch (err) {
      console.error(err)
      return res.send(err)
    }
  })

  return images
}

module.exports = upload

'use strict'

const fs = require('fs')
const path = 'src/public/img/products'

const getStoragePath = (id) => {
  const dir = `${path}/${id}`

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
      return res.send(err)
    }
  })

  return images
}

module.exports = upload

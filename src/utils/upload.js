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

const upload = async (req, res) => {
  const files = req.files.images
  const images = []

  try {
    if (files && !files.length) {
      const fileFormat = files.mimetype.split('/')[1]
      const storagePath = getStoragePath(req.body.id) + `/${req.body.id}-0.${fileFormat}`

      images.push(storagePath.split('src/public')[1])

      // Create upload
      await files.mv(storagePath)

      return images
    } else if (files.length > 1) {
      files.forEach(async (file, index) => {
        const fileFormat = file.mimetype.split('/')[1]
        const storagePath = getStoragePath(req.body.id) + `/${req.body.id}-${index}.${fileFormat}`

        images.push(storagePath.split('src/public')[1])

        // Create upload
        await file.mv(storagePath)
      })

      return images
    }
  } catch (error) {
    return res.send(error)
  }
}

module.exports = upload

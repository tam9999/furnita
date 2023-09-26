'use strict'

const multer = require('multer')
const fs = require('fs')
const utils = require('../utils')
const path = 'src/public/img/products'
let count = 0

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

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const id = req.body.id
    const storagePath = getStoragePath(id)

    callback(null, storagePath)
  },

  filename: (req, file, callback) => {
    const filetype = file.mimetype
    const fileformate = filetype.split('/')[1]
    const fileName = `${req.body.id}-${count}.${fileformate}`

    callback(null, fileName)
    count += 1
    if (count > 4) count = 0
  },
})

const upload = multer({ storage: storage })

module.exports = upload

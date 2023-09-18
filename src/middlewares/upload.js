'use strict'

const multer = require('multer')
const fs = require('fs')
const path = 'src/public/img/products'
const baskets = `${path}/baskets`
const lights = `${path}/lights`
const homeDecors = `${path}/home-decors`
const kitchenWare = `${path}/kitchen-ware`
const handbags = `${path}/handbags`

let count = 0

const setPath = (category, type, id) => {
  const dir = type ? `${category}/${type}/${id}` : `${category}/${id}`

  if (!fs.existsSync(category)) {
    fs.mkdirSync(category)
  }

  if (type && !fs.existsSync(`${category}/${type}`)) {
    fs.mkdirSync(`${category}/${type}`)
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  return dir
}

const getStoragePath = (id) => {
  if (id.includes('BA')) {
    if (id.includes('BA-L')) return setPath(baskets, 'laundry', id)
    if (id.includes('BA-S')) return setPath(baskets, 'store', id)
    if (id.includes('BA-B')) return setPath(baskets, 'box', id)
  } else if (id.includes('LI')) {
    return setPath(lights, null, id)
  } else if (id.includes('HD')) {
    if (id.includes('HD-W')) return setPath(homeDecors, 'wall-shelves', id)
    if (id.includes('HD-M')) return setPath(homeDecors, 'mirrors', id)
    if (id.includes('HD-F')) return setPath(homeDecors, 'flower-box', id)
  } else if (id.includes('CK')) {
    if (id.includes('CK-P')) return setPath(kitchenWare, 'placemats', id)
    if (id.includes('CK-T')) return setPath(kitchenWare, 'tray', id)
    if (id.includes('CK-B')) return setPath(kitchenWare, 'bowls', id)
    if (id.includes('CK-K')) return setPath(kitchenWare, 'kitchen-utensils', id)
    if (id.includes('CK-C')) return setPath(kitchenWare, 'cutlery-tray', id)
    if (id.includes('CK-L')) return setPath(kitchenWare, 'lunch-boxes', id)
  } else if (id.includes('HBAG')) {
    return setPath(handbags, null, id)
  }
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
    if (count > 3) count = 0
  },
})

const upload = multer({ storage: storage })

module.exports = upload

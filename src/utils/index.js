'use strict'

const items = {
  laundry: 'BA-L',
  store: 'BA-S',
  boxes: 'BA-B',
  'wall-shelves': 'HD-W',
  mirrors: 'HD-M',
  'flower-box': 'HD-F',
  placemats: 'CK-P',
  tray: 'CK-T',
  bowls: 'CK-B',
  'kitchen-utensils': 'CK-K',
  cutlery: 'CK-C',
  'lunch-boxes': 'CK-C',
  lights: 'LI',
  handbags: 'HBAG',
}

const fillItem = {
  'BA-L': 'Laundry',
  'BA-S': 'Store',
  'BA-B': 'Boxes',
  'HD-W': 'Wall shelves',
  'HD-M': 'Mirrors',
  'HD-F': 'Flower box',
  'CK-P': 'Placemats & coasters',
  'CK-T': 'Tray & trugs',
  'CK-B': 'Bowls & banneton baskets',
  'CK-K': 'Kitchen utensils',
  'CK-C': 'Cutlery trays & baskets',
  'CK-C': 'Lunch boxes',
  LI: 'Lights',
  HBAG: 'Handbags',
}

const fillUrl = {
  Laundry: 'laundry',
  Store: 'store',
  Boxes: 'boxes',
  'Wall shelves': 'wall-shelves',
  Mirrors: 'mirrors',
  'Flower box': 'flower-box',
  'Placemats & coasters': 'placemats',
  'Tray & trugs': 'tray',
  'Bowls & banneton baskets': 'bowls',
  'Kitchen utensils': 'kitchen-utensils',
  'Cutlery trays & baskets': 'cutlery',
  'Lunch boxes': 'lunch-boxes',
  Lights: 'lights',
  Handbags: 'handbags',
}

const fillItemProduct = (id) => {
  for (const item in fillItem) {
    if (id.includes(item)) {
      return fillItem[item]
    }
  }
}

const categories = {
  Baskets: 'baskets',
  'Home decors': 'home-decors',
  'Kitchen ware': 'kitchen-ware',
  Lights: 'lights',
  Handbags: 'handbags',
}

;('../../public/img/products/baskets/laundry/BA-L-31')

const paths = {
  'BA-L': 'baskets/laundry',
  'BA-S': 'baskets/store',
  'BA-B': 'baskets/box',
  'HD-W': 'home-decors/wall-shelves',
  'HD-M': 'home-decors/mirrors',
  'HD-F': 'home-decors/flower-box',
  'CK-P': 'kitchen-ware/placemats',
  'CK-T': 'kitchen-ware/tray',
  'CK-B': 'kitchen-ware/bowls',
  'CK-K': 'kitchen-ware/kitchen-utensils',
  'CK-C': 'kitchen-ware/cutlery-tray',
  'CK-L': 'kitchen-ware/lunch-boxes',
  LI: 'lights',
  HBAG: 'handbags',
}

module.exports = { items, fillItem, fillUrl, fillItemProduct, categories, paths }

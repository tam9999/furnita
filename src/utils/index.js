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

module.exports = { items, fillItem, fillUrl, fillItemProduct, categories }

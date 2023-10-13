'use strict'

const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
    },
    content: {
      type: Array,
      required: true,
    },
    publishDate: {
      type: String,
      null: true,
    },
    source: {
      type: Array,
      null: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
)

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article

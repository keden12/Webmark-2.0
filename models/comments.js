'use strict';

const _ = require("lodash");

const json = require("./json-store");

const comments= {
  store: new json("./models/webmark-comments.json", { comments: [] }),
  collection: "comments",

  getAllComments() {

    return this.store.findAll(this.collection);
  },

  sendComment(newComment) {

    this.store.add(this.collection, newComment);
  },
}

module.exports = comments;
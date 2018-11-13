'use strict';
const _ = require('lodash');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');
const path = require('path');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const JsonStore = require('./json-store');
const Webmark = {
      
     store: new JsonStore('./models/webmarkslist.json',{ webmarkCollection:[]}),
     collection:'webmarkCollection',

getAllBookmarks() {
    return this.store.findAll(this.collection);
  },

  getBookmark(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  removeBookmark(id, bookmarkId) {
     const webmarks = this.getBookmark(id);
    const bookmarks = webmarks.bookmarks;
    var url = "";
    var i;
   for(i = 0;i < webmarks.bookmarks.length;i++)
   {
     
     if(webmarks.bookmarks[i].id === bookmarkId)
     {
       url = webmarks.bookmarks[i].pic;
      
     }
     
   }
  
    const parse = path.parse(url);
     
   _.remove(bookmarks, { id: bookmarkId});
    cloudinary.api.delete_resources([parse.name], function (result) {
      console.log(result);
    });
  },
  

  getUserCollection(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  removeCollection(id) {
    const webmarks = this.getBookmark(id);
    this.store.remove(this.collection, webmarks);
},
  
   removeAllCollections() {
    this.store.removeAll(this.collection);
  },
  
    addBookmark(collectionId, bookmark, response) {
    const collection = this.getBookmark(collectionId);
   bookmark.pic.mv('tempimage', err => {
     if (!err) {
       cloudinary.uploader.upload('tempimage', result => {
         console.log(result);
         const newBookmark = {
           id: bookmark.id,
           title: bookmark.title,
           url: bookmark.url,
           summary: bookmark.summary,
           pic: result.url,
           value: bookmark.value,
         };
         collection.bookmarks.push(newBookmark);
         response();
       });
     }
   });
  },
  
  addCollection(collection) {
  this.store.add(this.collection, collection);
},
};





module.exports = Webmark;
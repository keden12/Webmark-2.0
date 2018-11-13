'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const path = require('path');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const pictureStore = {

  store: new JsonStore('./models/picture-store.json', { pictures: [] }),
  collection: 'pictures',

  getAlbum(collectionId) {
    
  let album = this.store.findOneBy(this.collection, { collectionId: collectionId });
    
    if (!album) {
      album = {
        collectionId: collectionId,
        photos: [],
      }
      this.store.add(this.collection, album);
    }
    
    return album;
  },

  addPicture(collectionId, picId, imageFile) {
  let album = this.getAlbum(collectionId);

    imageFile.mv('tempimage', err => {
      if (!err) {
        cloudinary.uploader.upload('tempimage', result => {
          console.log(result);
          const pic = {
           url: result.url,
           id: picId,
          };
         album.photos.push(pic);
         console.log(pic.url + " has been added .. " + result);
        });
      }
    });
  },
  
  
    getPicture(collectionId, id) {
 
    const album = this.getAlbum(collectionId).photos;
    let here;
    
    for (let i = 0; i < album.length; i++) {
      const pic = album[i];
      if (pic.id === id) {
        here = pic;
        break;
      }
    }
    
    return here;
  },
  
  
  
  

  deletePicture(collectionId, picId) {
    
    const url = this.getPicture(collectionId, picId).url;
    const id = path.parse(url);
    let album = this.getAlbum(collectionId);
    _.remove(album.photos, { url: url });
    cloudinary.api.delete_resources([id.name], function (result) {
      console.log(result);
    });
  },

  deleteAllPictures(collectionId) {
    let album = this.getAlbum(collectionId);
    if (album) {
      album.photos.forEach(photo => {
        const id = path.parse(photo.url);
        cloudinary.api.delete_resources([id.name], result => {
          console.log(result);
        });
      });
      this.store.remove(this.collection, album);
    }
  },
};

module.exports = pictureStore;
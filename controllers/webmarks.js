
'use strict';

const logger = require('../utils/logger');
const webmark = require('../models/webmarkslist');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const pictureStore = require('../models/upload-pic.js');


const webmarks= {
  index(request, response) {
    logger.info('Webmark rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Webmarks',
      webmark: webmark.getUserCollection(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('webmarks', viewData);
    }
    else response.redirect('/');
  },
    deleteCollection(request, response) {
    const collectionId = request.params.id;
    logger.debug(`Deleting Collection ${collectionId}`);
    webmark.removeCollection(collectionId);
    response.redirect('/webmarks');
  },
  
  addCollection(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
      const newCollection = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      bookmarks: [],
    };
    logger.debug('Creating a new Collection', newCollection);
    webmark.addCollection(newCollection);
    response.redirect('/webmarks');
    
  },
  
    uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/webmarks');
    });
  },
  
};



module.exports = webmarks;

'use strict';

const logger = require('../utils/logger');
const webmark = require('../models/webmarkslist.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const pictureStore = require('../models/upload-pic.js');

const bookmarks = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const bookmarkId = request.params.id;
    logger.debug('Bookmark Id = ', bookmarkId);
    if (loggedInUser) {
    const viewData = {
      title: 'Bookmark',
      bookmark: webmark.getBookmark(bookmarkId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('bookmark', viewData);
    }
    else response.redirect('/');
  },
    deleteBookmark(request, response) {
    const collectionId = request.params.id;
    const bookmarkId = request.params.bookmarkid;
    logger.debug(`Deleting Bookmark ${bookmarkId} from Collection ${collectionId}`);
    webmark.removeBookmark(collectionId, bookmarkId);
    response.redirect('/bookmark/' + collectionId);
     
      
  },
  
    addBookmark(request, response) {
    const webmarkId = request.params.id;
    const webmarks = webmark.getBookmark(webmarkId);
    const newBookmark = {
      id: uuid(),
      title: request.body.title,
      url: request.body.url,
      summary: request.body.summary,
      pic: request.files.pic,
      value: 1,
      
      
    }

      webmark.addBookmark(webmarkId, newBookmark, function(){
         response.redirect('/bookmark/' + webmarkId);
      });
  },
  

};



module.exports = bookmarks;
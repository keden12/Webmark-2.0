'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const comments = require("../models/comments.js");

const about = {
  index(request, response) {
  const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('about rendering');
    if (loggedInUser) {
    const viewData = {
      title: 'About Webmark',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      details: comments.getAllComments(),
    };
    response.render('about', viewData);
   }
    else response.redirect('/');
  },
  
  
   sendComment(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      name: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      comment: request.body.comment,
    }
    logger.info('Sending message to database; ' + newComment);
    
    comments.sendComment(newComment);
    /*
      Rendering the viewdata again.
    */
    response.redirect('/about');
  },
};

module.exports = about;

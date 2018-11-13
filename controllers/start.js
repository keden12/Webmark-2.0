'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const userdata = require ('../models/user-data.js');
const collectiondata = require ('../models/webmarkslist.js');


const start = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    var data = userdata.getAllUsers();
    var collections = collectiondata.getAllBookmarks();
  
    logger.info('start rendering');
    if (loggedInUser) {
    const viewData = {
      title: 'Welcome to Webmark',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('index', viewData);
     $("#loggedin").show();
    }
    else response.redirect('/');
    $("#loggedin").hide();
    
  },
};

module.exports = start;

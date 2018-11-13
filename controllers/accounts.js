'use strict';
const userdata = require('../models/user-data');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
    
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('webmark', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userdata.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userdata.getUserByEmail(request.body.email);
    if (user) {
      response.cookie('webmark', user.email);
      logger.info(`logging in ${user.email}`);
      if(user.password === request.body.password)
      {
        response.redirect('/home');
      }
      else
      {
         response.redirect('/login');
        
      }
      
    }  else {
      response.redirect('/login');
    }
  },

  getCurrentUser (request) {
    const userEmail = request.cookies.webmark;
    return userdata.getUserByEmail(userEmail);
  }
}

module.exports = accounts;
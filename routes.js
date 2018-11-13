'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start.js');
const webmarks = require('./controllers/webmarks.js');
const about = require('./controllers/about.js');
const bookmark = require('./controllers/bookmark.js');
const accounts = require ('./controllers/accounts.js');
const home = require ('./controllers/home.js');




router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.post('/webmark/:id/addbookmark', bookmark.addBookmark);
router.get('/', start.index);
router.get('/bookmark/:id', bookmark.index);
router.get('/webmarks', webmarks.index);
router.get('/about', about.index);
router.get('/home', home.index);
router.get('/bookmark/:id/deletebookmark/:bookmarkid', bookmark.deleteBookmark);
router.get('/webmark/:id/deletecollection/', webmarks.deleteCollection);
router.post('/webmark/addcollection', webmarks.addCollection);
router.post("/about", about.sendComment);


module.exports = router;

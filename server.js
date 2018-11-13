'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');

const app = express();
app.use(cookieParser());
app.use(upload());
const exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    calcBookmarks: function (bookmarks) {
      let total = 0;
      for(let i in bookmarks)
      {
        total+=bookmarks[i].value;
        
      }
      
      return total;
    }
  }
}));
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);


const listener = app.listen(process.env.PORT, function () {
  logger.info(`Webmark App started on port ${listener.address().port}`);
});

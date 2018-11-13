'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const userdata = require ('../models/user-data.js');
const collectiondata = require ('../models/webmarkslist.js');

const home = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    var data = userdata.getAllUsers();
    var collections = collectiondata.getAllBookmarks();
    var i;
    var here = 0;
    var nothing;
    var lists = 0;
    var bookmarks = 0;
    var avg = 0;
    var largest = -1; //just to catch even the collections with 0 bookmarks 
    var smallest = 111111111111111111111111111111111111111; //just to catch even the collections with 0 bookmarks
    var largetitle = "None";
    var smalltitle = "None";
    var totalbookmarks = 0;
    var largestbookmarks = -1;
    var largestuser = -1;//just to catch even the user with 0 bookmarks
    var smallestuser = 1111111111111111111111111111111111111111111111111111;//just to catch even the user with 0 bookmarks
    var largestuserid = "None";
    var smallestuserid = "None";
    var largestname = "None";
    var smallestname = "None";
    var z;
    var check = new Array(data.length);
  
    
    
       
    for (i = 0;i < collections.length; i++)
    {
        
      
  
      if(collections[i].bookmarks.length > largestuser)
      {
        largestuser = largestuser + collections[i].bookmarks.length;
        largestuserid = collections[i].userid;
      
      }
      
     if(collections[i].bookmarks.length < smallestuser)
      {
        smallestuser = smallestuser + collections[i].bookmarks.length;
        smallestuserid = collections[i].userid;
      }
      
      
      
      
      
      
      
      totalbookmarks = totalbookmarks + collections[i].bookmarks.length;
      if(collections[i].userid === loggedInUser.id)
      {
       here = here + 1;
        bookmarks = bookmarks + collections[i].bookmarks.length;
        if(collections[i].bookmarks.length > largest)
        {
          largest = collections[i].bookmarks.length
          largetitle = collections[i].title;
        }
        if(collections[i].bookmarks.length < smallest)
        {
          smallest = collections[i].bookmarks.length;
          smalltitle = collections[i].title;
          
        }
        
      }
      
    
      
        
    }
 
    
    
    
    
    for(i = 0; i < data.length; i++)
    {
      if(data[i].id === largestuserid)
      {
        largestname = data[i].firstName + " " + data[i].lastName;
        
        
      }
      
      if(data[i].id === smallestuserid)
      {
        
        smallestname = data[i].firstName + " " + data[i].lastName;
        
      }
      
    
    }
    
 
    avg = bookmarks / here;
    
    if(isNaN(avg))
    {
      avg = 0;
    }
   
    var whole = Math.round(avg);
    var avgperuser = totalbookmarks / collections.length;
    var wholeuser = Math.round(avgperuser);
    logger.info('start rendering');
    if (loggedInUser) {
    const viewData = {
      title: 'Welcome to Webmark',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      allusers: data.length,
      alllists: here,
      allbookmarks: bookmarks,
      avgbookmarks: whole,
      largest: largetitle,
      smallest: smalltitle,
      totalbookmarks: totalbookmarks,
      avgperuser: wholeuser,
      largestuser: largestname,
      smallestuser: smallestname,
      
    };
    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

module.exports = home;

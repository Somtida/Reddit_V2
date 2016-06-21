'use strict';
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

let Post = require('./models/post');

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine','pug');
app.use('/posts', require('./routes/posts'));

app.get('/',(req, res)=>{
  Post.getAll()
    .then(posts=>{
      // console.log("posts: ",posts);
      // res.send(posts);
      let formattedPosts = posts.map(post=>{
        post.createdAt = moment(post.createdAt).format('LLL');
        return post;
      })
      res.render('index', {posts : formattedPosts});
    })
    .catch(err=>{
      console.log('err:', err);
      res.send(err);
    })
})



app.listen(PORT, err=>{
  console.log(err || `Server listening on PORT ${PORT}`);
})

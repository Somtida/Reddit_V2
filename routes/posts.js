'use strict';

const express = require('express');

let router = express.Router();

let Post = require('../models/post');

router.get('/',(req, res)=>{
  Post.getAll()
    .then(posts=>{
      res.send(posts);
    })
    .catch(err=>{
      res.status(400).send(err);
    })
});

router.post('/',(req, res)=>{
  Post.create(req.body)
    .then(posts=>{
      res.send(posts);
    })
    .catch(err=>{
      res.status(400).send(err);
    })
})

router.put('/',(req, res)=>{
  Post.upVote(req.body)
    .then(posts=>{
      res.send(posts)
    })
    .catch(err=>{
      res.status(400).send(err);
    })
})

router.put('/',(req, res)=>{
  Post.downVote(req.body)
    .then(posts=>{
      res.send(posts)
    })
    .catch(err=>{
      res.status(400).send(err);
    })
})

router.delete('/',(req, res)=>{
  Post.delete(req.body, err=>{
    if(err) return res.status(400).send(err);
    res.send("deleted");
  })
})

module.exports = router;

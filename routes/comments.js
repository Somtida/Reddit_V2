'use strict';

const express = require('express');

let router = express.Router();

let Comment = require('../models/comment');

router.get('/',(req, res)=>{

  Comment.getAllComments()
    .then(comments=>{
      console.log("comments: ",comments);
      res.send(comments);
    })
    .catch(err=>{
      res.status(400).send(err);
    })
});


router.get('/:id',(req, res)=>{

  Comment.viewComments(req.params.id)
    .then(comments=>{
      console.log("comments: ",comments);
      res.send(comments);
    })
    .catch(err=>{
      res.status(400).send(err);
    })
});

router.post('/:id', (req, res)=>{
  console.log("req.body: ", req.body);
  Comment.createComment(req.body, req.params.id)
    .then(comments => {
      res.send(comments);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

module.exports = router;

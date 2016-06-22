'use strict';

const db = require('../config/db')
const moment = require('moment');
const uuid = require('uuid');

db.query(`create table if not exists comments(
  id INT auto_increment,
  commentedAt VARCHAR(100),
  text VARCHAR(100),
  postId VARCHAR(100),
  primary key(id)
)`);

exports.getAllComments = () => {
  return new Promise((resolve, reject)=>{
    db.query('select * from comments', function(err, comments){
      if(err){
        reject(err);
      }else{
        resolve(comments);
      }
    });
  });
}

exports.viewComments = id => {
  return new Promise((resolve, reject)=>{
    db.query(`select comments.id, comments.text, posts.text, posts.score from comments join posts on comments.postId = "${id}"`, function(err, comments){
      if(err){
        reject(err);
      }else{
        resolve(comments);
      }
    });
  });
}

exports.createComment = (commentObj, id) => {
  commentObj.postId = id;
  commentObj.commentedAt = moment().format('LLL');
  console.log("commentObj: ", commentObj);
  return new Promise((resolve, reject) => {
    db.query('insert into comments set ?', commentObj, function(err){
      if(err) return reject(err);
      // db.query('select * from comments order by commentedAt desc limit 1', function(err, comments){
      //   if(err) return reject(err);

        // resolve(comments[0]);
        resolve();
      // })
    })
  });
}

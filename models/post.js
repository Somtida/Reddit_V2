'use strict';

const db = require('../config/db')
const moment = require('moment');
const uuid = require('uuid');

db.query(`create table if not exists posts(
  id TEXT,
  createdAt TEXT,
  text TEXT,
  score INT
)`);

exports.getAll = () => {
  return new Promise((resolve, reject)=>{
    db.query('select * from posts', function(err, posts){
      if(err){
        reject(err);
      }else{
        resolve(posts);
      }
    });
  });
}

exports.create = postObj => {
  return new Promise((resolve, reject)=>{
    postObj.id = uuid();
    postObj.createdAt = moment().toISOString();
    postObj.score = 0;

    db.query('insert into posts set ?', postObj, function(err){
        if(err) return reject(err);
        db.query('select * from posts order by createdAt desc limit 1', function(err, posts){
          if(err) return reject(err);
          resolve(posts[0]);
        });

      }
    );
  });
}

exports.delete = post =>{
  console.log("idd: ",post.id);
  return new Promise((resolve, reject)=>{
    db.query(`delete from posts where id = "${post.id}"`,function(err,post){
      if(err) return console.log("err: ",err);
    });
  })
}

exports.upVote = id =>{
  console.log("idd: ", id);
  return new Promise((resolve, reject)=>{
    db.query(`update posts set score = score + 1 where id = "${id}"`, function(err, result){
      if(err) return reject(err);
      resolve();
    });
  })
}

exports.downVote = id =>{
  console.log("idd: ", id);
  return new Promise((resolve, reject)=>{
    db.query(`update posts set score = score - 1 where id = "${id}"`, function(err, result){
      if(err) return reject(err);
      resolve();
    });
  })
}

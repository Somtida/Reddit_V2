'use strict';

$(document).ready(init);

function init(){
  getAllPosts();
  $('.newPostForm').submit(createPost);
  $('.postBoxes').on('click','.deleteText', deleteText);
  $('.postBoxes').on('click','.editText', editText);
  $('.postBoxes').on('click','.upVote', upVote);
  $('.postBoxes').on('click','.downVote', downVote);
}

function editText(){

}

function downVote(){
  let idd = $(this).parent().parent().parent().parent().parent().parent().data('id');
  let sscore = $(this).parent().parent().parent().parent().parent().parent().data('score');
  console.log("idd: ",idd);
  console.log("sscore: ",sscore);
  $.ajax({
    method:'PUT',
    url: '/posts',
    data: {
      id: idd,
      score: sscore
    },
    success: function(post){
      console.log("downVote");
      getAllPosts();
    }

  })
  $(this).parent().parent().parent().parent().parent().parent().data('score',parseInt(sscore)-1);
  $(this).parent().parent().parent().parent().parent().parent().find('.voteScore').text(parseInt(sscore)-1);
}

function upVote(){
  let idd = $(this).parent().parent().parent().parent().parent().parent().data('id');
  console.log("idd: ",idd);
  let sscore = $(this).parent().parent().parent().parent().parent().parent().data('score');
  console.log("sscore: ",sscore);
  $.ajax({
    method:'PUT',
    url: '/posts',
    data: {
      id: idd,
      score: sscore
    },
    success: function(post){
      console.log("upVoted");
      getAllPosts();
    }
  })
  $(this).parent().parent().parent().parent().parent().parent().data('score',parseInt(sscore)+1);
  $(this).parent().parent().parent().parent().parent().parent().find('.voteScore').text(parseInt(sscore)+1);
}

function deleteText(){
  let idd = $(this).parent().parent().parent().parent().parent().parent().data('id');
  console.log("idd: ",idd);

  $.ajax({
    method:'DELETE',
    url: '/posts',
    data: {
      id: idd
    },
    success: function(post){
      console.log("upVoted");
      getAllPosts();
    }
  })
  $(this).parent().parent().parent().parent().parent().parent().remove();

}

function getAllPosts(){
  $.get('/posts')
  .done(posts => {
    console.log("posts: ",posts);

    let $divs = buildAllPosts(posts);
    $('.postBoxes').empty().append($divs);
  })
  .fail(err=>{
    console.log('err')
  })
}

function buildAllPosts(posts){
  let $divs = posts.map(post=>{
    let $div = $('.postTamplate').clone();
    $div.removeClass('postTamplate');
    $div.addClass('postInfo').addClass('panel').addClass('panel-primary');
    $div.data('id',post.id);
    $div.find('.postId').text(post.id);
    let calendar = moment(post.createdAt).calendar();
    $div.find('.postAt').text(calendar);
    $div.data('score',post.score);
    $div.find('.voteScore').text(post.score);
    $div.find('.textContent').text(post.text)
    return $div;
  });
  return $divs;
}

function createPost(event){
  event.preventDefault();
  let text = $('.text').val();

  $.post('/posts',{text:text})
    .done(post => {
      console.log("post: ",post);
      let $post = postElement(post);
      $('.postBoxes').append($post);
    })
    .fail(err=>{
      console.log('err')
    })

}

function postElement(post){
  console.log("post: ",post);
  let $div = $('.postTamplate').clone();
  $div.removeClass('postTamplate');
  $div.addClass('postInfo').addClass('panel').addClass('panel-primary');
  $div.data('id',post.id);
  $div.find('.postId').text(post.id);
  $div.find('.postAt').text(post.createdAt);
  $div.data('score',post.score);
  $div.find('.voteScore').text(post.score);
  $div.find('.textContent').text(post.text)
  return $div;



}

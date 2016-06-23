'use strict';

$(document).ready(init);

function init(){
  getAllPosts();
  $('.newPostForm').submit(createPost);
  $('.postBoxes').on('click','.deleteText', deleteText);
  $('.postBoxes').on('click','.upVote', upVote);
  $('.postBoxes').on('click','.downVote', downVote);
  $('.postBoxes').on('click','.makeComment', makeComment);
  $('.postBoxes').on('click','.viewComments', viewComments);
  $('#myModal').on('click','.cancel', cancelComment);
  $('#myModal').on('click','.createComment', createComment);

}

function cancelComment(){
  $('#myModal').modal('toggle');
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
    $div.addClass('postInfo').addClass('panel').addClass('panel-info');
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


function viewComments(){
  let index = $(this).closest('.postInfo').index();
  let data = $(this).closest('.postInfo').data();
  console.log("index: ",index);
  console.log("data: ",$(this).closest('.postInfo').data());
  let id = data.id;
  //debugger;
  $.get(`/comments/${id}`)
  .done(comments => {
    console.log("comments: ",comments);

    let $divs = buildAllComments(comments);
    console.log("[index]: ",index);
    $($('.postInfo')[index]).find('.panel-footer').show();
    $($('.postInfo')[index]).find('.footer').empty().append($divs);
    // $($('.postInfo')[index]).empty().append($divs);
  })
  .fail(err=>{
    console.log('err')
  })
}

function buildAllComments(comments){
  let $divs = comments.map(comment=>{
    let $div = $('.commentTemplate').clone();
    $div.removeClass('commentTemplate').addClass('commentInfo');
    $div.find('.commentText').text(comment.text);
    $div.find('.commentedAt').text(comment.commentedAt);
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
  $div.addClass('postInfo').addClass('panel').addClass('panel-info');
  $div.data('id',post.id);
  $div.find('.postId').text(post.id);
  $div.find('.postAt').text(post.createdAt);
  $div.data('score',post.score);
  $div.find('.voteScore').text(post.score);
  $div.find('.textContent').text(post.text)
  return $div;

}

function makeComment(){
  let $newComment = $('.newCommentBox').clone();
  $newComment.removeClass('newCommentBox').addClass('commentBox');
  $('#myModal').find('.info').empty().append($newComment);
}

function createComment(){
  let index = $(this).closest('.postInfo').index();
  let text = $('.commentText').val();

  $.post('/comments/',{text:text})
    .done(comment => {
      console.log("comment: ",comment);
      let $comment = commentElement(comment);
      $('.postInfo')[index].append($comment);
    })
    .fail(err=>{
      console.log('err')
    })

}

function commentElement(post){
  console.log("post: ",post);
  let $div = $('.postTamplate').clone();
  $div.removeClass('postTamplate');
  $div.addClass('postInfo').addClass('panel').addClass('panel-info');
  $div.data('id',post.id);
  $div.find('.postId').text(post.id);
  $div.find('.postAt').text(post.createdAt);
  $div.data('score',post.score);
  $div.find('.voteScore').text(post.score);
  $div.find('.textContent').text(post.text)
  return $div;
}



function downVote(){
  let data = $(this).closest('.postInfo').data();

  let idd = data.id;
  let sscore = data.score;

  // let sscore = $(this).closest('.postInfo').data('score');
  console.log("idd: ",idd);
  console.log("sscore: ",sscore);
  $.ajax({
    method:'PUT',
    url: `/posts/${idd}/downvote`,
    success: post => {
      console.log("downVote");
      // getAllPosts();
      $(this).closest('.postInfo').data('score',parseInt(sscore)-1);
      $(this).closest('.postInfo').find('.voteScore').text(parseInt(sscore)-1);
    },
    error: function(err) {
      console.log('err!', err);
    }

  })
  //
  // function(post) {
  //   <-----
  //   this
  // }
  //
  // <-----
  //
  // post => {
  //   this
  // }


}

function upVote(){
  let data = $(this).closest('.postInfo').data();
  let idd = data.id;
  let sscore = data.score;
  $.ajax({
    method:'PUT',
    url: `/posts/{$idd}/upVote`,
    success: post => {
      console.log("upVoted");
      // getAllPosts();
      $(this).closest('.postInfo').data('score',parseInt(sscore)+1);
      $(this).closest('.postInfo').find('.voteScore').text(parseInt(sscore)+1);
    }
  })
}

function deleteText(){
  let idd = $(this).closest('.postInfo').data('id');
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
  $(this).closest('.postInfo').remove();

}

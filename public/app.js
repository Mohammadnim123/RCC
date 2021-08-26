
// $('.signingup').submit(function (e) {
//   e.preventDefault();
//   // alert('Welcome to RCC!!! Please Log in to your account');
//   $(this).hide();
// })

$('.addCommentnews').submit(function (e) {
    e.preventDefault();
    var mytext =  $(this).find('#comment').val();
    var mytitle =   $(this).find('#titleSend').val();
    
    $.ajax({
      url: '/ncomments',
      data  : {
        title: mytitle,
        text : mytext
  
      },
      method : "POST",
      contentType : "application/x-www-form-urlencoded",
      success   : function(res){
        
        $('.comments').append(`<li class="user"><img src="${res.userimg}" alt=""><div class="userComment"><h3>${res.user_name}</h3><p class="insert">${res.comment}</p></div></li>`);
        location.reload();
      },
      error : function(err){
        console.log(err);
      }
    })
  
  })

  $('.addCommenthealth').submit(function (e) {
    e.preventDefault();
    var mytext =  $(this).find('#comment').val();
    var mytitle =   $(this).find('#titleSend').val();
    
    $.ajax({
      url: '/hcomments',
      data  : {
        title: mytitle,
        text : mytext
  
      },
      method : "POST",
      contentType : "application/x-www-form-urlencoded",
      success   : function(res){
        
        $('.comments').append(`<li class="user"><img src="${res.userimg}" alt=""><div class="userComment"><h3>${res.user_name}</h3><p class="insert">${res.comment}</p></div></li>`);
        location.reload();
      },
      error : function(err){
        console.log(err);
      }
    })
  
  })

  $('.addCommentsport').submit(function (e) {
    e.preventDefault();
    var mytext =  $(this).find('#comment').val();
    var mytitle =   $(this).find('#titleSend').val();
    
    $.ajax({
      url: '/scomments',
      data  : {
        title: mytitle,
        text : mytext
  
      },
      method : "POST",
      contentType : "application/x-www-form-urlencoded",
      success   : function(res){
        
        $('.comments').append(`<li class="user"><img src="${res.userimg}" alt=""><div class="userComment"><h3>${res.user_name}</h3><p class="insert">${res.comment}</p></div></li>`);
        location.reload();
      },
      error : function(err){
        console.log(err);
      }
    })
  
  })



  $('.addCommenttech').submit(function (e) {
    e.preventDefault();
    var mytext =  $(this).find('#comment').val();
    var mytitle =   $(this).find('#titleSend').val();
    
    $.ajax({
      url: '/tcomments',
      data  : {
        title: mytitle,
        text : mytext
  
      },
      method : "POST",
      contentType : "application/x-www-form-urlencoded",
      success   : function(res){
        
        $('.comments').append(`<li class="user"><img src="${res.userimg}" alt=""><div class="userComment"><h3>${res.user_name}</h3><p class="insert">${res.comment}</p></div></li>`);
        location.reload();
      },
      error : function(err){
        console.log(err);
      }
    })
  
  })


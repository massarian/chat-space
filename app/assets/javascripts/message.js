$(function(){ 
  var buildHTML = function(message) {
   if ( message.content && message.image ) {
     var html = `<div class="message" data-message-id=` + message.id + `>` +
         `<div class="message_user">` +
           `<div class="message_user_name">` +
             message.user_name +
           `</div>` +
           `<div class="message_user_time">` +
             message.created_at +
           `</div>` +
         `</div>` +
         `<div class="message_text">` +
           `<p class="lower-message__content">` +
             message.content +
           `</p>` +
           `<img src="` + message.image + `" class="lower-message__image"  >` +
         `</div>` +
       `</div>`
   } else if (message.content) {
     var html = `<div class="message" data-message-id=` + message.id + `>` +
         `<div class="message_user">` +
           `<div class="message_user_name">` +
             message.user_name +
           `</div>` +
           `<div class="message_user_time">` +
             message.created_at +
           `</div>` +
         `</div>` +
         `<div class="message_text">` +
           `<p class="lower-message__content">` +
             message.content +
           `</p>` +
         `</div>` +
       `</div>`
   } else if (message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message_user">` +
          `<div class="message_user_name">` +
            message.user_name +
          `</div>` +
          `<div class="message_user_time">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message_text">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
  };
  return html;
 };
 var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
    });
  };
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')

  $.ajax({
   url:  url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});      
      $('form')[0].reset();
      $('.form_submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message_user">
           <div class="message_user_name">
             ${message.user_name}
           </div>
           <div class="message_user_time">
             ${message.created_at}
           </div>
         </div>
         <div class="message_text">
           <p class="lower-message__content">
             ${message.content}
           </p>
           <img class="lower-message__image" src=${message.image} >
         </div>
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message_user">
           <div class="message_user_name">
             ${message.user_name}
           </div>
           <div class="message_user_time">
             ${message.created_at}
           </div>
         </div>
         <div class="message_text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
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
    console.log(data)
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
});
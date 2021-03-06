$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                <div class="message__upper-info">
                <div class="message__upper-info__talker">
                ${message.user_nickname}
                </div>
                <div class="message__upper-info__date">
                ${message.date}
                </div>
                </div>
                <div class="message__text">
                <p class="message__text__content">
                ${message.content}
                ${img}
                </p>
                
                </div>
                </div>`

  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  })

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var href = 'api/messages#index {format: "json"}'
      var last_message_id = $('.message:last').data('message-id');

      $.ajax({
        url: href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(message) {
        var insertHTML ='';
          message.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          });
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
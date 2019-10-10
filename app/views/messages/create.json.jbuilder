json.id      @message.id
json.content @message.content 
json.date    @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_nickname @message.user.nickname
json.image   @message.image.url
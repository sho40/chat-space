class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (show_last_message = messages.last).present?
      show_last_message.content? ? show_last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end

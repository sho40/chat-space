# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :groups, trough: :members
- has_many :massages
- has_many :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false,unique: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :user, trough: :members
- has_many :members

## messgaesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :user

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
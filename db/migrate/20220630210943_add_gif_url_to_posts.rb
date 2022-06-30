class AddGifUrlToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :gif_url, :string
  end
end

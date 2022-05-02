class PostsController < ApplicationController
    skip_before_action :authorize, only: :update

    def index
        render json: Post.all, status: :ok
    end

    def show
        post = find_post
        image = rails_blob_path(post.image)
        render json: {post: post, image: image}

    end

    def create
        post = Post.create!(post_params)
        post.image.attach(post_params[:image])
        
        render json:  post, status: :created
    end

    def update
        post = find_post
        if params[:image]
            post.update(image: params[:image])
            image_url = rails_blob_path(post.image)
            render json:  { post: post, image_url: image_url}
        else 
            post.update(post_params)
            render json: post
        end
    end

    # def add_picture
    #     post = find_post
    #     post.update(picture: params[:picture])
    #     picture_url = rails_blob_path(post.picure)
    #     byebug
    #     render json:  { post: post, picture_url: picture_url}
    # end

    def destroy
        post = find_post
        post.destroy
        head :no_content
    end

    private
    
    def find_post
        Post.find_by!(id: params[:id])
    end

    def post_params
        params.require(:post).permit(:room_member_id, :channel_id, :image, :content, :image_url)
    end

end
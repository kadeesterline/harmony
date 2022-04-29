class PostsController < ApplicationController

    def index
        render json: Post.all, status: :ok
    end

    def show
        render json: find_post
    end

    def create
        post = Post.create!(post_params)
        post.picture.attach(post_params[:picture])
        render json:  post, status: :created
    end

    def update
        post = find_post
        post.update(post_params)
        render json: post
    end

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
        params.permit(:room_member_id, :channel_id, :picture, :content)
    end

end
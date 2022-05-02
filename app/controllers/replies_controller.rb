class RepliesController < ApplicationController
    skip_before_action :authorize, only: :update

    def index
        render json: Reply.all, status: :ok
    end

    def show
        reply = find_reply
        image = rails_blob_path(reply.image)
        render json: {reply: reply, image: image}
    end

    def create
        reply = Reply.create!(reply_params)
        render json: reply, status: :created
    end

    def update
        reply = find_reply
        if params[:image]
            reply.update(image: params[:image])
            image_url = rails_blob_path(reply.image)
            render json: {reply: reply, image_url: image_url}
        else 
            reply.update(reply_params)
            render json: reply
        end
    end

    def destroy
        task = find_reply
        task.destroy
        head :no_content
    end

    private
    
    def find_reply
        Reply.find_by!(id: params[:id])
    end

    def reply_params
        params.permit(:room_member_id, :post_id, :content)
    end

end
class RepliesController < ApplicationController

    def index
        render json: Reply.all, status: :ok
    end

    def show
        render json: find_reply
    end

    def create
        reply = Reply.create!(reply_params)
        render json: reply, status: :created
    end

    def update
        reply = find_reply
        reply.update(reply_params)
        render json: reply
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
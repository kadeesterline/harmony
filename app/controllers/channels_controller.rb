class ChannelsController < ApplicationController

    def index
        render json: Channel.all, status: :ok
    end

    def show
        render json: find_channel, include: %W[room.room_members.users, posts, posts.replies], serializer: ChannelSerializer
    end

    def create
        channel = Channel.create!(channel_params)
        render json: channel, status: :created
    end

    def update
        channel = find_channel
        channel.update(channel_params)
        render json: channel
    end

    def destroy
        channel = find_channel
        channel.destroy
        head :no_content
    end

    private
    
    def find_channel
        Channel.find_by!(id: params[:id])
    end

    def channel_params
        params.permit(:name, :room_id)
    end


end
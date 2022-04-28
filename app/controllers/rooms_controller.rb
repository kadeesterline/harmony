class RoomsController < ApplicationController
    #skip_before_action :authorize, only: [:index]

    def index
        render json: Room.all, status: :ok
        
    end

    def show
        render json: find_room, include: %w[channels channels.posts channels.posts.replies], serializer: RoomSerializer
    end

    def create
        
        room = Room.create!(room_params)
        room_member = RoomMember.create!(
            
                            user_id: params[:user_id],
                            room_id: room.id,
                            is_admin: true,
                        )
                        
        render json: room, status: :created
    end

    def update
        room = find_room
        if is_admin?
            room.update(room_params)
            render json: room
        else
            render json: { error: 'Not admin of board'}, status:  :unauthorized
        end
    end

    def destroy
        room = find_room
        room.destroy
        head :no_content
    end

    private
    
    def find_room
        Room.find(params[:id])
    end

    def room_params
        params.permit(:name)
    end

    def is_admin?
        room_member = RoomMember.find_by!(user_id: @current_user.id, board: params[:id])
        room_member.is_admin
    end

end
class RoomMembersController < ApplicationController


    def show
        render json: find_member
    end

    def create
        room_member = RoomMember.create!(room_member_params)
        render json: room_member, status: :created
    end

    private
    
    def room_member_params
        params.permit(:room_id, :user_id, :is_admin)
    end

    def find_member
        RoomMember.find_by!(id: params[:id])
    end

end
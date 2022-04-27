class RoomMembersController < ApplicationController



    def create
        room_member = RoomMember.create!(room_member_params)
        render json: room_member, status: :created
    end



    private
    
    def room_member_params
        params.permit(:room_id, :user_id, :is_admin)
    end

end
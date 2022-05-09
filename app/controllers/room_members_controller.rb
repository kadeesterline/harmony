class RoomMembersController < ApplicationController


    def show
        render json: find_member
    end

    def create
        room_member = RoomMember.create!(room_member_params)
        render json: room_member, status: :created
    end

    def create_with_code 
        
        room = Room.find_by!(room_code: params[:code])
        
        room_member = RoomMember.create!(user_id: params[:user_id], room_id: room.id, is_admin: false)
        render json: room_member, status: :created
    end

    def update
        room_member = find_member
        room_member.update(is_mod: params[:is_mod])
        render json: room_member
    end

    private
    
    def room_member_params
        params.permit(:room_id, :user_id, :is_admin, :is_mod, :code)
    end

    def find_member
        RoomMember.find_by!(id: params[:id])
    end

    # def find_room
    #     Room.find_by!(room_code: params:)
    # end

end
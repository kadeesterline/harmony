class ImagesController < ApplicationController

def create
    image = Image.create(image_params)
    render json: { image: image}
end

private

def image_params
    params.permit()
end

end
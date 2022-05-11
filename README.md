# Harmony

## About
Harmony is a project I started as my final project while at Flatiron. Harmony is a chat/messaging app with support for rich text editing as well as images and gifs. Harmony uses [TipTap](https://tiptap.dev/) to allow users to format and style text beyond what could normally be done with a normal form text field. Harmony also uses the [Giphy API](https://developers.giphy.com/) and custom CSS to allow users to search for and select GIFS to send as messages. To allow users to send images as both posts and replies to posts Harmony uses [ActiveStorage](https://edgeguides.rubyonrails.org/active_storage_overview.html) to associate images with posts and replies. In the deployed version of Harmony AWS S3 is being used to store the images.

Harmony's home page.<br />
![harmony home page](./readme-photos/Screen Shot 2022-05-11 at 2.01.02 PM.png)

After signing in or creating an account you can join either create a room or enter a room code from an existing room.<br />
![Create/Join page](./readme-photos/Screen%Shot%2022-05-11%at%2.02.05%PM.png)

After joining a room users can view messages in different channels.<br />
![Room view](./readme-photos/Screen%Shot%2022-05-11%at%2.02.45%PM.png)

By searching for a gif users can send gifs. To see replies users can click the down arrow symbol on a message<br />
![Replies/Gif view](./readme-photos/Screen%Shot%2022-05-11%at%2.03.15%PM.png)

To add a new reply users can click the plus symbol on a message. As admin of a room you can add moderators through the member modal by clicking on the channel/room display in the corner. The member modal also has the rooms join code that could be given to other users to join a room.<br />
![Reply/Modal view](./readme-photos/Screen%Shot%2022-05-11%at%2.03.43%PM.png)

## Running project locally
After cloning down the repo from within the directory of the project you can run the following commands to view the project:

<code>bundle install</code><br />
<code>rails db:create</code><br />
<code>rails db:migrate</code><br />
<code>rails db:seed</code><br />
<code>rails s</code><br />

These commands will install dependencies, create a postgres database, migrate and create tables, and seed the database before starting the API's server.
Next you'll need to open another instance of your terminal and navigate to the projects directory, to start the front end server with the following commands:<br />

<code>cd client</code><br />
<code>npm install</code><br />
<code>npm start</code><br />

## Contributors
Kade Esterline: [LinkedIn](https://www.linkedin.com/in/kade-esterline/), [Dev.to](https://dev.to/kadeesterline) <br />


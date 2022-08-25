# Qanda app backend

Backend api for a question and answer app write in Node js and express js framework. Database CRUD Operation and relationship on Mongodb atlas and Mongoose.


## Project Structure
 
 ```
 Qanda
 ┣ config
 ┃ ┗ authorizarion.js
 ┣ models
 ┃ ┣ chatModel.js
 ┃ ┣ postmodel.js
 ┃ ┗ userModel.js
 ┣ routes
 ┃ ┣ authenication.js
 ┃ ┣ post.js
 ┃ ┗ resetpassword.js
 ┣ .gitignore
 ┣ index.js
 ┣ package-lock.json
 ┣ package.json
 ┗ README.md
 ```



# Get Started

 ```Javascript
    node index.js
 ```

 ## END POINTS CREATED!!
  
 - MONGODB QUERY
 - TOKEN BASED AUTHENICATION
     - Sign Up
     - Sign In
     
 - JWT TOKEN 
- RECOVER PASSWORD
 - FOLLOW / UNFOLLOW USER
 - POST  
   - DELETE POST
   - EDIT POST
   - CREATE POST
   - LIKE / UNLIKE POST
   - COMMENT ON POST
   - DELETE COMMENT ON POST
   - GET TIMELINE POSTS / POST RECOMMENDATION ALOGRITHM
   - GET ALL POSTS
   - GET USER POSTS
 - SEARCH 
   - SEARCH POST
   - SEARCH USER
 
  



          
    | query  |Method |  endpoints  |
    | ---     | --- | ---        |
    |  signin  | POST | http://localhost:3000/api/v1/signIn |
    | signUp   | POST | http://localhost:3000/api/v1/signUp | 
    | resetpassword | POST | http://localhost:3000/api/v1/reset/ |
    | resetpassword | PATCH | http://localhost:3000/api/v1/reset |
    | follow/unfollow User | PATCH | http://localhost:3000/api/v1/userId/follow |
    | create post | POST | http://localhost:3000/api/v1/posts/userId |
    | delete post | DELETE | http://localhost:3000/api/v1/posts/postId |
    | edit post   | PATCH  | http://localhost:3000/api/v1/posts/postId |
    | like/unlike post | PATCH | http://localhost:3000/api/v1/posts/userId/like |
    | COMMENT ON POST | POST  |  http://localhost:3000/api/v1/postId/comment |
    | DELETE A COMMENT | DELETE  | http://localhost:3000/api/v1/postId/comment |



    ### Sample Post
 ```javasript

    {
        text: "This is my first post",
        user: {
            firstName: "David",
            lastName: "Okoroafor",
            username: "korafdavid",
            verified: false,
        }, 
        like: 0,
        comment: 0,
        date: "25 mins ago"
    }

 ```

 ## Environment Variable

 - DB_CONNECT
 - TOKEN_KEY
 - EMAIL
 - EMAILPASS


# VIEWS

GET - "/" - home

----------
GET - "/login" - Login form

POST - "/api/users/login" - Authenticate existing user

------------

GET - "/register" - Registeration form

POST - "api/users" - Create User

-------

GET - "/dashboard" - User Dashboard

---------

GET - "/dashboard/new" - Create Post View

POST - "/api/posts" - Create Post API

----------


GET - "/dashboard/edit/:postID" - Edit Post View

PUT - "/api/posts/:postID" - Edit Post API

DELETE - "/api/posts/:postID" - Delete Post API

------------

GET - "/post/:postID" - View a Single Post

POST - "api/comments" - Create a comment for a post


# MODELS

Will need to include Posts.js and Comments.js
POST requests are API's so they need models. 

# Middleware 

See video for additional code to protect the API, not just the login. 
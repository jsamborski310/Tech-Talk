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



<!-- SHOULD ONLY BE ABLE TO EDIT OR DELETE FROM SINGLE POST -->
  {{#if posts.length}}
  <div class="col-md-6 post-list">
    <h3>Current Posts:</h3>

    {{#each posts as |post|}}
    <div class="row mb-2">
      <div class="col-md-8">
        <h4><a href="/post/{{post.id}}">{{post.title}}</a></h4>
        <p>{{post.content}}</p>
      </div>
      <div class="col-md-4">
        <button class="btn btn-sm btn-danger" data-id="{{post.id}}">DELETE</button>
      </div>

    <div>
      <a href="/edit/{{post.id}}">Edit</a>
    </div>

    </div>
    {{/each}}
  </div>
  {{/if}}
</div>
const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };


// User has many Posts

// Post belongs to User. (Foreign key user_id)
//  the thing that belongs to the other, will have a foreign key.

// ////////////

// User has many Comments

// Comments belongs to User. (foreign key comment.user_id)

////////////////

//  Post have many Comments

//  Comments belong to a Post (foreign key comment.post_id)






///// Check/Test with MYSQL extension on the right on VS Code

/////SAMPLE

// const Project = require('./Project');

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });



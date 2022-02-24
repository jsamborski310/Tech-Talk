const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET ALL POSTS.
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'date_created',
        'content'
      ],
      include: [
        {
        model: Comment,
        attributes: [
          'id',
          'post_comment',
          'post_id',
          'user_id',
          'date_created'],
          include: {
            model:User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// VIEW SINGLE POSTS WITH COMMENTS.
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'date_created',
        'content'
      ],
      include: [
        {
        model: Comment,
        attributes: [
          'id',
          'post_comment',
          'post_id',
          'user_id',
          'date_created'],
          include: {
            model:User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ALLOWS USER TO LOGIN.
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

















/////////// Change get dashboard to user. Do we need this here? Shouldn't it be under user?


// Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('dashboard', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// ///////// get edit should be on post. Move after login. Change get to Post/id. 

// router.get('/edit/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });

//     res.render('edit', {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




///////////////////////////

// router.get('/', async (req, res) => {
//   try {
//       const commentData = await Comment.findAll({
//           include: [
//               {
//                   model: User,
//                   attributes: ['name'],
//               },
//           ],
//       });

//       const comments = commentData.map((comment) => comment.get({ plain: true }));

//   } catch (err) {
//       res.status(500).json(err);
//   }

// });


// // CREATE NEW COMMENT
// router.post('/:id', withAuth, async (req, res) => {
// try {
//   const newComment = await Comment.create({
//     ...req.body,
//     user_id: req.session.user_id,
//   });

//   res.status(200).json(newComment);
// } catch (err) {
//   res.status(400).json(err);
// }
// });

// // DELETE EXISTING COMMENT
// router.delete('/:id', withAuth, async (req, res) => {
// try {
//   const commentData = await Comment.destroy({
//     where: {
//       id: req.params.id,
//       user_id: req.session.user_id,
//     },
//   });

//   if (!commentData) {
//     res.status(404).json({ message: 'No comment found with this id!' });
//     return;
//   }

//   res.status(200).json(commentData);
// } catch (err) {
//   res.status(500).json(err);
// }
// });


// Add logout route


module.exports = router;



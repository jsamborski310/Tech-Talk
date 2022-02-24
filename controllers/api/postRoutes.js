const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// SET UP GET POSTS
router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
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
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('post', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


// CREATE NEW POST
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE EXISTING POST
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// EDIT EXISTING POST
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update( 
      {
        title: req.body.title,
        content: req.body.content
      }, 
      {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

///////////////////////////

// Need a get in the post route. Need to see what is needed in dashboard route. 

//  Put in home route?

// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const postData = await Post.findAll({
//       attributes: [
//         'id',
//         'title',
//         'date_created',
//         'content'
//       ],
//       include: [
//         {
//         model: Comment,
//         attributes: [
//           'id',
//           'post_comment',
//           'post_id',
//           'user_id',
//           'date_created'],
//           include: {
//             model:User,
//             attributes: ['name']
//           }
//         },
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((post) => post.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('post', { 
//       posts, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });










/////////////////////////////////
// POST COMMENT

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // VIEW COMMENTS
// router.get('/post/:id', async (req, res) => {
//   try {
//     const commentData = await Comment.findAll(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//         {
//           model: Comment,
//           attributes: ['name', 'post_comment']
//         }
//       ],
//     });

//     const comments = commentData.map((comment) => comment.get({ plain: true }));

//     res.render('post', {
//       ...comments,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;

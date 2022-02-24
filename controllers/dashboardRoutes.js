const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


//   GETTING ALL POSTS

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    }
  })
    .then(postData => {
      const posts = postData.map((post) => post.get({ plain: true }));
      
      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in 
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("login");
    });
});

  // router.get('/', async (req, res) => {
  //     try {
  //       const postData = await Post.findAll({
  //           where: {
  //               id: req.params.id,
  //               user_id:req.session.user_id,
  //           },
  //           attributes: [
  //               'id',
  //               'title',
  //               'date_created',
  //               'content'
  //           ],
  //           include: [
  //               {
  //               model: Comment,
  //               attributes: [
  //               'id',
  //               'post_comment',
  //               'post_id',
  //               'user_id',
  //               'date_created'],
  //               include: {
  //                   model:User,
  //                   attributes: ['name']
  //               }
  //               },
  //               {
  //               model: User,
  //               attributes: ['name'],
  //               },
  //           ],
  //           });
    
  //       const posts = postData.map((post) => post.get({ plain: true }));
    
  //       res.render('dashboard', { 
  //         posts, 
  //         logged_in: req.session.logged_in 
  //       });
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   });



// EDIT POST

  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('edit', {
        ...post,
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

  module.exports = router;
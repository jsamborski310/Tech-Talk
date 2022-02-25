const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET ALL COMMENTS
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        // res.render('comments', { 
        //   comments, 
        //   logged_in: req.session.logged_in 
        // });
console.log(comments)
        res.render({ 
          comments, 
          logged_in: req.session.logged_in 
        });


    } catch (err) {
        res.status(500).json(err);
    }
  
});


// CREATE NEW COMMENT
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // ...req.body,
      post_comment: req.body.post_comment,
      // post_id: req.params.id,
      post_id: req.body.post_id,
      user_id: req.session.user_id
 
    });

  
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});




// DELETE EXISTING COMMENT
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

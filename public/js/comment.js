// ADDING A POST COMMENT
const commentFormHandler = async (event) => {
  event.preventDefault();

  const post_comment = document.querySelector('textarea[name="post-comment"]').value.trim();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (post_comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_id, post_comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create post');
    }
  }
};



document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
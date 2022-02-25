const commentFormHandler = async (event) => {
  event.preventDefault();

  const post_comment = document.querySelector('#post-comment').value.trim();


  if (post_comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_comment }),
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
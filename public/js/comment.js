const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#post-comment').value.trim();
   
  
    if (comment) {
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
  
  
// EDIT POST
const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#edit-title').value.trim();
    const content = document.getElementsByName('editContent')[0].value;  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1  // Grabs the ID from the URL
    ];

      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to edit post');
      }
    };
  // };
  
    document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editFormHandler);
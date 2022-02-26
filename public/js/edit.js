const editFormHandler = async (event) => {
    event.preventDefault();
  
    // const title = document.querySelector('#edit-title').value.trim();
    // const content = document.querySelectorAll('textarea').value.trim();

    const title = document.querySelector('#edit-title').value.trim();
    // const content = document.querySelector('textarea[name="editContent"]').value.trim();
    const content = document.getElementsByName('editContent')[0].value;

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];


    // NEED TO MAKE SURE USER IS LOGGED IN.
    // if (title && content) {
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
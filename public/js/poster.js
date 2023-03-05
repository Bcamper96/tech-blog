// Function to create a new post by sending a POST request to the server
const createPost = async () => {
    // Send a POST request to create the new post with the specified title, content, and user ID
    const post = await (await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: document.getElementById('title-form').value,
        content: document.getElementById('content-form').value,
        user_id: userId
      })
    })).json()
    // Redirect to the page for the newly created post
    document.location.pathname = `/post/${post.id}`
  }
  
  // Add an event listener to the submit button to create a new post when it is clicked
  document.getElementById('submit-button').addEventListener('click', createPost)
  
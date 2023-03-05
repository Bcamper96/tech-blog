// Function to handle the PUT request to update a post
const editPost = async (event) => {
    event.preventDefault()
  
    // Send a PUT request to update the post with the specified postId
    await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      // Send the updated post data in JSON format as the request body
      body: JSON.stringify({
        title: document.getElementById('title-form').value,
        content: document.getElementById('content-form').value
      })
    })
  
    // Redirect to the dashboard after the post is updated
    document.location.pathname = '/dashboard'
  }
  
  // Function to handle the DELETE request to delete a post
  const deletePost = async (event) => {
    event.preventDefault()
  
    // Send a DELETE request to delete the post with the specified postId
    await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
  
    // Redirect to the dashboard after the post is deleted
    document.location.pathname = '/dashboard'
  }
  
  // Add event listeners to the edit and delete buttons
  document.getElementById('edit-button').addEventListener('click', editPost)
  document.getElementById('delete-button').addEventListener('click', deletePost)
  
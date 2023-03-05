// Fetch the post data and populate the post and comments sections
const populateAll = async () => {
    const post = await (await fetch(`/api/posts/${postId}`)).json()
    populatePost(post)
    populateComments(post.comments)
  }
  
  // Populate the post section with the specified post data
  const populatePost = (post) => {
    const { title, content, user, date_created } = post
    document.getElementById('post-container').innerHTML = `
      <div class="row">
        <h1 id="title" class="col-9">${title}</h1>  
        <p id="date" class="col-3 text-end">Posted by ${user.username} at ${date_created}</p>
      </div>
      <p id="content" class="text-wrap" style="white-space: pre">${content}</p>
    `
  }
  
  // Populate the comments section with the specified comments data
  const populateComments = (comments) => {
    const commentContainer = document.getElementById('comment-container')
    for (const comment of comments) {
      const commentCard = createCommentCard(comment)
      commentContainer.appendChild(commentCard)
    }
  }
  
  // Create a comment card using the specified comment data
  const createCommentCard = (comment) => {
    const { content, date_created, user } = comment
  
    const commentCard = document.createElement('div')
    commentCard.className = 'card m-2'
    commentCard.innerHTML = `
      <div class="card">
        <div class="card-body d-flex row">
          <p class="card-text col-9">${content}</p>
          <p class="card-text col-3 text-end">Commented by ${user.username} on ${date_created}</p>
        </div>
      </div>
    `
    return commentCard
  }
  
  // Create a new comment and reload the page to display the new comment
  const createComment = async () => {
    await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: document.getElementById('content-form').value,
        user_id: userId,
        post_id: postId
      })
    })
    document.location.reload()
    document.getElementById('content-form').value = ''
  }
  
  // Add event listener to the submit button to create a new comment
  if (document.getElementById('submit-button')) {
    document.getElementById('submit-button').addEventListener('click', createComment)
  }
  
  // Call the populateAll function to fetch and display the post and comments
  populateAll()
  
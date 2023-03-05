// Function to fetch the most recent posts from the API
getRecentPosts = async () => {
    const response = await fetch('/api/posts')
    // If there was an error fetching the posts, alert the user
    if (!response.ok) alert('Error fetching posts')
    // Return the parsed JSON response
    return response.json()
  }
  
  // Function to create a card element for a post
  createPostCard = (post) => {
    // Extract the relevant post data
    const { title, content, user, date_created, id } = post
    const { username } = user
  
    // Create a new card element
    const card = document.createElement('div')
    card.className = 'card m-2'
    card.innerHTML = `
      <a class="text-reset text-decoration-none" href="/post/${id}">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            ${title}
            <div class="text-muted text-end">Posted by ${username} on ${date_created}</div>
          </div>
          <div class="card-body">
            <p class="card-text text-truncate">${content}</p>
          </div>
        </div>
      </a>
    `
    // Return the card element
    return card
  }
  
  // Function to populate the post container with cards for the most recent posts
  populatePosts = async () => {
    // Fetch the most recent posts
    const posts = await getRecentPosts()
  
    // Get the post container element
    const postContainer = document.getElementById('post-container')
  
    // Create a card for each post and append it to the post container
    for (const post of posts) {
      const card = createPostCard(post)
      postContainer.appendChild(card)
    }
  }
  
  // Call the populatePosts function to initialize the post container
  populatePosts()
  
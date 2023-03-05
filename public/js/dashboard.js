// Fetches recent posts from the server-side API
const getRecentPosts = async () => {
    const response = await fetch('/api/users/0/posts')
    if (!response.ok) alert('Error fetching posts')
    return await response.json()
  }
  
  // Creates a post card element
  const createPostCard = (post) => {
    const { title, date_created, id } = post
  
    const card = document.createElement('div')
    card.className = 'card m-2'
    card.innerHTML = `
      <a class="text-reset text-decoration-none" href="/posts/${id}/edit">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            ${title}
            <div class="text-muted text-end">Posted on ${date_created}</div>
          </div>
        </div>
      </a>
    `
    return card
  }
  
  // Populates recent posts into the DOM
  const populatePosts = async () => {
    const posts = await getRecentPosts()
  
    const postContainer = document.getElementById('post-container')
    for (const post of posts) {
      const card = createPostCard(post)
      postContainer.appendChild(card)
    }
  }
  
  // Executes the populatePosts function
  populatePosts()
  
// Function to handle the logout process
const logout = async () => {
    // Send a POST request to the server to log the user out
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
  
    // If the response is successful, redirect the user to the homepage
    if (response.ok) document.location.replace('/')
    // Otherwise, display an error message
    else alert('Failed to log out.')
  }
  
  // Add an event listener to the logout button
  document.querySelector('#logout').addEventListener('click', logout)
  
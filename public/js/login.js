// Function to handle the login form submission
const loginFormHandler = async (event) => {
    event.preventDefault()
  
    // Get the user's email and password from the form
    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()
  
    // If the user did not enter both email and password, display an error message
    if (!(email && password)) {
      alert('Must enter email and password to login')
      return
    }
  
    // Send a POST request to log the user in
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
  
    // If the login is successful, redirect the user to the homepage
    if (response.ok) {
      document.location.replace('/')
    } else {
      // If the login fails, display an error message
      alert('Failed to log in.')
    }
  }
  
  // Function to handle the signup form submission
  const signupFormHandler = async (event) => {
    event.preventDefault()
  
    // Get the user's username, email, and password from the form
    const username = document.querySelector('#username-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()
  
    // If the user did not enter all required fields, display an error message
    if (!(username && email && password)) {
      alert('Must enter username, email, and password to signup')
      return
    }
  
    // Send a POST request to create a new user account
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
  
    // If the signup is successful, redirect the user to the homepage
    if (response.ok) {
      document.location.replace('/')
    } else {
      // If the signup fails, display an error message
      alert('Failed to sign up.')
    }
  }
  
  // Add event listeners to the login and signup forms
  document.querySelector('#login-form').addEventListener('submit', loginFormHandler)
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler)
  
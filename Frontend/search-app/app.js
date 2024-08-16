document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('signupUsername').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;

    // Simulate storing user data (in a real app, send this to the server)
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Sign-up successful!');
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    // Simulate user authentication (in a real app, verify this with the server)
    if(email === localStorage.getItem('email') && password === localStorage.getItem('password')) {
        alert('Login successful!');
    } else {
        alert('Invalid email or password');
    }
});

document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('profileUsername').value;
    let email = document.getElementById('profileEmail').value;
    let password = document.getElementById('profilePassword').value;

    // Update user data (in a real app, send this to the server)
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    if(password) {
        localStorage.setItem('password', password);
    }

    alert('Profile updated!');
});


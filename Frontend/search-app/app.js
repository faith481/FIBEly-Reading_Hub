document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Generate a unique identifier for the review
    let reviewID = generateUniqueID();

    // Get form values
    let bookTitle = document.getElementById('bookTitle').value;
    let username = document.getElementById('username').value;
    let reviewText = document.getElementById('reviewText').value;
    let rating = document.getElementById('rating').value;

    // Create a review object with a unique ID
    let review = {
        id: reviewID,
        title: bookTitle,
        user: username,
        text: reviewText,
        rating: rating
    };

    // Save the review to localStorage (for demonstration purposes)
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    // Display the review
    displayReview(review);

    // Clear form fields
    document.getElementById('reviewForm').reset();
});

// Function to generate a pseudo-random unique ID
function generateUniqueID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to display a review
function displayReview(review) {
    let reviewList = document.getElementById('reviewList');
    let reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
    reviewElement.setAttribute('data-id', review.id);

    reviewElement.innerHTML = `
        <h4>${review.title} by ${review.user} (ID: ${review.id})</h4>
        <p>${review.text}</p>
        <p class="rating">Rating: ${'★'.repeat(review.rating)}</p>
    `;

    reviewList.appendChild(reviewElement);
}

// Load existing reviews on page load
window.onload = function() {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(displayReview);
};

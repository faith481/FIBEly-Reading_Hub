document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('results');

    // Sample data to search from
    const data = [
        'HTML',
        'CSS',
        'JavaScript',
        'Python',
        'Java',
        'C++',
        'Ruby',
        'PHP'
    ];

    // Clear previous results
    results.innerHTML = '';

    // Perform search
    const filteredData = data.filter(item => item.toLowerCase().includes(query));

    // Display results
    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            results.appendChild(div);
        });
    } else {
        results.textContent = 'No results found.';
    }
});

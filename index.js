import reddit from './redditapi.js'

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', e => {
    //console.log("abc");

    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value;

    const searchLimit = document.getElementById('limit').value;

    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    //console.log(`${searchTerm} - ${sortBy} - ${searchLimit}`);

    if (searchTerm == '') {
        // Show message
        showMessage('Please add a search term', 'alert-danger');
    }else{
        // Clear field
        searchInput.value = '';

        reddit.search(searchTerm, searchLimit, sortBy).then(results => {
            let output = `<div class="card-columns">`;
            results.forEach( post => {
                console.log(post);
                let imageUrl = post.preview ? post.preview.images[0].source.url : `https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg`;

                output += `
                <div class="card mb-2">
                    <img class="card-img-top mt-1" src=${imageUrl}>
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${truncateString(post.selftext, 100)}</p>
                        <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                        <hr>
                        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span> 
                        <span class="badge badge-dark">Score: ${post.score}</span>
                    </div>
                    
                </div>
                `
            });
            output += '</div>';
            document.getElementById('results').innerHTML = output;
        });
    }
 
    e.preventDefault();
});

// Show Message Function
function showMessage(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const searchContainer = document.getElementById('search-container');
    // Get form
    const search = document.getElementById('search');

    // Insert alert
    searchContainer.insertBefore(div, search);

    // Timeout after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Truncate String Function
function truncateString(myString, limit) {
    const shortened = myString.indexOf(' ', limit);
    if (shortened == -1) return myString;
    return myString.substring(0, shortened);
}


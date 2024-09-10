async function searchMovie(movieName) {
    const apiKey = '9b0933fe09ebad2b2b026f6f5c5f11e1';  // Replace with your TMDb API key
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // If no results are found
        if (data.results.length === 0) {
            console.log('No results found.');
            return;
        }

        // Display the first result
        const movie = data.results[0];
        console.log(movie);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Example usage:
searchMovie('Inception');




const obj = { name: 'John', age: 30 };

if (obj.hasOwnProperty('name')) {
  console.log('Property exists');
} else {
  console.log('Property does not exist');
}

console.log('it works')
console.log('nice')
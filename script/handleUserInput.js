export async function searchMovie(movieName) {
    const apiKey = '9b0933fe09ebad2b2b026f6f5c5f11e1';  
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // If no results are found
        if (data.results.length === 0) {
          throw new Error('response was not complete')
        }

        // Display the  result
        const movie = [...data.results]
       
        return movie
    } catch (error) {
      let myerror = `there is a fetch operation error, ${error}`
       return myerror;
    //   console.error('There was a problem with the fetch operation:', error);
    }
}
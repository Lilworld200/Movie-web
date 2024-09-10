// constructor function that generates all the movies subsections..

class FetchMovies{
  static #apiKey = '9b0933fe09ebad2b2b026f6f5c5f11e1'
  static #baseUrl = 'https://api.themoviedb.org/3';
// its takes in four parameters for now which are 
//the endpoints of the movies,
//that endpoint page 1 and 2 and 
//an array of the total pages
  constructor(endPoint) {
    this.endPoint = endPoint;
    this.page1 = null;
    this.page2 = null;
    this.totalPages = [];
  }

//  the fetch movie function gets the movie and stores it in page1 and 2 and then store it in the total page array
  async fetchMovie(){
    try{
    [this.page1,this.page2] = 
      await Promise.all([
        fetch(`${FetchMovies.#baseUrl}${this.endPoint}?api_key=${FetchMovies.#apiKey}&page=1`).then(res => res.json()),
        fetch(`${FetchMovies.#baseUrl}${this.endPoint}?api_key=${FetchMovies.#apiKey}&page=2`).then(res => res.json())
          ])
//this checks if the the api brought back data   
     if (!this.page1 || !this.page1.results || !this.page2 || !this.page2.results) {
        throw new Error('Error: Incomplete or unexpected response from the API');
         }
         
     this.totalPages = [this.page1.results,this.page2.results]
     
     return this.totalPages
    } catch (e) {
      console.log(e)
    }
    
  }
  
}

// this next function generates generate all the movie subsections

  const getTrendingMovies = new FetchMovies( '/trending/movie/week')

  const getPopularMovies = new FetchMovies(
  '/movie/popular'
  )
  
  const getTopRatedMovies = new FetchMovies(
    '/movie/top_rated'
    )
    
  const getTvshows = new FetchMovies(
    '/trending/tv/day'
    )
    
  const getUpcomingMovies = new FetchMovies(
    '/movie/upcoming'
    )
  
  const getLatestMovies = new FetchMovies(
    '/movie/now_playing'
    )
    
// this function 👇🏾 sets my movie data's to a readable variable 
async function setMovies() {
  
/*  if (localStorage.getItem('movieKey') !== null) {
   return
} ; */
  
/* i listed all the properties in an array and set it to promise await all so that i can resolve all the promises at once 👇🏾*/
  
 const [trendingMovies,popularMovies,topRatedMovies,tvShows,upcomingMovies,latestMovies] = await Promise.all([ getTrendingMovies.fetchMovie(),getPopularMovies.fetchMovie(),getTopRatedMovies.fetchMovie(),getTvshows.fetchMovie(),getUpcomingMovies.fetchMovie(),getLatestMovies.fetchMovie()])
  
  console.log('set successfull')
  return {
    trendingMovies,popularMovies,topRatedMovies,tvShows,upcomingMovies,latestMovies
  }
}

export async function storeMovies() {
    if (localStorage.getItem('movieKey') !== null) {
   return
} ; 
  const Allmovies =  await setMovies()
  localStorage.setItem('movieKey',JSON.stringify(Allmovies))
}

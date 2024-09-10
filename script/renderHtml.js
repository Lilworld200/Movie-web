export const renderHtml = {
  
  renderMovieHeading(movieSetHeading){
    document.querySelector('.Heading-container').innerHTML = `
      <h1></h1>
    `
  },
  
  renderMovieContent(movieSet){
    for (let movie of movieSet) {
      document.querySelector('main').innerHTML += `
      <div class="movie-container js-movie-container" data-movie-id = "${movie.id}">
      <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">
      <div class="rating-container">
        <p>${movie.popularity}</p>
      </div>
      <div class= "primary-info">
        <p>${movie.title}</p>
        <p>${movie.release_date}</p>
      </div>
    </div>
      `
    }
  },
  
  renderTvShows(movieSet){
    for (let movie of movieSet) {
      document.querySelector('main').innerHTML += `
      <div class="movie-container js-movie-container" data-movie-id = "${movie.id}">
      <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">
      <div class="rating-container">
        <p>${movie.popularity}</p>
      </div>
      <div class= "primary-info">
        <p>${movie.name}</p>
        <p>${movie.first_air_date}</p>
      </div>
    </div>
      `
    }
  },
  
  renderSubMovie(movie){
    document.getElementById('js-subMovie_Content').innerHTML = `
    <div class="sb_container">
       <img src="/images/logo/close-outline.svg" alt="" id="sb_close">
       <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="" id="poster_img">
       <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="" id="backdrop_img">
       <p id="sb-vote">${Math.round(movie.vote_average)}</p>
       <div class="sb-discription-container">
       <p id="sb-name">${movie.title}</p>
       
       <p id="sb-dcrib">${movie.overview}</p>
       
     </div>
     </div>
  
    `
    
  },
  renderSubTv(tv){
    document.getElementById('js-subMovie_Content').innerHTML = `
        <div class="sb_container">
           <img src="/images/logo/close-outline.svg" alt="" id="sb_close">
           <img src="https://image.tmdb.org/t/p/original${tv.poster_path}" alt="" id="poster_img">
           <img src="https://image.tmdb.org/t/p/original${tv.backdrop_path}" alt="" id="backdrop_img">
           <p id="sb-vote">${Math.round(tv.vote_average)}</p>
           <div class="sb-discription-container">
           <p id="sb-name">${tv.original_name}</p>
           
           <p id="sb-dcrib">${tv.overview}</p>
           
         </div>
         </div>
      
        `
    console.log(tv)
  }
}



//https://image.tmdb.org/t/p/original${movie.poster_path}
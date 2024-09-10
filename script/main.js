import { storeMovies } from '/script/fetchData.js';
import { renderHtml } from '/script/renderHtml.js';

await storeMovies()

import {searchMovie} from '/script/handleUserInput.js';

const getMovies = JSON.parse(localStorage.getItem('movieKey'));


document.addEventListener('DOMContentLoaded', () => {

      
  renderHtml.renderMovieContent(getMovies.latestMovies[0])

  addMovieInfoEventListner()

})

/*Created all variables that stores document content*/

// hamburgerMenu stores the hamburger icon
const hamburgerMenu = document.getElementById('hamburger');
const closeMenu = document.getElementById('js-close-btn')
//dropDowncontainer stores all content in menu drop down
const dropDownContainer = document.getElementById('js-drop-down')
//Allmenu stores the individual buttons in the dropdwon container 
const Allmenu = document.querySelectorAll('.sub-Menu');
//navContainer stores the main Navigation container
const navContainer = document.querySelector('nav');
//search input stores the input 
const searchInput = document.querySelector('#search-bar');
//movieHeadcontent stores the heading
const movieHeadContent = document.getElementById('js-movie-heading');
//mainContent stores all the movies(container)
let mainContent = document.querySelector('main');
//allmovies stores all the individual movie container
let allMovies = document.querySelectorAll('.js-movie-container');
let subMovieContent = document.getElementById('js-subMovie_Content')
let subMovieCloseBtn = document.getElementById('sb_close')
// loadmorebtn stores the html load more button 
let loadMoreBtn = document.querySelector('#load-more')

// Allmenu.foreach stores the event listner for all the menu content 
Allmenu.forEach((menu) => { menu.addEventListener('click', (event) => chooseContent(event.target)) })

//this function stores changes the main content of this website 
function chooseContent(button) {
  loadMoreBtn.style.visibility = 'visible'

  document.querySelector('main').innerHTML = ''
  switch (button.textContent) {
    case 'Trending':
      movieHeadContent.innerText = 'Trending'
      movieHeadStag(1)
      renderHtml.renderMovieContent(getMovies.trendingMovies[0])
      break;
    case 'Popular':
      movieHeadContent.innerText = 'Popular'
      movieHeadStag(2)
      renderHtml.renderMovieContent(getMovies.popularMovies[0])
      break;
    case 'Top Rated':
      movieHeadContent.innerText = 'Top Rated'
      movieHeadStag(3)
      renderHtml.renderMovieContent(getMovies.topRatedMovies[0])
      break;
    case 'Up Coming':
      movieHeadContent.innerText = 'Up Coming'
      movieHeadStag(4)
      renderHtml.renderMovieContent(getMovies.upcomingMovies[0])
      break;
    case 'TV-Shows':
      movieHeadContent.innerText = 'TV-Shows'
      movieHeadStag(5)
      renderHtml.renderTvShows(getMovies.tvShows[0])
      break;
    default:
      renderHtml.renderMovieContent(getMovies.latestMovies[0])
  }
  //all movies is reassigned its event listner  

  addMovieInfoEventListner();

}

//this function handles all the nessesary events
function containEventListners() {
  
  hamburgerMenu.addEventListener('click', () => {
    dropDownContainer.classList.add('drop-down_active')
    hamburgerMenu.classList.toggle('menu-container_remove');
  })

  closeMenu.addEventListener('click', () => {
    dropDownContainer.classList.remove('drop-down_active')
    hamburgerMenu.classList.toggle('menu-container_remove');
  })

  mainContent.addEventListener('touchmove', () => {
    navContainer.style.opacity = '0.5'
    searchInput.style.width = '2.5rem'
    dropDownContainer.classList.remove('drop-down_active')
    hamburgerMenu.classList.remove('menu-container_remove')
  })

  mainContent.addEventListener('touchend', () => {
    navContainer.style.opacity = '1'
  })

  searchInput.addEventListener('touchstart', () => {
    searchInput.style.width = '100%'
  })

  searchInput.addEventListener('change', () => {
    searchInput.style.width = '2.5rem'
    checkUserInput()
    searchInput.value = ''
  })

  subMovieContent.addEventListener('click',(event) => toggleSubmovie(event.target) )

  loadMoreBtn.addEventListener('click', LoadMoreContent)

  addMovieInfoEventListner()
  /*    allMovies.forEach((movie) => {
        movie.addEventListener('click',() => displayMovieDetails(movie))
    }) */
}
//this function stores the event to load more content 
function LoadMoreContent() {
 
  loadMoreBtn.style.visibility = 'hidden'

  switch (movieHeadContent.dataset.specialTag) {
    case '0':
      renderHtml.renderMovieContent(getMovies.latestMovies[1])
      break;
    case '1':
      renderHtml.renderMovieContent(getMovies.trendingMovies[1])
      break;
    case '2':
      renderHtml.renderMovieContent(getMovies.popularMovies[1])
      break;
    case '3':
      renderHtml.renderMovieContent(getMovies.topRatedMovies[1])
      break;
    case '4':
      renderHtml.renderMovieContent(getMovies.upcomingMovies[1])
      break;
    case '5':
      renderHtml.renderTvShows(getMovies.tvShows[1])
      break;
    default:
      // Tab to edit
  }

  //all movies is reassigned its event listner  
  addMovieInfoEventListner()

}

//this function stores all movie extra details 
function displayMovieDetails(movie) {
  
  const movieId = movie.dataset.movieId;
  let subMovie = null;
  let subTv = null;
  const movielist = [...getMovies.latestMovies[0], ...getMovies.latestMovies[1], ...getMovies.popularMovies[0], ...getMovies.popularMovies[1], ...getMovies.topRatedMovies[0], ...getMovies.topRatedMovies[1], ...getMovies.trendingMovies[0], ...getMovies.trendingMovies[1], ...getMovies.upcomingMovies[0], ...getMovies.upcomingMovies[1]]

  const Tvlist = [...getMovies.tvShows[0], ...getMovies.tvShows[1]]

/*  const selectedMovie = movielist.filter((movie) => movie.id == movieId)

  const selectedTv = Tvlist.filter((movie) => movie.id == movieId) */

  for (let movie of movielist) {
    if (movie.id == movieId) {
      subMovie = movie;
    }
  }

  for (let tvshow of Tvlist) {
    if (tvshow.id == movieId) {
      subTv = tvshow;
    }
  }

  subMovieContent.classList.toggle('subMovie_Content_active')

  if (subMovie) {
    renderHtml.renderSubMovie(subMovie)
  } else if (subTv) {
    renderHtml.renderSubTv(subTv)
  }
    
  //subMovieCloseBtn.addEventListener('click', () => subMovieContent.classList.toggle('subMovie_Content_active'))
  console.log(subMovie || subTv)
}

function addMovieInfoEventListner() {
  allMovies = document.querySelectorAll('.js-movie-container');

  allMovies.forEach((movie) => {
    movie.addEventListener('click', () => {
      displayMovieDetails(movie);
    //  displaySearchMovieSc(movie)
    })
  })

}

function movieHeadStag(sTag) {
  movieHeadContent.dataset.specialTag = `${sTag}`
}

function toggleSubmovie(target) {
  if (target.id == 'sb_close') {
  subMovieContent.classList.toggle('subMovie_Content_active')
  }

}


async function checkUserInput() {
  try {
    movieHeadContent.innerText = searchInput.value
    const userInput = await searchMovie(`${searchInput.value}`) 
    
  /* if (userInput) {
     localStorage.setItem('inputResult', JSON.stringify(userInput))
   } */
    

    
     if (!userInput) {
      throw new Error('User input not found')
      
    }
    
    document.querySelector('main').innerHTML = '' 
     
   for (let movie of userInput) {
      if (movie.hasOwnProperty('title')) {
       let  movieArr = [movie]
        renderHtml.renderMovieContent(movieArr)
        
      } else if (movie.hasOwnProperty('name')) {
       let movieArr = [movie]
         renderHtml.renderTvShows(movieArr)
         
      }
   }
   
  if (userInput) {
     loadMoreBtn.style.visibility = 'hidden'
     localStorage.setItem('inputResult', JSON.stringify(userInput))
     addsearchmovieSb()
   } 
   
   
    
  } catch (e) {
    console.error(e.message)
  }
  

}

//this function displays the search movies sub details ,
async function displaySearchMovieSc(movie) {
  try {

   const userInputResult = JSON.parse(localStorage.getItem('inputResult'))
     
    const movieId = movie.dataset.movieId;
    
    let subMovie ;
    let subTv ;
    const movielist = [...userInputResult];

    console.log(userInputResult)

  for (let movie of movielist) {
    if (movie.id == movieId && movie.hasOwnProperty("title")) {
      subMovie = movie;
    } else if (movie.id == movieId && movie.hasOwnProperty("name")) {
      subTv = movie;
    }
  }

  subMovieContent.classList.toggle('subMovie_Content_active')

  if (subMovie) {
    renderHtml.renderSubMovie(subMovie)
  } else if (subTv) {
    renderHtml.renderSubTv(subTv)
  }
    
//  subMovieCloseBtn.addEventListener('click', () => subMovieContent.classList.toggle('subMovie_Content_active'))
  console.log(subMovie || subTv)
  
  } catch (e) {
   console.error(e)
  }
}

function addsearchmovieSb() {
    allMovies = document.querySelectorAll('.js-movie-container');
  
    allMovies.forEach((movie) => {
      movie.addEventListener('click', () => {
       // displayMovieDetails(movie);
          displaySearchMovieSc(movie)
      })
    })
}
//this function calls the containeventlistner function 
containEventListners()
//getSearchMovieSc()
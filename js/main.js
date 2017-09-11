$(document).ready(() => {

        $(".loading").hide();




  $('#searchForm').on('submit', e => {
    let searchText = $('#searchText').val();
      $(".loading").show();
    getMovies(searchText);
    e.preventDefault();
  });
});

//API
// https://api.themoviedb.org/3/search/movie?query=home&api_key=39a80812b9f1a26251532a5fe397d047

function getMovies(searchText) {
  $.getJSON(
  'https:api.themoviedb.org/3/search/movie?query='+searchText+'&api_key=39a80812b9f1a26251532a5fe397d047', function(data){
    console.log(data.results);
    let movies = data.results;
    let output = '';
    $.each(movies, (index, movie) => {
      output += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/t/web-mistake-page-not-found-blue-cute-was-disappointed-monster-white-background-looks-like-does-54518796.jpg';">
            <h5>${movie.title}</h5>
            <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
          </div>
        </div>
      `;
    });
    $(".loading").hide();
    if(movies.length > 1){
    $('#movies-counter').html("We found "+movies.length+" movies" );
    }
    else if(movies.length === 1){
    $('#movies-counter').html("We found "+movies.length+" movies" );
    }
    else if(movies.length === 0){
    $('#movies-counter').html("We didn't find anything to show here " );
    }
    $('#movies').html(output);
  });

}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  // window.location = 'movie.html';
  window.open('movie.html', '_blank');
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  $.getJSON(
  'https://api.themoviedb.org/3/movie/'+movieId+'?api_key=39a80812b9f1a26251532a5fe397d047', function(response){
    console.log(response);
    let movie = response;

    let genre_output = '';
    function genreOut(){
      if(movie.genres.length === 0){
        return 0;
      }
      for(let i=0; i < movie.genres.length; i++){
        if(i === movie.genres.length-1){
          genre_output += movie.genres[i].name;
          break;
        }
        genre_output += movie.genres[i].name + ", ";
      }
    }
    genreOut();

    let output = `
      <div class="row">
        <div class="col-md-4">
          <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.original_title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${genre_output}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>

          </ul>
        </div>
      </div>

      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.overview}
          <hr>
          <a href="http://imdb.com/title/${movie.imdb_id}" target=_blank class="btn btn-primary">View IMDB</a>
          <a href="index.html" class="btn btn-default">Go Back To Search</a>

        </div>
      </div>
    `;

    $('#movie').html(output);

  });
}

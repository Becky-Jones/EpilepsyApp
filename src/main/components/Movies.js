export class Movies {
  constructor() {
    this.movies = [];
  }
  /*****************************
   * GETTERS
   *****************************/

  getMovies() {
    return this.movies.toString();
  }

  /*****************************
   * SETTERS
   *****************************/

  setMovies(movies) {
    this.movies = movies;
  }
}

const searchAgg = (movieTitle) => [
  {
    $search: {
      text: {
        query: movieTitle,
        path: 'title',
      },
    },
  },
  {
    $limit: 10,
  },
  {
    $project: {
      _id: 0,
      title: 1,
      plot: 1,
      year: 1,
      imdb: 1,
      cast: 1,
      genres: 1,
      released: 1,
      tomatoes: 1,
    },
  },
];

module.exports = {
  searchAgg,
};

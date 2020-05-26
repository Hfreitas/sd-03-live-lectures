import React from 'react';
import { connect } from 'react-redux';

const Player = ({category, movie}) => (
  <div>
    <h1>Category: {category.name}</h1>
    <h2>Title: {movie.title}</h2>
  </div>
)

const mapStateToProps = state => ({
  category: state.movieReducer.selectedCategory,
  movie: state.movieReducer.selectedMovie,
})

export default connect(mapStateToProps)(Player);

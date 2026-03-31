import React from 'react';
import SpiderCollectionScreen from '../../components/SpiderCollectionScreen';
import { getMovies } from '../../api/data/collections';

const MoviesScreen = () => {
  return (
    <SpiderCollectionScreen
      badge="SPIDEON"
      title="Spider-Man movies across every era"
      subtitle="From Raimi to the Spider-Verse films, browse movie cards with quick reference links."
      sectionTitle="Movie lineup"
      sectionCaption="Poster-style cards for the biggest Spider-Man films"
      loadItems={getMovies}
    />
  );
};

export default MoviesScreen;

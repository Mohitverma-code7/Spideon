import React from 'react';
import SpiderCollectionScreen from '../../components/SpiderCollectionScreen';
import { getComics } from '../../api/data/collections';

const ComicsScreen = () => {
  return (
    <SpiderCollectionScreen
      badge="SPIDEON"
      title="Essential Spider-Man comics and story arcs"
      subtitle="See key issues, iconic runs, and multiverse events with art cards and quick links."
      sectionTitle="Comic spotlight"
      sectionCaption="Cover-style cards with direct links for deeper reading"
      loadItems={getComics}
    />
  );
};

export default ComicsScreen;

import React from 'react';
import SpiderCollectionScreen from '../../components/SpiderCollectionScreen';
import { getCostumes } from '../../api/data/collections';

const CostumeScreen = () => {
  return (
    <SpiderCollectionScreen
      badge="SPIDEON"
      title="Iconic Spider suits and style eras"
      subtitle="Explore the signature looks that made each Spider variant instantly recognizable."
      sectionTitle="Costume collection"
      sectionCaption="Styled suit cards with visual identity and quick notes"
      loadItems={getCostumes}
    />
  );
};

export default CostumeScreen;

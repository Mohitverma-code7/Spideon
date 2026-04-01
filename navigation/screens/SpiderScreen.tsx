import React from "react";
import SpiderCollectionScreen from "../../components/SpiderCollectionScreen";
import { getSpiderList } from "../../api/data/collections";

const SpiderScreen = () => {
  return (
    <SpiderCollectionScreen
      badge="SPIDEON"
      title="Every spider signal in one place"
      subtitle="Browse the wider Spider list with portraits, identities, and fast character lookup."
      sectionTitle="Spider roster"
      sectionCaption="A broader Spider collection pulled from your API data"
      loadItems={getSpiderList}
    />
  );
};

export default SpiderScreen;

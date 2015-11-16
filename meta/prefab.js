'use strict';

var CustomAssetMeta = require('./custom-asset');

class PrefabMeta extends CustomAssetMeta { 
  constructor ( assetdb ) {
    super( assetdb );
  }
}

module.exports = PrefabMeta;

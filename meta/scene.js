'use strict';

var CustomAssetMeta = require('./custom-asset');

class SceneMeta extends CustomAssetMeta {
  constructor ( assetdb ) {
    super( assetdb );
  }

  static defaultType() { return 'scene'; }
}

module.exports = SceneMeta;

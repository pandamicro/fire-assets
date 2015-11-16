'use strict';

var CustomAssetMeta = require('./custom-asset');

class AnimationClipMeta extends CustomAssetMeta { 
  constructor ( assetdb ) {
    super( assetdb );
  }
}

module.exports = AnimationClipMeta;

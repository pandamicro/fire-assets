'use strict';

var CustomAssetMeta = require('./custom-asset');

class AnimationClipMeta extends CustomAssetMeta {
  constructor ( assetdb ) {
    super( assetdb );
  }

  static defaultType() { return 'animation-clip'; }
}

module.exports = AnimationClipMeta;

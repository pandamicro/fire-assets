'use strict';

class SceneMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );
  }

  static defaultType() { return 'scene'; }
}

module.exports = SceneMeta;

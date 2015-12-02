'use strict';

class AudioClipMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );
  }

  static defaultType() { return 'audio-clip'; }
}

module.exports = AudioClipMeta;

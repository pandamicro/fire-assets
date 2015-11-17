'use strict';

const Fs = require('fire-fs');
const Plist = require('plist');

class SpriteAtlasMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );
  }

  static validate ( assetpath ) {
    var dictionary = Plist.parse( Fs.readFileSync(assetpath, 'utf8') );

    var format1 = typeof dictionary.frames !== 'undefined' && typeof dictionary.texture !== 'undefined';
    var format2 = typeof dictionary.frames !== 'undefined' && typeof dictionary.metadata !== 'undefined';
    var format3 = typeof dictionary.frames !== 'undefined' && typeof dictionary.meta !== 'undefined';

    return format1 || format2 || format3;
  }

  static defaultType() { return 'sprite-atlas'; }
}

SpriteAtlasMeta.prototype.export = null;

module.exports = SpriteAtlasMeta;

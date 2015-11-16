'use strict';

var Fs = require('fire-fs');
var Path = require('fire-path');
var Plist = require('plist');

class SpriteAtlasMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );
  }

  validate ( assetpath ) {
    var dictionary = Plist.parse( Fs.readFileSync(assetpath, 'utf8') );

    var format1 = typeof dictionary.frames !== 'undefined' && typeof dictionary.texture !== 'undefined';
    var format2 = typeof dictionary.frames !== 'undefined' && typeof dictionary.metadata !== 'undefined';
    var format3 = typeof dictionary.frames !== 'undefined' && typeof dictionary.meta !== 'undefined';

    return format1 || format2 || format3;
  }
}

SpriteAtlasMeta.prototype.export = null;

module.exports = SpriteAtlasMeta;

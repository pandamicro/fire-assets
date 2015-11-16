'use strict';

var Fs = require('fire-fs');
var Path = require('fire-path');

class TiledMapMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );
  }
}

TiledMapMeta.prototype.export = null;

module.exports = TiledMapMeta;

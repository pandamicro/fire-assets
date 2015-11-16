'use strict';

var Fs = require('fire-fs');
var Path = require('fire-path');
var Plist = require('plist');

class ParticleMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );
  }

  validate ( assetpath ) {
    var dictionary = Plist.parse( Fs.readFileSync(assetpath, 'utf8') );
    return typeof dictionary.maxParticles !== 'undefined';
  }
}

ParticleMeta.prototype.export = null;

module.exports = ParticleMeta;

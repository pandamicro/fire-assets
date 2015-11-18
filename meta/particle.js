'use strict';

const Fs = require('fire-fs');
const Plist = require('plist');

class ParticleMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );
  }

  static validate ( assetpath ) {
    let dictionary = Plist.parse( Fs.readFileSync(assetpath, 'utf8') );
    return typeof dictionary.maxParticles !== 'undefined';
  }

  static defaultType() { return 'particle'; }
}

ParticleMeta.prototype.export = null;

module.exports = ParticleMeta;

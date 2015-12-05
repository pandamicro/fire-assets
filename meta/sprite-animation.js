'use strict';

var Fs = require('fire-fs');
var Path = require('fire-path');

class SpriteAnimationMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );

    for (var i = 0; i < 10; i++) {
      this[i] = '';
    }

    this.loop = true;
    this.delay = 0.2;
  }

  deserialize ( jsonObj ) {
    super.deserialize(jsonObj);

    for (var i = 0; i < 10; i++) {
      this[i] = jsonObj[i];
    }

    this.loop = jsonObj.loop;
    this.delay = jsonObj.delay;
  }

  useRawfile () {
    return false;
  }

  dests () {
    return [
      this._assetdb._uuidToImportPathNoExt( this.uuid ) + '.json',
    ];
  }

  import ( fspath, cb ) {
    var basename = Path.basename(fspath);

    var asset = new cc.SpriteAnimationAsset();
    asset.name = Path.basenameNoExt(fspath);
    asset._setRawFiles([
      basename
    ]);

    for (var i = 0; i < 10; i++) {
      asset[i] = this[i] ? this._assetdb.uuidToUrl(this[i]) : '';
    }

    asset.loop = this.loop;
    asset.delay = this.delay;

    var json;
    if ( asset.serialize ) {
      json = asset.serialize();
    }
    if ( !json ) {
      json = JSON.stringify( asset, null, 2 );
    }

    Fs.writeFileSync( fspath, json );
    this._assetdb.saveAssetToLibrary( this.uuid, asset );

    if ( cb ) cb ();
  }

  static defaultType() { return 'sprite-animation'; }
}

SpriteAnimationMeta.prototype.export = null;

module.exports = SpriteAnimationMeta;

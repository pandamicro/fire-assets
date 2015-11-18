'use strict';

var Path = require('fire-path');

class TTFFontMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );

    this.fontFamily = '';
  }

  deserialize ( jsonObj ) {
    super.deserialize(jsonObj);
    this.fontFamily = jsonObj.fontFamily;
  }

  useRawfile () {
    return false;
  }

  dests () {
    var fspath = this._assetdb.uuidToFspath(this.uuid);
    var destbase = this._assetdb._uuidToImportPathNoExt( this.uuid );
    return [
      destbase + '.json',
      destbase + Path.extname(fspath),
    ];
  }

  import ( fspath, cb ) {
    // var basename = Path.basename(fspath);

    var asset = new cc.TTFFont();
    asset.name = Path.basenameNoExt(fspath);
    asset._setRawFiles([
      this.uuid + Path.extname(fspath)
    ]);

    asset.fontFamily = this.fontFamily ? this.fontFamily : asset.name;

    this._assetdb.copyAssetToLibrary( this.uuid, fspath );
    this._assetdb.saveAssetToLibrary( this.uuid, asset );

    if ( cb ) cb ();
  }

  static defaultType() { return 'ttf-font'; }
}

TTFFontMeta.prototype.export = null;

module.exports = TTFFontMeta;

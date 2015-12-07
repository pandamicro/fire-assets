'use strict';

const SpriteMeta = require('./sprite-frame');
// const BRACE_REGEX = /[\{\}]/g;

class SpriteAtlasMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );
    this.rawTextureUuid = '';
    this.size = cc.size(0, 0);
    this.type = '';
  }

  static defaultType() { return 'sprite-atlas'; }

  parse () {}

  useRawfile () { return false; }

  deserialize ( jsonObj ) {
    super.deserialize(jsonObj);

    var subMetas = {}, metaData, meta, key;
    // fspath = this._assetdb.uuidToFspath(jsonObj.uuid);
    for (key in jsonObj.subMetas) {
      metaData = jsonObj.subMetas[key];
      meta = subMetas[key] = new SpriteMeta( this._assetdb );
      meta.deserialize( metaData );
    }

    this.updateSubMetas( subMetas );

    // !HACK: Overwrite sub metas' import function
    subMetas = this.getSubMetas();
    for ( key in subMetas ) {
      subMetas[key].import = this.importSprite;
    }
  }

  dests () {
    let results = [
      this._assetdb._uuidToImportPathNoExt(this.uuid) + '.json'
    ];
    var subMetas = this.getSubMetas();
    for ( var key in subMetas ) {
      results.push(this._assetdb._uuidToImportPathNoExt(subMetas[key].uuid) + '.json');
    }
    return results;
  }

  importSprite ( fspath, cb ) {
    var sprite = this.createSpriteFrame( fspath, this._rawWidth, this._rawHeight );

    // TODO: this.atlasName

    this._assetdb.saveAssetToLibrary( this.uuid, sprite );

    if (cb) cb( null, sprite );
  }

  import ( fspath, cb ) {
    this.parse( fspath );

    // Save atlas
    this._assetdb.saveAssetToLibrary( this.uuid, this.serialize() );

    // !HACK: Overwrite sub metas' import function
    var subMetas = this.getSubMetas();
    for ( var key in subMetas ) {
      subMetas[key].import = this.importSprite;
    }

    if (cb) cb();
  }
}

module.exports = SpriteAtlasMeta;

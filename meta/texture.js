'use strict';

class TextureMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );

    this.type = 'raw'; // raw, normal-map, sprite
    this.wrapMode = 'clamp';
    this.filterMode = 'bilinear';
  }

  deserialize ( jsonObj ) {
    super.deserialize(jsonObj);

    this.type = jsonObj.type;
    this.wrapMode = jsonObj.wrapMode;
    this.filterMode = jsonObj.filterMode;

    let subMetas = {};
    // let fspath = this._assetdb.uuidToFspath(jsonObj.uuid);
    for (let key in jsonObj.subMetas) {
      let subJsonObj = jsonObj.subMetas[key];
      let meta = new Editor.metas['sprite-frame'](this._assetdb);
      meta.deserialize( subJsonObj );

      subMetas[key] = meta;
    }

    this.updateSubMetas( subMetas );
  }

  useRawfile () {
    return this.type === 'raw';
  }

  dests () {
    if ( this.type === 'raw' ) {
      return [];
    }

    let results = [];
    for ( let key in this.__subMetas__ ) {
      let uuid = this.__subMetas__[key].uuid;
      results.push( this._assetdb._uuidToImportPathNoExt(uuid) + '.json' );
    }
    return results;
  }

  import ( fspath, cb ) {
    if ( this.type === 'raw' ) {
      cb ();
      return;
    }

    if ( this.type === 'sprite' ) {
      const SpriteMeta = Editor.metas['sprite-frame'];
      const Path = require('fire-path');

      let spriteMeta = new SpriteMeta(this._assetdb);
      spriteMeta.rawTextureUuid = this.uuid;

      let subMetas = {};
      subMetas[Path.basenameNoExt(fspath)] = spriteMeta;
      this.updateSubMetas( subMetas );

      cb ();
      return;
    }
  }

  static defaultType() { return 'texture'; }
}
TextureMeta.prototype.export = null;

module.exports = TextureMeta;

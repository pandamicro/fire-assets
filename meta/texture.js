'use strict';

const SpriteMeta = require('./sprite-frame');

class TextureMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );

    this.type = 'sprite'; // raw, normal-map, sprite
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
      let meta = new SpriteMeta(this._assetdb);
      meta.deserialize( subJsonObj );

      subMetas[key] = meta;
    }

    this.updateSubMetas( subMetas );
  }

  useRawfile () {
    return true;
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
      this.updateSubMetas({});
      cb ();
      return;
    }

    if ( this.type === 'sprite' ) {
      const SpriteMeta = Editor.metas['sprite-frame'];
      const Path = require('fire-path');

      let name = Path.basenameNoExt(fspath);
      let subMetas = this.getSubMetas();
      let keys = Object.keys(subMetas);
      let spriteMeta = null;

      // try to use the old subMeta
      if ( keys.length ) {
        spriteMeta = subMetas[keys[0]];
      }
      if ( !spriteMeta ) {
        spriteMeta = new SpriteMeta(this._assetdb);
      }
      spriteMeta.rawTextureUuid = this.uuid;

      // overwrite
      subMetas = {
        [name]: spriteMeta
      };
      this.updateSubMetas( subMetas );

      cb ();
      return;
    }
  }

  static defaultType() { return 'texture'; }
}
TextureMeta.prototype.export = null;

module.exports = TextureMeta;

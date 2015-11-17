'use strict';

class TextureMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );

    this.type = 'raw'; // raw, normal-map, sprite
    this.wrapMode = 'clamp';
    this.filterMode = 'bilinear';

    // sprite data
    this.rawTextureUuid = '';
    this.trimType = 'auto'; // auto, custom
    this.trimThreshold = 1;
    this.spriteType = 'normal'; // normal, sliced

    this.trimX = 0;
    this.trimY = 0;
    this.width = 0;
    this.height = 0;

    this.borderTop = 0;
    this.borderBottom = 0;
    this.borderLeft = 0;
    this.borderRight = 0;
  }

  deserialize ( jsonObj ) {
    super.deserialize(jsonObj);

    this.type = jsonObj.type;
    this.wrapMode = jsonObj.wrapMode;
    this.filterMode = jsonObj.filterMode;

    if ( this.type === 'sprite' ) {
      this.rawTextureUuid = this.uuid;
      this.trimType = jsonObj.trimType;
      this.trimThreshold = jsonObj.trimThreshold;
      this.spriteType = jsonObj.spriteType;

      this.trimX = jsonObj.trimX;
      this.trimY = jsonObj.trimY;
      this.width = jsonObj.width;
      this.height = jsonObj.height;

      this.borderTop = jsonObj.borderTop;
      this.borderBottom = jsonObj.borderBottom;
      this.borderLeft = jsonObj.borderLeft;
      this.borderRight = jsonObj.borderRight;
    }
  }

  useRawfile () {
    return this.type === 'raw';
  }

  dests () {
    if ( this.type === 'raw' ) {
      return [];
    }

    return [
      this._assetdb._uuidToImportPathNoExt(this.uuid) + '.json',
    ];
  }

  import ( fspath, cb ) {
    if ( this.type === 'raw' ) {
      cb ();
      return;
    }

    if ( this.type === 'sprite' ) {
      const SpriteMeta = Editor.metas.sprite;
      let spriteMeta = new SpriteMeta(this._assetdb);
      spriteMeta.import.apply(this,[fspath,cb]);
      return;
    }
  }

  assetType () {
    if ( this.type === 'sprite' ) {
      return 'sprite';
    }

    return 'texture';
  }

  static defaultType() { return 'texture'; }
}
TextureMeta.prototype.export = null;

module.exports = TextureMeta;

'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');
const Plist = require('plist');

const BRACE_REGEX = /[\{\}]/g;

function _parseSize ( sizeStr ) {
  sizeStr = sizeStr.substr( 1, sizeStr.length - 2 );
  var arr = sizeStr.split( ',' );
  var width = parseInt( arr[0] );
  var height = parseInt( arr[1] );
  return cc.size( width, height );
}

function _parseTrimmedRect ( rectStr ) {
  rectStr = rectStr.replace(BRACE_REGEX, '');
  var arr = sizeStr.split( ',' );
  return {
    x: parseInt( arr[0] || 0 ),
    y: parseInt( arr[1] || 0 ),
    w: parseInt( arr[2] || 0 ),
    h: parseInt( arr[3] || 0 )
  };
}

class TexturePackerMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );
  }

  useRawfile () {
    return false;
  }

  validate ( assetpath ) {
    var dictionary = Plist.parse( Fs.readFileSync(assetpath, 'utf8') );
    return typeof dictionary.frames !== 'undefined' 
        && typeof dictionary.metadata !== 'undefined';
  }

  deserialize ( jsonObj ) {
    super.deserialize(jsonObj);

    var subMetas = {}, 
        metaData, meta, key,
        fspath = this._assetdb.uuidToFspath(jsonObj.uuid);
    for (key in jsonObj.subMetas) {
      metaData = jsonObj.subMetas[key];
      meta = subMetas[key] = Meta.createSubMeta( this._assetdb, SpriteMeta );
      meta.deserialize( metaData );
    }

    this.updateSubMetas( subMetas );
  }

  dest () {
    return [
      this._assetdb._uuidToImportPathNoExt( this.uuid ) + '.json',
    ];
  }

  subImport ( fspath, cb ) {
    var sprite = this.createSpriteFrame( fspath, this._rawWidth, this._rawHeight );

    // TODO: this.atlasName

    this._assetdb.saveAssetToLibrary( this.uuid, sprite );

    if (cb) cb( null, sprite );
  }

  import ( fspath, cb ) {
    // Copy plist
    this._assetdb.copyAssetToLibrary( this.uuid, fspath );

    // Parse plist
    var dictionary = Plist.parse( Fs.readFileSync(assetpath, 'utf8') );
    var info = dictionary.metadata;
    var frames = dictionary.frames;

    // Parse info
    var dirName = Path.dirname( fspath );
    // realTextureFileName & textureFileName
    var textureFile = Path.join( dirName, info.realTextureFileName || info.textureFileName );
    // size
    var size = _parseSize( info.size );

    this.texture = Meta.load( this._assetdb, textureFile + '.meta' );
    var texUuid = this.texture.uuid;

    // Parse frames
    var subMetas = {};
    for (let key in frames) {
      let frame = frames[key];
      let meta = subMetas[key] = Meta.createSubMeta( this._assetdb, SpriteAssetMeta );

      meta.rawTextureUuid = texUuid;
      meta.rotated = !!frame.rotated;
      meta.trimType = frame.trimmed ? 'custom' : 'auto';
      meta.spriteType = 'normal';

      let rawSize = _parseSize( frame.sourceSize );
      meta._rawWidth = rawSize.width;
      meta._rawHeight = rawSize.height;

      let rect = _parseTrimmedRect( frame.frame );
      meta.trimX = rect.x;
      meta.trimY = rect.y;
      meta.width = rect.w;
      meta.height = rect.h;

      meta.import = this.subImport;
    }

    this.updateSubMetas( subMetas );

    if (cb) cb();
  }
}

module.exports = TexturePackerMeta;

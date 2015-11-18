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

function _texturePackerParser ( fspath ) {
  var assetdb = this._assetdb;
  var info = Plist.parse( Fs.readFileSync(fspath, 'utf8') );

  // Parse info
  var dirName = Path.dirname( fspath );
  // realTextureFileName & textureFileName
  this.rawTexturePath = Path.join( dirName, info.realTextureFileName || info.textureFileName );
  this.rawTextureUuid = assetdb.fspathToUuid( fspath );
  // size
  this.size = _parseSize( info.size );

  // Parse frames
  var subMetas = {};
  for (let key in frames) {
    let frame = frames[key];
    let subMeta = subMetas[key] = new SpriteAssetMeta( assetdb );

    subMeta.rawTextureUuid = this.rawTextureUuid;
    subMeta.rotated = !!frame.rotated;
    subMeta.trimType = frame.trimmed ? 'custom' : 'auto';
    subMeta.spriteType = 'normal';

    let rawSize = _parseSize( frame.sourceSize );
    subMeta._rawWidth = rawSize.width;
    subMeta._rawHeight = rawSize.height;

    let rect = _parseTrimmedRect( frame.frame );
    subMeta.trimX = rect.x;
    subMeta.trimY = rect.y;
    subMeta.width = rect.w;
    subMeta.height = rect.h;
  }

  this.updateSubMetas( subMetas );
}

class SpriteAtlasMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );
    this.parse = _texturePackerParser;
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

  importSprite ( fspath, cb ) {
    var sprite = this.createSpriteFrame( fspath, this._rawWidth, this._rawHeight );

    // TODO: this.atlasName

    this._assetdb.saveAssetToLibrary( this.uuid, sprite );

    if (cb) cb( null, sprite );
  }

  import ( fspath, cb ) {
    // Copy source file
    this._assetdb.copyAssetToLibrary( this.uuid, fspath );

    this.parse( fspath );

    // Overwrite sub metas' import function
    var subMetas = this.getSubMetas();
    for ( var key in subMetas ) {
      subMetas[key].import = this.importSprite;
    }

    if (cb) cb();
  }
}

module.exports = SpriteAtlasMeta;

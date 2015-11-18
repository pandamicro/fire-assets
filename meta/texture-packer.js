'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');
const Plist = require('plist');
const SpriteAtlasMeta = require('./sprite-atlas');
const SpriteMeta = require('./sprite-frame');

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
  var arr = rectStr.split( ',' );
  return {
    x: parseInt( arr[0] || 0 ),
    y: parseInt( arr[1] || 0 ),
    w: parseInt( arr[2] || 0 ),
    h: parseInt( arr[3] || 0 )
  };
}

class TexturePackerMeta extends SpriteAtlasMeta {
  constructor ( assetdb ) {
    super( assetdb );
    this.type = 'Texture Packer';
  }

  static validate ( assetpath ) {
    var dictionary = Plist.parse( Fs.readFileSync(assetpath, 'utf8') );
    return typeof dictionary.frames !== 'undefined' 
        && typeof dictionary.metadata !== 'undefined';
  }

  parse ( fspath ) {
    var assetdb = this._assetdb;
    var plist = Plist.parse( Fs.readFileSync(fspath, 'utf8') );
    var info = plist.metadata;
    var frames = plist.frames;

    // Parse info
    var dirName = Path.dirname( fspath );
    // realTextureFileName & textureFileName
    this.rawTexturePath = Path.join( dirName, info.realTextureFileName || info.textureFileName );
    this.rawTextureUuid = assetdb.fspathToUuid( this.rawTexturePath );
    // size
    this.size = _parseSize( info.size );

    // Parse frames
    var subMetas = {};
    for (let key in frames) {
      let frame = frames[key];
      let subMeta = subMetas[key] = new SpriteMeta( assetdb );

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
}

module.exports = TexturePackerMeta;

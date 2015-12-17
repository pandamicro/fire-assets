'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');
const Plist = require('plist');
const SpriteAtlasMeta = require('./sprite-atlas');
const SpriteMeta = require('./sprite-frame');

const BRACE_REGEX = /[\{\}]/g;

function _parseSize ( sizeStr ) {
  sizeStr = sizeStr.substr( 1, sizeStr.length - 2 );
  let arr = sizeStr.split( ',' );
  let width = parseInt( arr[0] );
  let height = parseInt( arr[1] );
  return cc.size( width, height );
}

function _parseTrimmedRect ( rectStr ) {
  rectStr = rectStr.replace(BRACE_REGEX, '');
  let arr = rectStr.split( ',' );
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
    let dictionary = Plist.parse( Fs.readFileSync(assetpath, 'utf8') );
    return typeof dictionary.frames !== 'undefined' &&
        typeof dictionary.metadata !== 'undefined';
  }

  parse ( fspath ) {
    let assetdb = this._assetdb;
    let plist = Plist.parse( Fs.readFileSync(fspath, 'utf8') );
    let info = plist.metadata;
    let frames = plist.frames;

    // Parse info
    let dirName = Path.dirname( fspath );
    // realTextureFileName & textureFileName
    let rawTexturePath = Path.join( dirName, info.realTextureFileName || info.textureFileName );
    this.rawTextureUuid = assetdb.fspathToUuid( rawTexturePath );
    // size
    this.size = _parseSize( info.size );

    //
    let subMetas = {};
    let oldSubMetas = this.getSubMetas();

    // Parse frames
    for (let key in frames) {
      let frame = frames[key];
      let rotated = false, trimmed, sourceSize;

      // try to load from exists meta
      let subMeta = oldSubMetas[key];
      if ( !subMeta ) {
          subMeta = new SpriteMeta( assetdb );
      }
      subMetas[key] = subMeta;

      subMeta.rawTextureUuid = this.rawTextureUuid;

      if (info.format === 2) {
        rotated = frame.rotated;
        trimmed = frame.trimmed;
        sourceSize = frame.sourceSize;
        frame = frame.frame;
      }
      else if (info.format === 3) {
        rotated = frame.textureRotated;
        trimmed = frame.trimmed;
        sourceSize = frame.spriteSourceSize;
        frame = frame.textureRect;
      }

      subMeta.rotated = !!rotated;
      subMeta.trimType = trimmed ? 'custom' : 'auto';
      subMeta.spriteType = 'normal';

      let rawSize = _parseSize( sourceSize );
      subMeta._rawWidth = rawSize.width;
      subMeta._rawHeight = rawSize.height;

      let rect = _parseTrimmedRect( frame );
      subMeta.trimX = rect.x;
      subMeta.trimY = rect.y;
      subMeta.width = rect.w;
      subMeta.height = rect.h;
    }

    this.updateSubMetas( subMetas );
  }
}

module.exports = TexturePackerMeta;

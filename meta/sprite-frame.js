'use strict';

var Async = require('async');
var Path = require('fire-path');

var _getPixiel = function (image, x, y ) {
    return image.getPixel(x,y);

    // DISABLE: jimp
    // var idx = x * 4 + y * image.bitmap.width * 4;
    // return {
    //     r: image.bitmap.data[idx],
    //     g: image.bitmap.data[idx+1],
    //     b: image.bitmap.data[idx+2],
    //     a: image.bitmap.data[idx+3],
    // };
};

var _getTrimRect = function (image, w, h, trimThreshold) {
    // A B C
    // D x F
    // G H I

    var threshold = trimThreshold;
    var tx = w, ty = h, tw = 0, th = 0;
    var x, y;

    // trim A B C
    for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
            if (_getPixiel(image,x,y).a >= threshold) {
                ty = y;
                y = h;
                break;
            }
        }
    }
    // trim G H I
    for (y = h - 1; y >= ty; y--) {
        for (x = 0; x < w; x++) {
            if (_getPixiel(image,x,y).a >= threshold) {
                th = y - ty + 1;
                y = 0;
                break;
            }
        }
    }
    // trim D
    for (x = 0; x < w; x++) {
        for (y = ty; y < ty + th; y++) {
            if (_getPixiel(image,x,y).a >= threshold) {
                tx = x;
                x = w;
                break;
            }
        }
    }
    // trim F
    for (x = w - 1; x >= tx; x--) {
        for (y = ty; y < ty + th; y++) {
            if (_getPixiel(image,x,y).a >= threshold) {
                tw = x - tx + 1;
                x = 0;
                break;
            }
        }
    }

    return [tx, ty, tw, th];
};

class SpriteMeta extends Editor.metas.asset {
  constructor ( assetdb ) {
    super( assetdb );

    this.rawTextureUuid = '';
    this.trimType = 'auto'; // auto, custom
    this.trimThreshold = 1;
    this.rotated = false;

    this.offsetX = 0;
    this.offsetY = 0;

    this.trimX = 0;
    this.trimY = 0;
    this.width = 0;
    this.height = 0;

    this.borderTop = 0;
    this.borderBottom = 0;
    this.borderLeft = 0;
    this.borderRight = 0;
  }

  useRawfile () {
    return false;
  }

  dests () {
    return [
        this._assetdb._uuidToImportPathNoExt( this.uuid ) + '.json',
    ];
  }

  createSpriteFrame ( fspath, rawWidth, rawHeight ) {
    var sprite = new cc.SpriteFrame();
    var texUuid = this.rawTextureUuid;
    sprite.name = Path.basenameNoExt(fspath);
    sprite.setOriginalSize(cc.size(rawWidth, rawHeight));
    sprite.setOriginalSizeInPixels(cc.size(rawWidth, rawHeight));
    sprite.setRectInPixels(cc.rect(0,0, this.width,this.height));

    sprite._textureFilename = this._assetdb.uuidToUrl(texUuid);
    sprite.setRectInPixels(cc.rect(
      this.trimX, this.trimY, this.width, this.height
    ));
    sprite.setRotated(this.rotated);

    sprite.insetTop = this.borderTop;
    sprite.insetBottom = this.borderBottom;
    sprite.insetLeft = this.borderLeft;
    sprite.insetRight = this.borderRight;

    var offset = cc.p(this.offsetX, this.offsetY);
    sprite.setOffsetInPixels(offset);

    return sprite;
  }

  import ( fspath, cb ) {
    const Lwip = require('lwip');
    // const Jimp = require('jimp'); // DISABLE: jimp

    var rawTextureUuid = this.rawTextureUuid;
    var rawTextureFile = this._assetdb.uuidToFspath(rawTextureUuid);

    if ( !rawTextureFile ) {
      cb ( new Error( `Can not find raw texture for ${fspath}, uuid not found: ${rawTextureUuid}` ) );
      return;
    }

    Async.waterfall([
      next => {
        Lwip.open( rawTextureFile, next );
        // new Jimp( rawTextureFile, next ); // DISABLE: jimp
      },

      ( image, next ) => {
        if ( !image ) {
          next(new Error('Can not load image for ' + rawTextureFile));
        }
        // var basename = Path.basename(fspath);

        let rawWidth = image.width();
        let rawHeight = image.height();

        // DISABLE: jimp
        // var rawWidth = image.bitmap.width;
        // var rawHeight = image.bitmap.height;

        if ( this.trimType === 'auto' ) {
          let rect = _getTrimRect ( image, rawWidth, rawHeight, this.trimThreshold );
          this.trimX = rect[0];
          this.trimY = rect[1];
          this.width = rect[2];
          this.height = rect[3];
        } else {
          this.trimX = Editor.Math.clamp(this.trimX, 0, rawWidth);
          this.trimY = Editor.Math.clamp(this.trimY, 0, rawHeight);
          this.width = Editor.Math.clamp(this.width, 0, rawWidth - this.trimX);
          this.height = Editor.Math.clamp(this.height, 0, rawHeight - this.trimY);
        }

        let sprite = this.createSpriteFrame( fspath, rawWidth, rawHeight );

        // TODO: this.atlasName

        this._assetdb.saveAssetToLibrary( this.uuid, sprite );

        next ( null, sprite );
      }
    ], err => {
      if (cb) {
        cb (err);
      }
    });
  }

  static defaultType() { return 'sprite-frame'; }
}

SpriteMeta.prototype.export = null;

module.exports = SpriteMeta;

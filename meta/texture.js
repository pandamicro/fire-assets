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
  }

  useRawfile () {
    return this.type === 'raw';
  }

  dests () {
    if ( this.type === 'raw' ) {
      return [];
    }

    return [
      this._assetdb._uuidToImportPathNoExt(this.uuid) + '.png',
    ];
  }

  import ( fspath, cb ) {
    // var Lwip = require('lwip'); /*DISABLE*/
    const Jimp = require('jimp');
    const Async = require('async');

    Async.waterfall([
      next => {
        // Lwip.open( fspath, next ); /*DISABLE*/
        new Jimp( fspath, next );
      },

      ( image, next ) => {
        if ( this.type === 'sprite' ) {
          // TODO
          // var basename = Path.basename(fspath);

          // var texture = new cc.TextureAsset();
          // texture.name = Path.basenameNoExt(fspath);
          // texture._setRawFiles([
          //   basename
          // ]);
          // // TODO
          // // texture.wrapMode = convertWrapMode(this.wrapMode);
          // // texture.filterMode = convertFilterMode(this.filterMode);
          // texture.width = image.width();
          // texture.height = image.height();

          // if ( texture.type === 'sprite' ) {
          //   // TODO: create sprite meta here
          // }

          // this._assetdb.copyAssetToLibrary( this.uuid, fspath );
          // this._assetdb.saveAssetToLibrary( this.uuid, texture );
        }

        next ( null, image );
      },

      // DISABLE
      // ( image, next ) => {
      //   this._assetdb.createThumbnail( this.uuid, 32, image, next );
      // },

    ], err => {
      if ( cb ) {
        cb ( err );
      }
    });
  }
}
TextureMeta.prototype.export = null;

module.exports = TextureMeta;

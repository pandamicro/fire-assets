'use strict';

class TextureMeta extends Editor.metas.asset {
    constructor () {
        super();

        this.type = 'raw'; // raw, normal-map, sprite
        this.wrapMode = 'clamp';
        this.filterMode = 'bilinear';
        this.export = null;
    }

    serialize () {
        super.serialize();
        return this;
    }

    deserialize ( jsonObj ) {
        super.deserialize(jsonObj);

        this.type = jsonObj.type;
        this.wrapMode = jsonObj.wrapMode;
        this.filterMode = jsonObj.filterMode;

        return this;
    }

    useRawfile () {
        return this.type === 'raw';
    }

    dests ( assetdb ) {
        if ( this.type === 'raw' ) {
            return [];
        }

        return [
            assetdb._uuidToImportPathNoExt(this.uuid) + '.png',
        ];
    }

    import ( assetdb, fspath, cb ) {
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
                    //     basename
                    // ]);
                    // // TODO
                    // // texture.wrapMode = convertWrapMode(this.wrapMode);
                    // // texture.filterMode = convertFilterMode(this.filterMode);
                    // texture.width = image.width();
                    // texture.height = image.height();

                    // if ( texture.type === 'sprite' ) {
                    //     // TODO: create sprite meta here
                    // }

                    // assetdb.copyAssetToLibrary( this.uuid, fspath );
                    // assetdb.saveAssetToLibrary( this.uuid, texture );
                }

                next ( null, image );
            },

            // DISABLE
            // ( image, next ) => {
            //     assetdb.createThumbnail( this.uuid, 32, image, next );
            // },

        ], err => {
            if ( cb ) {
                cb ( err );
            }
        });
    }
}

module.exports = TextureMeta;


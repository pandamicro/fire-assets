var $super = Editor.metas.asset;
function TextureMeta () {
    $super.call(this);

    this.type = 'sprite';
    this.wrapMode = 'clamp';
    this.filterMode = 'bilinear';
}
Editor.JS.extend(TextureMeta,$super);

TextureMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

TextureMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);
    this.type = jsonObj.type;
    this.wrapMode = jsonObj.wrapMode;
    this.filterMode = jsonObj.filterMode;
};

TextureMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var Lwip = require('lwip');
    var Async = require('async');
    var Path = require('fire-path');
    var self = this;

    Async.waterfall([
        function ( next ) {
            Lwip.open( fspath, next );
        },

        function ( image, next ) {
            var basename = Path.basename(fspath);

            var texture = new Fire.Texture();
            texture.name = Path.basenameNoExt(fspath);
            texture._setRawFiles([
                basename
            ]);
            // TODO
            // texture.wrapMode = convertWrapMode(this.wrapMode);
            // texture.filterMode = convertFilterMode(this.filterMode);
            texture.width = image.width();
            texture.height = image.height();

            if ( texture.type === 'sprite' ) {
                // TODO: create sprite meta here
            }

            assetdb.copyRawfileToLibrary( self.uuid, fspath );
            assetdb.saveAssetToLibrary( self.uuid, texture );

            next ( null, image );
        },

        // create thumbnail
        function ( image, next ) {
            assetdb._createThumbnail( fspath, 32, image, next );
        },
    ], function ( err ) {
        if ( cb ) cb ( err );
    });
};

TextureMeta.prototype.export = null;

module.exports = TextureMeta;


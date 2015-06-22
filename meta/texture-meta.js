var $super = Editor.Meta.AssetMeta;
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
};

TextureMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var Lwip = require('lwip');
    var Path = require('fire-path');
    var self = this;

    Lwip.open( fspath, function(err, image) {
        if ( err ) {
            if ( cb ) cb ( err );
            return;
        }

        var extname = Path.extname(fspath);
        if ( extname.length > 0 ) { extname = extname.substr(1); }

        var texture = new Fire.Texture();
        texture.name = Path.basenameNoExt(fspath);
        texture._setRawFiles([
            extname
        ]);
        // TODO
        // texture.wrapMode = convertWrapMode(this.wrapMode);
        // texture.filterMode = convertFilterMode(this.filterMode);
        texture.width = image.width();
        texture.height = image.height();

        if ( texture.type === 'sprite' ) {
            // TODO: create sprite meta here
        }

        assetdb.copyToLibrary( self.uuid, extname, fspath );
        assetdb.saveToLibrary( self.uuid, texture );

        if ( cb ) cb ();
    });
};

TextureMeta.prototype.export = null;

module.exports = TextureMeta;


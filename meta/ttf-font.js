var Path = require('fire-path');

var $super = Editor.metas.asset;
function TTFFontMeta () {
    $super.call(this);

    this.fontFamily = '';
}
Editor.JS.extend(TTFFontMeta, $super);

TTFFontMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

TTFFontMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);

    this.fontFamily = jsonObj.fontFamily;
};

TTFFontMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var basename = Path.basename(fspath);

    var asset = new Fire.TTFFont();
    asset.name = Path.basenameNoExt(fspath);
    asset._setRawFiles([
        basename
    ]);

    asset.fontFamily = this.fontFamily ? this.fontFamily : asset.name;

    assetdb.copyRawfileToLibrary( this.uuid, fspath );
    assetdb.saveAssetToLibrary( this.uuid, asset );

    if ( cb ) cb ();
};

TTFFontMeta.prototype.export = null;

module.exports = TTFFontMeta;


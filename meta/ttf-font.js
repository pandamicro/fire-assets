var Path = require('fire-path');

var $super = Editor.metas.asset;
function TTFFontMeta () {
    $super.call(this);

    this.fontName = '';
}
Editor.JS.extend(TTFFontMeta, $super);

TTFFontMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

TTFFontMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);

    this.fontName = jsonObj.fontName;
};

TTFFontMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var extname = Path.extname(fspath);
    if ( extname.length > 0 ) { extname = extname.substr(1); }

    var asset = new Fire.TTFFont();
    asset.name = Path.basenameNoExt(fspath);
    asset._setRawFiles([
        extname
    ]);

    asset.fontName = this.fontName ? this.fontName : asset.name;

    assetdb.copyToLibrary( this.uuid, extname, fspath );
    assetdb.saveToLibrary( this.uuid, asset );

    if ( cb ) cb ();
};

TTFFontMeta.prototype.export = null;

module.exports = TTFFontMeta;


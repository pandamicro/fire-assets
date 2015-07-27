var Fs = require('fire-fs');
var Path = require('fire-path');

var $super = Editor.metas.asset;
function AudioClipMeata () {
    $super.call(this);
}
Editor.JS.extend(AudioClipMeata, $super);

AudioClipMeata.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

AudioClipMeata.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);
};

AudioClipMeata.prototype.import = function ( assetdb, fspath, cb ) {
    var basename = Path.basename(fspath);

    var asset = new Fire.AudioClip();
    asset.name = Path.basenameNoExt(fspath);
    asset._setRawFiles([basename]);

    assetdb.copyRawfileToLibrary( this.uuid, fspath );
    assetdb.saveAssetToLibrary( this.uuid, asset );

    if (cb) cb();
};

AudioClipMeata.prototype.export = function (path, data, cb) {
    if (data) {
        Fs.writeFile(path, data, cb);
    }
    else {
        if (cb) cb();
    }
};

module.exports = AudioClipMeata;

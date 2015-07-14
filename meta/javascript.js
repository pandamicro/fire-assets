var Fs = require('fire-fs');

var $super = Editor.metas.asset;
function JavaScriptMeta () {
    $super.call(this);
}
Editor.JS.extend(JavaScriptMeta, $super);

JavaScriptMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

JavaScriptMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);
};

JavaScriptMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var Async = require('async');
    var Path = require('fire-path');
    var self = this;

    Async.waterfall([
        function ( next ) {
            var basename = Path.basename(fspath);

            var asset = new Fire.JavaScript();
            asset.name = Path.basenameNoExt(fspath);
            asset._setRawFiles([basename]);

            assetdb.copyRawfileToLibrary( self.uuid, fspath );
            assetdb.saveAssetToLibrary( self.uuid, asset );

            next ( null );
        }
    ], cb);
};

JavaScriptMeta.prototype.export = function (path, data, cb) {
    if (data) {
        Fs.writeFile(path, data, cb);
    }
    else {
        if (cb) cb();
    }
};

module.exports = JavaScriptMeta;

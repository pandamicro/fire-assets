var Fs = require('fire-fs');

var $super = Editor.metas.asset;
function SceneMeta () {
    $super.call(this);
}
Editor.JS.extend(SceneMeta, $super);

SceneMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

SceneMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);
};

SceneMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var Async = require('async');
    var Path = require('fire-path');
    var self = this;

    Async.waterfall([
        function ( next ) {
            var basename = Path.basename(fspath);

            var asset = new Fire.Scene();
            asset.name = Path.basenameNoExt(fspath);
            asset._setRawFiles([basename]);

            assetdb.copyRawfileToLibrary( self.uuid, fspath );
            assetdb.saveAssetToLibrary( self.uuid, asset );

            next ( null );
        }
    ], cb);
};

SceneMeta.prototype.export = function (path, data, cb) {
    if (data) {
        Fs.writeFile(path, data, cb);
    }
    else {
        if (cb) cb();
    }
};

module.exports = SceneMeta;

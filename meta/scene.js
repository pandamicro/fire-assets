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

SceneMeta.prototype.useRawfile = function () {
    return false;
};

SceneMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var Async = require('async');
    var Path = require('fire-path');
    var self = this;

    Async.waterfall([
        function ( next ) {
            var dest = assetdb.copyAssetToLibrary( self.uuid, fspath );

            var asset = JSON.parse(Fs.readFileSync(dest));
            Editor.serialize.setName(asset, Path.basename(fspath));
            Fs.writeFileSync(dest, JSON.stringify(asset, null, 2));

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

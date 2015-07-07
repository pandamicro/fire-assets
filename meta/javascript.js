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

            assetdb.copyToLibrary( self.uuid, basename, fspath );
            assetdb.saveToLibrary( self.uuid, asset );

            next ( null );
        }
    ], cb);
};

JavaScriptMeta.prototype.export = null;

module.exports = JavaScriptMeta;

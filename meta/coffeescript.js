var Fs = require('fire-fs');

var $super = Editor.metas.asset;
function CoffeeScriptMeta () {
    $super.call(this);
}
Editor.JS.extend(CoffeeScriptMeta, $super);

CoffeeScriptMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

CoffeeScriptMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);
};

CoffeeScriptMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var Async = require('async');
    var Path = require('fire-path');
    var Coffee = require('coffee-script');

    var self = this;

    Async.waterfall([
        function ( next ) {
            var data;
            try {
                var str = Fs.readFileSync( fspath, {encoding: 'utf-8'} );
                data = Coffee.compile(str, {
                    // bare: false,
                    // header: false,
                    // sourceMap: !!file.sourceMap,
                    // sourceRoot: false,
                    // literate: /\.(litcoffee|coffee\.md)$/.test(file.path),
                    // filename: file.path,
                    // sourceFiles: [file.relative],
                    // generatedFile: replaceExtension(file.relative)
                });
                next ( null, data );
            } catch (err) {
                next ( err );
            }
        },

        function ( data, next ) {
            var basenameNoExt = Path.basenameNoExt(fspath);

            var asset = new Fire.CoffeeScript();
            asset.name = basenameNoExt;
            asset._setRawFiles([basenameNoExt + '.js']);

            assetdb.saveRawdataToLibrary( self.uuid, data, basenameNoExt+'.js' );
            assetdb.saveAssetToLibrary( self.uuid, asset );

            next ( null );
        }
    ], cb);
};

CoffeeScriptMeta.prototype.export = function (path, data, cb) {
    if (data) {
        Fs.writeFile(path, data, cb);
    }
    else {
        if (cb) cb();
    }
};

module.exports = CoffeeScriptMeta;

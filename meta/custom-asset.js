var Fs = require('fire-fs');
var Path = require('fire-path');

var $super = Editor.metas.asset;
function CustomAssetMeta () {
    $super.call(this);
}
Editor.JS.extend(CustomAssetMeta, $super);

CustomAssetMeta.prototype.useRawfile = function () {
    return false;
};

CustomAssetMeta.prototype.dests = function (db) {
    var destBase = db._uuidToImportPathNoExt(this.uuid);
    return [
        destBase + '.json',
    ];
};

CustomAssetMeta.prototype.import = function (db, fspath, cb) {
    var self = this;

    Fs.readFile(fspath, {encoding: 'utf-8'}, function (err, data) {
        if (data) {
            var json = JSON.parse(data);

            Editor.serialize.setName(json, Path.basenameNoExt(fspath));

            db.saveAssetToLibrary(self.uuid, json);
        }
        if (cb) cb(err);
    });
};

module.exports = CustomAssetMeta;

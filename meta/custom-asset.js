var Fs = require('fire-fs');

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
    Fs.readFile(fspath, function (err, data) {
        if (data) {
            db.saveAssetToLibrary(self.uuid, data);
        }
        if (cb) cb(err);
    });
};

module.exports = CustomAssetMeta;

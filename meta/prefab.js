var Fs = require('fire-fs');

var $super = Editor.metas.asset;
function PrefabMeta () {
    $super.call(this);
}
Editor.JS.extend(PrefabMeta, $super);

PrefabMeta.prototype.useRawfile = function () {
    return false;
};

PrefabMeta.prototype.import = function (db, fspath, cb) {
    var uuid = this.uuid;
    Fs.readFile(fspath, function (err, data) {
        if (data) {
            db.saveAssetToLibrary(uuid, data);
        }
        if (cb) cb(err);
    });
};

module.exports = PrefabMeta;

var $super = Editor.AssetMeta;
function TextureMeta () {
    $super.call(this);

    this.type = 'sprite';
    this.wrapMode = 'clamp';
    this.filterMode = 'bilinear';
}
Editor.JS.extend(TextureMeta,$super);

TextureMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

TextureMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);
};

TextureMeta.prototype.import = function ( assetdb, fspath, cb ) {
    if ( cb ) cb ();
};

TextureMeta.prototype.export = null;

module.exports = TextureMeta;


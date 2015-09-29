var CustomAssetMeta = require('./custom-asset');

var $super = CustomAssetMeta;
function PrefabMeta () {
    $super.call(this);
}
Editor.JS.extend(PrefabMeta, $super);

module.exports = PrefabMeta;

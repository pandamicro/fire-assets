var CustomAssetMeta = require('./custom-asset');

var $super = CustomAssetMeta;
function AnimationClipMeta () {
    $super.call(this);
}
Editor.JS.extend(AnimationClipMeta, $super);

module.exports = AnimationClipMeta;

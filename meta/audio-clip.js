var $super = Editor.metas.asset;
function AudioClipMeta () {
    $super.call(this);
}
Editor.JS.extend(AudioClipMeta, $super);

module.exports = AudioClipMeta;

var Fs = require('fire-fs');

var $super = Editor.metas.asset;
function SceneMeta () {
    $super.call(this);
}
Editor.JS.extend(SceneMeta, $super);

module.exports = SceneMeta;

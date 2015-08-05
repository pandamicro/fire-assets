var Path = require('fire-path');

var $super = Editor.metas.asset;
function TTFFontMeta () {
    $super.call(this);
}
Editor.JS.extend(TTFFontMeta, $super);

TTFFontMeta.prototype.export = null;

module.exports = TTFFontMeta;


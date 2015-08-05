var Fs = require('fire-fs');
var Path = require('fire-path');


var PAGE_EXP = /page [^\n]*(\n|$)/gi;
var ITEM_EXP = /\w+=[^ \r\n]+/gi;
var INT_EXP  = /^[\-]?\d+$/;

function _parseStrToObj(str) {
    var arr = str.match(ITEM_EXP);
    var obj = {};
    if (arr) {
        for (var i = 0, li = arr.length; i < li; i++) {
            var tempStr = arr[i];
            var index = tempStr.indexOf("=");
            var key = tempStr.substring(0, index);
            var value = tempStr.substring(index + 1);
            if (value.match(INT_EXP)) value = parseInt(value);
            else if (value[0] === '"') value = value.substring(1, value.length - 1);
            obj[key] = value;
        }
    }
    return obj;
}


var $super = Editor.metas.asset;
function BitmapFontMeta () {
    $super.call(this);

    this.texturePath = '';
}
Editor.JS.extend(BitmapFontMeta, $super);

BitmapFontMeta.prototype.export = null;

module.exports = BitmapFontMeta;


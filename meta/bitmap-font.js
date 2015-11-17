'use strict';

var Fs = require('fire-fs');
var Path = require('fire-path');

const PAGE_EXP = /page [^\n]*(\n|$)/gi;
const ITEM_EXP = /\w+=[^ \r\n]+/gi;
const INT_EXP  = /^[\-]?\d+$/;

function _parseStrToObj (str) {
  let arr = str.match(ITEM_EXP);
  let obj = {};
  if (arr) {
    for (let i = 0, li = arr.length; i < li; i++) {
      let tempStr = arr[i];
      let index = tempStr.indexOf("=");
      let key = tempStr.substring(0, index);
      let value = tempStr.substring(index + 1);
      if (value.match(INT_EXP)) value = parseInt(value);
      else if (value[0] === '"') value = value.substring(1, value.length - 1);
      obj[key] = value;
    }
  }
  return obj;
}

class BitmapFontMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );

    this.texturePath = '';
  }
  static defaultType() { return 'bitmap-font'; }
}
BitmapFontMeta.prototype.export = null;

module.exports = BitmapFontMeta;

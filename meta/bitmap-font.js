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

BitmapFontMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

BitmapFontMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);

    this.texturePath = jsonObj.texturePath;
};

BitmapFontMeta.prototype.import = function ( assetdb, fspath, cb ) {
    var basename = Path.basename(fspath);

    var asset = new Fire.BitmapFont();
    asset.name = Path.basenameNoExt(fspath);
    asset._setRawFiles([
        basename
    ]);

    // parse .fnt to get relative texture path
    var text = Fs.readFileSync( fspath, {encoding: 'utf-8'} );
    var pageObj = _parseStrToObj( text.match(PAGE_EXP)[0] );

    var texturePath = pageObj.file;
    this.texturePath = texturePath;

    texturePath = Path.join(Path.dirname(fspath), texturePath);

    // console.log( texturePath + ' : ' + Fs.existsSync(texturePath) );
    if ( !Fs.existsSync(texturePath) ) {
        if ( cb )  cb ( new Error ( 'BitmapFontMeta can\'t find texture path :'  + texturePath ) );
        return;
    }

    // get uuid from path
    var textureUuid = assetdb.fspathToUuid(texturePath);
    asset.texture = Editor.serialize.asAsset(textureUuid);

    assetdb.copyRawfileToLibrary( this.uuid, fspath );
    assetdb.saveAssetToLibrary( this.uuid, asset );

    if ( cb ) cb ();
};

BitmapFontMeta.prototype.export = null;

module.exports = BitmapFontMeta;


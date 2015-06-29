var Async = require('async');
var Lwip = require('lwip');
var Fs = require('fs');
var Path = require('fire-path');

var _getTrimRect = function (lwipImage, w, h, trimThreshold) {
    // A B C
    // D x F
    // G H I

    var threshold = trimThreshold;
    var tx = w, ty = h, tw = 0, th = 0;
    var x, y;

    // trim A B C
    for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
            if (lwipImage.getPixel(x,y).a >= threshold) {
                ty = y;
                y = h;
                break;
            }
        }
    }
    // trim G H I
    for (y = h - 1; y >= ty; y--) {
        for (x = 0; x < w; x++) {
            if (lwipImage.getPixel(x,y).a >= threshold) {
                th = y - ty + 1;
                y = 0;
                break;
            }
        }
    }
    // trim D
    for (x = 0; x < w; x++) {
        for (y = ty; y < ty + th; y++) {
            if (lwipImage.getPixel(x,y).a >= threshold) {
                tx = x;
                x = w;
                break;
            }
        }
    }
    // trim F
    for (x = w - 1; x >= tx; x--) {
        for (y = ty; y < ty + th; y++) {
            if (lwipImage.getPixel(x,y).a >= threshold) {
                tw = x - tx + 1;
                x = 0;
                break;
            }
        }
    }

    return [tx, ty, tw, th];
};

Editor.TrimType = Fire.defineEnum({
    Auto: -1,
    Custom: -1,
});



var $super = Editor.metas.asset;
function SpriteMeta () {
    $super.call(this);

    this.rawTextureUuid = '';
}
Editor.JS.extend(SpriteMeta,$super);


SpriteMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

SpriteMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);

    this.rawTextureUuid = jsonObj.rawTextureUuid;
};

SpriteMeta.prototype.import = function ( assetdb, fspath, cb ) {

    var self = this;

    var text = Fs.readFileSync( fspath, {encoding: 'utf-8'} );
    var json = JSON.parse(text);

    var rawTextureUuid = json.rawTextureUuid;
    var rawTextureFile = assetdb.uuidToFspath(rawTextureUuid);

    if ( !rawTextureFile ) {
        cb ( new Error('Can not find raw texture for ' + fspath + ", uuid not found: " + rawTextureUuid) );
        return;
    }

    Async.waterfall([
        function ( next ) {
            Lwip.open( rawTextureFile, next );
        },

        function ( image, next ) {
            if ( !image ) {
                next(new Error('Can not load image for ' + rawTextureFile));
            }

            var extname = Path.extname(fspath);
            if ( extname.length > 0 ) { extname = extname.substr(1); }

            var rawWidth = image.width();
            var rawHeight = image.height();

            var sprite = new Fire.Sprite();
            sprite.name = Path.basenameNoExt(fspath);
            sprite.rawWidth = rawWidth;
            sprite.rawHeight = rawHeight;
            sprite._setRawFiles([
                extname
            ]);

            sprite.texture = Editor.serialize.asAsset(rawTextureUuid);

            if ( self.trimType === Editor.TrimType.Auto ) {
                var rect = _getTrimRect ( image, rawWidth, rawHeight, self.trimThreshold );
                sprite.trimX = rect[0];
                sprite.trimY = rect[1];
                sprite.width = rect[2];
                sprite.height = rect[3];
            }
            else {
                sprite.trimX = Math.clamp(sprite.trimX, 0, sprite.rawWidth);
                sprite.trimY = Math.clamp(sprite.trimY, 0, sprite.rawHeight);
                sprite.width = Math.clamp(sprite.width, 0, sprite.rawWidth-sprite.trimX);
                sprite.height = Math.clamp(sprite.height, 0, sprite.rawHeight-sprite.trimY);
            }

            // if the target texture is the raw-texture, we need to calculate the trimX, trimY
            if ( sprite.texture._uuid === rawTextureUuid ) {
                sprite.x = sprite.trimX;
                sprite.y = sprite.trimY;
            }

            // TODO: this.atlasName

            assetdb.copyToLibrary( self.uuid, extname, fspath );
            assetdb.saveToLibrary( self.uuid, sprite );

            next ( null, sprite );
        }
    ], function ( err ) {
        if (cb) cb (err);
    });
};

SpriteMeta.prototype.export = null;

module.exports = SpriteMeta;

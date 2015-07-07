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


var $super = Editor.metas.asset;
function SpriteMeta () {
    $super.call(this);

    this.rawTextureUuid = '';
    this.trimType = 'auto'; // auto, custom
    this.trimThreshold = 1;
    this.spriteType = 'normal'; // normal, sliced

    this.trimX = 0;
    this.trimY = 0;
    this.width = 0;
    this.height = 0;

    this.borderTop = 0;
    this.borderBottom = 0;
    this.borderLeft = 0;
    this.borderRight = 0;
}
Editor.JS.extend(SpriteMeta,$super);


SpriteMeta.prototype.serialize = function () {
    $super.prototype.serialize.call(this);
    return this;
};

SpriteMeta.prototype.deserialize = function ( jsonObj ) {
    $super.prototype.deserialize.call(this, jsonObj);

    this.rawTextureUuid = jsonObj.rawTextureUuid;
    this.trimType = jsonObj.trimType;
    this.trimThreshold = jsonObj.trimThreshold;
    this.spriteType = jsonObj.spriteType;

    this.trimX = jsonObj.trimX;
    this.trimY = jsonObj.trimY;
    this.width = jsonObj.width;
    this.height = jsonObj.height;

    this.borderTop = jsonObj.borderTop;
    this.borderBottom = jsonObj.borderBottom;
    this.borderLeft = jsonObj.borderLeft;
    this.borderRight = jsonObj.borderRight;
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

            var basename = Path.basename(fspath);

            var rawWidth = image.width();
            var rawHeight = image.height();

            var sprite = new Fire.Sprite();
            sprite.name = Path.basenameNoExt(fspath);
            sprite.rawWidth = rawWidth;
            sprite.rawHeight = rawHeight;
            sprite.width = self.width;
            sprite.height = self.height;
            sprite._setRawFiles([
                basename
            ]);

            sprite.texture = Editor.serialize.asAsset(rawTextureUuid);

            if ( self.trimType === 'auto' ) {
                var rect = _getTrimRect ( image, rawWidth, rawHeight, self.trimThreshold );
                sprite.trimX = rect[0];
                sprite.trimY = rect[1];
                sprite.width = rect[2];
                sprite.height = rect[3];
            }
            else {
                sprite.trimX = Math.clamp(self.trimX, 0, rawWidth);
                sprite.trimY = Math.clamp(self.trimY, 0, rawHeight);
                sprite.width = Math.clamp(self.width, 0, rawWidth - self.trimX);
                sprite.height = Math.clamp(self.height, 0, rawHeight - sprite.trimY);
            }

            if ( self.spriteType === 'sliced') {
                sprite.borderTop = self.borderTop;
                sprite.borderBottom = self.borderBottom;
                sprite.borderLeft = self.borderLeft;
                sprite.borderRight = self.borderRight;
            }

            sprite.x = sprite.trimX;
            sprite.y = sprite.trimY;

            // TODO: this.atlasName

            assetdb.copyRawfileToLibrary( self.uuid, fspath );
            assetdb.saveAssetToLibrary( self.uuid, sprite );

            next ( null, sprite );
        }
    ], function ( err ) {
        if (cb) cb (err);
    });
};

SpriteMeta.prototype.export = null;

module.exports = SpriteMeta;

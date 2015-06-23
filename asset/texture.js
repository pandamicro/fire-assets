module.exports = (function () {

    var canvasCtxToGetPixel = null;

    /**
     * @class WrapMode
     * @static
     * @namespace Texture
     */
    var WrapMode = Fire.defineEnum({
        /**
         * @property Repeat
         * @type number
         */
        Repeat: -1,
        /**
         * @property Clamp
         * @type number
         */
        Clamp: -1
    });

    /**
     * @class FilterMode
     * @static
     * @namespace Texture
     */
    var FilterMode = Fire.defineEnum({
        /**
         * @property Point
         * @type number
         */
        Point: -1,
        /**
         * @property Bilinear
         * @type number
         */
        Bilinear: -1,
        /**
         * @property Trilinear
         * @type number
         */
        Trilinear: -1
    });

    /**
     * Class for texture handling.
     * Use this to create textures on the fly or to modify existing texture assets.
     *
     * @class Texture
     * @extends Asset
     * @constructor
     * @param {Image} [img] - the html image element to render
     */
    Texture = Fire.Class({

        name: 'Fire.Texture',

        extends: Fire.Asset,

        constructor: function () {
            var img = arguments[0];
            if (img) {
                this.width = img.width;
                this.height = img.height;
            }
        },

        properties: {
            /**
             * @property width
             * @type number
             */
            width: {
                default: 0,
                type: Fire.Integer,
                readonly: true
            },
            /**
             * @property height
             * @type number
             */
            height: {
                default: 0,
                type: Fire.Integer,
                readonly: true
            },
            /**
             * @property wrapMode
             * @type Texture.WrapMode
             * @default Texture.WrapMode.Clamp
             */
            wrapMode: {
                default: WrapMode.Clamp,
                type: WrapMode,
                readonly: true
            },

            /**
             * @property filterMode
             * @type Texture.FilterMode
             * @default Texture.FilterMode.Bilinear
             */
            filterMode: {
                default: FilterMode.Bilinear,
                type: FilterMode,
                readonly: true
            }
        },
    });

    Texture.WrapMode = WrapMode;
    Texture.FilterMode = FilterMode;

    Fire.Texture = Texture;

    return Texture;
})();

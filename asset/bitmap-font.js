module.exports = (function () {

    /**
     * Class for BitmapFont handling.
     *
     * @class BitmapFont
     * @extends Asset
     * @constructor
     */
    var BitmapFont = Fire.Class({

        name: 'Fire.BitmapFont',

        extends: Fire.Asset,

        constructor: function () {
        },

        properties: {
            texture: {
                default: null,
                type: Fire.Texture,
                visible: false,
            }
        },
    });

    Fire.BitmapFont = BitmapFont;

    return BitmapFont;
})();

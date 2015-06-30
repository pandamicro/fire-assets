module.exports = (function () {

    var TTFFont = Fire.Class({

        name: 'Fire.TTFFont',

        extends: Fire.Asset,

        constructor: function () {
        },

        properties: {
            fontName: {
                default: ''
            }
        },
    });

    Fire.TTFFont = TTFFont;

    return TTFFont;
})();

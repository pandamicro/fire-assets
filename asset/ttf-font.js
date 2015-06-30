module.exports = (function () {

    var TTFFont = Fire.Class({

        name: 'Fire.TTFFont',

        extends: Fire.Asset,

        constructor: function () {
        },

        properties: {
            fontFamily: {
                default: ''
            }
        },
    });

    Fire.TTFFont = TTFFont;

    return TTFFont;
})();

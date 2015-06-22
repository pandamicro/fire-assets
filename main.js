module.exports = {
    load: function () {
        require('./init');

        Editor.assetdb.register( '.png', false, Editor.metas.texture );
        Editor.assetdb.register( '.jpg', false, Editor.metas.texture );
    },

    unload: function () {
        Editor.assetdb.unregister( Editor.metas.texture );

        [
            [ 'texture', 'Texture' ],
        ].forEach( function ( item ) {
            var name = item[0];
            var fireName = item[1];

            delete Fire[fireName];
            delete Editor.metas[name];
        });
    },
};

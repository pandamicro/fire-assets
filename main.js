var Path = require('fire-path');

function registerMenu () {
    Editor.menus['create-asset'] = [
        {
            menuPath: 'Script',
            filename: 'NewScript.js',
            meta: Editor.metas.javascript
        },
        {
            type: 'separator'
        },
        {
            menuPath: 'Scene',
            filename: 'New Scene.fire',
            meta: Editor.metas.scene
        },
    ];
}

module.exports = {
    load: function () {
        require('./init');

        Editor.assetdb.register( '.png', false, Editor.metas.texture );
        Editor.assetdb.register( '.jpg', false, Editor.metas.texture );
        Editor.assetdb.register( '.sprite', false, Editor.metas.sprite );
        Editor.assetdb.register( '.fnt', false, Editor.metas['bitmap-font'] );
        Editor.assetdb.register( '.ttf', false, Editor.metas['ttf-font'] );
        Editor.assetdb.register( '.js', false, Editor.metas.javascript );
        Editor.assetdb.register( '.fire', false, Editor.metas.scene );

        registerMenu();
    },

    unload: function () {
        Editor.assetdb.unregister( Editor.metas.texture );

        var cache = require.cache;
        delete cache[Path.join( __dirname,'init.js')];

        [
            [ 'texture', 'Texture' ],
            [ 'sprite', 'Sprite' ],
            [ 'bitmap-font', 'BitmapFont' ],
            [ 'ttf-font', 'TTFFont' ],
            [ 'javascript', 'JavaScript' ],
            [ 'scene', 'Scene' ],
        ].forEach( function ( item ) {
            var name = item[0];
            var fireName = item[1];

            delete cache[Path.join(__dirname, './asset/' + name + '.js')];
            delete cache[Path.join(__dirname, './meta/' + name + '.js')];
            delete Fire[fireName];
            delete Editor.metas[name];
        });
    },
};

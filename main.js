var Path = require('fire-path');

module.exports = {
    load: function () {
        require('./init');

        Editor.assetdb.register( '.png', false, Editor.metas.texture );
        Editor.assetdb.register( '.jpg', false, Editor.metas.texture );
        Editor.assetdb.register( '.sprite', false, Editor.metas.sprite );
        Editor.assetdb.register( '.fnt', false, Editor.metas['bitmap-font'] );
        Editor.assetdb.register( '.ttf', false, Editor.metas['ttf-font'] );
        Editor.assetdb.register( '.js', false, Editor.metas.javascript );
        Editor.assetdb.register( '.coffee', false, Editor.metas.coffeescript );
        Editor.assetdb.register( '.fire', false, Editor.metas.scene );

        Editor.menus['create-asset'] = [
            {
                label: 'Script',
                message: 'assets:new-asset',
                params: [{
                    name: 'NewScript.js',
                    url: Editor.runtimeUrl + '/static/template/new-script.js',
                }],
            },
            {
                type: 'separator'
            },
            {
                label: 'Scene',
                message: 'assets:new-asset',
                params: [{
                    name: 'New Scene.fire',
                    url: Editor.runtimeUrl + '/static/template/new-scene.fire',
                }]
            },
        ];
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
            [ 'coffeescript', 'CoffeeScript' ],
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

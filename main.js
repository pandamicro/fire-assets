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
        Editor.assetdb.register( '.prefab', false, Editor.metas.prefab );
        Editor.assetdb.register( '.mp3', false, Editor.metas['audio-clip'] );
        Editor.assetdb.register( '.wav', false, Editor.metas['audio-clip'] );
        Editor.assetdb.register( '.anim', false, Editor.metas['animation-clip'] );

        Editor.menus['create-asset'] = [
            {
                label: 'JavaScript',
                message: 'assets:new-asset',
                params: [{
                    name: 'NewScript.js',
                    url: Editor.runtimeUrl + '/static/template/new-script.js',
                }],
            },
            {
                label: 'CoffeeScript',
                message: 'assets:new-asset',
                params: [{
                    name: 'NewScript.coffee',
                    url: Editor.runtimeUrl + '/static/template/new-script.coffee',
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
            {
                type: 'separator'
            },
            {
                label: 'Animation Clip',
                message: 'assets:new-asset',
                params: [{
                    name: 'New AnimationClip.anim',
                    url: 'app://builtin/fire-assets/static/template/new-animation-clip.anim',
                }]
            },
        ];
    },

    unload: function () {
        Editor.assetdb.unregister( Editor.metas.texture );

        var cache = require.cache;
        delete cache[Path.join( __dirname, 'init.js')];

        [
            'texture',
            'sprite',
            'bitmap-font',
            'ttf-font',
            'javascript',
            'coffeescript',
            'scene',
            'prefab',
            'audio-clip',
            'animation-clip',

        ].forEach( function ( name ) {
            delete cache[Path.join(__dirname, './meta/' + name + '.js')];
            delete Editor.assets[name];
            delete Editor.metas[name];
        });
    },
};

// register asset, folder and mount
// =======================================

if ( !Editor.isRuntime ) {
    Editor.metas.mount = {
        'asset-type': 'mount',
        'asset-icon': 'packages://fire-assets/static/icon/mount.png',
    };

    // NOTE: AssetMeta defines 'asset-type' in asset-db
    // Editor.metas.asset['asset-type'] = 'asset';
    Editor.metas.asset['asset-icon'] = 'packages://fire-assets/static/icon/asset.png';

    // NOTE: FolderMeta defines 'asset-type' in asset-db
    // Editor.metas.folder['asset-type'] = 'folder';
    Editor.metas.folder['asset-icon'] = 'packages://fire-assets/static/icon/folder.png';

    if ( Editor.isPageLevel ) {
        Editor.inspectors.asset = 'packages://fire-assets/inspector/asset.html';
        Editor.inspectors.folder = 'packages://fire-assets/inspector/folder.html';
        Editor.inspectors.mount = 'packages://fire-assets/inspector/mount.html';
    }
}

// register builtin asset
// =======================================

var Assets = {
    'texture': cc.TextureAsset,
    'sprite': cc.SpriteAsset,
    'bitmap-font': cc.BitmapFont,
    'ttf-font': cc.TTFFont,
    'javascript': cc.JavaScript,
    'coffeescript': cc.CoffeeScript,
    'scene': cc.SceneAsset,
    'audio-clip': cc.AudioClip,
    'prefab': cc._Prefab,
    'animation-clip': cc.AnimationClip,
    'particle': cc.ParticleAsset,
    'sprite-animation': cc.SpriteAnimationAsset,
    'sprite-atlas': cc.SpriteAtlas,
    'tiled-map': cc.TiledMapAsset,
};

for ( var name in Assets ) {
    if ( (Editor.isCoreLevel || Editor.isRuntime) && Editor.assets ) {
        Editor.assets[name] = Assets[name];
    }

    if ( !Editor.isRuntime ) {
        // meta
        Editor.metas[name] = require('./meta/' + name);
        Editor.metas[name]['asset-type'] = name;
        Editor.metas[name]['asset-icon'] = 'packages://fire-assets/static/icon/' + name + '.png';

        // inspector
        if ( Editor.isPageLevel ) {
            Editor.inspectors[name] = 'packages://fire-assets/inspector/' + name + '.html';
        }
    }
}

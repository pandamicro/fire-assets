// register asset, folder and mount
// =======================================

if ( !Editor.isRuntime ) {
    Editor.metas.mount = {
        'meta-type': 'mount',
        'meta-icon': 'packages://canvas-assets/static/mount.png',
    };

    // NOTE: AssetMeta defines 'meta-type' in asset-db
    // Editor.metas.asset['meta-type'] = 'asset';
    Editor.metas.asset['meta-icon'] = 'packages://canvas-assets/static/asset.png';

    // NOTE: FolderMeta defines 'meta-type' in asset-db
    // Editor.metas.folder['meta-type'] = 'folder';
    Editor.metas.folder['meta-icon'] = 'packages://canvas-assets/static/folder.png';

    if ( Editor.isPageLevel ) {
        Editor.inspectors.asset = 'packages://canvas-assets/inspector/asset.html';
        Editor.inspectors.folder = 'packages://canvas-assets/inspector/folder.html';
        Editor.inspectors.mount = 'packages://canvas-assets/inspector/mount.html';
    }
}

// register builtin asset
// =======================================

[
    'texture',
    'sprite',
    'bitmap-font',
    'ttf-font',
    'javascript',
    'scene'
].forEach( function ( name ) {
    if ( !Editor.isRuntime ) {
        // meta
        Editor.metas[name] = require('./meta/' + name);
        Editor.metas[name]['meta-type'] = name;
        Editor.metas[name]['meta-icon'] = 'packages://canvas-assets/static/' + name + '.png';

        // inspector
        if ( Editor.isPageLevel ) {
            Editor.inspectors[name] = 'packages://canvas-assets/inspector/' + name + '.html';
        }
    }

    if ( Editor.isCoreLevel || Editor.isRuntime ) {
        // asset
        require('./asset/' + name);
    }
});

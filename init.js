// register asset, folder and mount
// =======================================

if ( !Editor.isRuntime ) {
    Editor.metas.mount = {
        'asset-type': 'mount',
        'meta-icon': 'packages://canvas-assets/static/icon/mount.png',
    };

    // NOTE: AssetMeta defines 'asset-type' in asset-db
    // Editor.metas.asset['asset-type'] = 'asset';
    Editor.metas.asset['meta-icon'] = 'packages://canvas-assets/static/icon/asset.png';

    // NOTE: FolderMeta defines 'asset-type' in asset-db
    // Editor.metas.folder['asset-type'] = 'folder';
    Editor.metas.folder['meta-icon'] = 'packages://canvas-assets/static/icon/folder.png';

    if ( Editor.isPageLevel ) {
        Editor.inspectors.asset = 'packages://canvas-assets/inspector/asset.html';
        Editor.inspectors.folder = 'packages://canvas-assets/inspector/folder.html';
        Editor.inspectors.mount = 'packages://canvas-assets/inspector/mount.html';
    }
}

// register builtin asset
// =======================================

require('./asset').forEach( function ( name ) {
    if ( !Editor.isRuntime ) {
        // meta
        Editor.metas[name] = require('./meta/' + name);
        Editor.metas[name]['asset-type'] = name;
        Editor.metas[name]['meta-icon'] = 'packages://canvas-assets/static/icon/' + name + '.png';

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

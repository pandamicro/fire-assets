[
    'texture',
    'sprite',
    'bitmap-font',
    'ttf-font'
].forEach( function ( name ) {
    Editor.assets[name] = require('./asset/' + name);
    Editor.metas[name] = require('./meta/' + name);
    Editor.metas[name]['meta-type'] = name;
    Editor.metas[name]['meta-icon'] = 'packages://canvas-assets/static/' + name + '.png';

    if ( Editor.isPageLevel ) {
        Editor.inspectors[name] = 'packages://canvas-assets/inspector/' + name + '.html';
    }
});
Editor.inspectors.folder = 'packages://canvas-assets/inspector/folder.html';
Editor.inspectors.mount = 'packages://canvas-assets/inspector/mount.html';

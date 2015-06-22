[
    [ 'texture', 'Texture' ],
].forEach( function ( item ) {
    var name = item[0];
    var fireName = item[1];

    Fire[fireName] = require('./asset/' + name);
    Editor.metas[name] = require('./meta/' + name);
    Editor.metas[name]['meta-type'] = name;
    Editor.metas[name]['meta-icon'] = 'packages://canvas-assets/static/' + name + '.png';

    if ( Editor.isPageLevel ) {
        Editor.inspector[name] = 'packages://canvas-assets/inspector/' + name + '.html';
    }
});

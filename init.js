[
    [ 'texture', 'Texture' ],
].forEach( function ( item ) {
    var name = item[0];
    var fireName = item[1];

    Fire[fireName] = require('./asset/' + name);
    Editor.metas[name] = require('./meta/' + name);
    Editor.metas[name].prototype['meta-type'] = name;
});

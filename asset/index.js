if (FIRE_EDITOR) {
    module.exports = [
        'texture',
        'sprite',
        'bitmap-font',
        'ttf-font',
        'javascript',
        'coffeescript',
        'scene',
        'audio-clip',
        'prefab',
        'animation-clip',
    ];
}

if (!FIRE_EDITOR || Editor.isCoreLevel || Editor.isRuntime) {
    // IMPORTANT - hard code for browserify
    require('./texture');
    require('./sprite');
    require('./bitmap-font');
    require('./ttf-font');
    require('./javascript');
    require('./coffeescript');
    require('./scene');
    require('./audio-clip');
    require('./prefab');
    require('./animation-clip');

    if ( FIRE_EDITOR && Editor.assets ) {
        module.exports.forEach(function (typeInEditor) {
            Editor.assets[typeInEditor] = require('./' + typeInEditor);
        });
    }
}

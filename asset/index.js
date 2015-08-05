if (FIRE_EDITOR) {
    module.exports = [
        'texture',
        'sprite',
        'bitmap-font',
        'ttf-font',
        'javascript',
        'coffeescript',
        'scene',
        'audio-clip'
    ];
}

if (!FIRE_EDITOR || Editor.isCoreLevel || Editor.isRuntime) {
    // hard code for browserify
    require('./texture');
    require('./sprite');
    require('./bitmap-font');
    require('./ttf-font');
    require('./javascript');
    require('./coffeescript');
    require('./scene');
    require('./audio-clip');

    if ( Editor.assets ) {
        module.exports.forEach(function (typeInEditor) {
            Editor.assets[typeInEditor] = require('./' + typeInEditor);
        });
    }
}

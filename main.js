module.exports = {
    load: function () {
        Fire.Texture = require('./asset/texture');
        Editor.Meta.TextureMeta = require('./meta/texture-meta');

        Editor.assetdb.register( '.png', false, Editor.Meta.TextureMeta );
        Editor.assetdb.register( '.jpg', false, Editor.Meta.TextureMeta );
    },

    unload: function () {
    },
};

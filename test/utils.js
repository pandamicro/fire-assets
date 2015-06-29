var Path = require('fire-path');
var Fs = require('fire-fs');
var Del = require('del');

module.exports = {
    init: function ( path, done ) {
        // simple init
        if ( !Editor.assets ) Editor.assets = {};
        if ( !Editor.metas ) Editor.metas = {};
        if ( !Editor.inspectors ) Editor.inspectors = {};

        // init engine-framework
        Editor.require('app://engine-framework');
        Editor.assets.asset = Fire.Asset; // set the default asset

        // init asset-db
        var AssetDB = Editor.require('app://asset-db');
        Editor.assetdb = new AssetDB({
            cwd: Path.join( __dirname, 'playground' ),
            library: 'library',
        });

        // init canvas-assets
        require('../init');

        Editor.assetdb.register( '.png', false, Editor.metas.texture );
        Editor.assetdb.register( '.jpg', false, Editor.metas.texture );
        Editor.assetdb.register( '.sprite', false, Editor.metas.sprite );
        Editor.assetdb.register( '.fnt', false, Editor.metas['bitmap-font'] );

        // start mounting
        var src = Path.join( __dirname, 'fixtures', path);
        var dest = Path.join( __dirname, 'playground/assets/' );

        Fs.copySync( src, dest );

        Editor.assetdb.mount( dest, 'assets', function ( err ) {
            Editor.assetdb.init( done );
        });
    },

    deinit: function ( done ) {
        Del( Path.join( __dirname, 'playground' ), { force: true }, done );
    }
};

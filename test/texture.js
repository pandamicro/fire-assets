var Fs = require('fire-fs');
var Path = require('fire-path');

var AssetDBUtils = require('./utils');

//
describe('texture', function () {
    var dest;

    before(function ( done ) {
        dest = AssetDBUtils.init( done );
    });

    after( function ( done ) {
        AssetDBUtils.deinit( done );
    });

    it('should import to library', function ( done ) {
        var uuid;
        var assets = [
            'assets://texture-assets/a-png-texture-with-meta.png',
            'assets://texture-assets/a-png-texture.png'
        ];

        assets.forEach( function ( path ) {
            var uuid = Editor.assetdb.urlToUuid(path);
            expect( Fs.existsSync( Editor.assetdb._uuid2importPath(uuid) ) )
                .to.be.equal(true);
        });

        done();
    });
});

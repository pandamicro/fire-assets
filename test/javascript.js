var Fs = require('fire-fs');
var Path = require('fire-path');
var Url = require('fire-url');

var AssetDBUtils = require('./utils');

//
describe('javascript', function () {
    before(function ( done ) {
        AssetDBUtils.init( 'javascript-assets/assets', done );
    });

    after( AssetDBUtils.deinit );

    it('should import to library', function ( done ) {
        var assets = [
            'assets://rotate.js',
        ];

        assets.forEach( function ( url ) {
            var uuid = Editor.assetdb.urlToUuid(url);
            var extname = Url.extname(url);

            expect( Fs.existsSync( Editor.assetdb._uuid2importPath(uuid) ) )
                .to.be.true;

            expect( Fs.existsSync( Editor.assetdb._uuid2importPath(uuid) + extname ) )
                .to.be.true;

            var buf1 = Fs.readFileSync( Editor.assetdb._fspath(url) );
            var buf2 = Fs.readFileSync( Editor.assetdb._uuid2importPath(uuid) + extname );

            assert(buf1.equals(buf2));
        });

        done();
    });
});

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
            var basename = Path.basename(url);

            var jsonPath = Editor.assetdb._uuid2importPath(uuid) + '.json';
            var filePath = Path.join(Editor.assetdb._uuid2importPath(uuid), basename);

            expect( Fs.existsSync( jsonPath ) )
                .to.be.equal(true);

            expect( Fs.existsSync( filePath ) )
                .to.be.equal(true);

            var buf1 = Fs.readFileSync( Editor.assetdb._fspath(url) );
            var buf2 = Fs.readFileSync( filePath );

            expect(buf1).to.be.deep.equal(buf2);
        });

        done();
    });
});

var Fs = require('fire-fs');
var Path = require('fire-path');

var AssetDBUtils = require('./utils');

var Ipc = require('ipc');

describe('ttf-font core level', function () {

    var assets = [
        'assets://Abberancy.ttf'
    ];

    before(function ( done ) {
        AssetDBUtils.init( 'ttf-assets/assets', done );
    });

    after( function ( done ) {
        AssetDBUtils.deinit( done );
    });

    it('should import to library', function ( done ) {

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


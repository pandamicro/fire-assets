var Fs = require('fire-fs');
var Path = require('fire-path');
var Url = require('fire-url');

var AssetDBUtils = require('../utils');

//
describe('texture', function () {
    before(function ( done ) {
        AssetDBUtils.init( 'texture-assets/assets', done );
    });

    after( function ( done ) {
        AssetDBUtils.deinit( done );
    });

    it('should import to library', function ( done ) {
        var uuid;
        var assets = [
            'assets://button-with-meta.png',
            'assets://star.png',
            'assets://imgres.jpg',
        ];

        assets.forEach( function ( url ) {
            var uuid = Editor.assetdb.urlToUuid(url);
            var basename = Path.basename(url);

            var jsonPath = Editor.assetdb._uuidToImportPathNoExt( uuid ) + '.json';
            var filePath = Path.join(Path.dirname(jsonPath), uuid, basename);

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

    it('should remove thumbnail if remove texture asset', function (done) {
        var url = 'assets://button-with-meta.png';
        var uuid = Editor.assetdb.urlToUuid(url);

        var thumbnailPath = Path.join(Editor.assetdb._thumbnailPath, uuid.substring(0,2), uuid + '.png');

        Editor.assetdb.delete(url, function (err) {
            assert( !err );

            expect( Fs.existsSync(thumbnailPath) ).to.not.be.true;

            done();
        });
    });

});


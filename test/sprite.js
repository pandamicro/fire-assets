var Fs = require('fire-fs');
var Path = require('fire-path');
var Url = require('fire-url');

var AssetDBUtils = require('./utils');


//
describe('test sprite core level', function () {
    before(function ( done ) {
        AssetDBUtils.init( 'sprite-assets/assets', done );
    });

    after( function ( done ) {
        AssetDBUtils.deinit( done );
    });

    it('should import to library', function ( done ) {
        var uuid;
        var assets = [
            'assets://sprite-with-meta.sprite',
        ];

        assets.forEach( function ( url ) {
            var uuid = Editor.assetdb.urlToUuid(url);
            var extname = Url.extname(url);

            expect( Fs.existsSync( Editor.assetdb._uuid2importPath(uuid) ) )
                .to.be.equal(true);

            expect( Fs.existsSync( Editor.assetdb._uuid2importPath(uuid) + extname ) )
                .to.be.equal(true);

            var buf1 = Fs.readFileSync( Editor.assetdb._fspath(url) );
            var buf2 = Fs.readFileSync( Editor.assetdb._uuid2importPath(uuid) + extname );

            expect(buf1).to.be.deep.equal(buf2);
        });

        done();
    });
});

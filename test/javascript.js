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

            var jsonPath = Editor.assetdb._uuid2importPath(uuid);
            var filePath = Path.join(Path.dirname(Editor.assetdb._uuid2importPath(uuid)), uuid, basename);

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

describe('javascript.export', function () {
    before(function ( done ) {
        AssetDBUtils.init( 'javascript-assets/assets', done );
    });

    after( AssetDBUtils.deinit );

    it('should create a scene file from imput data', function (done) {

        var temp = Editor.assetdb._fspath('assets://rotate.js');
        var dest = Editor.assetdb._fspath('assets://rotate2.js');
        var data = Fs.readFileSync( temp );

        var meta = new Editor.metas.javascript();
        meta.export(dest, data, function () {
            expect( Fs.existsSync(dest) ).to.be.true;
            done();
        });
    });
});
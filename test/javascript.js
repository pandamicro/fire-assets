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
        });

        done();
    });
});

describe('javascript.export', function () {
    beforeEach(function ( done ) {
        AssetDBUtils.init( 'javascript-assets/assets', done );
    });

    afterEach( AssetDBUtils.deinit );

    it('should create a javascript file from input data', function (done) {

        var temp = Editor.assetdb._fspath('assets://rotate.js');
        var dest = Editor.assetdb._fspath('assets://rotate2.js');
        var data = Fs.readFileSync( temp );

        var meta = new Editor.metas.javascript();
        meta.export(dest, data, function () {
            expect( Fs.existsSync(dest) ).to.be.true;
            done();
        });
    });

    it('should do nothing if input data is null', function (done) {

        var temp = Editor.assetdb._fspath('assets://rotate.js');
        var dest = Editor.assetdb._fspath('assets://rotate2.js');
        var data = null;

        var meta = new Editor.metas.javascript();
        meta.export(dest, data, function () {
            expect( Fs.existsSync(dest) ).to.not.be.true;
            done();
        });
    });
});
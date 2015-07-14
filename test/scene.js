var Fs = require('fire-fs');
var Path = require('fire-path');
var Url = require('fire-url');

var AssetDBUtils = require('./utils');

//
describe('scene', function () {
    before(function ( done ) {
        AssetDBUtils.init( 'scene-assets/assets', done );
    });

    after( AssetDBUtils.deinit );

    it('should import to library', function ( done ) {
        var assets = [
            'assets://level.fire',
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

describe('scene.export', function () {
    beforeEach(function ( done ) {
        AssetDBUtils.init( 'scene-assets/assets', done );
    });

    afterEach( AssetDBUtils.deinit );

    it('should create a scene file from imput data', function (done) {

        var temp = Editor.assetdb._fspath('assets://level.fire');
        var dest = Editor.assetdb._fspath('assets://level2.fire');
        var data = Fs.readFileSync( temp );

        var meta = new Editor.metas.scene();
        meta.export(dest, data, function () {
            expect( Fs.existsSync(dest) ).to.be.true;
            done();
        });
    });

    it('should do nothing if input data is null', function (done) {

        var temp = Editor.assetdb._fspath('assets://level.fire');
        var dest = Editor.assetdb._fspath('assets://level2.fire');
        var data = null;

        var meta = new Editor.metas.scene();
        meta.export(dest, data, function () {
            expect( Fs.existsSync(dest) ).to.not.be.true;
            done();
        });
    });
});

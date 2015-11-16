var Fs = require('fire-fs');
var Path = require('fire-path');
var Url = require('fire-url');

var AssetDBUtils = require('../utils');


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
            'assets://simple-sprite.sprite',
        ];

        assets.forEach( function ( url ) {
            var uuid = Editor.assetdb.urlToUuid(url);
            var basename = Path.basename(url);

            var jsonPath = Editor.assetdb._uuidToImportPathNoExt( uuid ) + '.json';
            expect( Fs.existsSync( jsonPath ) ).to.eql(true);
        });

        done();
    });
});

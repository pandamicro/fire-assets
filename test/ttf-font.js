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
        var uuid;

        assets.forEach( function ( path ) {
            var uuid = Editor.assetdb.urlToUuid(path);
            expect( Fs.existsSync( Editor.assetdb._uuid2importPath(uuid) ) )
                .to.be.equal(true);
        });

        done();
    });

});


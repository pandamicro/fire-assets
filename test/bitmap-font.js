var Fs = require('fire-fs');
var Path = require('fire-path');

var AssetDBUtils = require('./utils');

var Ipc = require('ipc');


describe('bitmap-font core level', function () {

    var assets = [
        'assets://arial-unicode-26.fnt',
        'assets://arial-unicode-26.png'
    ];

    before(function ( done ) {
        AssetDBUtils.init( 'font-assets', done );
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

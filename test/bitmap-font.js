var Fs = require('fire-fs');
var Path = require('fire-path');

var AssetDBUtils = require('./utils');

var Ipc = require('ipc');


describe('bitmap-font core level', function () {
    var dest;

    var assets = [
        'assets://font-assets/arial-unicode-26.fnt',
        'assets://font-assets/arial-unicode-26.png'
    ];

    before(function ( done ) {
        dest = AssetDBUtils.init( done );
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


describe('bitmap-font page level', function () {
    var win;

    // close window afterward
    after(function ( done ) {
        win.close();
        win.nativeWin.on('closed', function () {
            win.dispose();
            done();
        });
    });

    //
    it('running on page-level', function( done ) {
        this.timeout(0);
        Ipc.on('runner:end', function () {
            done();
        });

        win = new Editor.Window('main', {
            'title': 'Test bitmap-font',
            'width': 400,
            'height': 400,
            'show': true,
            'resizable': false,
        });
        win.load('app://builtin/canvas-assets/test/bitmap-font.html');
    });
});


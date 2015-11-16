var Fs = require('fire-fs');
var Path = require('fire-path');

var AssetDBUtils = require('../utils');

var Ipc = require('ipc');

// describe('bitmap-font core level', function () {

//     after( function ( done ) {
//         AssetDBUtils.deinit( done );
//     });

//     it('should report error', function (done) {

//         // try {
//             AssetDBUtils.init( 'font-assets/assets-without-texture', function (err) {

//                 // assert(err)
//                 console.log(' err ' + err);
//                 done();
//             });
//         // }
//         // catch (err){
//         //     done();
//         // }
//     });

// });

describe('bitmap-font core level', function () {

    var assets = [
        'assets://arial-unicode-26.fnt',
        'assets://arial-unicode-26.png'
    ];

    before(function ( done ) {
        AssetDBUtils.init( 'font-assets/assets', done );
    });

    after( function ( done ) {
        // AssetDBUtils.deinit( done );
        done();
    });

    it('should import to library', function ( done ) {

        assets.forEach( function ( url ) {
            var uuid = Editor.assetdb.urlToUuid(url);

            var basename = Path.basename(url);

            var jsonPath = Editor.assetdb._uuidToImportPathNoExt(uuid) + '.json';
            var filePath = Path.join(Editor.assetdb._uuidToImportPathNoExt(uuid), basename);

            expect( Fs.existsSync( jsonPath ) )
                .to.be.true;

            expect( Fs.existsSync( filePath ) )
                .to.be.true;

            var buf1 = Fs.readFileSync( Editor.assetdb._fspath(url) );
            var buf2 = Fs.readFileSync( filePath );

            expect(buf1).to.be.deep.equal(buf2);
        });

        done();
    });

});


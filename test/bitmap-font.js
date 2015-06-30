var Fs = require('fire-fs');
var Path = require('fire-path');

var AssetDBUtils = require('./utils');

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
        AssetDBUtils.deinit( done );
    });

    it('should import to library', function ( done ) {

        assets.forEach( function ( path ) {
            var uuid = Editor.assetdb.urlToUuid(path);
            expect( Fs.existsSync( Editor.assetdb._uuid2importPath(uuid) ) )
                .to.be.equal(true);
        });

        done();
    });

});


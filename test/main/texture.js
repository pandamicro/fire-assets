'use strict';

// const Fs = require('fire-fs');
// const Path = require('fire-path');

Editor.require('app://editor/test-utils/init');
Editor.require('app://editor/share/register-fire-assets');
Editor.require('app://editor/core/init-fire-assets');

//
// describe('texture', function () {
//   Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/texture-assets/assets') );

//   it('should import to library', function ( done ) {
//     let assets = [
//       'db://assets/button-with-meta.png',
//       'db://assets/star.png',
//       'db://assets/imgres.jpg',
//     ];

//     assets.forEach( function ( url ) {
//       let uuid = Editor.assetdb.urlToUuid(url);
//       let basename = Path.basename(url);

//       let jsonPath = Editor.assetdb._uuidToImportPathNoExt( uuid ) + '.json';
//       let filePath = Path.join(Path.dirname(jsonPath), uuid, basename);

//       expect( Fs.existsSync( jsonPath ) ).to.be.eql(true);
//       expect( Fs.existsSync( filePath ) ).to.be.eql(true);

//       let buf1 = Fs.readFileSync( Editor.assetdb._fspath(url) );
//       let buf2 = Fs.readFileSync( filePath );

//       expect(buf1).to.be.deep.equal(buf2);
//     });

//     done();
//   });

// });


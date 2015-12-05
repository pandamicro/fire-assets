'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

Editor.require('app://editor/test-utils/init');

describe('bitmap-font core level', function () {
  Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/font-assets/assets') );

  // let assets = [
  //   'db://assets/arial-unicode-26.fnt',
  //   'db://assets/arial-unicode-26.png'
  // ];

  // TODO
  // it('should import to library', function ( done ) {

  //   assets.forEach( function ( url ) {
  //     var uuid = Editor.assetdb.urlToUuid(url);

  //     var basename = Path.basename(url);

  //     var jsonPath = Editor.assetdb._uuidToImportPathNoExt(uuid) + '.json';
  //     var filePath = Path.join(Editor.assetdb._uuidToImportPathNoExt(uuid), basename);

  //     expect( Fs.existsSync( jsonPath ) ).to.be.eql(true);
  //     expect( Fs.existsSync( filePath ) ).to.be.eql(true);

  //     var buf1 = Fs.readFileSync( Editor.assetdb._fspath(url) );
  //     var buf2 = Fs.readFileSync( filePath );

  //     expect(buf1).to.be.deep.equal(buf2);
  //   });

  //   done();
  // });

});


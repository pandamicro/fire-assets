'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

Editor.require('app://editor/test-utils/init');
Editor.require('app://editor/share/register-fire-assets');
Editor.require('app://editor/core/init-fire-assets');


describe('ttf-font core level', function () {
  Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/ttf-assets/assets') );

  var assets = [
    'assets://Abberancy.ttf'
  ];


  it('should import to library', function ( done ) {

    assets.forEach( function ( url ) {
      let uuid = Editor.assetdb.urlToUuid(url);
      let extname = Path.extname(url);

      let jsonPath = Editor.assetdb._uuidToImportPathNoExt( uuid ) + '.json';
      let filePath = Path.join( Path.dirname(jsonPath), uuid + extname );

      expect( Fs.existsSync( jsonPath ) ).to.eql(true);

      expect( Fs.existsSync( filePath ) ).to.eql(true);

      let buf1 = Fs.readFileSync( Editor.assetdb._fspath(url) );
      let buf2 = Fs.readFileSync( filePath );

      expect(buf1).to.be.deep.equal(buf2);
    });

    done();
  });

});


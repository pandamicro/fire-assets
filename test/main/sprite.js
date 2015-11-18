'use strict';

// const Fs = require('fire-fs');

Editor.require('app://editor/test-utils/init');
Editor.require('app://editor/share/register-fire-assets');
Editor.require('app://editor/core/init-fire-assets');

//
describe('test sprite core level', function () {
  Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/sprite-assets/assets') );

  // it('should import to library', function ( done ) {
  //   var uuid;
  //   var assets = [
  //     'assets://simple-sprite.sprite',
  //   ];

  //   assets.forEach( function ( url ) {
  //     var uuid = Editor.assetdb.urlToUuid(url);
  //     var basename = Path.basename(url);

  //     var jsonPath = Editor.assetdb._uuidToImportPathNoExt( uuid ) + '.json';
  //     expect( Fs.existsSync( jsonPath ) ).to.eql(true);
  //   });

  //   done();
  // });
});

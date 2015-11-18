'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

Editor.require('app://editor/test-utils/init');
Editor.require('app://editor/share/register-fire-assets');
Editor.require('app://editor/core/init-fire-assets');

describe('test texture packer atlas', function () {
  Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/texture-packer-assets/assets') );

  it('should be imported to library', function ( done ) {
    var uuid;
    var assets = [
      'assets://Untitled.plist/E0.png',
      'assets://Untitled.plist/E1.png',
      'assets://Untitled.plist/E2.png',
      'assets://Untitled.plist/E3.png',
      'assets://Untitled.plist/E4.png',
      'assets://Untitled.plist/E5.png',
      'assets://Untitled.plist/ship01.png',
      'assets://Untitled.plist/ship02.png',
      'assets://Untitled.plist/ship03.png',
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

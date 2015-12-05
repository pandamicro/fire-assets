'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

Editor.require('app://editor/test-utils/init');
Editor.require('app://editor/share/register-fire-assets');
Editor.require('app://editor/core/init-fire-assets');

//
describe('javascript', function () {
  Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/javascript-assets/assets') );

  it('should import to library', function ( done ) {
    let assets = [
      'db://assets/rotate.js',
    ];

    assets.forEach( function ( url ) {
      let uuid = Editor.assetdb.urlToUuid(url);
      // var basename = Path.basename(url);

      let jsPath = Editor.assetdb._uuidToImportPathNoExt( uuid ) + '.js';
      console.log(jsPath);
      expect( Fs.existsSync( jsPath ) ).to.eql(true);
    });

    done();
  });
});

describe('javascript.export', function () {
  Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/javascript-assets/assets') );

  it('should create a javascript file from input data', function (done) {

    var temp = Editor.assetdb._fspath('db://assets/rotate.js');
    var dest = Editor.assetdb._fspath('db://assets/rotate2.js');
    var data = Fs.readFileSync( temp );

    var meta = new Editor.metas.javascript( Editor.assetdb );
    meta.export(dest, data, function () {
      expect( Fs.existsSync(dest) ).to.be.true;
      done();
    });
  });

  it('should do nothing if input data is null', function (done) {

    var temp = Editor.assetdb._fspath('db://assets/rotate.js');
    var dest = Editor.assetdb._fspath('db://assets/rotate2.js');
    var data = null;

    var meta = new Editor.metas.javascript( Editor.assetdb );
    meta.export(dest, data, function () {
      expect( Fs.existsSync(dest) ).to.not.be.true;
      done();
    });
  });
});

'use strict';

const Fs = require('fire-fs');

Editor.require('app://editor/test-utils/init');
Editor.require('app://editor/share/register-fire-assets');
Editor.require('app://editor/core/init-fire-assets');

//
// describe('scene', function () {
//   Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/scene-assets/assets') );

//   it('should import to library', function ( done ) {
//     let assets = [
//       'assets://level.fire',
//     ];

//     assets.forEach( function ( url ) {
//       let uuid = Editor.assetdb.urlToUuid(url);
//       let jsonPath = Editor.assetdb._uuidToImportPathNoExt( uuid ) + '.json';

//       expect( Fs.existsSync( jsonPath ) ).to.be.equal(true);
//     });

//     done();
//   });
// });

describe('scene.export', function () {
  Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/scene-assets/assets') );

  it('should create a scene file from imput data', function (done) {

    let temp = Editor.assetdb._fspath('assets://level.fire');
    let dest = Editor.assetdb._fspath('assets://level2.fire');
    let data = Fs.readFileSync( temp );

    let meta = new Editor.metas.scene( Editor.assetdb );
    meta.export(dest, data, function () {
      expect( Fs.existsSync(dest) ).to.eql(true);
      done();
    });
  });

  it('should do nothing if input data is null', function (done) {

    // let temp = Editor.assetdb._fspath('assets://level.fire');
    let dest = Editor.assetdb._fspath('assets://level2.fire');
    let data = null;

    let meta = new Editor.metas.scene( Editor.assetdb );
    meta.export(dest, data, function () {
      expect( Fs.existsSync(dest) ).to.not.eql(true);
      done();
    });
  });
});

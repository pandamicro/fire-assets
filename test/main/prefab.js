'use strict';

const Fs = require('fire-fs');

Editor.require('app://editor/test-utils/init');
Editor.require('app://editor/share/register-fire-assets');
Editor.require('app://editor/core/init-fire-assets');

describe('prefab', function () {
  Helper.runAssetDB( Editor.url('packages://fire-assets/test/fixtures/prefab-assets/assets') );

  it('should import to library', function () {
    let assets = [
      'db://assets/bg.prefab',
    ];
    assets.forEach(function (url) {
      let uuid = Editor.assetdb.urlToUuid(url);
      let jsonPath = Editor.assetdb._uuidToImportPathNoExt(uuid) + '.json';
      expect(Fs.existsSync(jsonPath)).to.eql(true);
    });
  });
});

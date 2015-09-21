var Fs = require('fire-fs');
var Path = require('fire-path');
var Url = require('fire-url');

var AssetDBUtils = require('./utils');

describe('prefab', function () {

    before(function (done) {
        AssetDBUtils.init('prefab-assets/assets', done);
    });

    after(AssetDBUtils.deinit);

    it('should import to library', function () {
        var assets = [
            'assets://bg.prefab',
        ];
        assets.forEach(function (url) {
            var uuid = Editor.assetdb.urlToUuid(url);
            var jsonPath = Editor.assetdb._uuidToImportPathNoExt(uuid) + '.json';
            expect(Fs.existsSync(jsonPath)).to.be.true;
        });
    });
});

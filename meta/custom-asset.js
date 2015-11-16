'use strict';

var Fs = require('fire-fs');
var Path = require('fire-path');

class CustomAssetMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );
  }

  useRawfile () {
    return false;
  }

  dests () {
    var destBase = this._assetdb._uuidToImportPathNoExt(this.uuid);
    return [
      destBase + '.json',
    ];
  }

  import (fspath, cb) {
    var self = this;

    Fs.readFile(fspath, {encoding: 'utf-8'}, function (err, data) {
      if (data) {
        var json = JSON.parse(data);

        Editor.serialize.setName(json, Path.basenameNoExt(fspath));

        self._assetdb.saveAssetToLibrary(self.uuid, json);
      }
      if (cb) cb(err);
    });
  }
}

module.exports = CustomAssetMeta;

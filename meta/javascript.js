'use strict';

var Fs = require('fire-fs');

class JavaScriptMeta extends Editor.metas.asset { 
  constructor ( assetdb ) {
    super( assetdb );
  }

  useRawfile () {
    return false;
  }

  dests () {
    return [
        this._assetdb._uuidToImportPathNoExt( this.uuid ) + '.js',
    ];
  }

  import ( fspath, cb ) {
    var Async = require('async');
    var Babel = require('babel');

    var self = this;

    Async.waterfall([
      function ( next ) {
        try {
          var str = Fs.readFileSync( fspath, {encoding: 'utf-8'} );
          var result = Babel.transform(str, {
              ast: false,
              highlightCode: false
          });
          next ( null, result.code );
        } catch (err) {
          next ( err );
        }
      },

      function ( data, next ) {
        self._assetdb.saveAssetToLibrary( self.uuid, data, '.js' );

        next ( null );
      }
    ], cb);
  }

  export (path, data, cb) {
    if (data) {
      Fs.writeFile(path, data, cb);
    }
    else {
      if (cb) cb();
    }
  }
}

module.exports = JavaScriptMeta;

'use strict';

var Fs = require('fire-fs');

class CoffeeScriptMeta extends Editor.metas.asset { 
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
    var Coffee = require('coffee-script');

    var self = this;

    Async.waterfall([
      function ( next ) {
        var data;
        try {
          var str = Fs.readFileSync( fspath, {encoding: 'utf-8'} );
          data = Coffee.compile(str, {
              // bare: false,
              // header: false,
              // sourceMap: !!file.sourceMap,
              // sourceRoot: false,
              // literate: /\.(litcoffee|coffee\.md)$/.test(file.path),
              // filename: file.path,
              // sourceFiles: [file.relative],
              // generatedFile: replaceExtension(file.relative)
          });
          next ( null, data );
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

module.exports = CoffeeScriptMeta;
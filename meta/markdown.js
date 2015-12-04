'use strict';

class MarkdownMeta extends Editor.metas['raw-asset'] {
  constructor ( assetdb ) {
    super( assetdb );
  }

  static defaultType() { return 'markdown'; }
}

MarkdownMeta.prototype.export = null;

module.exports = MarkdownMeta;
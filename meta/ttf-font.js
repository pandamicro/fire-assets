'use strict';

class TTFFontMeta extends Editor.metas['raw-asset'] {
    constructor ( assetdb ) {
        super( assetdb );
    }
    static defaultType() { return 'ttf-font'; }
}
TTFFontMeta.prototype.export = null;

module.exports = TTFFontMeta;

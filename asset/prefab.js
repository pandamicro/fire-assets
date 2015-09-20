var Prefab = Fire.Class({
    name: 'Fire.Prefab',
    extends: Fire.Asset,

    properties: {
        data: null
    },

    createNode: function (cb) {
        if (FIRE_EDITOR) {
            var node = Fire.instantiate(this);
            cb(null, node);
        }
    },

    _instantiate: function () {
        var initNodes = Fire.Runtime.NodeWrapper._initNodes;
        var wrappers = [this.data];
        var wrapperToNode = new Fire._RedirectWrapperToNode();

        function doCreate () {
            // create remainder nodes
            initNodes(wrappers, null, wrapperToNode);
            // reassociate nodes
            wrapperToNode.apply();
            //
            //callback();
        }
        doCreate();

        var clone = this.data.w;

        // init
        if (Fire.engine.isPlaying) {
            clone.name += ' (Clone)';
        }

        // invoke onLoad, note that the new node have not added to any parent yet
        clone._onActivated();

        return clone.targetN;
    }
});

Fire._Prefab = module.exports = Prefab;

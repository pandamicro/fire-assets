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

        // create nodes
        initNodes(wrappers, null, wrapperToNode);
        // reassociate nodes
        wrapperToNode.apply();

        var clone = this.data.w;
        clone._onAfterInstantiate();

        var info = new Fire._PrefabInfo();
        info.prefab = this;
        clone._prefab = info;

        return clone.targetN;
    }
});

Fire._Prefab = module.exports = Prefab;

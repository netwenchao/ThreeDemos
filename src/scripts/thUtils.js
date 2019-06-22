var util = (function() {
    var scope = function() {
        var scene = null;
        var render = null;
        var camera = null;
        var options = null;
        var dftOpt = {
            fov: 45,
            near: 0.1,
            far: 1000,
            el: null,
            clearColor: 0xffffff,
            width: 100,
            height: 100,
            _applyParam: function(param) {
                var that = this;
                if (param == null || param == undefined) return;
                for (var p in param) {
                    if (param.hasOwnProperty(p)) {
                        that[p] = param[p];
                    }
                }
                return that;
            }
        };
        this.init = function(opts) {
            options = dftOpt._applyParam(opts);
            scene = new THREE.Scene();
            render = new THREE.WebGLRenderer();
            if (dftOpt.clearColor != "") {
                render.setClearColor(dftOpt.clearColor);
            }
            render.setSize(options.width, options.height);
            options.el.appendChild(render.domElement);
            camera = new THREE.PerspectiveCamera(options.fov, options.width / options.height, options.near, options.far);
        };
        this.render = function() {
            render.render(scene, camera);
        };
        this.add2Scene = function(obj) {
            if (obj != null && obj != undefined) {
                scene.add(obj);
                return true;
            }
            return false;
        };
        this.getRender = function() { return render; };
        this.camera = function() { return camera; };
        this.scene = function() { return scene; };
        this.onResize = function() {
            camera.aspect = options.width / options.height;
            camera.updateProjectionMatrix();
            render.setSize(options.width, options.height);
        };
        return this;
    };
    return scope.apply({}, []);
})();
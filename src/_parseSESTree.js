    var _parseSESTree = function(stra, strb, sesTree) {
        var M = stra.length;
        var N = strb.length;
        var ret = '';
        var x = M;
        var y = N;
        var i, l, tx, ty;
        while (sesTree) {
            tx = sesTree.x;
            ty = sesTree.y;
            for (i = y; i > ty; i--) {
                ret = 'a' + ret;
            }
            for (i = x; i > tx; i--) {
                ret = 'd' + ret;
            }
            for (i = tx, l = sesTree.sx; i > l; i--) {
                ret = 'c' + ret;
            }
            x = sesTree.sx;
            y = sesTree.sy;
            sesTree = sesTree.prev;
        }
        for (i = x; i > 0; i--) {
            ret = 'd' + ret;
        }
        for (i = y; i > 0; i--) {
            ret = 'a' + ret;
        }
        return ret;
    };

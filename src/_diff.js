    var _diff = function(stra, strb) {
        var M = stra.length;
        var N = strb.length;
        var D = N - M;
        var fp = [];
        var o = M + 1;
        var ses = [];
        for (var i = 0, l = M + N + 3; i < l; i++) {
            fp[i] = [ -1, -1 ];
            ses[i] = null;
        }
        var snake = function(k, y) {
            var x = y - k;
            var sesNode = {
                sx: x,
                sy: y
            };
            while (x < M && y < N && stra[x] === strb[y]) {
                x += 1;
                y += 1;
            }
            var prev;
            if (fp[o + k - 1][1] + 1 > fp[o + k + 1][1]) {
                prev = ses[o + k - 1];
            } else {
                prev = ses[o + k + 1];
            }
            if (sesNode.sx !== x) {
                sesNode.x = x;
                sesNode.y = y;
                sesNode.prev = prev;
                ses[o + k] = sesNode;
            } else {
                ses[o + k] = prev;
            }
            fp[o + k] = [ x, y ];
        };

        var k, p = -1;
        while (fp[o + D][1] !== N) {
            p += 1;
            for (k = -p; k < D; k++) {
                snake(k, Math.max(fp[o + k - 1][1] + 1, fp[o + k + 1][1]));
            }
            for (k = D + p; k > D; k--) {
                snake(k, Math.max(fp[o + k - 1][1] + 1, fp[o + k + 1][1]));
            }
            snake(D, Math.max(fp[o + D - 1][1] + 1, fp[o + D + 1][1]));
        }
        return ses[o + D];
    };

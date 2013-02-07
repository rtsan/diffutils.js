    var _applyPatch = function(element, hunks) {
        var ret = element.slice();
        var hunk, op;
        var c, len;
        for (var i = 0, l = hunks.length; i < l; i++) {
            hunk = hunks[i];
            c = hunk.addStart;
            for (var j = 0, ll = hunk.body.length; j < ll; j++) {
                op = hunk.body[j];
                len = op.value.length;
                switch (op.type) {
                    case 'd':
                        ret = ret.slice(0, c).concat(ret.slice(c + len));
                        break;
                    case 'a':
                        ret = ret.slice(0, c).concat(op.value.join('')).concat(ret.slice(c));
                        c += len;
                        break;
                    case 'c':
                        c += len;
                        break;
                }
            }
        }
        return ret;
    };

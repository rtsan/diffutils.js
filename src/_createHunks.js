    var _createHunks = function(stra, strb, ses) {
        var ret = [];
        var hunk;
        var a = ses.indexOf('a');
        var d = ses.indexOf('d');
        var s, ai = 0, di = 0;
        s = Math.max(Math.min(
            ((a === -1) ? Infinity : a),
            ((d === -1) ? Infinity : d)
        ) - 3, 0);
        // ses = ses.slice(s);
        var c;
        var dbuf, abuf, cbuf;
        while (a !== -1 || d !== -1) {
            a = (a === -1) ? Infinity : a;
            d = (d === -1) ? Infinity : d;
            c = Math.max(Math.min(a, d) - 3, 0);
            ai += c;
            di += c;
            s = c;
            c = 0;
            dbuf = []; abuf = []; cbuf = [];
            hunk = new Hunk(di, ai);
            while (c < 7 && s < ses.length) {
                switch (ses[s]) {
                case 'd':
                    c = 0;
                    if (cbuf.length) {
                        hunk.append('c', cbuf);
                        cbuf = [];
                    }
                    dbuf.push(stra[di]);
                    di++;
                    break;
                case 'a':
                    c = 0;
                    if (cbuf.length) {
                        hunk.append('c', cbuf);
                        cbuf = [];
                    }
                    abuf.push(strb[ai]);
                    ai++;
                    break;
                case 'c':
                    c++;
                    if (dbuf.length) {
                        hunk.append('d', dbuf);
                        dbuf = [];
                    } if (abuf.length) {
                        hunk.append('a', abuf);
                        abuf = [];
                    }
                    cbuf.push(strb[ai]);
                    di++;
                    ai++;
                    break;
                default:
                    throw new Error('tomare');
                }
                s++;
            }
            var back = -Math.max(c - 3, 0);
            s += back;
            di += back;
            ai += back;
            ses = ses.slice(s);
            if (cbuf.length + back > 0) {
                hunk.append('c', cbuf.slice(0, back || cbuf.length));
            }
            if (dbuf.length + back > 0) {
                hunk.append('d', dbuf.slice(0, back || dbuf.length));
            }
            if (abuf.length + back > 0) {
                hunk.append('a', abuf.slice(0, back || abuf.length));
            }
            cbuf = [];
            ret.push(hunk);
            a = ses.indexOf('a');
            d = ses.indexOf('d');
        }
        return ret;
    };

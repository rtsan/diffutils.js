    var Hunk = function(ds, as) {
        this.body = [];
        this.delStart = ds;
        this.addStart = as;
        this.delLength = 0;
        this.addLength = 0;
    };
    Hunk.createFromUnifiedInlineString = function(str) {
        var NORMAL = 0;
        var SEARCH_DEL = 1;
        var SEARCH_ADD = 2;
        var mode = NORMAL;
        var ret = [];
        var lines = str.split('\n').map(function(ln) { return ln + '\n'; });
        var line, m, hunk, c, c2;
        var cbuf = [], dbuf = [], abuf = [];
        for (var i = 0, l = lines.length; i < l; i++) {
            line = lines[i];
            m = line.match(/^@@ -(\d+),(\d+) \+(\d+),(\d+) @@\n$/);
            if (m) {
                if (cbuf.length) {
                    hunk.append('c', cbuf.slice(0, -1));
                    cbuf = [];
                }
                hunk = new Hunk(parseInt(m[1], 10) - 1, parseInt(m[3], 10) - 1);
                ret.push(hunk);
            } else {
                if (!hunk) { continue; }
                for (var j = 0, ll = line.length; j < ll; j++) {
                    c = line[j];
                    c2 = line[j + 1];
                    switch (mode) {
                        case NORMAL:
                            if (c === '{' && c2 === '+') {
                                if (cbuf.length) {
                                    hunk.append('c', cbuf);
                                    cbuf = [];
                                }
                                mode = SEARCH_ADD;
                                j++;
                            } else if (c === '[' && c2 === '-') {
                                if (cbuf.length) {
                                    hunk.append('c', cbuf);
                                    cbuf = [];
                                }
                                mode = SEARCH_DEL;
                                j++;
                            } else {
                                cbuf.push(c);
                            }
                            break;
                        case SEARCH_DEL:
                            if (c === '-' && c2 === ']') {
                                hunk.append('d', dbuf);
                                dbuf = [];
                                mode = NORMAL;
                                j++;
                            } else {
                                dbuf.push(c);
                            }
                            break;
                        case SEARCH_ADD:
                            if (c === '+' && c2 === '}') {
                                hunk.append('a', abuf);
                                abuf = [];
                                mode = NORMAL;
                                j++;
                            } else {
                                abuf.push(c);
                            }
                            break;
                    }
                }
            }
        }
        if (cbuf.length) {
            hunk.append('c', cbuf.slice(0, -1));
            cbuf = [];
        }
        return ret;
    };
    Hunk.prototype.getHeader = function(line) {
        return '@@ -' + (this.delStart + 1) + ',' + this.delLength + ' +' + (this.addStart + 1) + ',' + this.addLength + ' @@';
    };
    Hunk.prototype.toUnifiedString = function() {
        return this.getHeader(true) + '\n' +
            this.body.map(function(elem) {
                var c;
                switch (elem.type) {
                    case 'd': c = '-'; break;
                    case 'a': c = '+'; break;
                    case 'c': c = ' '; break;
                }
                return elem.value.map(function(v) {
                    return c + v;
                }).join('\n');
            }).join('\n');
    };
    Hunk.prototype.toUnifiedInlineString = function() {
        return this.getHeader() + '\n' +
        this.body.map(function(elem) {
            var lb, rb;
            switch (elem.type) {
                case 'd': lb = '[-'; rb = '-]'; break;
                case 'a': lb = '{+'; rb = '+}'; break;
                case 'c': lb = rb = ''; break;
            }
            return lb + elem.value.join('') + rb;
        }).join('');
    };
    Hunk.prototype.append = function(type, value) {
        this.body.push({
            type: type,
            value: value
        });
        switch (type) {
            case 'd':
                this.delLength += value.length;
                break;
            case 'a':
                this.addLength += value.length;
                break;
            case 'c':
                this.delLength += value.length;
                this.addLength += value.length;
                break;
        }
    };
    Hunk.prototype.revert = function() {
        var i, l, elem, elem2, tmp;
        for (i = 0, l = this.body.length; i < l; i++) {
            elem = this.body[i];
            if (elem.type === 'd') {
                elem.type = 'a';
            } else if (elem.type === 'a') {
                elem.type = 'd';
            }
        }
        for (i = 0, l = this.body.length - 1; i < l; i++) {
            elem = this.body[i];
            elem2 = this.body[i + 1];
            if (elem.type === 'a' && elem2.type === 'd') {
                this.body[i] = elem2;
                this.body[i + 1] = elem;
            }
        }
        tmp = this.delLength;
        this.delLength = this.addLength;
        this.addLength = tmp;
        tmp = this.delStart;
        this.delStart = this.addStart;
        this.addStart = tmp;
    };

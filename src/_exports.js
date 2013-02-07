    var diffHunks = function(stra, strb) {
        var sesTree, ses, hunks;
        if (stra.length > strb.length) {
            sesTree = _diff(strb, stra);
            ses = _parseSESTree(strb, stra, sesTree);
            hunks = _createHunks(strb, stra, ses);
            hunks.forEach(function(hunk) { hunk.revert(); });
        } else {
            sesTree = _diff(stra, strb);
            ses = _parseSESTree(stra, strb, sesTree);
            hunks = _createHunks(stra, strb, ses);
        }
        hunks.lcs = ses;
        return hunks;
    };

    var diff = function(stra, strb) {
        return diffHunks(stra, strb).map(function(hunk) {
            return hunk.toUnifiedInlineString();
        }).join('\n');
    };

    var patchHunks = function(string, hunks) {
        return _applyPatch(string, hunks);
    };

    var patch = function(string, patch) {
        return _applyPatch(string, Hunk.createFromUnifiedInlineString(patch));
    };

    global.diffutils = {
        Hunk: Hunk,
        diffHunks: diffHunks,
        diff: diff,
        patchHunks: patchHunks,
        patch: patch
    };

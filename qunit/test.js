// borrowed from http://www.cs.utah.edu/dept/old/texinfo/diff/diff.html#SEC11
var lao = 'The Way that can be told of is not the eternal Way;\n\
The name that can be named is not the eternal name.\n\
The Nameless is the origin of Heaven and Earth;\n\
The Named is the mother of all things.\n\
Therefore let there always be non-being,\n\
  so we may see their subtlety,\n\
And let there always be being,\n\
  so we may see their outcome.\n\
The two are the same,\n\
But after they are produced,\n\
  they have different names.\n';

var tzu = 'The Nameless is the origin of Heaven and Earth;\n\
The named is the mother of all things.\n\
\n\
Therefore let there always be non-being,\n\
  so we may see their subtlety,\n\
And let there always be being,\n\
  so we may see their outcome.\n\
The two are the same,\n\
But after they are produced,\n\
  they have different names.\n\
They both may be called deep and profound.\n\
Deeper and more profound,\n\
The door of all subtleties!\n';

var laotzudiff = '@@ -2,110 +2,6 @@\n\
he [-Way that can be told of is not the eternal Way;\n\
The name that can be named is not the eternal name.\n\
The -]Nam\n\
@@ -154,7 +50,7 @@\n\
he [-N-]{+n+}ame\n\
@@ -189,6 +85,7 @@\n\
s.\n\
{+\n\
+}The\n\
@@ -404,3 +301,100 @@\n\
s.\n\
{+They both may be called deep and profound.\n\
Deeper and more profound,\n\
The door of all subtleties!\n\
+}';

var tzulaodiff = '@@ -2,6 +2,110 @@\n\
he {+Way that can be told of is not the eternal Way;\n\
The name that can be named is not the eternal name.\n\
The +}Nam\n\
@@ -50,7 +154,7 @@\n\
he [-n-]{+N+}ame\n\
@@ -85,7 +189,6 @@\n\
s.\n\
[-\n\
-]The\n\
@@ -301,100 +404,3 @@\n\
s.\n\
[-They both may be called deep and profound.\n\
Deeper and more profound,\n\
The door of all subtleties!\n\
-]';

test('diff', function() {
    equal(diffutils.diff(lao, tzu), laotzudiff, 'diff(lao, tzu)');
    equal(diffutils.diff(tzu, lao), tzulaodiff, 'diff(tzu, lao)');
});

test('patch', function() {
    equal(diffutils.patch(lao, diffutils.diff(lao, tzu)), tzu, 'patch(lao, diff(lao, tzu))');
    equal(diffutils.patch(tzu, diffutils.diff(tzu, lao)), lao, 'patch(tzu, diff(tzu, lao))');
});

test('Hunk', function() {
    var laotzu = diffutils.diff(lao, tzu);
    var tzulao = diffutils.diff(tzu, lao);
    equal(diffutils.Hunk.createFromUnifiedInlineString(laotzu).map(function(hunk) {
        return hunk.toUnifiedInlineString();
    }).join('\n'), laotzu, 'laotzu: str->Hunk->str');
    equal(diffutils.Hunk.createFromUnifiedInlineString(tzulao).map(function(hunk) {
        return hunk.toUnifiedInlineString();
    }).join('\n'), tzulao, 'tzulao: str->Hunk->str');
});

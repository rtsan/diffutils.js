diffutils.js
============

diff library of javascript

HOW TO USE
----------

```
// Calculate the difference between two strings
var diff = diffutils.diff("moriyama", "hogeyama");
/*
@@ -1,7 +1,7 @@
[-m-]{+h+}o[-ri-]{+ge+}yam
*/
// Apply a patch to string
var patched = diffutils.patch("moriyama", diff);
/*
hogeyama
*/
```

TODO
----

Performance improvement
Line-by-line diff

License
-------

Copyright (c) 2013 rtsan  
Licensed under the MIT license.

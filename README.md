diffutils.js
============

diff library of javascript

HOW TO USE
----------

```
// Calculate the difference between two strings
var diff = diffutils.diff("moriyama", "hogeyama"); // returns patch string

// Apply a patch to string
var patched = diffutils.patch("moriyama", diff); // hogeyama

/*
patch format:
@@ -1,7 +1,7 @@
[-m-]{+h+}o[-ri-]{+ge+}yam
*/

```

Build
-----

diffutils.js uses the build tool [grunt](https://github.com/gruntjs/grunt).


TODO
----

Performance improvement  
Line-by-line diff  
Apply patch with better matching

License
-------

Copyright (c) 2013 rtsan  
Licensed under the MIT license.

module.exports = function(grunt) {
    grunt.initConfig({
        meta: {
            name: 'diffutils.js',
            version: 'v0.1.0',
            author: 'rtsan',
            repo: 'https://github.com/rtsan/diffutils.js',
            banner:
                '/*\n' +
                ' * <%= meta.name %> <%= meta.version %>\n' +
                ' * <%= meta.repo %>\n' +
                ' *\n' +
                ' * Acknowledge:\n' +
                ' * Sun Wu, Udi Manber∗, Gene Myers: An O(NP) Sequence Comparison Algorithm\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= meta.author %>\n' +
                ' * Licensed under the MIT license.\n' +
                ' */',
            min_banner: '/* <%= meta.name %> <%= meta.version %> Licensed under the MIT license. (c) <%= grunt.template.today("yyyy") %> <%= meta.author %> */'
        },
        concat: {
            dist: {
                src: [
                    '<banner:meta.banner>',
                    'src/_header.js',
                    'src/Hunk.js',
                    'src/_diff.js',
                    'src/_parseSESTree.js',
                    'src/_createHunks.js',
                    'src/_applyPatch.js',
                    'src/_exports.js',
                    'src/_footer.js'
                ],
                dest: 'diffutils.js'
            }
        },
        lint: {
            files: [ 'diffutils.js' ]
        },
        min: {
            dist: {
                src: [
                    '<banner:meta.min_banner>',
                    'diffutils.js'
                ],
                dest: 'diffutils.min.js'
            }
        }
    });
    grunt.registerTask('default', 'concat lint min');
};

module.exports = function(grunt) {
	"use strict";
	// Project configuration.
	grunt
			.initConfig({
				pkg : grunt.file.readJSON("package.json"),
				concat : {
					options : {
						separator : ";",
						stripBanners : true
					},
					dist : {
						src : [ "src/*.js" ],
						dest : "build/<%= pkg.name %>.js"
					}
				},
				jshint : {
					options : {
						curly : true,
						eqeqeq : true,
						newcap : true,
						noarg : true,
						sub : true,
						undef : true,
						boss : true,
						node : true
					},
					globals : {
						exports : true
					}

				},
				less : {
					development : {
						options : {
							paths : [ "assets/css" ]
						},
						files : {
							"path/to/result.css" : "path/to/source.less"
						}
					},
					production : {
						options : {
							paths : [ "assets/css" ],
							cleancss : true
						},
						files : {
							"path/to/result.css" : "path/to/source.less"
						}
					}
				},
				csslint : {
					base_theme : {
						src : "themes/base/*.css",
						options : {
							csslintrc : ".csslintrc"
						}
					}
				},
				htmllint : {
					all : [ "demo/**/*.html", "test/**/*.html" ]
				},
				uglify : {
					options : {
						banner : "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
					},
					build : {
						src : "build/<%= pkg.name %>.js",
						dest : "build/<%= pkg.name %>.min.js"
					}
				},
				qunit : {
					files : [ 'test/*.html' ]
				}

			});
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-jscs-checker");
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks("grunt-html");

	grunt.registerTask("clean", function() {
		require("rimraf").sync("build");
	});

	grunt.registerTask("default", [ "css", "js", "html", "test" ]);
	grunt.registerTask("css", [ "less", "csslint", "cssmin" ]);
	grunt.registerTask("js", [ "jshint", "uglify" ]);
	grunt.registerTask("html", [ "htmllint" ]);
	grunt.registerTask("test", [ "qunit" ]);

};
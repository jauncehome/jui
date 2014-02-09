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
						"boss" : true,
						"curly" : true,
						"eqeqeq" : true,
						"eqnull" : true,
						"expr" : true,
						"immed" : true,
						"noarg" : true,
						"onevar" : true,
						"quotmark" : "double",
						"smarttabs" : true,
						"trailing" : true,
						"undef" : true,
						"unused" : false,

						"browser" : true,
						"es3" : true,
						"jquery" : true
					},
					globals : {
						"exports" : true,
						"define" : false,
						"Globalize" : false
					},
					files : [ "src/**/*.js", "test/**/*.js" ]

				},
				less : {
					base : {
						options : {
							paths : [ "themes/base/css" ],
							cleancss : true
						},
						files : {
							"build/css/<%= pkg.name %>.css" : "build/css/<%= pkg.name %>.less"
						}
					}
				},
				csslint : {
					base_theme : {
						src : "build/themes/base/*.css",
						options : {
							"adjoining-classes" : false,
							"box-model" : false,
							"compatible-vendor-prefixes" : false,
							"duplicate-background-images" : false,
							"import" : false,
							"important" : false,
							"outline-none" : false,
							"overqualified-elements" : false,
							"text-indent" : false
						}
					}
				},
				cssmin : {
					options : {
						keepSpecialComments : 0
					},
					compress : {
						files : {
							"build/themes/base/<%= pkg.name %>.css" : [ "build/themes/base/<%= pkg.name %>.css" ]
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
					files : [ "test/**/*.html" ]
				}

			});
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-jscs-checker");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-html");

	grunt.registerTask("clean", function() {
		require("rimraf").sync("build");
	});

	grunt.registerTask("default", [ "css", "js", "html", "test" ]);
	grunt.registerTask("css", [ "less", "csslint", "cssmin" ]);
	grunt.registerTask("js", [ "jshint", "concat", "uglify" ]);
	grunt.registerTask("html", [ "htmllint" ]);
	grunt.registerTask("test", [ "qunit" ]);

};
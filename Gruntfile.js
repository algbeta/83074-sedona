module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    htmlmin:{
      options:{
          removeComments: true,
          keepClosingSlash: false
      },
      html:{
          files:{
             "index.min.html": "index.html",
             "post.min.html": "post.html",
             "blog.min.html": "blog.html",
             "form.min.html":"form.html"
          }
      }
    },

    imagemin:{
      images:{
          options: {
              optimizationLevel: 3
          },
          files:[{
              expand: true,
              src:["build/img/**/*.{png}", "build/img/**/*.{jpg}","build/img/**/*.{jpeg}"]
          }]
      }
    },

    cmq:{
       style:{
           files:{
               "build/css/style.css" : ["build/css/style.css"]
           }
       }
    },

    csscomb: {
        style: {
           /* options: {
               config: 'sort.json'
            },*/
            expand: true,
            src: ["src/sass/**/*.scss"]
          }
      },

    autoprefixer: {
        options: {
            browsers: ['last 2 versions']
        },
        style: {
           src: "build/css/style.css"
        }
    },

    less: {
      style: {
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },

    sass: {
      style: {
        files: {
          'build/css/style.css': 'sass/style.scss'
        }
      }
    },

    cssmin: {
       options: {
          shorthandCompacting: false,
          roundingPrecision: -1
       },
       target: {
            files: {
                'build/css/style.css': ['build/css/style.css']
            }
       }
    },

    uglify: {
        target: {
            files: {
                'build/js/app.min.js': ['build/js/application.js']
            }
        }
    },
    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass',
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    copy: {
      gosha: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'css/**',
            'img/**',
            'js/**'
          ],
          dest: 'gosha',
        }]
      },
      build: {
          files: [{
              expand: true,

              src:[
                  "img/**",
                  "js/**",
                  "*.html"
              ],
              dest:"build"
          },
          {
              expand:true,
              cwd: "bower_components",
              src:[
                  "picturefill/dist/picturefill.min.js",
                  "svg-injector/dist/svg-injector.min.js",
                  "tap/dist/tap.min.js"
              ],
              dest:"build/js/libs/",
              rename:function(dest,src){
                  return dest+(src.substring(src.lastIndexOf('/')+1, src.length));
              }}
          ]
      }
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ],
      build: ["build"],
      afterBuild : ["build/js/application.js"]
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);
  grunt.registerTask('default',['watch']);
  grunt.registerTask('build',
      [
        'clean:build',
        'copy:build',
        'imagemin',
        'csscomb',
        'sass',
        'cmq',
        'autoprefixer',
        'cssmin',
        'uglify',
        'clean:afterBuild'
      ]

  );
  
  grunt.registerTask('default', ['build']);
  
  if (grunt.file.exists(__dirname, 'less', 'style.less')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }

};

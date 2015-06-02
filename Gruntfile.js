module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
          'src/css/style.css': 'sass/style.scss'
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
                'css/style.css': ['src/css/style.css']
            }
       }
    },

    uglify: {
        target: {
            files: {
                'js/app.min.js': ['src/js/application.js']
            }
        }
    },

    watch: {
       css: {
            files: 'sass/*.scss',
            tasks: ['sass','cssmin']
        },
        js: {
            files: 'src/js/application.js',
            tasks: ['uglify']
        }
    },

    //generate sprite
    sprite:{
       icons: {
           src: 'src/img/*.png',
           dest:'img/icons.png',
           destCss: 'sass/sprites/_icons-sprite.scss',
           cssTemplate: 'src/template.scss.handlebars',
           padding: 2,
           cssSpritesheetName: 'icon'
       }
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
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
      }
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ]
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  if (grunt.file.exists(__dirname, 'less', 'style.less')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }

};

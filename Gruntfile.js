module.exports = function(grunt){

	var filelist = [
		'js/utils.js', 
		'js/validation/fields/BaseValidationField.js', 
		'js/validation/fields/TextValidationField.js', 
		'js/validation/fields/SelectValidationField.js', 
		'js/validation/fields/ValidationFieldFactory.js',
		'js/views/BaseView.js',
		'js/views/BaseFormView.js',
		'js/views/LandingView.js',
		'js/views/ApplicationView.js',
		'js/views/ViewApplicationsView.js',
		'js/validation/AgeValidator.js',
		'js/validation/FormValidator.js',
		'js/Router.js'
	];

	var server = grunt.option('serverAddress') || 'http://127.0.0.1:3000';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'), 
		qunit: {
		  all: ['tests/*.html']
		},
		watch: {
			files: ['tests/testfiles/*.js', 'tests/*.html', 'js/*.js', 'js/validation/*.js', 'js/validation/fields/*.js', 'js/views/*.js'],
			tasks: ['uglify', 'string-replace', 'qunit']
		},
		uglify: {
			test: {
				options: {
					mangle: true
				},
				files: {
					'tests/solomon-bane-test.min.js': filelist
				}
			},
			deploy: {
				options: {
					mangle: true,
				},
				files: {
					'dist/js/solomon-bane.min.js': filelist.concat(['js/main.js'])
				}
			},
			dev: {
				options: {
					mangle: false,
					beautify: true,
				},
				files: {
					'dist/js/solomon-bane.js': filelist.concat(['js/main.js'])
				}
			}
		},
		'string-replace': {
			foo:{
				files: {
					'dist/js/solomon-bane.js': 'dist/js/solomon-bane.js',
					'dist/js/solomon-bane.min.js' : 'dist/js/solomon-bane.min.js'
				},
				options: {
					replacements: [{
					  pattern: /\{\{SERVER_ADDRESS\}\}/g,
					  replacement: server
					}]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-string-replace');

	grunt.registerTask('default', ['uglify', 'string-replace', 'qunit']);
	grunt.registerTask('test', ['uglify', 'string-replace', 'qunit']);
	grunt.registerTask('build', ['uglify', 'string-replace']);
	grunt.registerTask('replace', ['string-replace']);


	// grunt.registerTask('', 'Start a custom web server.', function() {
	// 	grunt.log.writeln('Starting web server on port 9999.');
	// 	require('./server/server.js').listen(9999);
	// });
};
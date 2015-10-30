var assert = require('assert');
var $ = require('jquery');
var PostPreview = require('../build/post-preview.js');
var Handlebars = require('handlebars');
var testTemplate = require('./test-template.hbs');

describe('Post Preview Module', function() {

  beforeEach(function(){
    var testElement = $('#test-element');
    if (testElement) {
      testElement.remove();
    }
    testElement = document.createElement('div');
    testElement.id = 'test-element';
    document.body.appendChild(testElement);
  });

  describe('element parameter', function() {

    it('accepts a DOM selector string as the element to render the template into', function(done){
      var postPreviewInstance = PostPreview({
        element: '#test-element'
      });
      var markupCheck = $('#test-element[data-post-instance]');
      assert(markupCheck.length > 0);
      done();
    });

    it('accepts a DOM Node as the element to render the template into', function(done){
      var testElement = document.querySelector('#test-element');
      var postPreviewInstance = PostPreview({
        element: testElement
      });
      var markupCheck = $('#test-element[data-post-instance]');
      assert(markupCheck.length > 0);
      done();
    });


    it('accepts a jQuery object as the element to render the template into', function(done){
      var jQueryElement = $('#test-element');
      var postPreviewInstance = PostPreview({
        element: jQueryElement
      });
      var markupCheck = $('#test-element[data-post-instance]');
      assert(markupCheck.length > 0);
      done();
    });

  });

  describe('template parameter', function() {

    it('accepts a precompiled handlebars template that overrides the default template', function(done){
      var postPreviewInstance = PostPreview({
        element: '#test-element',
        template: testTemplate
      });
      var testElement = $('#test-element.custom-template');
      assert(testElement.length > 0);
      done();
    });

  });

});

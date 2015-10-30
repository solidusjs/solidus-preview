var _ = require('underscore');
var SolidusClient = require('solidus-client');
var params = require('querystring').parse(window.location.search.split('?').pop());

module.exports = PostPreview;

function PostPreview (options) {
  var isPreviewActive = params._wp_json_nonce && params.is_preview;
  var hasRequiredOptions = options.domain && options.template && options.element && options.post_id;
  if ( !isPreviewActive || !hasRequiredOptions ) {
    console.warn(isPreviewActive?'Missing required options.':'Preview not active');
    return;
  }
  if (!(this instanceof PostPreview)) return new PostPreview(options);
  var instance = this;
  var previewClient = new SolidusClient();
  var preprocessor = function(context) {
    var lastRevision = context.resources.revisions[0];
    context.resources.wordpress = _.extend(context.resources.wordpress, lastRevision);
    if (typeof options.preprocessor == 'function') { context = options.preprocessor(context); }
    return context.resources.wordpress;
  }
  var view = {
    resources: {
      wordpress: {
        url: options.domain+'/wp-json/posts/'+options.post_id,
        with_credentials: true,
        query: { '_wp_json_nonce': params._wp_json_nonce }
      },
      revisions: {
        url: options.domain+'/wp-json/posts/'+options.post_id+'/revisions',
        with_credentials: true,
        query: { '_wp_json_nonce': params._wp_json_nonce }
      }
    },
    preprocessor: preprocessor,
    template: options.template,
    template_options: options.template_options || {}
  };

  if (options.element.jquery) {
    instance.element = options.element[0];
  } else if (options.element.nodeType > 0) {
    instance.element = options.element;
  } else {
    instance.element = document.querySelector(options.element);
  }

  previewClient.render(view).end(function(err, html) {
    if (err) console.log(err);
    if (html) {
      instance.element.outerHTML = html;
    }
  });

}

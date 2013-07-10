

/**
 * @type {Object}
 */
var app = {};


/**
 * @type {Object}
 */
app.results = {};


/**
 * @type {Object}
 */
window['_bTestResults'] = null;


/** Gone daddy gone */
app.initialize = function() {

  $goBtn = $('button[name="go"]');
  $goBtn.on('click', app.runTests);
};


/** Do it */
app.runTests = function() {
  $goBtn = $('#bs-run');
  $('.rt-feedback').remove();
  app.results = null;
  window['_bTestResults'] = null;
  $goBtn.hide();

  app.reflowTimer = new ReflowTimer($('.app').get(0));
  app.reflowTimer.renderResults = true;
  app.reflowTimer.onTestsComplete = app.onTestsComplete;
  app.reflowTimer.run();
};


/** hi */
app.onTestsComplete = function(results) {
  console.log('app.onTestsComplete results: ' +
              JSON.stringify(results));
  app.results = results;
  window['_bTestResults'] = results;
  $goBtn.show();
  $('.rt-feedback div').append($('<p>').html(app.syntaxHighlight(results)));

  (function(document) {
    var testKey = 'agt1YS1wcm9maWxlcnINCxIEVGVzdBjBwpAVDA';
    var newScript = document.createElement('script'),
        firstScript = document.getElementsByTagName('script')[0];
    newScript.src = 'http://www.browserscope.org/user/beacon/' + testKey;
    newScript.src += '?callback=app.allDone';
    firstScript.parentNode.insertBefore(newScript, firstScript);
  }(document));
};


/** hi */
app.allDone = function() {
  console.log('Browserscope beacon complete.');
};


app.syntaxHighlight = function(json) {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
          cls = 'key';
      } else {
          cls = 'string';
      }
    } else if (/true|false/.test(match)) {
        cls = 'boolean';
    } else if (/null/.test(match)) {
        cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
};


/**
 * @param {string} src The script src.
 */
app.injectScript = function(src) {
  script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = src;
  $('head').get(0).appendChild(script);
};

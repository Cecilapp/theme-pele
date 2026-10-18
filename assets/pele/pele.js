/*!
 * Cecil component theme Pele: renders Mermaid diagrams with Pele (https://pele.run).
 * - each element matching the selector (a `pre`, or the `code` inside it) is replaced by a `div.pele-diagram`, where Pele mounts the diagram;
 * - the library is loaded on first use, only if the page contains a diagram;
 * - `window.cecilPele.mount(root)` renders the diagrams added later to the page (a `pele:mount` event is dispatched on each diagram).
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var config = {};
  try {
    config = JSON.parse(script && script.getAttribute('data-pele-config') || '{}');
  } catch (e) {
    console.error('[pele] invalid configuration', e);
  }
  var selector = config.selector || 'pre > code.language-mermaid, pre.mermaid';
  var loading = null;

  // loads the Pele library (`window.pele`) once
  function load() {
    if (window.pele && window.pele.mount) {
      return Promise.resolve(window.pele);
    }
    if (!loading) {
      loading = new Promise(function (resolve, reject) {
        var lib = document.createElement('script');
        lib.src = config.library;
        lib.async = true;
        lib.onload = function () {
          window.pele ? resolve(window.pele) : reject(new Error('`window.pele` not found'));
        };
        lib.onerror = function () {
          loading = null; // allows a new attempt
          reject(new Error('unable to load ' + config.library));
        };
        document.head.appendChild(lib);
      });
    }
    return loading;
  }

  // Mermaid source blocks inside root, as `pre` elements (or the matched element itself)
  function blocks(root) {
    var found = [];
    (root || document).querySelectorAll(selector).forEach(function (element) {
      var block = element.closest('pre') || element;
      if (found.indexOf(block) === -1) {
        found.push(block);
      }
    });
    return found;
  }

  function mount(root) {
    var sources = blocks(root);
    if (!sources.length) {
      return Promise.resolve([]);
    }
    return load().then(function (pele) {
      return sources.map(function (block) {
        var source = block.textContent.trim();
        var diagram = document.createElement('div');
        diagram.className = 'pele-diagram';
        if (block.id) {
          diagram.id = block.id;
        }
        block.replaceWith(diagram);
        var mounted = pele.mount(diagram, source, config.options || {});
        diagram.dispatchEvent(new CustomEvent('pele:mount', {bubbles: true, detail: {mounted: mounted, source: source}}));
        return mounted;
      });
    }).catch(function (error) {
      console.error('[pele]', error); // the source code blocks stay in place
      return [];
    });
  }

  window.cecilPele = {mount: mount, load: load};

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mount(); });
  } else {
    mount();
  }
})();

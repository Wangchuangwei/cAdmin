// Thanks to: https://github.com/airyland/vux/blob/v2/src/directives/transfer-dom/index.js
// Thanks to: https://github.com/calebroseland/vue-dom-portal

/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget(_node) {
  let node = _node;
  if (node === undefined) {
    node = document.body;
  }
  if (node === true) { return document.body; }
  if (node && !(node instanceof window.Node) && node != '' && node != 'body') {
    document.querySelector(node).style.cssText = document.querySelector(node).style.cssText + 'position:relative;';
  }

  return node instanceof window.Node ? node : document.querySelector(node);
}

const directive = {
  inserted(el, { value }, vnode) {
    // 兼容IE10及以下版本（因未支持dataset特性）
    if (Array.prototype.every.call(el.attributes, attr => attr.nodeName !== 'data-transfer' || String(attr.nodeValue) !== 'true')) return false;
    el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom';
    const parentNode = el.parentNode;
    if (!parentNode) return;
    const home = document.createComment('');
    let hasMovedOut = false;

    if (value !== false) {
      parentNode.replaceChild(home, el); // moving out, el is no longer in the document
      getTarget(value).appendChild(el); // moving into new place
      hasMovedOut = true;
    }
    if (!el.__transferDomData) {
      el.__transferDomData = {
        parentNode: parentNode,
        home: home,
        target: getTarget(value),
        hasMovedOut: hasMovedOut
      };
    }
  },
  componentUpdated(el, { value }) {
    if (Array.prototype.every.call(el.attributes, attr => attr.nodeName !== 'data-transfer' || String(attr.nodeValue) !== 'true')) return false;
    // need to make sure children are done updating (vs. `update`)
    const ref$1 = el.__transferDomData;
    if (!ref$1) return;
    // homes.get(el)
    const parentNode = ref$1.parentNode;
    const home = ref$1.home;
    const hasMovedOut = ref$1.hasMovedOut; // recall where home is

    if (!hasMovedOut && value) {
      // remove from document and leave placeholder
      parentNode.replaceChild(home, el);
      // append to target
      getTarget(value).appendChild(el);
      el.__transferDomData = { ...el.__transferDomData, hasMovedOut: true, target: getTarget(value) };
    } else if (hasMovedOut && value === false) {
      // previously moved, coming back home
      parentNode.replaceChild(el, home);
      el.__transferDomData = { ...el.__transferDomData, hasMovedOut: false, target: getTarget(value) };
    } else if (value && !getTarget(value).contains(el)) {
      // already moved, going somewhere else
      getTarget(value).appendChild(el);
    }
  },
  unbind(el) {
    if (Array.prototype.every.call(el.attributes, attr => attr.nodeName !== 'data-transfer' || String(attr.nodeValue) !== 'true')) return false;
    el.className = el.className.replace('v-transfer-dom', '');
    const ref$1 = el.__transferDomData;
    if (!ref$1) return;
    if (el.__transferDomData.hasMovedOut === true) {
      el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el);
    }
    el.__transferDomData = null;
  }
};

export default directive;

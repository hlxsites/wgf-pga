// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './scripts.js';

function loadScript(url, callback, attr) {
  const $head = document.querySelector('head');
  const $script = document.createElement('script');
  $script.src = url;
  if (attr) {
    const keys = Object.keys(attr);
    keys.forEach((k) => {
      $script.setAttribute(k, attr[k]);
    });
  }
  $head.append($script);
  $script.onload = callback;
  return $script;
}

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

window.pgatour = window.pgatour || {};
window.pgatour.tracking = {
  branch: {
    apiKey: 'key_live_nnTvCBCejtgfn40wtbQ6ckiprsemNktJ',
    isWebView: 'false',
  },
  krux: {
    id: '',
  },
  indexExchange: {
    status: false,
  },
};

const pname = window.location.pathname.split('/').pop();

window.pgatour.Omniture = {
  properties: {
    pageName: `pgatour:wgf:${pname}`,
    eVar16:`pgatour:wgf:${pname}`,
    prop18: 'homePage',
    eVar1: 'pgatour',
    prop1: 'pgatour',
    prop2: 'r011',
    eVar2: 'r011',
    eVar6: window.location.href,
  },
  defineOmnitureVars: () => {},

};
window.pgatour.docWrite = document.write.bind(document);

loadScript('https://cdn.cookielaw.org/scripttemplates/otSDKStub.js', () => {
  loadScript('https://assets.adobedtm.com/d17bac9530d5/90b3c70cfef1/launch-1ca88359b76c.min.js');
}, {
  'data-domain-script': '262c6c79-a114-41f0-9c07-52cb1fb7390c',
})


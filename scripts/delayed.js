// eslint-disable-next-line import/no-cycle
import { sampleRUM, fetchPlaceholders } from './scripts.js';

const placeholders = await fetchPlaceholders();
const isProd = window.location.hostname.endsWith(placeholders.hostname);

if (!isProd === 'this') {
  // temporary override for analytics testing
  if (!localStorage.getItem('OptIn_PreviousPermissions')) localStorage.setItem('OptIn_PreviousPermissions', '{"aa":true,"mediaaa":true,"target":true,"ecid":true,"adcloud":true,"aam":true,"campaign":true,"livefyre":false}');
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

const pageType = window.location.pathname === '/' ? 'homePage' : 'contentPage';
const pname = window.location.pathname.split('/').pop();

window.pgatour.Omniture = {
  properties: {
    pageName: `pgatour:wgf:${pname}`,
    eVar16: `pgatour:wgf:${pname}`,
    prop18: pageType,
    eVar1: 'pgatour',
    prop1: 'pgatour',
    prop2: 'r011',
    eVar2: 'r011',
    eVar6: window.location.href,
  },
  defineOmnitureVars: () => {
    if (window.s) {
      Object.assign(window.s, window.pgatour.Omniture.properties);
    }
  },
};
window.pgatour.docWrite = document.write.bind(document);

function loadScript(url, callback, attributes) {
  const head = document.querySelector('head');
  if (!head.querySelector(`script[src="${url}"]`)) {
    const script = document.createElement('script');
    script.src = url;

    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        script.setAttribute(key, attributes[key]);
      });
    }

    head.append(script);
    script.onload = callback;
    return script;
  }
  return head.querySelector(`script[src="${url}"]`);
}

/* setup cookie preferences */
function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const split = decodedCookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < split.length; i++) {
    let c = split[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return null;
}

async function OptanonWrapper() {
  const geoInfo = window.Optanon.getGeolocationData();
  Object.keys(geoInfo).forEach((key) => {
    const cookieName = `PGAT_${key.charAt(0).toUpperCase() + key.slice(1)}`;
    const cookie = getCookie(cookieName);
    if (!cookie || cookie !== geoInfo[key]) document.cookie = `${cookieName}=${geoInfo[key]}`;
  });

  const OneTrustActiveGroup = () => {
    /* eslint-disable */
    var y = true, n = false;
    var y_y_y = {'aa': y, 'aam': y, 'ecid': y};
    var n_n_n = {'aa': n, 'aam': n, 'ecid': n};
    var y_n_y = {'aa': y, 'aam': n, 'ecid': y};
    var n_y_y = {'aa': n, 'aam': y, 'ecid': y};
    
    if (typeof OnetrustActiveGroups != 'undefined')
      if (OnetrustActiveGroups.includes(',C0002,'))
        return OnetrustActiveGroups.includes(',C0004,')?y_y_y:y_n_y;
      else
        return OnetrustActiveGroups.includes(',C0004,')?n_y_y:n_n_n;
    
    return geoInfo.country == 'US'?y_y_y:n_n_n;
    /* eslint-enable */
  };
  if (!localStorage.getItem('OptIn_PreviousPermissions')) {
    const adobeSettings = OneTrustActiveGroup();
    adobeSettings.tempImplied = true;
    localStorage.setItem('OptIn_PreviousPermissions', JSON.stringify(adobeSettings));
  }

  loadScript(`https://assets.adobedtm.com/d17bac9530d5/90b3c70cfef1/launch-1ca88359b76c${isProd ? '.min' : ''}.js`);
}

const otId = placeholders.onetrustId;
if (otId) {
  const cookieScript = loadScript('https://cdn.cookielaw.org/scripttemplates/otSDKStub.js');
  cookieScript.setAttribute('data-domain-script', `${otId}${isProd ? '' : '-test'}`);

  window.OptanonWrapper = OptanonWrapper;
}

import { readBlockConfig, decorateIcons, decorateLinkedPictures } from '../../scripts/scripts.js';

function setupCookieChoices(section) {
  if (section) {
    const cookieLink = section.querySelector('a[href*="onetrust-link"]');
    if (cookieLink) {
      cookieLink.removeAttribute('href');
      cookieLink.className = 'ot-sdk-show-settings';
      cookieLink.id = 'ot-sdk-btn';
      cookieLink.parentNode.className = 'onetrust-link';
    }
  }
}

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  await decorateIcons(footer);
  decorateLinkedPictures(footer);
  block.append(footer);
  const styles = ['logos', 'legal'];
  styles.forEach((style, i) => {
    if (footer.children[i]) footer.children[i].classList.add(`footer-${style}`);
  });
  setupCookieChoices(footer.querySelector('.footer-legal'));
}

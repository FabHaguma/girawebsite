/**
 * Generic WhatsApp click-to-chat messenger & site phone hydration.
 * Call configure() once with numbers and message templates, then use send()/buildUrl(),
 * or let [data-whatsapp-link], [data-whatsapp-template], [data-phone-link],
 * [data-phone-display], [data-phone-intl] elements wire themselves up automatically.
 *
 * Usage:
 *   WhatsAppMessenger.configure({
 *     number: '15551234567',
 *     phoneTel: '+15551234567',
 *     phoneDisplay: '(555) 123-4567',
 *     phoneDisplayIntl: '+1 555 123 4567',
 *     templates: {
 *       quote: (data) => `Hi, my name is ${data.name}...`
 *     }
 *   });
 *   WhatsAppMessenger.send('quote', { name: 'Eric' });
 *
 *   <a data-whatsapp-link data-whatsapp-message="Hi, I have a question.">Chat</a>
 *   <a data-whatsapp-template="inquiry" data-whatsapp-message="...">Chat</a>
 */
const WhatsAppMessenger = (() => {
  let number = '';
  let phoneTel = '';
  let phoneDisplay = '';
  let phoneDisplayIntl = '';
  let templates = {};

  function configure(options = {}) {
    if (options.number !== undefined) {
      const clean = String(options.number).replace(/\D/g, '');
      number = clean.length > 0 ? clean : String(options.number);
    }
    if (options.phoneTel !== undefined) phoneTel = String(options.phoneTel);
    if (options.phoneDisplay !== undefined) phoneDisplay = String(options.phoneDisplay);
    if (options.phoneDisplayIntl !== undefined) phoneDisplayIntl = String(options.phoneDisplayIntl);
    if (options.templates) templates = { ...templates, ...options.templates };
    hydrateStaticLinks();
    hydratePhoneLinks();
  }

  function registerTemplate(name, builder) {
    templates[name] = builder;
  }

  function buildUrl(text) {
    if (!number || number.includes('{{')) throw new Error('WhatsAppMessenger: call configure({ number }) with a valid number before building a link.');
    return `https://wa.me/${number}?text=${encodeURIComponent(text || '')}`;
  }

  function buildUrlFromTemplate(templateName, data) {
    const template = templates[templateName];
    if (!template) throw new Error(`WhatsAppMessenger: unknown template "${templateName}"`);
    return buildUrl(template(data));
  }

  function send(templateName, data) {
    window.open(buildUrlFromTemplate(templateName, data), '_blank', 'noopener,noreferrer');
  }

  // Any <a data-whatsapp-link data-whatsapp-message="..."> gets its href wired up automatically.
  function hydrateStaticLinks(root = document) {
    if (!number || number.includes('{{')) return;
    root.querySelectorAll('[data-whatsapp-link]').forEach(el => {
      el.href = buildUrl(el.getAttribute('data-whatsapp-message') || '');
    });
  }

  // Any elements with [data-phone-link], [data-phone-display], or [data-phone-intl] get updated.
  function hydratePhoneLinks(root = document) {
    if (phoneTel && !phoneTel.includes('{{')) {
      root.querySelectorAll('[data-phone-link]').forEach(el => {
        el.href = 'tel:' + phoneTel;
      });
    }
    if (phoneDisplay && !phoneDisplay.includes('{{')) {
      root.querySelectorAll('[data-phone-display]').forEach(el => {
        el.textContent = phoneDisplay;
      });
    }
    if (phoneDisplayIntl && !phoneDisplayIntl.includes('{{')) {
      root.querySelectorAll('[data-phone-intl]').forEach(el => {
        el.textContent = phoneDisplayIntl;
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    hydrateStaticLinks();
    hydratePhoneLinks();
  });

  document.addEventListener('click', event => {
    const link = event.target instanceof Element
      ? event.target.closest('[data-whatsapp-template]')
      : null;
    if (!link) return;

    event.preventDefault();
    send(link.getAttribute('data-whatsapp-template'), {
      message: link.getAttribute('data-whatsapp-message') || ''
    });
  });

  return { configure, registerTemplate, send, buildUrl, buildUrlFromTemplate, hydrateStaticLinks, hydratePhoneLinks };
})();

export default WhatsAppMessenger;

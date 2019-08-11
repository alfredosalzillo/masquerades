import stylis from 'stylis';
import hash from './hash';

// immutably concat strings and values together
export const concat = (strings, values) => strings
  .map((s, i) => `${s}${values[i] || ''}`)
  .join('');

export const adoptSheets = (el, ...sheets) => {
  if (!el || el === window) {
    return;
  }
  if (el instanceof ShadowRoot || el instanceof HTMLDocument) {
    // eslint-disable-next-line no-param-reassign
    el.adoptedStyleSheets = [
      ...el.adoptedStyleSheets,
      ...sheets.filter(sheet => !el.adoptedStyleSheets.includes(sheet)),
    ];
    return;
  }
  adoptSheets(el.parentNode, ...sheets);
};

const factory = (namespace = 'css') => {
  const style = {};
  const uniqueName = (rule) => {
    if (rule in style) return style[rule];
    const uuid = `${namespace}-${hash(rule)}`;
    style[rule] = uuid;
    return uuid;
  };
  // create and inject the css style sheet
  const sheet = new CSSStyleSheet();
  adoptSheets(document, sheet);

  // parse template string into class name(s)
  const css = (strings, ...values) => uniqueName(concat(strings, values));

  // inject rules into a style tag, and into the DOM
  // TODO: find a better way
  const inject = (...classes) => Object.entries(style)
    .filter(([, uuid]) => classes.some(c => uuid === c))
    .filter(([, uuid]) => [...sheet.rules].every(r => r.selectorText !== `.${uuid}`))
    .forEach(([rawRule, uuid]) => {
      // parse rule with stylis and inject at the begin of the sheet
      stylis(`.${uuid}`, rawRule).split(`.${uuid}`)
        .filter(rule => !!rule.trim())
        .forEach((rule) => {
          sheet.insertRule(`.${uuid}${rule}`, 0);
        });
    });
  const injectAll = () => inject(...Object
    .keys(style));

  // stringify styles object
  const string = () => Object
    .keys(style)
    .map(rule => `.css-${uniqueName(rule)}{ ${rule} }`)
    .join(' ');

  return {
    css,
    inject,
    injectAll,
    sheet,
    string,
  };
};

export const {
  css,
  inject,
  string,
  injectAll,
  sheet,
} = factory();

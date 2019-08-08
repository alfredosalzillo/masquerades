import hash from './hash';

const factory = (namespace = 'css-') => {
  const style = {};
  const uniqueName = (rule) => {
    if (rule in style) return style[rule];
    const uuid = `${namespace}-${hash(rule)}`;
    style[rule] = uuid;
    return uuid;
  };
  // create and inject style tag
  const styleTag = document.createElement('style');
  styleTag.setAttribute('data-css', '');
  document.head.appendChild(styleTag);
  const { sheet } = styleTag;
  // immutably concat strings and values together
  const concat = (strings, values) => strings.map((s, i) => `${s}${values[i] || ''}`)
    .join('');

  // parse template string into class name(s)
  const css = (strings, ...values) => {
    // reduce CSS string to an array of "prop:value" rule strings
    const rules = concat(strings, values)
      .replace(/\s/g, '') // remove whitespace (including new lines)
      .slice(0, -1) // remove trailing semicolon
      .split(';'); // split on semicolons yielding rule strings
    return rules
      .map(uniqueName)
      .join(' ');
  };

  // inject rules into a style tag, and into the DOM
  // TODO: find a better way
  const inject = (...classes) => Object.entries(style)
    .filter(([, uuid]) => classes.some(c => uuid === c))
    .forEach(([rule, uuid]) => {
      // inject rule at head of sheet
      if ([...sheet.rules.values()].every(r => r.selectorText !== `.${uuid}`)) {
        sheet.insertRule(`.${uuid}{ ${rule} }`, 0);
      }
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
    string,
  };
};

export const {
  css, inject, string, injectAll,
} = factory();

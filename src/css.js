import hash from './hash';

const factory = () => {
  const style = {};
  const uniqueName = (rule) => {
    if (rule in style) return style[rule];
    const uuid = hash(rule);
    style[rule] = uuid;
    return uuid;
  };
  // immutably concat strings and values together
  const concat = (strings, values) => strings.map((s, i) => `${s}${values[i] || ''}`).join('');

  // parse template string into class name(s)
  const css = (strings, ...values) => {
    // reduce CSS string to an array of "prop:value" rule strings
    const rules = concat(strings, values)
      .replace(/\s/g, '') // remove whitespace (including new lines)
      .slice(0, -1) // remove trailing semicolon
      .split(';'); // split on semicolons yielding rule strings
    return rules.map(rule => `css-${uniqueName(rule)}`).join(' ');
  };

  // inject rules into a style tag, and into the DOM
  const inject = () => {
    // create and inject style tag
    const styleTag = document.createElement('style');
    styleTag.setAttribute('data-css', '');
    document.head.appendChild(styleTag);

    // retrieve sheet after injecting
    const { sheet } = styleTag;

    Object
      .keys(style)
      .forEach((rule) => {
        // inject rule at head of sheet
        sheet.insertRule(`.css-${uniqueName(rule)}{ ${rule} }`, 0);
      });
  };

  // stringify styles object
  const string = () => Object
    .keys(style)
    .map(rule => `.css-${uniqueName(rule)}{ ${rule} }`)
    .join(' ');

  return {
    css,
    inject,
    string,
  };
};

export const { css, inject, string } = factory();

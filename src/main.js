import { component, useEffect } from 'haunted';
import { html } from 'lit-html';
import { css, inject } from './css';

const callOrValue = (...args) => fnOrValue => (
  typeof fnOrValue === 'function'
    ? fnOrValue(...args)
    : fnOrValue
);

export const forComponent = (elementType, options) => (strings, ...values) => component((el) => {
  const className = css(strings, values.map(callOrValue(el)));
  useEffect(() => {
    const classes = className.split(' ');
    inject(...classes);
    el.classList.add(...classes);
    return () => el.classList.remove(...classes);
  }, [className]);
  return html([el.innerHTML]);
}, elementType, options);

const button = forComponent(HTMLButtonElement, {
  useShadowDOM: false,
});
const div = forComponent(HTMLDivElement, {
  useShadowDOM: false,
});

export default {
  button,
  div,
};

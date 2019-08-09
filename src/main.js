import {
  applySheetToShadowRoot, css, inject, sheet,
} from './css';

const callOrValue = (...args) => fnOrValue => (
  typeof fnOrValue === 'function'
    ? fnOrValue(...args)
    : fnOrValue
);

const observedAttributeSymbol = Symbol('observed-attributes');
function StyledElement(BaseElement, styler) {
  class Element extends BaseElement {
    constructor() {
      super();
      this.disposer = () => null;
    }

    static get observedAttributes() {
      return Element[observedAttributeSymbol];
    }

    static observeAttributes(attributes) {
      Element[observedAttributeSymbol] = attributes;
      return Element;
    }

    attributeChangedCallback() {
      this.updateStyle();
    }

    connectedCallback() {
      applySheetToShadowRoot(this, sheet);
      this.updateStyle();
    }

    updateStyle() {
      const className = styler(this);
      const classes = className.split(' ');
      if (classes.some(c => !this.classList.contains(c))) {
        this.disposeLastStyle();
        inject(...classes);
        this.classList.add(...classes);
        this.disposer = () => this.classList.remove(...classes);
      }
    }

    disposeLastStyle() {
      if (this.disposer) {
        this.disposer();
      }
    }
  }
  return Element;
}

export const forComponent = BaseElement => (
  strings, ...values
) => StyledElement(BaseElement, el => css(strings, values.map(callOrValue(el))));

// extending native classes is needed for babel correct transpile
const button = forComponent(class extends HTMLButtonElement {});
const div = forComponent(class extends HTMLDivElement {});

export default {
  button,
  div,
};

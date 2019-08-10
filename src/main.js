import {
  adoptSheets, concat, css, inject, sheet,
} from './css';

const callOrValue = (...args) => fnOrValue => (
  typeof fnOrValue === 'function'
    ? fnOrValue(...args)
    : fnOrValue
);

const observedAttributeSymbol = Symbol('observed-attributes');
function StyledElement(BaseElement, styler) {
  return class Element extends BaseElement {
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
      adoptSheets(this, sheet);
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
  };
}

const styled = BaseElement => (
  strings, ...values
) => StyledElement(BaseElement, el => css(strings, ...values.map(callOrValue(el))));

styled.css = (strings, ...values) => concat(strings, values.map(callOrValue()));

// extending native classes is needed for babel correct transpile or don't work with js5
styled.a = styled(class extends HTMLLinkElement {});
styled.button = styled(class extends HTMLButtonElement {});
styled.div = styled(class extends HTMLDivElement {});
styled.input = styled(class extends HTMLInputElement {});
styled.p = styled(class extends HTMLParagraphElement {});
styled.span = styled(class extends HTMLSpanElement {});

export default styled;

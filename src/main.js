import {
  adoptSheets, concat, css, inject, sheet,
} from './css';
import {
  createProvider,
  providerOf,
  valueOf,
} from './provider';

const themeSymbol = Symbol('masquerade-theme');
const createTheme = initialValue => createProvider(initialValue, themeSymbol);
const themeOf = context => valueOf(themeSymbol, context);
const callOrValue = (...args) => fnOrValue => (
  typeof fnOrValue === 'function'
    ? fnOrValue(...args)
    : fnOrValue
);

const observedAttributeSymbol = Symbol('observed-attributes');

function StyledElement(BaseElement, styler) {
  return class Element extends BaseElement {
    get theme() {
      return themeOf(this);
    }

    constructor() {
      super();
      this.disposer = () => null;
      this.updateStyle = this.updateStyle.bind(this);
    }

    static get observedAttributes() {
      return [
        ...(Element[observedAttributeSymbol] || []),
        ...(super.observedAttributes || []),
      ];
    }

    static observeAttributes(attributes) {
      Element[observedAttributeSymbol] = attributes;
      return Element;
    }

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      adoptSheets(this, sheet);
      const themeProvider = providerOf(themeSymbol, this);
      if (themeProvider) {
        themeProvider.addEventListener('provider-value-change', this.updateStyle);
      }
      this.updateStyle();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback) {
        super.attributeChangedCallback(name, oldValue, newValue);
      }
      this.updateStyle();
    }

    adoptedCallback() {
      if (super.adoptedCallback) {
        super.adoptedCallback();
      }
      this.updateStyle();
    }

    disconnectCallback() {
      const themeProvider = providerOf(themeSymbol, this);
      if (themeProvider) {
        themeProvider.removeEventListener('provider-value-change', this.updateStyle);
      }
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

export default Object.freeze(styled);
export {
  createTheme,
};

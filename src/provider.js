const providerSymbol = Symbol('provider');
export const providerOf = (identifier, context) => {
  if (!context || context === window) {
    return undefined;
  }
  if (context[providerSymbol] === identifier) {
    return context;
  }
  if (context instanceof ShadowRoot) {
    return providerOf(identifier, context.host);
  }
  return providerOf(identifier, context.parentElement || context.parentNode);
};
export const valueOf = (identifier, context) => {
  const theNearestProvider = providerOf(identifier, context);
  return theNearestProvider && theNearestProvider.value;
};
const values = new WeakMap();
export const createProvider = (
  initialValue,
  identifier = Symbol(`provider-${Date.now()}`),
) => {
  class Provider extends HTMLElement {
    // TODO FIX: why this is not working?
    static get observedAttributes() {
      return ['value'];
    }

    // TODO: remove get and setter when fixed observedAttributes
    set value(value) {
      this.notifyChanges();
      values.set(this, value);
    }

    get value() {
      return values.get(this);
    }

    constructor() {
      super();
      this.value = initialValue;
      this[providerSymbol] = identifier;
    }

    static of(context) {
      return valueOf(identifier, context);
    }

    attributeChangedCallback(name) {
      if (name === 'value') {
        this.notifyChanges();
      }
    }

    notifyChanges() {
      this.dispatchEvent(new Event('provider-value-change'));
    }
  }
  return Provider;
};

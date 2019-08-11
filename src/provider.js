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
export const createProvider = (
  initialValue,
  identifier = Symbol(`provider-${Date.now()}`),
) => {
  class Provider extends HTMLElement {
    constructor() {
      super();
      this.value = initialValue;
      this[providerSymbol] = identifier;
    }

    static get observedAttributes() {
      return ['value'];
    }

    static of(context) {
      return valueOf(identifier, context);
    }

    attributeChangedCallback(name) {
      if (name === 'value') {
        this.dispatchEvent(new Event('provider-value-change'));
      }
    }
  }
  return Provider;
};

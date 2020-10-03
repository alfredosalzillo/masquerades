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
    set value(value) {
      values.set(this, value);
      this.notifyChanges();
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
      return providerOf(identifier, context);
    }

    static valueOf(context) {
      return valueOf(identifier, context);
    }

    notifyChanges() {
      this.dispatchEvent(new Event('provider-value-change'));
    }
  }
  return Provider;
};

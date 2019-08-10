export type StyledElement<T extends HTMLElement | ShadowRoot> = {
  new(): T;
  observeAttributes(attributes: string[]): StyledElement<T>;
}

export type StyledTaggedTemplate<T extends HTMLElement | ShadowRoot> = (
  strings: TemplateStringsArray,
  ...values: Array<string | number | Function>
) => StyledElement<T> ;

export interface Styled {
  <T extends HTMLElement | ShadowRoot>(element: T): StyledTaggedTemplate<T>;
  css: (
    strings: TemplateStringsArray,
    ...values: Array<string | number | Function>
  ) => string;
  a: StyledTaggedTemplate<HTMLLinkElement>;
  button: StyledTaggedTemplate<HTMLButtonElement>;
  div: StyledTaggedTemplate<HTMLDivElement>;
  input: StyledTaggedTemplate<HTMLInputElement>;
  p: StyledTaggedTemplate<HTMLParagraphElement>;
  span: StyledTaggedTemplate<HTMLSpanElement>;
}

declare const styled: Styled;
export default styled;

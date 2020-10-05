# masquerades 🎭
[![Actions Status](https://github.com/alfredosalzillo/masquerades/workflows/CI/badge.svg)](https://github.com/alfredosalzillo/masquerades/actions)

A library for __styled web components__.

This library is a work in progress, feel free to participate to the project.
## Why 
Styled components are easy to write and manage.
They focus only on style and anything else.

## Usage
Install via npm or yarn.
```bash
npm i masquerades@next
yarn add masquerades@next
```
import using es modules.
```javascript
import styled from 'masquerades';

// define styled components
const StyledDiv = styled.div`
  /*some css...*/
`
customElements.define('styled-div', StyledDiv, { extends: "div" });
```
## Examples
### Style Custom Elements
Style a custom component using `styled(CustomComponent)`.
```javascript
import styled from 'masquerades';

const StyledCustomComponent = styled(CustomComponent)`
  background: ${({ disabled }) => (disabled ? 'grey' : '#f1c40f')};
  color: #fff;
  border: 3px solid #fff;
  border-radius: 5px;
  padding: 0.8rem 2rem;
  font: 24px "Margarine", sans-serif;
  outline: none;
  display: block;
  letter-spacing: 2px;
  ${({ disabled }) => disabled && styled.css`
    border-radius: 15px;
  `}
`

customElements.define('custom-component', StyledCustomComponent);

```
### Style Native Elements
Shortcut for style native components are available,
for example to style a button use `styled.button`.
```javascript
import styled from 'masquerades';

// Create the button
const StyledButton = styled.button`
  background: ${({ disabled }) => (disabled ? 'grey' : '#f1c40f')};
  color: #fff;
  border: 3px solid #fff;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font: 24px "Margarine", sans-serif;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease-in-out;
  letter-spacing: 2px;
  ${({ disabled }) => disabled && styled.css`
    border-radius: 15px;
  `}
`
// set up observedAttributes
  .observeAttributes(['disabled']);

// Define the styled button as extension of the native button
customElements.define('styled-button', StyledButton, {
  extends: 'button',
});
```

Use the styled button
```html
<button is="styled-button">Styled Button</button>
<button is="styled-button" disabled>Styled Button</button>
```
### Style Shadow DOM
The css is injected in a stylesheet adopted by the root of the element and inside the shadow root,
so it's possible to style both the light and shadow dom.
```javascript
import styled from 'masquerades';

const StyledCustomComponent = styled(CustomComponent)`
  /* some Light DOM style ... */
  :global(:host(&)) {
    /* Shadow DOM style */
    selector {
      /*...*/
    }
  }
  /* or use the styled.shadow shortcut */
  ${(props) => styled.shadow`
    /* Shadow DOM style */
    selector {
      /*...*/
    }
  `}
`

customElements.define('custom-component', StyledCustomComponent);
```
### Using Theme
Use theme configure global value for styled components.

#### Create a Theme.
```javascript
import styled, { createTheme } from 'masquerades';

const ThemeProvider = createTheme({
  primary: '#12a57a',
  accent: '#f1c40f',
});
customElements.define('theme-provider', ThemeProvider);
```
#### Use a Theme
The value of the nearest theme can be used as attribute (and props) in the styled element.
```javascript
import styled from 'masquerades';

const StyledButton = styled.button`
  /* the props theme is the value of the nearest theme provider */
  background: ${({ type = 'primary', theme }) => (theme[type])};
  color: #fff;
  border: 3px solid #fff;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font: 24px "Margarine", sans-serif;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease-in-out;
  letter-spacing: 2px;
`.observeAttributes(['disabled']);

// Define the styled button as extension of the native button
customElements.define('styled-button', StyledButton, {
  extends: 'button',
});
```
Or using the static method `valueOf` of the theme provider class.
```javascript
class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.onThemeValueChange = this.onThemeValueChange.bind(this);
  }

  connectedCallback() {
    const themeProvider = ThemeProvider.of(this);
    if (themeProvider) {
      themeProvider.addEventListener('provider-value-change', this.onThemeValueChange);
    }
  }

  onThemeValueChange() {
    const value = ThemeProvider.valueOf(this);
    // do something with the theme value
  }

  disconnectCallback() {
    const themeProvider = ThemeProvider.of(this);
    if (themeProvider) {
      themeProvider.removeEventListener('provider-value-change', this.onThemeValueChange);
    }
  }
}
```
Add the theme in the element three.
```html
<theme-provider .value=${theme1}>
    <div>
        <button is="styled-button">Styled Button With Theme1</button>
        <theme-provider .value=${theme2}>
            <button is="styled-button">Styled Button With Theme2</button>
        </theme-provider>
    </div>
</theme-provider>
```
## Pros
* works in both **Light** and **Shadow** DOM
* works with native web component (HTMLButtonElement, HTMLDivElement, ...)
* works with custom web component 
* write css in js
* no need to manage class names
* support [stylis](https://github.com/thysultan/stylis.js) css
## Compatibility
* This library uses [Constructible Style Sheets](https://wicg.github.io/construct-stylesheets/). Depending on your targets you may need to include a [polyfill](https://www.npmjs.com/package/construct-style-sheets-polyfill) for browsers that don't support them.
## Hints
### Webstorm support
For add support for stylus in styled tagged template,
in **_settings > language injections > + > new generic js_** add:
* Name: **Styled Web Components**
* Id: **Stylus**
* Prefix: `.some-class {`
* Suffix: `}`
* Places Patterns:

    ```
    + jsLiteralExpression().and(jsArgument("styled\\.", 0))
    + jsLiteralExpression().withParent(psiElement().withText(string().contains(".extend")))
    + jsLiteralExpression().withParent(psiElement().withText(string().startsWith("injectGlobal")))
    + jsLiteralExpression().withParent(psiElement().withText(string().startsWith("styled")))
    + taggedString("css")
    ```
##
_Inspired by [styled-components](https://github.com/styled-components/styled-components])_



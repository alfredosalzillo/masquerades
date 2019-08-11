# Masquerade 🎭
A library for __styled web components__.

This library is a work in progress, feel free to participate to the project.
## Why 
Styled components are easy to write and manage.
They focus only on style and anything else.

## Usage
Install via npm or yarn.
```bash
npm i masquerade
yarn add masquerade
```
import using es modules.
```javascript
import styled from 'masquerade';

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
import styled from 'masquerade';

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

// Define the styled button as extension of the native button
customElements.define('custom-component', StyledCustomComponent);

```
### Style Native Elements
Shortcut for style native components are available,
for example to style a button use `styled.button`.
```javascript
import styled from 'masquerade';

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
## Pros
* works in both **Light** and **Shadow** DOM
* works with native web component (HTMLButtonElement, HTMLDivElement, ...)
* works with custom web component 
* write css in js
* no need to manage class names
* support [stylis](https://github.com/thysultan/stylis.js) css
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



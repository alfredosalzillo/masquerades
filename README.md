# Masquerade 🎭
A library for __styled web components__.

This library is a work in progress, feel free to participate to the project.
## Why 
Styled components are easy to write and manage.
They focus only on style and anything else.

## Examples
Create a styled button
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
`.observeAttributes(['disabled']);

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
##
_Inspired by [styled-components](https://github.com/styled-components/styled-components])_



import { storiesOf } from '@open-wc/demoing-storybook';
import { component, useState } from 'haunted/lib/haunted';
import { loremIpsum } from 'lorem-ipsum';
import { html } from 'lit-html';
import styled, { createTheme } from '../src/main';

const ThemeProvider = createTheme({
  buttonBackground: '#12a57a',
});
customElements.define('theme-provider', ThemeProvider);

const StyledButton = styled.button`
  background: ${({ disabled, theme = {} }) => (
  disabled
    ? 'grey'
    : (theme.buttonBackground || '#f1c40f')
)};
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
customElements.define('styled-button', StyledButton, {
  extends: 'button',
});

const LoadingButton = styled.button`
  background: #73007a;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 55px;
  padding: 0.8rem 2rem;
  font: 18px "Margarine", sans-serif;
  height: 65px;
  outline: none;
  cursor: pointer;
  position: relative;
  letter-spacing: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: auto;
  width: 90%;
  transition: width 0.8s ease-in;
  ${(el) => el.hasAttribute('loading') && styled.css`
    width: 95px;
    animation: text-disappear 0.1s linear 0.7s;
    animation-fill-mode: forwards;
    &:after {
      content: " ";
      display: block;
      animation: lds-dual-ring 0.9s linear 0.8s infinite;
    }
    @keyframes text-disappear {
      from {
        font-size: 0;
      }
      to {
        font-size: 0;
      }
    }
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 5px solid;
        border-color: #fff transparent #fff transparent;
      }
      100% {
        transform: rotate(360deg);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 5px solid;
        border-color: #fff transparent #fff transparent;
      }
    }
`}
`.observeAttributes(['loading']);

customElements.define('loading-button', LoadingButton, {
  extends: 'button',
});

const TestButton = component(() => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };
  return html`
    <button 
      is="styled-button"
      ?disabled=${disabled}
      @click=${() => setDisabled(true)}
    >Click to Disable</button>
    <hr />
    <button 
      is="loading-button"
      ?loading=${loading}
      ?disabled=${loading}
      @click=${onLoadingClick}
    >Click to load</button>
  `;
});
customElements.define('test-button', TestButton);

const TestThemedButton = component(() => {
  const [color, setColor] = useState('#ff1100');
  return html`
    <theme-provider .value=${{ buttonBackground: color }}>
        <button 
          is="styled-button"
          @click=${() => setColor(color === '#ff1100' ? '#aa11ff' : '#ff1100')}>
            Click To Change Color  
        </button>
    </theme-provider>
  `;
});
customElements.define('test-themed-button', TestThemedButton);

const StyledDiv = styled.div`
    background: #f1c40f;
    color: #fff;
    border: 3px solid #fff;
    border-radius: 10px;
    padding: 0.8rem 2rem;
    font: 24px "Margarine", sans-serif;
    outline: none;
    position: relative;

    p {
      margin: 0.3rem;
      padding: 0;
      text-align: justify;

      :first-letter {
        initial-letter: 2;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-left: 1em;
      }

      :hover {
        font-size: 26px;
      }
    }
`;
customElements.define('styled-div', StyledDiv, {
  extends: 'div',
});

const loremInpsumForDIv = Array(15).fill(() => loremIpsum({
  count: 1,
  paragraphLowerBound: 10,
  paragraphUpperBound: 200,
})).map(fn => fn());
storiesOf('Styled element', module)
  .add(
    'button',
    () => html`
        <test-button>Click to disable</test-button>
      `,
  )
  .add(
    'div',
    () => html`
        <div is="styled-div">
          ${loremInpsumForDIv.map(paragraph => html`
            <p>${paragraph}</p>
          `)}
        </div>
      `,
  )
  .add(
    'themed button',
    () => html`
        <test-themed-button></test-themed-button>
      `,
  );

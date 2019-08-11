import { html, storiesOf } from '@open-wc/demoing-storybook';
import { component, useState } from 'haunted/lib/haunted';
import { loremIpsum } from 'lorem-ipsum';
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

const TestButton = component(() => {
  const [disabled, setDisabled] = useState(undefined);
  return html`
    <button 
      is="styled-button"
      ?disabled=${disabled || null}
      @click=${() => setDisabled(true)}
    >Click to Disable</button>
  `;
});

customElements.define('test-button', TestButton);

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
    text-align; justify;
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
        <theme-provider value=${{
          buttonBackground: '#12a57a',
        }}>
            <test-button>Click to disable</test-button>
        </theme-provider>
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
  );

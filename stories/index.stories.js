import { html, storiesOf } from '@open-wc/demoing-storybook';
import { component, useState } from 'haunted/lib/haunted';
import { loremIpsum } from 'lorem-ipsum';
import styled from '../src/main';

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
    color: black;
    width: 90vh;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    text-align: justify;
    vertical-align: central;
    font-family: "Roboto Black", serif;
    background: #ffffAA;
`;
customElements.define('styled-div', StyledDiv, {
  extends: 'div',
});

const loremInpsumForDIv = loremIpsum({
  count: 500,
});
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
            <p>${loremInpsumForDIv}</p>
        </div>
      `,
  );

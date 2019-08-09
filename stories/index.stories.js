import {
  storiesOf,
  html,
} from '@open-wc/demoing-storybook';
import { action } from '@storybook/addon-actions';
import { component, useState } from 'haunted/lib/haunted';
import { css, string } from '../src/css';
import styled from '../src/main';

const StyledButton = styled.button`
  color: white;
  width: 100px;
  height: 50px;
  background: ${({ disabled }) => (disabled ? 'grey' : 'black')};
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
  width: 100vh;
  height: 100vw;
  margin: 100px;
  background: gray; 
`;
customElements.define('styled-div', StyledDiv, {
  extends: 'div',
});

storiesOf('css template', module)
  .add(
    'test generator',
    () => {
      const className = css`
         color: black;
         width: 100px;
         height: ${100}px;
      `;
      return html`
        <div class=${className}>
          <code>
            ${string()}
          </code>        
        </div>
      `;
    },
  )
  .add(
    'button',
    () => html`
        <!-- <button is="styled-button" @click=${action('click')}>Test Button</button>
        <button is="styled-button" @click=${action('click-disabled')} disabled>Test Button</button></-->
        <test-button>Click to disable</test-button>
      `,
  )
  .add(
    'div',
    () => html`
        <div is="styled-div">
            <p>Lorem Ipsum Doler Sit Amet</p>
        </div>
      `,
  );

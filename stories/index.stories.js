import {
  storiesOf,
  html,
} from '@open-wc/demoing-storybook';
import { css, string } from '../src/css';

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
  );

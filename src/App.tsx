import type { ParentComponent } from 'solid-js';

import styles from './App.module.css';
import { A } from '@solidjs/router';
import Train from './components/icons/train';

const App: ParentComponent = (props) => {
  return (
    <div class={styles.App}>
      <nav class="border-gray-400 border-b-2 mb-10">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div id="navbar-default">
            <A
              href="/"
              class="flex items-center gap-x-2.5 text-gray-50 text-xl font-bold hover:text-gray-300 no-underline"
              activeClass="underline"
            >
              <Train />
              Train travel demo app
            </A>
          </div>
        </div>
      </nav>

      <main class="text-white max-w-screen-xl mx-auto px-4 text-left">
        {props.children}
      </main>
    </div>
  );
};

export default App;

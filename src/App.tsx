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

      <main class="text-white max-w-screen-xl mx-auto mb-10 px-4 text-left">
        {props.children}
      </main>

      <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024
            <a href="https://wiremock.io/" class="hover:underline">
              Developed and powered by WireMock
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;

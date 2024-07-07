import { JSX, Match, Switch } from 'solid-js';

const Input = (props: JSX.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Switch>
      <Match when={props.type === undefined}>
        <input
          {...props}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </Match>
      <Match when={props.type === 'checkbox'}>
        <input
          {...props}
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </Match>
    </Switch>
  );
};

export default Input;

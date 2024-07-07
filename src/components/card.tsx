import { ParentComponent } from 'solid-js';

const Card: ParentComponent = (props) => (
  <div
    class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-10"
    {...props}
  >
    {props.children}
  </div>
);

export default Card;

import {ParentComponent} from 'solid-js';

const Button: ParentComponent<{
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
}> = (props) => {
    return (
        <button
            type="button"
            class="flex gap-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            classList={{'bg-blue-300': props.disabled}}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default Button;

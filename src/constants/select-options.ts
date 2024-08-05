type TInputValue = 'textbox' | 'switcher' | 'textarea' | 'dropdown' | 'file';

const inputTypes: { label: string; value: TInputValue }[] = [
    { label: 'Textbox', value: 'textbox' },
    { label: 'Switcher', value: 'switcher' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'Dropdown', value: 'dropdown' },
    { label: 'File Image', value: 'file' },
];

export { inputTypes, TInputValue };

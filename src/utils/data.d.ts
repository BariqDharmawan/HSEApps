import { TInputValue } from '@/constants/select-options';

export interface ICategory {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type TSection = `section_${number}`;
export type IFormCategoryValues = {
    [key: TSection]: {
        title: string;
        inputs: IInitInputSection[];
    };
};

export interface IInitInputSection {
    input_label: string;
    input_type: string;
    input_dropdown: string[];
}

export type TRadioChecked = 'checked' | 'unchecked';

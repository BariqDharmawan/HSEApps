import { TInputValue } from '@/constants/select-options';

type TSection = `section_${number}`;
export type IFormCategoryValues = {
    [key: TSection]: {
        title: string;
        inputs: IInitInputSection[];
    };
};

export interface IInitInputSection {
    input_id: string;
    input_label: string;
    input_type: string;
    input_dropdown: string[];
}

export type TRadioChecked = 'checked' | 'unchecked';

export interface ICategory {id: string; label: string; created_at: Date}
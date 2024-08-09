import { TInputValue } from '@/constants/select-options';

type Tontainer = `container_${number}`;
type TSection = `section_${number}`;
export type IFormCategoryValues = {
    container_title: string;
    section: {
        title: string;
        inputs: IInitInputSection[];
    }[];
};

export interface IInitInputSection {
    input_id: string;
    input_label: string;
    input_type: TInputValue;
    input_dropdown: string[];
}

export type TRadioChecked = 'checked' | 'unchecked';

export interface ICategory {
    id: string;
    label: string;
    created_at: Date;
}

export interface IPayloadCategory {
    label: string;
    id?: string;
}

export interface IBaseCategoryField {
    inputs: IInitInputSection[];
    category_id: string;
    container_title: string;
}

export interface ICategoryFields {
    id: number;
    inputs: {title: string; inputs: IInitInputSection[]}[]
    category_id: string;
    container_title: string;
}

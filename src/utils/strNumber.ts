import { TRadioChecked } from './data';

const truncateString = (str: string, maxLength: number, suffix = '...') => {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength - suffix.length) + suffix;
};

const isCheckedOrUnchecked = (isChecked: boolean): TRadioChecked => (isChecked ? 'checked' : 'unchecked');

const generateRandomString = (length: number) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomChar = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
        result += randomChar;
    }
    return result;
};

export { truncateString, isCheckedOrUnchecked, generateRandomString };

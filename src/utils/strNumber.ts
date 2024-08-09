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

type TIndexLetter =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25;

const indexToLetter = (index: TIndexLetter) => {
    if (index < 0 || index > 25) {
        throw new Error('Index must be between 0 and 25');
    }
    return String.fromCharCode(65 + index);
};

export { truncateString, isCheckedOrUnchecked, generateRandomString, indexToLetter, TIndexLetter };

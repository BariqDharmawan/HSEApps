const truncateString = (str: string, maxLength: number, suffix = '...') => {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength - suffix.length) + suffix;
};

export { truncateString };

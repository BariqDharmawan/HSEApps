const removeAndReorderKeys = (keyToRemove: string, obj: object) => {
    // @ts-ignore
    const { [keyToRemove]: _, ...rest } = obj;

    const reorderedObj = {};
    const keys = Object.keys(rest);

    keys.sort((a, b) => {
        const aNum = parseInt(a.split('_')[1], 10);
        const bNum = parseInt(b.split('_')[1], 10);
        return aNum - bNum;
    });

    keys.forEach((key, index) => {
        // @ts-ignore
        reorderedObj[`section_${index}`] = rest[key];
    });

    return reorderedObj;
};

interface Section {
    inputs: any[][];
    title: string;
}

const resetKeys = (obj: object) => {
    const newObj = {};
    const keys = Object.keys(obj);

    keys.forEach((key, index) => {
        // @ts-ignore
        newObj[`section_${index}`] = obj[key];
    });

    return newObj;
};

export { removeAndReorderKeys, resetKeys };

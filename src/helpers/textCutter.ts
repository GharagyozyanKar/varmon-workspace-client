export const cutText = (text: string, maxL = 20) => {
    return text.length > maxL ? text.slice(0, maxL) + '...' : text
}

export const cutName = (name: string, surname: string, maxL = 10) => {
    if (!name || !surname) {
        return name || surname || '';
    }
    
    const fullName = `${name} ${surname}`;
    return fullName.length > maxL ? `${name[0]}. ${surname}` : fullName;
}
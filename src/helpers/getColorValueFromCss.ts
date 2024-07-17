
export const getColorValueFromCss = (variableName: string ="--primary"): string => {
    const p = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    return `hsl(${p.split(' ').join(',')})`
}

export const getGroup = (birthYearString: string) => {
    const birthYear = parseInt(birthYearString, 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (age <= 13) return `10-13лет (${currentYear - 13} - ${currentYear - 10})`
    if (age <= 15) return `14-15лет (${currentYear - 14} - ${currentYear - 15})`
    if (age <= 17) return `16-17лет (${currentYear - 16} - ${currentYear - 17})`
    return `18-19лет (${currentYear - 18} - ${currentYear - 19})`
}
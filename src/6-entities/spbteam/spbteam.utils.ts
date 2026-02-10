
export const getGroup = (birthYearString: string) => {
    const birthYear = parseInt(birthYearString, 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (age <= 10) return { name: 'дети' };
    if (age <= 12) return { name: '10-12', years: `${currentYear - 12} - ${currentYear - 10}` };
    if (age <= 14) return { name: '13-14', years: `${currentYear - 14} - ${currentYear - 13}` };
    if (age <= 16) return { name: '15-16', years: `${currentYear - 16} - ${currentYear - 15}` };
    if (age <= 18) return { name: '17-18', years: `${currentYear - 18} - ${currentYear - 17}` };
    return { name: 'взрослые' };
}

export const getGroup = (birthYearString: string) => {
    const birthYear = parseInt(birthYearString, 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (age <= 10) return { name: 'дети' };
    if (age <= 13) return { name: '10-13', years: `${currentYear - 13} - ${currentYear - 10}` };
    if (age <= 15) return { name: '14-15', years: `${currentYear - 15} - ${currentYear - 12}` };
    if (age <= 17) return { name: '16-17', years: `${currentYear - 17} - ${currentYear - 14}` };
    if (age <= 19) return { name: '18-19', years: `${currentYear - 18} - ${currentYear - 16}` };
    return { name: 'взрослые' };
}
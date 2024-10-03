export const isEmptyObj = (obj: object): boolean => {
    for (const _key in obj) {
      return false;
    }
    return true;
};
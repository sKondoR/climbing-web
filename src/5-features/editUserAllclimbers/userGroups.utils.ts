import { ICustomAllClimber } from "../../6-entities/user/user.interfaces";

export const reorderGroupItemsByIds = (prevArr: ICustomAllClimber[], newIdsArray: string[]): ICustomAllClimber[] => {
  if (!newIdsArray) {
    return prevArr;
  }
  return newIdsArray.map((allClimbId: string) => {
    const found = prevArr.find(item => item.allClimbId === Number(allClimbId));
    return {
      allClimbId: Number(allClimbId),
      customName: found ? found.customName : ''
    };
  });
};

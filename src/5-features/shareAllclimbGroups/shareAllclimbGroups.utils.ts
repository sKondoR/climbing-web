import { IClimberGroup } from "../../6-entities/user/user.interfaces";
import { getHostUrl } from "../../7-shared/constants/api.constants";
import { PATHS } from "../../7-shared/constants/paths.constants";

export const copyLinkToClipboard = (groups: IClimberGroup[]) => {
    const data = groups.map((group: IClimberGroup) => {
        return {
            name: group.name,
            items: group.items,
        };
    });
    const params = new URLSearchParams();
    params.append('share', JSON.stringify(data));
    const queryString = params.toString();
    return `${getHostUrl()}/${PATHS.allclimb.to}?${queryString}`;
};
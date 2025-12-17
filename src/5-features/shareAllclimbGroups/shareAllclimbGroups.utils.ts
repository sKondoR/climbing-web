import { IClimberGroup } from '../../6-entities/user/user.interfaces';
import { compressToUTF16 } from 'lz-string';
import { getHostUrl } from '../../7-shared/constants/api.constants';
import { PATHS } from '../../7-shared/constants/paths.constants';

export const copyLinkToClipboard = async (groups: IClimberGroup[]) => {
    const data = groups.map((group: IClimberGroup) => ({
        name: group.name,
        items: group.items,
    }));
    const params = new URLSearchParams();
    params.append('share', JSON.stringify(data));
    const jsonString = JSON.stringify(params);
    const compressed = compressToUTF16(jsonString);
    await navigator.clipboard.writeText(`${getHostUrl()}/${PATHS.allclimb.to.replace('/', '')}?q=${compressed}`);
};
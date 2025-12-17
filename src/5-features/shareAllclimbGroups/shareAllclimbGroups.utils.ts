import { IClimberGroup } from '../../6-entities/user/user.interfaces';
import { compressToBase64 } from 'lz-string';
import { getHostUrl } from '../../7-shared/constants/api.constants';
import { PATHS } from '../../7-shared/constants/paths.constants';

export const copyLinkToClipboard = async (groups: IClimberGroup[]) => {
    const data = groups.map((group: IClimberGroup) => ({
        name: group.name,
        items: group.items,
    }));
    const jsonString = JSON.stringify(data);
    const compressed = compressToBase64(jsonString);
    const urlSafeCompressed = compressed.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    await navigator.clipboard.writeText(`${getHostUrl()}/${PATHS.allclimb.to.replace('/', '')}?q=${urlSafeCompressed}`);
};
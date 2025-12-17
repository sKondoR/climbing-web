import { IClimberGroup } from '../../6-entities/user/user.interfaces';
import { compressToEncodedURIComponent } from 'lz-string';
import { getHostUrl } from '../../7-shared/constants/api.constants';

export const copyLinkToClipboard = async (groups: IClimberGroup[]) => {
    const data = groups.map((group: IClimberGroup) => ({
        name: group.name,
        items: group.items,
    }));
    const params = new URLSearchParams();
    params.append('share', JSON.stringify(data));
    const jsonString = JSON.stringify(params);
    const compressed = compressToEncodedURIComponent(jsonString);
    await navigator.clipboard.writeText(`${getHostUrl}/?q=${compressed}`);
};
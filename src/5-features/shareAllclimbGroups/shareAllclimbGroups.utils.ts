import { IClimberGroup } from '../../6-entities/user/user.interfaces';
import { compressToEncodedURIComponent } from 'lz-string';

export const copyLinkToClipboard = async (groups: IClimberGroup[]) => {
    const data = groups.map((group: IClimberGroup) => ({
        name: group.name,
        items: group.items,
    }));
    const params = new URLSearchParams();
    params.append('share', JSON.stringify(data));
    const jsonString = JSON.stringify(params);
    await navigator.clipboard.writeText(compressToEncodedURIComponent(jsonString));
};
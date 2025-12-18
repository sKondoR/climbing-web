import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { compressToEncodedURIComponent } from 'lz-string';

import { IClimberGroup } from '../../6-entities/user/user.interfaces';
import { useNotificationsStore } from '../../6-entities/notification/notification.store';
import { getHostUrl } from '../../7-shared/constants/api.constants';
import { PATHS } from '../../7-shared/constants/paths.constants';

export interface ShareAllclimbGroupsState {
  copyLinkToClipboard: (groups: IClimberGroup[]) => void;
}

export const useShareAllclimbGroupsStore = create<ShareAllclimbGroupsState>()(
  devtools(
    (_set) => ({
      copyLinkToClipboard: async (groups: IClimberGroup[]) => {
        const data = groups.map((group: IClimberGroup) => ({
            name: group.name,
            items: group.items,
        }));
        const jsonString = JSON.stringify(data);
        const compressed = compressToEncodedURIComponent(jsonString);
        await navigator.clipboard.writeText(`${getHostUrl()}/${PATHS.allclimb.to.replace('/', '')}?q=${compressed}`);
        useNotificationsStore.getState().addNotification({
          type: 'info',
          message: 'Ссылка на группы скалолазов скопированна',
          delay: 3000,
        });
      },
    })
  )
)


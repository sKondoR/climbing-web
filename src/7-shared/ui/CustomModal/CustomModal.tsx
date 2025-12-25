import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from '@material-tailwind/react';

export type ICustomDialog = {
    title?: string;
    defaultOpen: boolean;
    className?: string;
    children?: React.ReactNode | string;
  };

const CustomDialog = ({
  title,
  defaultOpen = false,
  className = '',
  children,
  
}: ICustomDialog) => {
  const [open] = useState(defaultOpen);

  return (
    <>
      <Dialog open={defaultOpen}>
        <Dialog.Overlay>
          <Dialog.Content>
            {title || null}
            <hr />
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog>

      {/* <Dialog open={open} size="md">
        <DialogContent className={`rounded-none bg-slate-300/90 focus-visible:outline-none focus-visible:ring-0 ${className}`}>
          {title || null}
          <hr />
          {children}
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default CustomDialog;

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@material-tailwind/react';

export type ICustomDialog = {
    title?: string;
    defaultOpen: boolean;
    className?: string;
    children?: React.ReactNode | string;
  };

const CustomDialog = ({
  defaultOpen = false,
  className,
  children,
}: ICustomDialog) => {
  const [open] = useState(defaultOpen);

  return (
    <>
      <Dialog open={open}>
        <DialogContent className={`rounded-none bg-lime-300/90 focus-visible:outline-none focus-visible:ring-0 ${className}`}>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomDialog;

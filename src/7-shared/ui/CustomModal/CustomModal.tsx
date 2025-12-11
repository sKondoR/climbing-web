import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@material-tailwind/react';

export type ICustomDialog = {
    title: string;
    defaultOpen: boolean;
    children?: React.ReactNode | string;
  };

const CustomDialog = ({
  defaultOpen = false,
  children,
}: ICustomDialog) => {
  const [open] = useState(defaultOpen);

  return (
    <>
      <Dialog open={open}>
        <DialogContent className="rounded-none bg-lime-300/90 focus-visible:outline-none focus-visible:ring-0">
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomDialog;

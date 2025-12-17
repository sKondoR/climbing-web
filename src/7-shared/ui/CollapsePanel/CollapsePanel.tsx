import { useState } from 'react';
import { Collapse } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface CollapsePanelProps {
  open: boolean;
  label: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function CollapseDemo({
  open,
  label,
  children,
  icon,
  className = '',
}: CollapsePanelProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(open);
  
  const setIsOpen =  () => {
    setUncontrolledOpen((prev) => !prev);
  };


  return (
    <>
      <div onClick={setIsOpen} className={`flex justify-between cursor-pointer ${className}`}>
        <h3 className="text-xl">
          {icon}{label}
        </h3>
        <FontAwesomeIcon
          icon={uncontrolledOpen ? faCaretDown : faCaretUp}
          className="mt-2"
        />
      </div>
      <Collapse open={uncontrolledOpen}>
        {children}
      </Collapse>
    </>
  );
}
import { useState } from 'react';
import { Collapse, List } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface CollapsePanelProps {
  open: boolean;
  label: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function CollapseDemo({
  open,
  label,
  children,
  icon,
}: CollapsePanelProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(open);
  
  const setIsOpen =  () => {
    setUncontrolledOpen((prev) => !prev);
  };


  return (
    <List>
      <List.Item onClick={setIsOpen}>
        {icon}{label}
        <List.ItemEnd>
          <FontAwesomeIcon
            icon={uncontrolledOpen ? faCaretDown : faCaretUp}
          />
        </List.ItemEnd>
      </List.Item>
      <Collapse open={uncontrolledOpen}>
        {children}
      </Collapse>
    </List>
  );
}
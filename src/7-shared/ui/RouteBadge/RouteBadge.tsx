import { GRADES_COLORS } from "../../constants/routes.constants";

export type IRouteBadge = {
  grade: string;
};

const RouteBadge = ({
  grade, 
}: IRouteBadge) => {
  const bg = GRADES_COLORS[grade.slice(0, 2)];
  return (
    <span className="w-16 h-8 mr-1 inline-block text-center text-white bold" style={{ background: bg }}>{grade}</span>
  );
};

export default RouteBadge;

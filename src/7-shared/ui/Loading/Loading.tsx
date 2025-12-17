import { Spinner } from '@material-tailwind/react';

const Loading = ({ text }: { text: string }) => {
  return <div className="flex align-items">
    <Spinner className="mr-5 text-lg"/>{text || 'загрузка...'}
  </div>;
}
  
export default Loading
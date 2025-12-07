// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LoadingIcon  from './LoadingIcon'

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (<>
      <div className="flex flex-row justify-center mt-10">
        Идет загрузка данных...
      </div>
      <div className="flex flex-row justify-center mt-3">
        <LoadingIcon />
      </div>
    </>
  )
}
  
export default Loading
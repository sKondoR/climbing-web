
import Spinner from '@material-tailwind/react/dist/components/spinner';
import CustomModal from '../../7-shared/ui/CustomModal/CustomModal';

const SignIn = () => {
    return (
    <div>
      <div className="flex flex-row justify-center">
      </div>
    <CustomModal
      defaultOpen={true}
    >
      <div className="flex px-10 py-10 justify-center">
        <div className="flex align-items"><Spinner className="mr-5 text-lg"/>
          Пожалуйста дождитесь окончания запроса профиля пользователя ВК...
        </div>
      </div>
    </CustomModal>
    </div>)
}
  
export default SignIn
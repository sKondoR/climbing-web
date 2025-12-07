// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Loading  from '../../7-shared/ui/Loading/Loading'

const SignIn = () => {
    return (
    <div>
      <div className="flex flex-row justify-center">
        <h3 className="m-6">Пожалуйста дождитесь окончания запроса профиля пользователя ВК</h3>
      </div>
      <Loading />
    </div>)
}
  
export default SignIn
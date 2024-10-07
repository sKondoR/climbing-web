// @ts-ignore
import Loading  from '../../components/Loading/Loading'

const SignIn = () => {
    return (
    <div>
      <div className="flex flex-row justify-center">
        <h3 className="m-6">Пожалуйста дождитесь окончания запроса профиля пользователя ВК</h3>
      </div>
      <div className="flex flex-row justify-center">
        <div className="loading">
          <Loading />
        </div>
      </div>
    </div>)
}
  
export default SignIn
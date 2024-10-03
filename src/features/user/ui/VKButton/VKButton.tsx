import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { isEmptyObj } from '../../user.utils'
import { useUserStore } from '../../user.store';

const VKButton: React.FC = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const [isError, setIsError] = useState(false);
  const { vkUser, loginVk, logoutVk } = useUserStore()

  const cbLink = `https://climbing-web.vercel.app`;

  const handleRedirect = () => {
      window.location.href = `https://oauth.vk.com/authorize?client_id=${import.meta.env.VITE_VK_APP_CLIENT_ID}&display=popup&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.120&state=4194308`;
  };

  console.log('<<<', params)
  useEffect(() => {
    const handleLogin = (code: string): void => {
      loginVk(code)
          .then(() => {
              navigate('/user');
          })
          .catch(() => setIsError(true));
    };

    const queryObj = queryString.parse(params.search || '');

    if (isError) window.location.href = cbLink;

    if (!isEmptyObj(queryObj) && queryObj['code']) handleLogin(queryObj['code'] as string);
  }, [params.search, isError, cbLink, navigate, loginVk]);

  const handleLogout = () => {
    logoutVk()
    navigate('/')
  };

  if (vkUser) {
    return (
      <div>
        <img
          src={vkUser.avatar_url as string}
          alt="vk avatar"
        />
          <p>{vkUser.name}</p>
        <button
          onClick={handleLogout}
        >
          Выйти
        </button>
      </div> 
    )
  }

  return (
    <div>
      <button onClick={handleRedirect}>
        Войти через Вконтакте
      </button>
      {isError && <p>Ошибка входа через ВК</p>}
    </div>
  );
};

export default VKButton;
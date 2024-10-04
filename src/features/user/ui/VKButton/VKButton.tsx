import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../user.store';

const VKButton: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isError, setIsError] = useState(false);
  const { vkUser, loginVk, logoutVk } = useUserStore()

  const cbLink = `${import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL : import.meta.env.VITE_APP_HOST}signin`;

  const handleRedirect = () => {
      window.location.href = `https://oauth.vk.com/authorize?client_id=${import.meta.env.VITE_VK_APP_CLIENT_ID}&display=popup&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.120&state=4194308`;
  };

  useEffect(() => {
    const handleLogin = (code: string): void => {
      loginVk(code)
          .then(() => {
              navigate('/user');
          })
          .catch(() => setIsError(true));
    };

    const code = new URLSearchParams(search).get('code');

    if (isError) window.location.href = cbLink;

    if (code) handleLogin(code);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
      <button
        className="bg-blue-600 text-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 p-3"
        onClick={handleRedirect}
      >
        VK
      </button>
      {isError && <p>Ошибка входа через ВК</p>}
    </div>
  );
};

export default VKButton;
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as VKID from '@vkid/sdk';

import { useUserStore } from '../../user.store';

const redirect_url = `${import.meta.env.VITE_APP_HOST}signin`;

VKID.Config.init({
  app: import.meta.env.VITE_VK_APP_CLIENT_ID,
  redirectUrl: redirect_url,
  state: 'dj29fnsadjsd82',
  codeVerifier: 'FGH767Gd65',
  scope: 'email phone',
  mode: VKID.ConfigAuthMode.Redirect
});

const VKButton: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isError, setIsError] = useState(false);
  const { vkUser, loginVk, logoutVk } = useUserStore()

  const handleClick = () => {
    VKID.Auth.login()
  }

  useEffect(() => {
    const handleLogin = (code: string): void => {
      loginVk(code)
          .then(() => {
              // navigate('/user');
          })
          .catch(() => setIsError(true));
    };

    const code = new URLSearchParams(search).get('code');
    const ext_id = new URLSearchParams(search).get('ext_id');
    // const device_id = new URLSearchParams(search).get('device_id');

    // const tokens = VKID.Auth.exchangeCode(code as string, device_id as string).then((res));
    const user = VKID.Auth.userInfo(code as string);
    console.log('1>>> ', user);
    const user2 = VKID.Auth.userInfo(ext_id as string);
    console.log('2>>> ', user2);

    if (isError) window.location.href = redirect_url;

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
        onClick={handleClick}
      >
        VK
      </button>
      {isError && <p>Ошибка входа через ВК</p>}
    </div>
  );
};

export default VKButton;
import { useEffect, useState, useCallback, Key } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as VKID from '@vkid/sdk';

import { useUserStore } from '../../../../6-entities/user/user.store';
import { IVKCodeData } from '../../../../6-entities/user/user.interfaces'

const redirectUrl = `https://localhost/signin`;

const code_verifier = '6ixyBpFRrwlCYVbTnOSIKcXtkf3kVFrw85c1plyjQMA';
const code_challenge = 'ZIeAepRCsDwcBF_iv35iRlMIEjb0UT2N5BxhLZHQO9U';

type LocationState = string | URLSearchParams | Record<string, string> | string[][] | undefined

const VKButton: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isError, setIsError] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const { vkUser, loginVk, logoutVk } = useUserStore()

  const isCodeInUrl = !!new URLSearchParams(search).get('code');

  useEffect(() => {
    VKID.Config.init({
      app: import.meta.env.VITE_VK_APP_CLIENT_ID,
      redirectUrl,
      codeChallenge: code_challenge,
      mode: VKID.ConfigAuthMode.Redirect,
    });
  }, []);

  const handleClick = useCallback(() => {
    setIsError(false);
    setIsEntering(true);
    VKID.Auth.login().catch((err: unknown) => {
      console.error('VK Auth error:', err);
      setIsError(true);
      setIsEntering(false);
    });
  }, []);

  useEffect(() => {
    const handleLogin = (data: IVKCodeData): void => {
      loginVk(data)
          .then(() => {
              navigate('/allclimb', { replace: true });
          })
          .catch((err: Error) => console.log('error: ', err));
    };

    const fetchToken = async (search: LocationState) => {
      const params = new URLSearchParams(search);
      const code = params.get('code');
      const deviceId = params.get('device_id');
      const state = params.get('state');
  
      if (!code || !deviceId || !state || isLogging) return;
      if (isError) window.location.href = redirectUrl;
      setIsLogging(true);
      handleLogin({ code, device_id: deviceId, state, code_verifier });
    }

    fetchToken(search as LocationState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleLogout = () => {
    logoutVk();
    navigate('/');
  };

  if (vkUser) {
    return (
      <div className="flex align-middle text-white">
        <img
          className="w-10 h-10 rounded-full"
          src={vkUser.avatar_url as string}
          alt="vk avatar"
        />
        <div
          className="text-left leading-none ml-2 mr-2 mt-1"
          style={{ textAlign: 'left' }}>{vkUser.name?.split(' ').map((v: string, i: Key) => (<div key={i}>{v}</div>))}
        </div>
        <div
          className="text-white hover:text-orange-500 cursor-pointer"
          onClick={handleLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div> 
    )
  }

  return (
    <div className="flex align-middle text-white">
      <button
        className="w-10 h-10 rounded-full py-1 px-2 bg-white/40 text-white hover:bg-white hover:text-indigo-900 text-bold"
        onClick={handleClick}
        disabled={isCodeInUrl}
      >
        {!isEntering ? 'VK' : <div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>}
      </button>
      {isError && <p>Ошибка входа через ВК</p>}
    </div>
  );
};

export default VKButton;
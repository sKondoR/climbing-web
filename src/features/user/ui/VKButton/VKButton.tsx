import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as VKID from '@vkid/sdk';

import { useUserStore } from '../../user.store';
import { IVKCodeData } from '../../user.interfaces'

const redirect_url = `${import.meta.env.VITE_APP_HOST}signin`;
const code_verifier = '6ixyBpFRrwlCYVbTnOSIKcXtkf3kVFrw85c1plyjQMA';
const code_challenge = 'ZIeAepRCsDwcBF_iv35iRlMIEjb0UT2N5BxhLZHQO9U';

type LocationState = string | URLSearchParams | Record<string, string> | string[][] | undefined
// interface TokenResponse {
//   id_token: string;
// }

let firstFetch = 0;

const VKButton: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isError] = useState(false);
  const { vkUser, loginVk, logoutVk } = useUserStore()

  VKID.Config.init({
    app: import.meta.env.VITE_VK_APP_CLIENT_ID,
    redirectUrl: redirect_url,
    // codeVerifier: code_verifier,
    codeChallenge: code_challenge,
    mode: VKID.ConfigAuthMode.Redirect,
  });

  const handleClick = () => {
    VKID.Auth.login().catch(console.error);
  }

  useEffect(() => {
    const handleLogin = (data: IVKCodeData): void => {
      loginVk(data)
          .then(() => {
              // navigate('/user');
          })
          .catch((err: Error) => console.log('error: ', err));
    };

    const fetchToken = async (search: LocationState) => {
      const code = new URLSearchParams(search).get('code');
      const device_id = new URLSearchParams(search).get('device_id');
      const state = new URLSearchParams(search).get('state');
  
      if (code && device_id && state && !firstFetch) {
        firstFetch = 1;
        console.log('code:', code)
        console.log('device_id: ', device_id)
        console.log('state: ', state)
    
        if (isError) window.location.href = redirect_url;
  
        // working code for getting VK Tokens

        // const queryParamsString = `grant_type=authorization_code&redirect_uri=${redirect_url}`+
        // `&code_verifier=${code_verifier}`+
        // `&client_id=${import.meta.env.VITE_VK_APP_CLIENT_ID}&device_id=${device_id}&state=${state}`;

        // let tokens: TokenResponse | undefined;

        // try {
        //   const response = await fetch('https://id.vk.com/oauth2/auth?'.concat(queryParamsString), {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: new URLSearchParams({ code: code }).toString(),
        //   });
      
        //   if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        //   }
      
        //   // Assuming the API returns a JSON response
        //   const data = await response.json() as TokenResponse;
        //   tokens = data;
        // } catch (err) { // 'any' type for error to access 'message' property
        //   console.log('err>>> ', err);
        // }

        // working code for getting VK User
      
        // if (tokens) {
        //   const user = VKID.Auth.publicInfo(tokens.id_token); // Assuming VKID.Auth.publicInfo is a method
        //   console.log('user!!!!> ', user);
        // }
          
        if (code) handleLogin({ code, device_id, state, code_verifier });
      }
    }

    fetchToken(search as LocationState);
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
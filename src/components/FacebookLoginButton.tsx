import React from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton as FBStyledButton } from 'react-social-login-buttons'; // This gives the styled Facebook button UI

interface Props {
  setUser: (user: any) => void;
}

const FacebookLoginButton: React.FC<Props> = ({ setUser }) => {
  const handleLoginSuccess = ({ data }: any) => {
    console.log('Facebook login success:', data);
    setUser(data);
  };

  const handleLoginFailure = (error: any) => {
    console.error('Facebook login failed:', error);
  };

  return (
    <LoginSocialFacebook
      appId="1171119880970536" // Replace with actual App ID
      onResolve={handleLoginSuccess}
      onReject={handleLoginFailure}
    >
      <FBStyledButton />
    </LoginSocialFacebook>
  );
};

export default FacebookLoginButton;

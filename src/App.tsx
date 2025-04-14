import './App.scss'
import { FC, ReactElement, Suspense, lazy, useEffect, useState } from 'react';
import { ErrorBoundary, Menu } from 'components';
import {  RootState } from 'store/store';
import { useSelector } from 'react-redux';
import Loader from 'components/Loader/Loader';
import NotFound from "components/NotFound/NotFound";
import { Grid, ThemeProvider } from '@mui/material';
import { customTheme } from './Themse/customTheme';
import {applyThemeConfig} from './utils/helpers';
import {Footer} from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const AlertDialog = lazy(() => import("components/common/AlertDialog"));
const Router = lazy(() => import("router/Router"));

const App: FC = (): ReactElement => {
  const error = useSelector((state: RootState) => state.error);
  const alert = useSelector((state: RootState) => state.alert);
  const loader = useSelector((state: RootState) => state.loader);
  const [themeConfig, setThemeConfig] = useState({} as any);
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (response: any) => {
    setUser(response);
    console.log('Login Success:', response);
  };

  const handleLoginFailure = () => {
    console.error('Login Failed');
  };

  useEffect(()=>{  
    if (window?.headerResponse && window?.headerResponse?.themeConfig) {
      applyThemeConfig(window?.headerResponse?.themeConfig, setThemeConfig);
    }
  },[])
  return (
    <GoogleOAuthProvider clientId="720839136998-9dc2qjvsviq894c69ofhkn07endlkq8o.apps.googleusercontent.com">
      <ThemeProvider theme={customTheme(themeConfig)}>
        <Suspense fallback={<Loader oMessage={"Loading...."} />}>
          <ErrorBoundary>
            <Header />
            <Grid container>
              <Grid item width="20%">
                <Menu />
              </Grid>
              <Grid item width="75%" style={{ marginBottom: '60px' }}>
                {error.isPageNotFound && <NotFound />}
                {(loader?.isLoading) && (!error?.isPageNotFound) && 
                <Loader oMessage={"Loading...."} />}
                {alert?.show && <AlertDialog {...alert}></AlertDialog>}
                {!error.isPageNotFound && (
                  <main>
                    {user ? (
                      <div>Welcome, {user.name}</div>
                    ) : (
                      <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                      />
                    )}
                    <Router />
                  </main>
                )}
              </Grid>
            </Grid>
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};
export { App };

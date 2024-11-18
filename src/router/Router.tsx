import { FC } from 'react';
import {Route, Routes} from 'react-router-dom';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import {
  DefaultPage
} from 'pages';

const Router: FC = () => (  
  <Routes>
    <Route path={ROUTE_CONSTANTS.DEFAULT_PAGE} element={<DefaultPage />} />
  </Routes>
);
export default Router;
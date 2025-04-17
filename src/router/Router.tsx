import { FC } from 'react';
import {Route, Routes} from 'react-router-dom';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import {
  Home,
  Dashboard,
  Trips,
  Users,
  Expenses,
  Settings,
} from 'pages';
import { AddTrip } from 'components/Trips/AddTrip/AddTrip';
import TripDetails from 'components/Trips/TripDetails/TripDetails';
import { UserDetails } from 'components/UserAndControlsComponent/UserDetails/UserDetails';
import { AddUser } from 'components/UserAndControlsComponent/AddUser/AddUser';
import { Budgets } from 'pages/Budgets/Budgets';
import { AddBudget } from 'components/BudgetsControl/AddBudget/AddBudget';
import BudgetDetails from 'components/BudgetsControl/BudgetDetails/BudgetDetails';

const Router: FC = () => (  
  <Routes>
    <Route path={ROUTE_CONSTANTS.HOME} element={<Home />} />
    <Route path={ROUTE_CONSTANTS.DASHBOARD} element={<Dashboard />} />
    <Route path={ROUTE_CONSTANTS.TRIPS} element={<Trips/>} />
    <Route path={ROUTE_CONSTANTS.EXPENSES} element={<Expenses />} />
    <Route path={ROUTE_CONSTANTS.ADDTRIP} element={<AddTrip />} />
    <Route path={ROUTE_CONSTANTS.TRIPDETAILS} element={<TripDetails />} />
    <Route path={ROUTE_CONSTANTS.USERS} element={<Users />} />
    <Route path={ROUTE_CONSTANTS.USERDETAILS} element={<UserDetails />} />
    <Route path={ROUTE_CONSTANTS.ADDUSER} element={<AddUser />} />
    <Route path={ROUTE_CONSTANTS.BUDGETS} element={<Budgets />} />
    <Route path={ROUTE_CONSTANTS.ADDBUDGET} element={<AddBudget />} />
    <Route path={ROUTE_CONSTANTS.BUDGETDETAILS} element={<BudgetDetails />} />
    <Route path={ROUTE_CONSTANTS.SETTINGS} element={<Settings />} />
  </Routes>
);
export default Router;
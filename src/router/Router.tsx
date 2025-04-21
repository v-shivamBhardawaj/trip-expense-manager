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
import User from 'components/SettingLayout/User/User';
import Departments from 'components/SettingLayout/Departments/Departments';
import RolesAndPermissions from 'components/SettingLayout/RolesAndPermissions/RolesAndPermissions';
import OrganizationProfile from 'components/SettingLayout/OrganizationProfile/OrganizationProfile';
import Currencies from 'components/SettingLayout/Currencies/Currencies';
import Taxes from 'components/SettingLayout/Taxes/Taxes';
import Tags from 'components/SettingLayout/Tags/Tags';
import Subscription from 'components/SettingLayout/Subscription/Subscription';
import ReportAutomation from 'components/SettingLayout/ReportAutomation/ReportAutomation';
import WorkflowRules from 'components/SettingLayout/WorkflowRules/WorkflowRules';
import Actions from 'components/SettingLayout/Actions/Actions';
import Schedules from 'components/SettingLayout/Schedules/Schedules';

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
    <Route path={ROUTE_CONSTANTS.USER} element={<User />} />
    <Route path={ROUTE_CONSTANTS.DEPARTMENTS} element={<Departments />} />
    <Route path={ROUTE_CONSTANTS.ROLESANDPERMISSIONS} element={<RolesAndPermissions />} />
    <Route path={ROUTE_CONSTANTS.ORGANIZATIONPROFILE} element={<OrganizationProfile />} />
    <Route path={ROUTE_CONSTANTS.CURRENCIES} element={<Currencies />} />
    <Route path={ROUTE_CONSTANTS.TAXES} element={<Taxes />} />
    <Route path={ROUTE_CONSTANTS.TAGS} element={<Tags />} />
    <Route path={ROUTE_CONSTANTS.SUBSCRIPTION} element={<Subscription />} />
    <Route path={ROUTE_CONSTANTS.REPORTAUTOMATION} element={<ReportAutomation />} />
    <Route path={ROUTE_CONSTANTS.WORKFLOWRULES} element={<WorkflowRules />} />
    <Route path={ROUTE_CONSTANTS.ACTIONS} element={<Actions />} />
    <Route path={ROUTE_CONSTANTS.SCHEDULES} element={<Schedules />} />
  </Routes>
);
export default Router;
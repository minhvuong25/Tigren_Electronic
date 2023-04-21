import MyPage from './components/MyPagxe';
import RestrictedRoute from './RootComponents/RestrictedRoute';
import LoginPage from '../src/components/LoginPage/LoginPage';

const routes = [
    {
        path: '/my-page',
        component: MyPage,
        exact: true
    }
];
// <Route
//     exact
//     path="../node_modules/@magento/venia-ui/lib/components/App"
//     component={LoginPage}
// />;
export default routes;

import * as RouteUtils from 'routes/route_utils.jsx';

export default {
    path: 'dashboard',
    getComponents: (location, callback) => {
        System.import('components/DashBoard/Dashboard.jsx').then(RouteUtils.importComponentSuccess(callback));
    },
    // getChildRoutes: RouteUtils.createGetChildComponentsFunction(
    //     [
    //         {
    //             path: 'setup',
    //             getComponents: (location, callback) => {
    //                 System.import('components/mfa/components/setup.jsx').then(RouteUtils.importComponentSuccess(callback));
    //             }
    //         },
    //         {
    //             path: 'confirm',
    //             getComponents: (location, callback) => {
    //                 System.import('components/mfa/components/confirm.jsx').then(RouteUtils.importComponentSuccess(callback));
    //             }
    //         }
    //     ]
    // )
};

/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */
import React from 'react';
import { Route, Redirect } from '@magento/venia-drivers';
import { useUserContext } from '@magento/peregrine/lib/context/user';

const RestrictedRoute = ({ component: Component, ...rest }) => {
    const { isSignedIn } = useUserContext();

    return (
        <Route
            {...rest}
            render={props =>
                isSignedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default RestrictedRoute;

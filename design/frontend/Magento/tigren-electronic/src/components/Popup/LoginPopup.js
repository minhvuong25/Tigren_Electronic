/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React, { useCallback, useState } from 'react';
import './LoginPopup.css';
import { useLoginPopup } from '../../talons/Popup/useLoginPopup';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const storage = new BrowserPersistence();

const LoginPopup = props => {
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const handleEmailChange = e => {
        setEmail(e.target.value);
    };
    const signinFail = () => {
        setIsLoginFailed(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const talonProps = useLoginPopup({ closePopup, signinFail });
    const { handleSubmit, statusPopupShow } = talonProps;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    return (
        <>
            {statusPopupShow && storage.getItem('isLoggedIn') && (
                <div>
                    {isPopupOpen && (
                        <div className="popup">
                            <div className="popup-inner">
                                <button
                                    className="close-btn"
                                    onClick={() => {
                                        closePopup();
                                    }}
                                >
                                    . X
                                </button>
                                <h1>Login</h1>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Email:
                                        <input
                                            aria-required={'true'}
                                            id={'email'}
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </label>
                                    <label>
                                        Password:
                                        <input
                                            aria-required={'true'}
                                            id={password}
                                            type="text"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </label>
                                    {isLoginFailed && (
                                        <p style={{ color: 'red' }}>
                                            Đăng nhập thất bại
                                        </p>
                                    )}
                                    <button type="submit">Login</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
export default LoginPopup;

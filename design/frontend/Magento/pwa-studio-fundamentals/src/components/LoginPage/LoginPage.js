import React, { useState } from 'react';
import { useForm } from '@magento/peregrine';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { Form } from 'informed';

const LoginPage = () => {
    console.log('success');
    // const { handleSubmit, isSubmitting, errors } = useForm({
    //     initialValues: {
    //         email: '',
    //         password: ''
    //     },
    //     onSubmit: values => {
    //         // Handle form submission here
    //     }
    // });

    const [errorMessage, setErrorMessage] = useState(null);

    const { redirectToReturnUrl } = useUserContext();

    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        aria-required="true"
                    />
                </div>
                {/*{errorMessage && <div>{errorMessage}</div>}*/}
                <button
                    type="submit"
                    // disabled={isSubmitting}
                >
                    Log In
                </button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
};

export default LoginPage;

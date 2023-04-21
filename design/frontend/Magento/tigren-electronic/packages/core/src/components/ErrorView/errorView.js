import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { func, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@magento/venia-ui/lib/components/Button';

import defaultClasses from './errorView.module.css';
import errorImage from './errorView.png';

const DEFAULT_HEADER =
    'Sorry, the page you were looking for could not be found.';
const DEFAULT_MESSAGE =
    'Please click the button below to return to the main page.';
const DEFAULT_PROMPT = 'Back to Homepage';

const ErrorView = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const history = useHistory();

    const handleGoHome = useCallback(() => {
        history.push('/');
    }, [history]);

    const {
        header = (
            <FormattedMessage
                id={'errorView.header'}
                defaultMessage={DEFAULT_HEADER}
            />
        ),
        buttonPrompt = (
            <FormattedMessage
                id={'errorView.goHome'}
                defaultMessage={DEFAULT_PROMPT}
            />
        ),
        onClick = handleGoHome
    } = props;

    const message = (
        <FormattedMessage
            id={'errorView.message'}
            defaultMessage={DEFAULT_MESSAGE}
        />
    );

    const handleClick = useCallback(() => {
        onClick && onClick();
    }, [onClick]);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <img src={errorImage} alt="404" />
                <p className={classes.header}>{header}</p>
                <p className={classes.message}>{message}</p>
                <div className={classes.actionsContainer}>
                    <Button
                        priority="danger"
                        type="button"
                        onClick={handleClick}
                    >
                        {buttonPrompt}
                    </Button>
                </div>
            </div>
        </div>
    );
};

ErrorView.propTypes = {
    header: string,
    message: string,
    buttonPrompt: string,
    onClick: func,
    classes: shape({
        root: string,
        content: string,
        errorCode: string,
        header: string,
        message: string,
        actionsContainer: string
    })
};

export default ErrorView;

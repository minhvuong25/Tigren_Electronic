module.exports = targetables => {
    const createAccountComponent = targetables.reactComponent(
        '@tigrensolutions/core/src/components/CreateAccount/createAccount.js'
    );
    createAccountComponent.addImport(
        `extendClasses from 'src/components/CreateAccount/createAccount.module.css'`
    );
    createAccountComponent.addImport(
        `{ usePassword } from '@tigrensolutions/core/src/talons/Password/usePassword';`
    );
    createAccountComponent.addImport(`{ Eye } from 'react-feather';`);
    createAccountComponent.addImport(`{ EyeOff } from 'react-feather';`);
    createAccountComponent
        .insertAfterSource(`defaultClasses, props.classes`, ', extendClasses')
        .insertBeforeSource(
            `<Field
                    label={formatMessage({
                        id: 'global.firstName',`,
            `
                        <div className={classes.nameGroup}>`
        )
        .insertBeforeSource(
            `<Field
                    label={formatMessage({
                        id: 'global.telephone',`,
            `</div>`
        )
        .insertBeforeSource(
            `isToggleButtonHidden={true}`,
            `isToggleButtonHidden={false}`,
            {
                remove: 27
            }
        )
        .insertBeforeSource(
            `const genderOption = [`,
            `
        const {
        handleBlur,
        togglePasswordVisibility,
        visible,
        handleChangePassword,
        passwordText
    } = usePassword();
        const passwordButton = (
        <Button
            className={classes.passwordButton}
            onClick={togglePasswordVisibility}
            type="button"
        >
            {visible ? <Eye /> : <EyeOff />}
        </Button>
    );
        const fieldType = visible ? 'text' : 'password';`
        )
        .insertBeforeSource(
            `type="password"
                        placeholder={formatMessage({
                            id: 'global.confirmPassword',
                            defaultMessage: 'Confirm Password'
                        })}`,
            `
             after={passwordButton}
             type={fieldType}
             `,
            {
                remove: 15
            }
        );
};

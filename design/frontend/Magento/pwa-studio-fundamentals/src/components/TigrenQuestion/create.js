import React from 'react';
import { useQuestion } from '../../talons/useQuestion';
import { Form } from 'informed';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import Field from '@magento/venia-ui/lib/components/Field';
import Button from 'node_modules/@magento/venia-ui/lib/components/Button';

const create = () => {
    const h1 = {
        textAlign: 'center',
        margin: '1rem'
    };
    let ip1 = {
        width: '100%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-lock'
        // border-radius: '4px',
        // box-sizing: 'border-box'
    };
    let ip2 = {
        width: '100%', //  background-color: '#4CAF50',
        color: 'white',
        padding: '14px 20px',
        margin: '8px 0',
        border: 'none'
        // border-radius: '4px',
        // cursor: 'pointer',
    };
    const talonProps = useQuestion();
    const { handleCreateQuestion } = talonProps;
    return (
        <div>
            <Form onSubmit={handleCreateQuestion}>
                <h1 style={h1}>Create Question</h1>
                <label>Title</label>
                <Field id="title">
                    <TextInput
                        required
                        id="title"
                        autoComplete="title"
                        field="title"
                        data-cy="title"
                    />
                </Field>
                {/*<br />*/}
                <label>Content</label>
                <Field id="content">
                    <TextInput
                        required
                        id="content"
                        autoComplete="content"
                        field="content"
                        data-cy="content"
                    />
                </Field>
                {/*<br />*/}
                <label>Customer Name</label>
                <Field id="customer_name">
                    <TextInput
                        required
                        id="customer_name"
                        autoComplete="customer_name"
                        field="customer_name"
                        data-cy="customer_name"
                    />
                </Field>
                <br />
                <br />
                <input type={'Submit'} value={'Submit'} />
            </Form>
        </div>
    );
};
export default create;

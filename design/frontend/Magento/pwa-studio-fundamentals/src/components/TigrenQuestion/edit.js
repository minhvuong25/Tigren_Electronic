import React from 'react';
import { Form } from 'informed';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import { useQuestion } from '../../talons/useQuestion';

const edit = () => {
    const h1 = {
        textAlign: 'center',
        margin: '1rem'
    };

    const talonProps = useQuestion();
    const { handleCreateQuestion, dataEdit } = talonProps;
    return (
        <div>
            <Form onSubmit={handleCreateQuestion}>
                <h1 style={h1}>Edit Question</h1>
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
export default edit;

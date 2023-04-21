import React from 'react';
import { useQuestion } from '../../talons/useQuestion';
import { Form } from 'informed';

const tigren_question = props => {
    const talonProps = useQuestion();
    const { data, handleIndex } = talonProps;

    const datas = data.question.items;
    let bt = {
        color: 'blue'
    };
    const h1 = {
        textAlign: 'center',
        margin: '1rem'
    };
    let tb = {
        //   border-collapse: "collapse",
        width: '100%'
    };
    let td = {
        border: '1px solid #ddd',
        padding: '8px'
    };
    let th = {
        //   padding-top: "12px",
        // padding-bottom: '12px',
        //text-align: 'left',
        //background-color: '#04AA6D',
        color: 'red'
    };
    let create = 'create';
    let edit = 'edit/?id=';
    let deleted = 'deleted/?id=';
    return (
        <div>
            <Form onSubmit={handleIndex}>
                <h1 style={h1}>Listing Question</h1>
                <button style={bt}>
                    <a href={create}>create question</a>
                </button>
                <br />
                <table style={tb}>
                    <tr>
                        <td style={td}>Id</td>
                        <th style={th}>Title</th>
                        <th style={th}>Name</th>
                        <th style={th}>Question</th>
                        <th style={th}>Created_at</th>
                        <th style={th}>Update_at</th>
                        <th style={th}>Edit</th>
                        <th style={th}>Delete</th>
                    </tr>

                    {datas.map((listvalue, index) => {
                        let id = listvalue.entity_id;
                        return (
                            <tr>
                                <td style={td}>{listvalue.entity_id}</td>
                                <td style={td}>{listvalue.title}</td>
                                <td style={td}>{listvalue.customer_name}</td>
                                <td style={td}>{listvalue.content}</td>
                                <td style={td}>{listvalue.created_at}</td>
                                <td style={td}>{listvalue.updated_at}</td>
                                <td style={td}>
                                    <button style={bt} type={'submit'}>
                                        <a href={edit + id}>update question</a>
                                    </button>
                                </td>
                                <td style={td}>
                                    <button
                                        id={listvalue.entity_id}
                                        type={'submit'}
                                        // onClick={handleClick}
                                        style={bt}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </Form>
        </div>
    );
};

export default tigren_question;

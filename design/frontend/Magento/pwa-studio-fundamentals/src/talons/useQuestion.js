import { useMutation, useQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from 'src/talons/question.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { setToken } from '@magento/peregrine/lib/store/actions/user';
import setDataAttribute from '../../../../../../../lib/web/jquery/bootstrap/dom/manipulator';

export const useQuestion = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS);
    const {
        questionMutation,
        getQuestion,
        getdatasearch,
        notifidelete
        // questionEditMutation
    } = operations;

    const [questioncreate, { data: createData, loading }] = useMutation(
        questionMutation
    );

    const { data } = useQuery(getQuestion, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const location = useLocation();
    const { search } = location;
    const id = new URLSearchParams(search).get('id');
    const { dataEdit } = useQuery(getdatasearch, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: { id }
    });

    // const [questionDelete, { data: editData, loadingEditData }] = useMutation(
    //     questionEditMutation
    // );

    const handleCreateQuestion = useCallback(
        async formvalue => {
            const { title, content, customer_name } = formvalue;

            const res = await questioncreate({
                variables: {
                    title,
                    content,
                    customer_name
                }
            });
            let notifiCreateQuestion = res.data.questionCreate.success_message;
            if (notifiCreateQuestion === 'success') {
                window.location.replace('../tigren_question/index');
            }
        },
        [questioncreate]
    );

    const handleIndex = async formvalue => {
        const { id } = formvalue;
        console.log(id);
        await questionDelete({
            variables: {
                id
            }
        });
    };

    const [questionDelete, { data: deletequestion, loadingdelete }] = useQuery(
        notifidelete,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            variables: [id]
        }
    );
    // repon code check api
    //
    // const handleEditQuestion = useCallback(
    //     async formvalue => {
    //         const { title, content, customer_name } = formvalue;
    //
    //         await questioncreate({
    //             variables: {
    //                 id,
    //                 title,
    //                 content,
    //                 customer_name
    //             }
    //         });
    //         let notifiCreateQuestion = res.data.questionCreate.success_message;
    //         if (notifiCreateQuestion === 'success') {
    //             window.location.replace('../tigren_question/index');
    //         }
    //     },
    //     [questionedit]
    // );

    return {
        //    handleEditQuestion,
        // deleteQuestion,
        dataEdit,
        data,
        handleCreateQuestion,
        handleIndex
    };
};

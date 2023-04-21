module.exports = (targetables, targetablePath) => {
    const editModal = targetables.reactComponent(targetablePath);
    editModal.addImport(`{ useToasts } from '@magento/peregrine'`);

    editModal.insertAfterSource(
        `= talonProps;`,
        `
    const [, { addToast }] = useToasts();
    `
    );
    editModal.setJSXProps(`ProductForm`, { addToast: `{addToast}` });
};

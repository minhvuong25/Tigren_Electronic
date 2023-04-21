module.exports = (targetables, targetablesPath) => {
    const useAdapter = targetables.reactComponent(targetablesPath);
    useAdapter.addImport(`localforage from 'localforage'`);
    useAdapter
        .insertAfterSource(`'The requested qty is not available'`, ` && false`)
        .insertBeforeSource(`globalThis.localStorage`, `localforage`, {
            remove: 23
        })
        .insertBeforeSource(`globalThis.localStorage`, `localforage`, {
            remove: 23
        });
};

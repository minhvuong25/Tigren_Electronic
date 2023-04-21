module.exports = targetables => {
    const handleHtmlContentClick = targetables.reactComponent(
        '@magento/pagebuilder/lib/handleHtmlContentClick.js'
    );

    handleHtmlContentClick.insertAfterSource(
        `code === 'Enter' || code === 'Space';`,
        `

    // Check click element on footer mobile
    let newTargetElm = target;
    const parentBlockTitle = target.closest('.block-title');
    if (parentBlockTitle) {
        newTargetElm = parentBlockTitle;
    }

    if (newTargetElm.className.includes('block-title') && shouldIntercept) {
        if(newTargetElm.className.includes('expanded')) {
            newTargetElm.classList.remove('expanded');
        } else {
            newTargetElm.classList.add('expanded');
        }

        const parent = newTargetElm.parentNode;
        if(parent.className.includes('expanded')) {
            parent.classList.remove('expanded');
        } else {
            parent.classList.add('expanded');
        }
    }
`
    );
};

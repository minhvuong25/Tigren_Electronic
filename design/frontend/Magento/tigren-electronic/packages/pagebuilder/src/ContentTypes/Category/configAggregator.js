import { getAdvanced } from '@magento/pagebuilder/lib/utils';

export default node => {
    let html;
    let categoryId;
    let isSlider;
    let showArrow;
    let showDots;
    let slidesToShow;
    let rootClasses;

    const dom = new DOMParser().parseFromString(
        '<!doctype html><body>' + node.textContent,
        'text/html'
    );

    let categoryElm = dom.getElementsByClassName('category-pagebuilder');

    if (categoryElm.length > 0) {
        categoryElm = categoryElm[0];
        categoryId = categoryElm.getAttribute('category-id');
        isSlider = categoryElm.getAttribute('data-isSlider');
        showArrow = categoryElm.getAttribute('data-showArrow');
        showDots = categoryElm.getAttribute('data-showDots');
        slidesToShow = categoryElm.getAttribute('data-slidesToShow');
        rootClasses = categoryElm.getAttribute('class');
    }

    html = dom.body.innerHTML;

    return {
        html,
        categoryId,
        isSlider,
        showArrow,
        showDots,
        slidesToShow,
        rootClasses,
        ...getAdvanced(node)
    };
};

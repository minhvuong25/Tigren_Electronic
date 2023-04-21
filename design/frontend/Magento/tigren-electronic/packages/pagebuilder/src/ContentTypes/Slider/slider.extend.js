module.exports = (targetables, targetablePath) => {
    const magentoPageBuilderSlider = targetables.reactComponent(targetablePath);
    magentoPageBuilderSlider.insertBeforeSource(
        `const Slider = props => {`,
        `const getSlidesToShow = (cssClasses = '') => {
        let slidesToShow = 1;
        const regex = /slideToShow_(\\d*)/gm;
        const str = cssClasses && cssClasses.join(' ');
        if (str && regex) {
            const str_pos = regex.exec(str);
            if (str_pos) {
                const countSlide = str_pos && str_pos[1];
                slidesToShow = Number(countSlide);
            }
        }
        return slidesToShow;
    };
    `
    );
    magentoPageBuilderSlider.insertAfterSource(
        `const jarallaxInstances = {};`,
        `
    const slidesToShow = getSlidesToShow(cssClasses);
    const isCenter = cssClasses && cssClasses.includes('centerMode');
`
    );
    magentoPageBuilderSlider.insertAfterSource(
        `lazyLoad: 'ondemand',`,
        `
        centerMode: isCenter,
        centerPadding: '1px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesToShow >= 4 ? 4 : slidesToShow,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: slidesToShow >= 3 ? 3 : slidesToShow,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: slidesToShow >= 3 ? 3 : slidesToShow,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: slidesToShow >= 2 ? 2 : slidesToShow,
                    slidesToScroll: 1,
                    dots: true,
                    infinite: true
                }
            }
        ],`
    );
    magentoPageBuilderSlider.insertAfterSource(
        `return child;
    });`,
        `

    const newChildren = children.filter(child => {
        if (child?.props?.data?.isOutdated) {
            return false;
        }

        return true;
    });`
    );
    magentoPageBuilderSlider.insertBeforeSource(
        `children}</SlickSlider>`,
        `newChildren`,
        { remove: 8 }
    );
};

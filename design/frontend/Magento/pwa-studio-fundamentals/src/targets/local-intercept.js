module.exports = targets => {
    // targets.of("@magento/venia-ui").routes.tap(routes => {
    //     routes.push({
    //         name: "MyDemoPage",
    //         pattern: "/demopage",
    //             path: require.resolve("../components/DemoPage/demoPage.js")
    //     });
    // });

    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'tigren_question',
            pattern: '/tigren_question/index',
            path: require.resolve('../components/TigrenQuestion/index.js')
        });
        routes.push({
            name: 'tigren_question_create',
            pattern: '/tigren_question/create',
            path: require.resolve('../components/TigrenQuestion/create.js')
        });
        routes.push({
            name: 'tigren_question_edit',
            pattern: '/tigren_question/edit',
            path: require.resolve('../components/TigrenQuestion/edit.js')
        });
        routes.push({
            name: 'tigren_login',
            pattern: '/tigren/login',
            path: require.resolve('../components/LoginPage/LoginPage.js')
        });
    });
};

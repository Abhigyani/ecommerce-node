exports.handle404 = (req, res, next) => {

    /**
     * Response to render static HTML.
     */
    // res.status(404).sendFile(path.join(rootDir, 'views', 'html', '404-handler.html'));

    /**
     * Response to render dynamic template using HANDLEBAR TEMPLATING ENGINE.
     */
    res.status(404)
        .render('404',
            {
                pageTitle: '404 Error',
                mainCSS: true,
                path: ''
            }
        );
}
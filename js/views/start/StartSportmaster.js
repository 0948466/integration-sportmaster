Imigize.define('Imigize.integration.views.start.StartSportmaster', {

    extend: 'Imigize.integration.compatibility.view.mini.CompatibilityStartDefault',

    config: {
        tpl: 'Imigize.integration.views.start.StartSportmaster',
        ns: 'imigize-integration-start-sportmaster'
    },

    initLandingPopupConfig: function() {
        return {
            autoShow: false,
            lockBackgroundScroll: false,
            product: null,
            overflow: 'hidden',
            showContentShadow: true,
            position: 'relative',
            top: '0',
            left: '0',
            margin: '2% auto',
            padding: 0,
            width: '100%',
            height: 'auto',
            maxWidth: '990px',
            maxHeight: 'auto',
            model: null,
            positionCloseChangeable: true,
            overflowEl: 'auto',
            marginTopClose: '5px',
            marginLeftClose: '-33px'
        };
    }
});
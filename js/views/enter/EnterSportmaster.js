Imigize.define('Imigize.integration.views.enter.EnterSportmaster', {

    extend: 'Imigize.integration.imigize.compatibility.view.full.Enter',

    config: {
        tpl: 'Imigize.integration.views.enter.EnterSportmaster',
        ns: 'imigize-integration-enter-sportmaster',
        registerBtn: false
    },

    _init: function(ns) {
        var me = this;

        __super__._init.apply(me, arguments);

        me.btnEnter = this.$$('btn-enter');
        me.btnSend = this.$$('btn-send');

        me.formLogin = this.$$('form-login');
        me.formLoginById = this.$$('form-login-by-id');
        me.formRestore = this.$$('form-restore');
        me._$elAuthInputById = this.$$('input-id');
        me._$errorId = me.$$('id-error');
        me._$globalErrorId = me.$$('global-error-id');
    },

    _initEvents: function(ns) {
        var me = this;
        __super__._initEvents.apply(me, arguments);

        me.btnEnter.on('click', _.bind(me._onBtnEnterClick, me));
        me.btnSend.on('click', _.bind(me._onBtnSendClick, me));
        me.formLoginById.on('submit', me._onFormByIdSubmit.bind(me));
    },

    _onBtnEnterClick: function() {
        if (this._$elAuthInputById.val()) {
            this.formLoginById.submit();
            return;
        }

        if (this.formLogin.valid()) {
            this.formLogin.submit();
        }
    },

    _onFormByIdSubmit: function(e) {
        e.preventDefault();
        this._doAuthById();
    },

    _doAuthById: function() {
        var me = this,
            $input = me._$elAuthInputById,
            userId = $input.val(),
            prevented = false,
            e = {
                preventDefault: function() {
                    prevented = true;
                }
            };

        if ($input.is(':invalid')) {
            me._showError($input);
            return false;
        }

        $input.prop('disabled', true);

        me._doLoginByIdRequest(userId)
            .then(function(answer, errorCode) {
                errorCode = errorCode || answer.code;

                if (!errorCode || errorCode === 2) {
                    if (me.isCatalog()) {
                        e.user = answer.user;
                        localStorage.setItem('email', e.user.email);
                        me.trigger('login', e);
                        if (!prevented) {
                            me._successLogin(answer.user);
                        }
                    } else {
                        me._doLoginRequest()
                            .then(function(answer, errorCode) {
                                errorCode = errorCode || answer.code;

                                if (!errorCode || errorCode === 2) {
                                    e.user = answer.user;
                                    localStorage.setItem('email', e.user.email);
                                    me.trigger('login', e);
                                    if (!prevented) {
                                        me._successLogin(answer.user);
                                    }
                                } else {
                                    me._throwError(errorCode);
                                }
                                return answer;
                            })
                            .always(function() {
                                $input.prop('disabled', false);
                            });
                    }

                } else {
                    me._throwError(errorCode);
                }
                return answer;

            }, function() {
                me._showError($input, me._$globalErrorId);
            })
            .always(function() {
                $input.prop('disabled', false);
            });
    },

    isCatalog: function() {
        return Imigize.integration.main.shop.SportmasterShop.prototype.currentPageIsCatalog();
    },

    _onBtnSendClick: function() {
        if (this.formRestore.valid()) {
            this.formRestore.submit();
        }
    },

    _doLoginRequest: function(userId, password) {
        if (this.isCatalog()) {
            return this.getApp().getApi().doLogin(userId, password);
        } else {
            return __super__._doLoginRequest.apply(this, arguments);
        }
    },

    _doLoginByIdRequest: function(userId) {
        return this.getApp().getApi().doLoginById(userId);
    },

    _successLogin: function(user) {
        var router = this.getRouter();

        this.getApp().getUserModel().setUserId(user.loginNumber);

        if (this.isCatalog()) {
            router.goToMini();
        } else {
            router.goTo(this.getRouter().ROUTE_FULL);
        }
    },

    _onLinkRegisterClick: function() {
        var me = this, landing, popup,
            router = this.getRouter(),
            App = this.getApp(),
            widgetManager = App.getWidgetManager(),
            popupLandingCache = widgetManager._cache['Imigize.integration.views.landing.LandingRunlab'];

        router.goToMini();

        if (!popupLandingCache) {
            popup = App.create(App.VIEW_POPUP_CLOSE, this.initLandingPopupConfig());
            landing = App.create(App.VIEW_FULL_LANDING, {
                popup: popup
            });

            popup._$elContent.append(landing.getEl());
            widgetManager._cache['Imigize.integration.views.landing.LandingRunlab'] = popup;
            popup.show();
        } else {
            popupLandingCache.showPopup();
        }
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
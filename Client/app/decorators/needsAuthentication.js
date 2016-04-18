System.register(['angular2/router', '../shared/services/appInjector', '../shared/services/storage.service'], function(exports_1) {
    var router_1, appInjector_1, storage_service_1;
    var NeedsAuthentication;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (appInjector_1_1) {
                appInjector_1 = appInjector_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            }],
        execute: function() {
            exports_1("NeedsAuthentication", NeedsAuthentication = function () {
                return router_1.CanActivate(function (to, from, target) {
                    if (target === void 0) { target = ['/']; }
                    var injector = appInjector_1.appInjector();
                    var router = injector.get(router_1.Router);
                    var storageService = injector.get(storage_service_1.StorageService);
                    if (storageService.getItem('auth')) {
                        return true;
                    }
                    router.navigate(['/Login', { target: target }]);
                    return false;
                });
            });
        }
    }
});
//# sourceMappingURL=needsAuthentication.js.map
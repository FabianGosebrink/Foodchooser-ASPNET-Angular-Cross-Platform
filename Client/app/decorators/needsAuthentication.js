"use strict";
var router_deprecated_1 = require('@angular/router-deprecated');
var appInjector_1 = require('../shared/services/appInjector');
var storage_service_1 = require('../shared/services/storage.service');
exports.NeedsAuthentication = function () {
    return router_deprecated_1.CanActivate(function (to, from, target) {
        if (target === void 0) { target = ['/']; }
        var injector = appInjector_1.appInjector();
        var router = injector.get(router_deprecated_1.Router);
        var storageService = injector.get(storage_service_1.StorageService);
        if (storageService.getItem('auth')) {
            return true;
        }
        router.navigate(['/Login', { target: target }]);
        return false;
    });
};
//# sourceMappingURL=needsAuthentication.js.map
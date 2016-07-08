"use strict";
var Observable_1 = require('rxjs/Observable');
var NeedsAuthentication = (function () {
    function NeedsAuthentication(_storeageService, _router) {
        this._storeageService = _storeageService;
        this._router = _router;
    }
    NeedsAuthentication.prototype.canActivate = function () {
        if (this._storeageService.getItem('auth')) {
            return Observable_1.Observable.create(function (subscriber) {
                subscriber.next(true);
                subscriber.complete();
            });
        }
        this._router.navigate(['/Login']);
    };
    return NeedsAuthentication;
}());
exports.NeedsAuthentication = NeedsAuthentication;
//# sourceMappingURL=needsAuthentication.js.map
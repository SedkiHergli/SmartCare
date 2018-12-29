(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-register-register-module"],{

/***/ "./src/app/pages/register/register.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/register/register.module.ts ***!
  \***************************************************/
/*! exports provided: RegisterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register.page */ "./src/app/pages/register/register.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: '',
        component: _register_page__WEBPACK_IMPORTED_MODULE_5__["RegisterPage"]
    }
];
var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_register_page__WEBPACK_IMPORTED_MODULE_5__["RegisterPage"]]
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());



/***/ }),

/***/ "./src/app/pages/register/register.page.html":
/*!***************************************************!*\
  !*** ./src/app/pages/register/register.page.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar color=\"primary\">\r\n      <ion-buttons slot=\"start\">\r\n        <ion-back-button defaultHref=\"/login\" [text]=\"buttonText\" [icon]=\"buttonIcon\"></ion-back-button>\r\n      </ion-buttons>\r\n      <ion-title> Register </ion-title>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n \r\n<ion-content style=\"--background: url(assets/imgs/bg.jpeg) center / 100%;\" padding>\r\n  <ion-card style=\"\tbox-shadow: none;background: rgba(0, 0, 0, 0.5);border-radius: 5px;\">\r\n    <ion-card-header style=\"color: #fff;text-align: center;font-weight: bold\">\r\n      Register Form\r\n    </ion-card-header>\r\n    <ion-card-content>\r\n        <ion-list style=\"background: transparent;\" no-line>\r\n  <form [formGroup]=\"credentialsForm\">\r\n      <ion-item>\r\n          <ion-input type=\"text\" formControlName=\"fullName\" style=\"color: #fff\" placeholder=\"FullName\" autocomplete=\"on\"></ion-input>\r\n        </ion-item>\r\n \r\n    <ion-item>\r\n      <ion-input type=\"email\" formControlName=\"email\" style=\"color: #fff\" placeholder=\"Email\" autocomplete=\"on\"></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-item>\r\n        <ion-input type=\"text\" formControlName=\"phone\" style=\"color: #fff\" placeholder=\"Phone Number\" autocomplete=\"on\"></ion-input>\r\n    </ion-item>\r\n \r\n    <ion-item>\r\n      <ion-input type=\"password\" formControlName=\"password\" style=\"color: #fff\" placeholder=\"Password\" autocomplete=\"on\"></ion-input>\r\n    </ion-item>\r\n\r\n    <ion-list style=\"background: transparent;\">\r\n        <ion-item class=\"reMode_selected\">\r\n          <ion-label style=\"color: #fff\">Male</ion-label>\r\n          <ion-checkbox color=\"danger\" [checked]=\"checkmale\" (ionChange)=\"updateCheckmale($event)\"></ion-checkbox>\r\n        </ion-item>\r\n          \r\n        <ion-item class=\"reMode_selected\">\r\n          <ion-label style=\"color: #fff\">Female</ion-label>\r\n          <ion-checkbox color=\"danger\" [checked]=\"checkfemale\" (ionChange)=\"updateCheckfemale($event)\"></ion-checkbox>\r\n        </ion-item>\r\n      </ion-list> \r\n\r\n    \r\n    <ion-button expand=\"full\" shape=\"round\" type=\"button\" style=\"--background: rgb(236, 58, 207);--background-focused: rgb(236, 58, 207);\" (click)=\"presentAlertPrompt()\" [disabled]=\"!credentialsForm.valid\">ADD SUPERVISOR</ion-button>\r\n    <div style=\"margin-top: 10px\">\r\n      <ion-button expand=\"full\" shape=\"round\" type=\"button\" style=\"--background: rgb(236, 58, 207);--background-focused: rgb(236, 58, 207);\" [disabled]=\"checkAddSuper\" (click)=\"register()\" >Register</ion-button>\r\n    </div>\r\n    <br/>\r\n    <br/>\r\n    <div  style=\"text-align: center;\">\r\n        <ion-label  style=\"color: #fff\" color=\"transparent\" (click)=\"loginP()\" >Already Registred! <span class=\"notSign\"><u>Login Me.</u></span></ion-label>\r\n      </div>\r\n \r\n  </form> \r\n</ion-list>\r\n</ion-card-content>\r\n</ion-card>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/register/register.page.scss":
/*!***************************************************!*\
  !*** ./src/app/pages/register/register.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "span.notSign:hover {\n  font-weight: bold; }\n\n.scroll-content {\n  align-content: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center; }\n\n.list > .item-block:first-child {\n  border: medium none; }\n\n.item:not(.reMode_selected) {\n  margin-bottom: 10px;\n  background: rgba(255, 255, 255, 0.5);\n  border: medium none; }\n\n.bottom {\n  position: absolute;\n  bottom: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcmVnaXN0ZXIvQzpcXFVzZXJzXFxkZWxsXFxEZXNrdG9wXFxwcm9qZWN0a2EzXFxTbWFydENhcmVcXHRlc3QyXFxTbWFydENhcmUvc3JjXFxhcHBcXHBhZ2VzXFxyZWdpc3RlclxccmVnaXN0ZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQWlCLEVBQ3BCOztBQUdEO0VBQ0ksc0JBQXFCO0VBQ3JCLGNBQWE7RUFDYix1QkFBc0I7RUFDdEIsd0JBQXVCO0VBQ3ZCLG1CQUFrQixFQUNyQjs7QUFHRDtFQUNJLG9CQUFtQixFQUN0Qjs7QUFFRDtFQUNJLG9CQUFtQjtFQUNuQixxQ0FBb0M7RUFDcEMsb0JBQW1CLEVBQ3RCOztBQUdEO0VBQ0ksbUJBQWtCO0VBQ2xCLFVBQVMsRUFDWiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInNwYW4ubm90U2lnbjpob3ZlcntcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG5cclxuLnNjcm9sbC1jb250ZW50IHtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcblxyXG4ubGlzdCA+IC5pdGVtLWJsb2NrOmZpcnN0LWNoaWxkIHtcclxuICAgIGJvcmRlcjogbWVkaXVtIG5vbmU7XHJcbn1cclxuXHJcbi5pdGVtOm5vdCgucmVNb2RlX3NlbGVjdGVkKSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xyXG4gICAgYm9yZGVyOiBtZWRpdW0gbm9uZTtcclxufVxyXG5cclxuXHJcbi5ib3R0b20ge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAwO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/pages/register/register.page.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/register/register.page.ts ***!
  \*************************************************/
/*! exports provided: RegisterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPage", function() { return RegisterPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _services_location_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/location.service */ "./src/app/services/location.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var RegisterPage = /** @class */ (function () {
    function RegisterPage(storage, locationService, loadingController, formBuilder, authService, alertController, navContrl) {
        this.storage = storage;
        this.locationService = locationService;
        this.loadingController = loadingController;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.alertController = alertController;
        this.navContrl = navContrl;
        this.checkAddSuper = true;
        this.requet_s = {};
        this.requet_se = {};
        this.requet_e = {};
        this.requet_l = {};
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.credentialsForm = this.formBuilder.group({
            fullName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8)]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6)]]
        });
    };
    RegisterPage.prototype.loginP = function () {
        this.navContrl.navigateRoot('/login');
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.getLocation();
        if (typeof this.lat === 'undefined') {
            this.showAlert("You can't register please turn location service on !");
        }
        else {
            this.presentLoadingWithOptions();
            if (this.checkmale) {
                this.sexe = "Male";
            }
            else {
                this.sexe = "Male";
            }
            var request = {
                "fullName": this.credentialsForm.value.fullName,
                "email": this.credentialsForm.value.email,
                "password": this.credentialsForm.value.password,
                "phone": this.credentialsForm.value.phone,
                "sexe": this.sexe,
                "stype": "User",
                "lat": this.lat,
                "lng": this.lng,
                "name_s": this.requet_s["fullName"],
                "email_s": this.requet_s["email"],
                "phone_s": this.requet_s["phone"]
            };
            this.requet_s["stype"] = "Supervisor";
            this.requet_s["name_u"] = request.fullName;
            this.requet_s["email_u"] = request.email;
            this.requet_s["phone_u"] = request.phone;
            this.requet_l["email"] = request.email;
            this.requet_l["lat"] = request.lat;
            this.requet_l["lng"] = request.lng;
            this.requet_e["email"] = request.email;
            this.requet_e["status"] = "OK";
            this.requet_se["email"] = request.email;
            this.requet_se["humidity"] = "50 %";
            this.requet_se["temperature"] = "25 °C";
            this.requet_se["current"] = "0.01";
            this.requet_se["voltage"] = "4";
            this.requet_se["battery_mah"] = "3000";
            this.requet_se["max_v"] = "9";
            this.requet_se["min_v"] = "7";
            this.authService.register(request).subscribe(function (res) {
                _this.authService.registerS(_this.requet_s).subscribe();
                _this.authService.registerSe(_this.requet_se).subscribe();
                _this.authService.registerE(_this.requet_e).subscribe();
                _this.authService.registerL(_this.requet_l).subscribe();
                _this.authService.login(_this.credentialsForm.value).subscribe(function (resp) {
                    _this.storage.set("first", true);
                });
            });
        }
    };
    RegisterPage.prototype.updateCheckmale = function (val) {
        if (val.detail.checked && !this.checkmale) {
            this.checkfemale = false;
            this.checkmale = true;
        }
    };
    RegisterPage.prototype.updateCheckfemale = function (val) {
        if (val.detail.checked && !this.checkfemale) {
            this.checkmale = false;
            this.checkfemale = true;
        }
    };
    RegisterPage.prototype.presentAlertPrompt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Add Supervisor',
                            inputs: [
                                {
                                    name: 'fullName',
                                    type: 'text',
                                    placeholder: 'fullName'
                                },
                                {
                                    name: 'email',
                                    type: 'email',
                                    placeholder: 'Email'
                                },
                                {
                                    name: 'phone',
                                    type: 'tel',
                                    placeholder: 'Phone'
                                },
                                {
                                    name: 'password',
                                    type: 'password',
                                    placeholder: 'Password'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'CANCEL',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                    }
                                }, {
                                    text: 'SAVE',
                                    handler: function (data) {
                                        _this.requet_s = data;
                                        if (!data["fullName"] || !data["email"] || !data["phone"] || !data["password"]) {
                                            _this.showAlert("You should complete input Supervisor fields!");
                                        }
                                        else {
                                            _this.checkAddSuper = false;
                                        }
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.showAlert = function (msg) {
        var alert = this.alertController.create({
            message: msg,
            header: 'Error',
            buttons: ['OK']
        });
        alert.then(function (alert) { return alert.present(); });
    };
    RegisterPage.prototype.presentLoadingWithOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            spinner: "bubbles",
                            duration: 1000,
                            message: 'Please wait...',
                            translucent: true,
                            cssClass: 'custom-class custom-loading'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RegisterPage.prototype.getLocation = function () {
        var _this = this;
        this.locationService.getLocation().then(function (pos) {
            _this.lat = pos.lat;
            _this.lng = pos.lng;
        }).catch(function (err) { return console.log(err); });
    };
    RegisterPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.page.html */ "./src/app/pages/register/register.page.html"),
            styles: [__webpack_require__(/*! ./register.page.scss */ "./src/app/pages/register/register.page.scss")],
        }),
        __metadata("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"], _services_location_service__WEBPACK_IMPORTED_MODULE_4__["LocationService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"]])
    ], RegisterPage);
    return RegisterPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-register-register-module.js.map
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {fakeBackendProvider} from "./../_helpers/fake-backend";
//import {MockBackend} from "@angular/common/http/testing";
//import {BaseRequestOptions} from "@angular/common/http/testing";
import {StorageService} from "./../../services/storage.service";
import {AuthorizatedGuard} from "./../_guards/authorizated.guard";
@NgModule({
    declarations: [  ],
    imports: [],
    providers: [
        StorageService,
        AuthorizatedGuard,
        fakeBackendProvider,
        // MockBackend,
        // BaseRequestOptions
    ],
    bootstrap: []
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}

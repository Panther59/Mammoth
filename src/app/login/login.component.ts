import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Title } from '@angular/platform-browser';
import { User } from '../_models/index'
import { AlertService, AuthenticationService, MessageService, UserService, StorageService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private storageService: StorageService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private messageService: MessageService,
        private titleService: Title) {
        this.titleService.setTitle("Login | Orbit");
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    login() {
        this.loading = true;
        this.blockUI.start("Validating...");
        this.alertService.clear();
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                this.userService.getCurrentUser().subscribe(user => {
                    this.blockUI.stop();
                    this.messageService.sendMessage("User Logged in");
                    if (Boolean(this.returnUrl) == false || this.returnUrl == '') {
                        this.returnUrl = "/";
                    }

                    this.router.navigate([this.returnUrl]);
                    this.storageService.currentUser = user;
                }, innerError => {
                    this.blockUI.stop();
                    this.alertService.error(innerError);
                    this.loading = false;
                });

            },
            error => {
                this.blockUI.stop();
                this.model.password = '';
                this.alertService.error(error.message);
                this.loading = false;
            });
    }
}

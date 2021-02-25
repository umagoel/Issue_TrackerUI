import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { action, observable } from 'mobx';
import { Observable, Subject, throwError as observableThrowError } from 'rxjs';
import { Project } from '../Project';

type StoreParams = boolean | string | number;

@Injectable()
export class ProjectStore {
    public updatePermissions: Subject<boolean> = new Subject<boolean>();
    public rerenderComponent: Subject<number> = new Subject<number>();


    public readonly moduleHits: Map<string, number> = new Map();

    @observable
    public loading: boolean;
    @observable
    public landingUrl: string;
    @observable
    public showThirdLevelNavBar: boolean;
    @observable
    public showDashboardNav: boolean;

    // TODO remove it
    @observable
    public selectedProject: Project;

    constructor() {
        this.init();
    }


    public init(): void {
        this.updateStore('loading', false);
    }

    @action
    public updateStore(key: string, value: StoreParams): void {
        this[key] = value;
    }
}

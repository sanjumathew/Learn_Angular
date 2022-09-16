import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styleUrls: ['./rxjs.component.scss'],
})
export class RxjsComponent {
    public observableValues: string[] = [];
    private readonly values = {
        FIRST: 'First Value Immediately!',
        SECOND: 'Second Value after 2 seconds!',
        THIRD: 'Third Value after 4 seconds!',
    }
    private observable = new Observable<string>();
    private subject = new Subject<string>();
    private replaySubject = new ReplaySubject<string>(2);
    private behaviorSubject = new BehaviorSubject<string>(this.values.FIRST);


    startObservable(): void {
        this.observableValues = [];

        this.observable = new Observable((subscriber) => {
            subscriber.next(this.values.FIRST);
            setTimeout(() => {
                subscriber.next(this.values.SECOND);
            }, 2000);
            setTimeout(() => {
                subscriber.next(this.values.THIRD);
            }, 4000);
        });

        this.observable.subscribe((value) => {
            this.observableValues.push(value);
        });

        setTimeout(() => {
            this.observable.subscribe((value) => {
                this.observableValues.push('SECOND SUBS => ' + value);
            });
        }, 6000);
    }

    startSubject(): void {
        this.observableValues = [];
        this.subject.subscribe((value) => {
            this.observableValues.push(value);
        });

        this.subject.next(this.values.FIRST);
        setTimeout(() => {
            this.subject.next(this.values.SECOND);
        }, 2000);
        setTimeout(() => {
            this.subject.next(this.values.THIRD);
        }, 4000);

        setTimeout(() => {
            this.subject.subscribe((value) => {
                this.observableValues.push('SECOND SUBS => ' + value);
            });
        }, 6000);
    }

    startReplaySubject(): void {
        this.observableValues = [];
        this.replaySubject.subscribe((value) => {
            this.observableValues.push(value);
        });

        this.replaySubject.next(this.values.FIRST);
        setTimeout(() => {
            this.replaySubject.next(this.values.SECOND);
        }, 2000);
        setTimeout(() => {
            this.replaySubject.next(this.values.THIRD);
        }, 4000);

        setTimeout(() => {
            this.replaySubject.subscribe((value) => {
                this.observableValues.push('SECOND SUBS => ' + value);
            });
        }, 6000);
    }

    startBehaviorSubject(): void {
        this.observableValues = [];
        this.behaviorSubject.subscribe((value) => {
            this.observableValues.push(value);
        });

        setTimeout(() => {
            this.behaviorSubject.next(this.values.SECOND);
        }, 2000);
        setTimeout(() => {
            this.behaviorSubject.next(this.values.THIRD);
        }, 4000);

        setTimeout(() => {
            this.behaviorSubject.subscribe((value) => {
                this.observableValues.push('SECOND SUBS => ' + value);
            });
        }, 6000);
    }
}

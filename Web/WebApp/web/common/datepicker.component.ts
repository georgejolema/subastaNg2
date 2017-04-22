import {Component, forwardRef, Input } from '@angular/core';
import {IDatepickerData} from  '../entities/IDatepickerData';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};
@Component({
    selector:'datepicker',
    template:`   
        <div class="form-group">
            <div class="input-group">
                <input class="form-control" [(ngModel)]="value" [maxDate]="maxDate" [minDate]="minDate" ngbDatepicker #d="ngbDatepicker" placeholder="{{placeholder}}"/>
                <span class="input-group-addon" (click)="d.toggle()" >                                   
                    <li class="fa fa-calendar"></li>
                </span>
            </div>
        </div> 
    `,
    providers:[CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatepickerComponent implements ControlValueAccessor {
    //The internal data model
    private innerValue: any = '';
    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    @Input() placeholder:string;
    @Input() minDate:IDatepickerData;
    @Input() maxDate:IDatepickerData;
    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
 
    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
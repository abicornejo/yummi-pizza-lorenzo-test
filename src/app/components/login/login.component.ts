import { Component, OnInit } from '@angular/core';

// @ts-ignore
import Any = jasmine.Any;


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public inputs: any = null;

    constructor(
    ) {

    }

    ngOnInit() {
        // this.inputs = document.querySelectorAll('.input');
        // this.inputs.forEach(input => {
        //     input.addEventListener('focus', this.addCl($event));
        //     input.addEventListener('blur', this.remCl($event));
        // });
    }

    addCl(event) {debugger;
        // @ts-ignore
        const parent = event.parentNode.parentNode;
        parent.classList.add('focus');
    }

    remCl(event) {debugger;
        // @ts-ignore
        const parent = event.parentNode.parentNode;
        // @ts-ignore
        if (event.value === '') {
            parent.classList.remove('focus');
        }
    }

}

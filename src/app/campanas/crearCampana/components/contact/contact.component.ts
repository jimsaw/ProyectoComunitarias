import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { FireBaseService, ICampaña } from '../../../../services/fire-base.service';
import { MatSelectChange } from '@angular/material/select';


interface Autoridad {
    value: string;
    viewValue: string;
    posicion: string;
}

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class ContactComponent {
    public selectedProfile;
    public autoridades;
    public autoridadnombre;

    message: string = "";
    email: string;
    @Output() messageEvent = new EventEmitter<string>();


    constructor(
        private firestore: AngularFirestore,
        private firestoreService: FireBaseService,
    ) {

    }

    sendMessage() {
        this.messageEvent.emit(this.message + "/" + this.email);
    }

    async ngOnInit() {
        this.getAutoridades();
    }

    selectedValue(event: MatSelectChange) {
        //console.log(this.autoridades);
        for (let i = 0; i < this.autoridades.length; i++) {
            if (this.autoridades[i]['name'] == event.value) {
                //console.log(this.autoridades[i]['email']);
                this.email = this.autoridades[i]['email'];
            }
        }
        this.selectedProfile = {
            value: event.value,
            text: event.source.triggerValue,
            correo: this.email
        };
        //console.log(this.selectedProfile.value);
        this.autoridadnombre = this.selectedProfile.value;
        //console.log(this.autoridadnombre);
        this.message = this.autoridadnombre;
    }

    getAutoridades() {

        this.firestoreService.getAutoridades().subscribe((autoridadesSnapshot) => {
            this.autoridades = [];

            autoridadesSnapshot.forEach((autoridades: any) => {
                this.autoridades.push({
                    id: autoridades.payload.doc.id,
                    name: autoridades.payload.doc.data().name,
                    email: autoridades.payload.doc.data().email,
                    position: autoridades.payload.doc.data().position,


                });
            });
            //console.log("this.campaigns", this.campaigns);
            // this.dataSource.data = this.campaigns as Campaign[];
        }), (error) => {
            console.log("Error al cargar las autoridades", error);
        }

    }


    @Input() modelGroupName: string;
    // autoridades: Autoridad[] = [
    //     { value: 'auto-0', viewValue: 'Cecilia Paredes', posicion: 'Rectora ESPOL' },
    //     { value: 'auto-1', viewValue: 'Cynthia Viteri', posicion: 'Alcalde de Guayaquil' },
    //     { value: 'auto-2', viewValue: 'Guillermo Lasso', posicion: '' },
    //     { value: 'auto-3', viewValue: 'Jorge Yunda', posicion: '' },
    //     { value: 'auto-4', viewValue: 'Lenin Moreno', posicion: '' },
    //     { value: 'auto-5', viewValue: 'Nueva Autoridad', posicion: '' },
    // ];

}
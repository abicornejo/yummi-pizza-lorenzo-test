import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yummipizzalorenzotest';
  sidebarActive = true;
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Secciones',
        icon: 'pi pi-pw pi-directions',
        url: 'secciones'

      },
      {
        label: 'Calles',
        icon: 'pi pi-fw pi-th-large',
        url: 'calles'
      },
      {
        label: 'Faenas',
        icon: 'pi pi-fw pi-globe',
        url: 'faenas'
      },
      {
        label: 'Personas',
        icon: 'pi pi-fw pi-users',
        url: 'personas'
      },
      {
        label: 'AsignarFaenas',
        icon: 'pi pi-fw pi-users',
        url: 'faenaspersonas'
      },
      {
        label: 'Catalogos',
        icon: 'pi pi-fw pi-users',
        items : [
          {
            label: 'Curso',
            icon: 'pi pi-fw pi-users',
            url: 'curso'
          },

          {
            label: 'Salones',
            icon: 'pi pi-fw pi-users',
            url: 'salon'
          },
          {
            label: 'Materias',
            icon: 'pi pi-fw pi-users',
            url: 'materia'
          },
          {
            label: 'Grupos',
            icon: 'pi pi-fw pi-users',
            url: 'grupo'
          },
          {
            label: 'Horarios',
            icon: 'pi pi-fw pi-users',
            url: 'horario'
          },
          {
            label: 'Alumno',
            icon: 'pi pi-fw pi-user',
            url: 'alumno'
          },
          {
            label: 'Profesor',
            icon: 'pi pi-fw pi-user',
            url: 'profesor'
          },
          {
            label: 'Clases',
            icon: 'pi pi-fw pi-users',
            url: 'clase'
          }

        ]
      }
    ];
  }

  onMenuButtonClick(event: Event) {
    this.sidebarActive = !this.sidebarActive;

    event.preventDefault();
  }
}

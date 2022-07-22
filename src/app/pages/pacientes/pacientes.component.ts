import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormularioComponent } from 'src/app/components/formulario/formulario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.sass'],
})
export class PacientesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = [
    'Nombre',
    'Apellido',
    'Edad',
    'Identificación',
    'Nombre acompañante',
    'Apellido acompañante',
    'Edad acompañante',
    'Identificación acompañante',
    'Fecha de creación',
    'Acción',
  ];
  constructor(public service: PacientesService, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.pacientes.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAll();
  }

  pacientes: any = [];
  getAll() {
    this.service.getPacientes().subscribe((res: any) => {
      this.pacientes = res;
      console.log(this.pacientes);
    });
  }

  openModal(data?: any) {
    let editMode = data ? true : false;
    const dialogRef = this.dialog.open(FormularioComponent, {
      disableClose: false,
      width: '600px',
      data: {
        data: data,
        editMode: editMode,
        label: editMode ? "Editar" : "Crear",
      }
    });

    dialogRef.afterClosed().subscribe(response => {
        this.getAll();
    });
  }
}

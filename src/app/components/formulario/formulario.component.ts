import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass'],
  
})
export class FormularioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private servicio:PacientesService) { }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    apellido: new FormControl('', [
      Validators.required,
    ]),
    edad: new FormControl(0, [
      Validators.required,
    ]),
    identificacion: new FormControl('', [
      Validators.required,
    ]),
    nombre_acompanante: new FormControl('', [
      
    ]),
    apellido_acompanante: new FormControl('', [
      
    ]),
    edad_acompanante: new FormControl('', [
      
    ]),
    identificacion_acompanante: new FormControl('', [
      
    ]),
    done: new FormControl(false)
  })
  
  edad: number = 0;
  ngOnInit(): void {
    if (this.data.editMode) {
      console.log(this.data.data.date)
      this.form.patchValue({
        name: this.data?.data?.name,
        apellido: this.data?.data?.apellido,
        edad: this.data?.data?.edad,
        identificacion: this.data?.data?.identificacion,
        nombre_acompanante: this.data?.data?.nombre_acompanante,
        apellido_acompanante: this.data?.data?.apellido_acompanante,
        edad_acompanante: this.data?.data?.edad_acompanante
      }); 
      this.edad = this.data?.data?.edad;
    }
  }

  submit(){
    this.form.value.edad = this.edad;
    if (this.form.value){
      this.servicio.createPaciente(this.form.value).subscribe((res: any) => {
        console.log(res)
      })

    }
    this.form.reset();
  }
  
}

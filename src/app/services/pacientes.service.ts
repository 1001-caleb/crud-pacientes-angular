import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API } from "src/environments/environment";
import Pacientes from '../interfaces/Pacientes';
import { crearPaciente } from '../interfaces/Pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) { }

  path: string = 'pacientes'
  
  getPacientes(){
    return this.http.get(API+this.path)
  }

  createPaciente(data: any){
    return this.http.post(API+this.path+'/crear', data)
  }
}

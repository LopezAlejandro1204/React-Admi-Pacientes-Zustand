import {create} from 'zustand'
import { DraftPatient, Patient } from '../types'
import  {v4 as uuidv4} from 'uuid'
//devTools es para mostrar los states y persist los estados persistentes
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type PatientState = {
    patients: Patient[] 
    activeId: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}

//Para retornar un paciente pero con un id
const createPatient = (patient: DraftPatient) : Patient => {
    return {...patient, id: uuidv4()  }
}


//Aqui se pone el State como sus acciones que lo modifican
export const usePatientStore = create<PatientState>()(
    devtools(//esto nos permite usar el Reux DevTools
    persist( 
        (set)=>({ 
        patients: [], //nuestro state
        activeId: '',

        //nuestras acciones
        addPatient: (data) => {

            const newPatient = createPatient(data)

            //Para escribir un dato
            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },

        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },

        getPatientById: (id) => {
            set(()=>({
                activeId: id
            }))
        },

        updatePatient: (data) => {
            set((state)=> ({
                //iteramos sobre los pacientes y una vez identificado, se almacena en data y sino retornamos los otros
                patients: state.patients.map(patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient),
                activeId: ''
            }))
        }
    }),{
        name: ' patient-storage', //nombre del almacenaje
        storage: createJSONStorage(() => localStorage) //nombre del storage
    })
))


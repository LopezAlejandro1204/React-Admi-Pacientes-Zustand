export type Patient = {
    id: string
    name: string
    caretaker: string
    email:string
    date: Date
    symptoms: string
}
//Si es que no tenemos un id - sera un draft
export type DraftPatient = Omit<Patient, 'id'>
export type gender = 'male' | 'female' | 'other';

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: gender;
  occupation: string;
}

export type NonSsnField = Omit<Patient, 'ssn'>;

// types/case.ts

export interface CaseTypeDetails {
  // Add fields based on your actual [Object] structure
  id: number;
  name: string;
  description?: string;
}

export interface CaseDocument {
  // Add fields based on your actual [Array] items
  id: number;
  name: string;
  url: string;
  uploaded_at?: string;
}

export interface Case {
  id: number;
  title: string;
  case_number: string | null;
  case_type: number;
  case_type_details: CaseTypeDetails;
  documents: CaseDocument[];
  status: string;
  notes: string;
  last_update: string;
  reminder_date: string;
  reminder_note: string;
  created_at: string;
}

export interface GetCasesResponse {
  code: number;
  success: boolean;
  message: string;
  timestamp: number;
  data: Case[];
}
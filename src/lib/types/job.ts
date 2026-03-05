// Job Application Types

export interface JobApplication {
  id: string
  jobTitle: string
  company: string
  applicationDate: Date
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  salary?: {
    min: number
    max: number
    currency: string
  }
  location: string
  url: string
  notes?: string
  contacts?: Contact[]
}

export interface Contact {
  name: string
  title: string
  email?: string
  linkedin?: string
  phone?: string
}

export interface Interview {
  id: string
  jobId: string
  date: Date
  round: number
  type: 'phone' | 'video' | 'in-person' | 'panel'
  interviewer?: string
  notes?: string
  outcome?: 'positive' | 'negative' | 'pending'
}

export interface JobSearchMetrics {
  totalApplications: number
  interviewsScheduled: number
  offersReceived: number
  averageResponseTime: number // days
  conversionRate: number // %
}

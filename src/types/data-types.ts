export class BaseDataTypes {

  // Statuses
  static activeStatus = 'A'
  static deletePendingStatus = 'P'
  static deletedStatus = 'D'
  static inactiveStatus = 'C'
  static inProgressStatus = 'I'
  static newStatus = 'N'

  static userSelectableStatuses = [
    {
      value: 'A',
      name: 'Active'
    },
    {
      value: 'D',
      name: 'Deleted'
    },
    {
      value: 'C',
      name: 'Inactive'
    },
    {
      value: 'N',
      name: 'New'
    },
    {
      value: 'P',
      name: 'Delete pending'
    }
  ]

  static userSelectableStatusesMap: Record<string, string> = {
    'A': 'Active',
    'C': 'Inactive',
    'D': 'Deleted',
    'N': 'New',
    'P': 'Delete pending'
  }
}

export interface SignIn {
  apiKey: string
  secret: string
  projectEnvId: string
  baseUrl?: string | undefined
}

export interface AicFilter {
  entity: string  // Fully-qualified entity name
  where: any      // Map of fields to values
}

export interface ChatMessage {
  type: string
  text: string
}

export enum FieldDoesntExistOption {
  strict = 'strict',
  ignore = 'ignore'
}

export interface LoadOptions {
  onFieldDoesntExistValues?: FieldDoesntExistOption
}

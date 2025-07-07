export class BaseDataTypes {
}
// Statuses
BaseDataTypes.activeStatus = 'A';
BaseDataTypes.deletePendingStatus = 'P';
BaseDataTypes.deletedStatus = 'D';
BaseDataTypes.inactiveStatus = 'C';
BaseDataTypes.inProgressStatus = 'I';
BaseDataTypes.newStatus = 'N';
BaseDataTypes.userSelectableStatuses = [
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
];
BaseDataTypes.userSelectableStatusesMap = {
    'A': 'Active',
    'C': 'Inactive',
    'D': 'Deleted',
    'N': 'New',
    'P': 'Delete pending'
};

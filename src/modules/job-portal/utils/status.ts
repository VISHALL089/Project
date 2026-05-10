export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export interface StatusRecord {
    status: JobStatus;
    dateChanged: string;
}

export interface StatusMap {
    [jobId: string]: StatusRecord;
}

export function getStatusMap(): StatusMap {
    const saved = localStorage.getItem('jobTrackerStatus');
    return saved ? JSON.parse(saved) : {};
}

export function saveStatusMap(map: StatusMap) {
    localStorage.setItem('jobTrackerStatus', JSON.stringify(map));
}

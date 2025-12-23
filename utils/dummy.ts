export const institutionData = [
  {
    id: 1,
    name: "St Williams Hospital",
    description: "Rent Act Matters",
    planStatus: "Active",
    activeStatus: "Active",
    contactEmail: "jessica.hanson@example.com",
    lastBilled: "2025-05-27T09:25:00Z", // ISO format
    billedTime: "2025-05-27T09:25:00Z",
  },
  {
    id: 2,
    name: "St Williams Hospital",
    description: "Labour Matters",
    planStatus: "Suspended",
    activeStatus: "Inactive",
    contactEmail: "willie.jennings@example.com",
    lastBilled: "2025-05-19T14:42:00Z",
    billedTime: "2025-05-19T14:42:00Z",
  },
  {
    id: 3,
    name: "St Williams Hospital",
    description: "Criminal Matters",
    planStatus: "Suspended",
    activeStatus: "Reopened",
    contactEmail: "tanya.hill@example.com",
    lastBilled: "2025-08-02T10:12:00Z",
    billedTime: "2025-08-02T10:12:00Z",
  },
];

export interface RawMetricData {
  id: string;
  date: string;
  value: number;
  name?: string;
}

export const RAW_USERS_DATA: RawMetricData[] = [
  { id: "u1", date: "2024-11-05T10:20:00Z", value: 10 },
  { id: "u2", date: "2024-11-15T14:45:30Z", value: 15 },
  { id: "u3", date: "2024-12-01T09:00:00Z", value: 25 },
  { id: "u4", date: "2024-12-10T11:30:00Z", value: 30 },
  { id: "u5", date: "2024-12-20T18:15:00Z", value: 35 },
  { id: "u6", date: "2025-01-05T08:20:00Z", value: 45 },
  { id: "u7", date: "2025-01-15T12:00:00Z", value: 50 },
  { id: "u8", date: "2025-02-01T10:00:00Z", value: 65 },
];

export const RAW_INSTITUTIONS_DATA: RawMetricData[] = [
  { id: "i1", name: "St. Williams", date: "2024-10-12T12:00:00Z", value: 5 },
  { id: "i2", name: "City Health", date: "2024-11-20T15:30:00Z", value: 8 },
  { id: "i3", name: "General Med", date: "2024-12-05T10:15:00Z", value: 12 },
  { id: "i4", name: "Riverside", date: "2025-01-12T09:45:00Z", value: 18 },
  { id: "i5", name: "Green Valley", date: "2025-02-05T14:30:00Z", value: 22 },
  { id: "i6", name: "Central Clinic", date: "2025-02-20T11:00:00Z", value: 28 },
];

export const RAW_MMR_DATA: RawMetricData[] = [
  { id: "t1", date: "2024-11-01T00:00:00Z", value: 1200 },
  { id: "t2", date: "2024-11-15T00:00:00Z", value: 1500 },
  { id: "t3", date: "2024-12-01T00:00:00Z", value: 1800 },
  { id: "t4", date: "2024-12-15T00:00:00Z", value: 2100 },
  { id: "t5", date: "2025-01-01T00:00:00Z", value: 2500 },
  { id: "t6", date: "2025-01-15T00:00:00Z", value: 2800 },
  { id: "t7", date: "2025-02-01T00:00:00Z", value: 3200 },
  { id: "t8", date: "2025-02-15T00:00:00Z", value: 3500 },
];

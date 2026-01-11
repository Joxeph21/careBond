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
export const dummy_activities: Activity[] = [
  {
    title: "New Patient Admission",
    activity: "Patient John Doe admitted to Ward A",
    createdAt: "2024-02-19T09:00:00Z",
  },
  {
    title: "Staff Schedule Update",
    activity: "Nurse shift schedule updated for March",
    createdAt: "2024-02-18T14:30:00Z",
  },
  {
    title: "Equipment Maintenance",
    activity: "MRI Machine scheduled for maintenance",
    createdAt: "2024-02-18T10:00:00Z",
  },
  {
    title: "Discharge Summary",
    activity: "Discharge summary completed for Jane Smith",
    createdAt: "2024-02-17T16:45:00Z",
  },
  {
    title: "Inventory Restock",
    activity: "Medical supplies restocked in ICU",
    createdAt: "2024-02-17T11:20:00Z",
  },
];

export const dummy_alerts: Alert[] = [
  {
    title: "Low Oxygen Supply",
    createdAt: "2024-02-20T08:00:00Z",
    description: "Oxygen tank levels in Ward B are below 20%.",
    type: "error",
  },
  {
    title: "Shift Coverage Gaps",
    createdAt: "2024-02-19T15:00:00Z",
    description: "Pending shift coverage for weekend night shift.",
    type: "warning",
  },
  {
    title: "System Update",
    createdAt: "2024-02-18T23:00:00Z",
    description: "System maintenance completed successfully.",
    type: "success",
  },
  {
    title: "Patient Vitals Alert",
    createdAt: "2024-02-20T10:30:00Z",
    description: "Abnormal vitals detected for Patient ID #4021.",
    type: "error",
  },
];

export const dummy_users: User[] = [
  {
    avatar: "/user.png",
    name: "John Doe",
    id: "#23454GH6J7YT6",
    role: "proffessional",
    associated_user: 5,
    all_devices: 3,
    createdAt: "2023-01-15T09:00:00Z",
    email: "john.doe@example.com",
  },
  {
    avatar: "/user2.png",
    name: "Jane Smith",
    id: "#89234KL1M7XQ9",
    role: "patient",
    associated_user: 2,
    all_devices: 1,
    createdAt: "2024-03-10T14:30:00Z",
    email: "jane.smith@example.com",
  },
  {
    avatar: "/user.png",
    name: "Michael Brown",
    id: "#12874PO9L3KA1",
    role: "family",
    associated_user: 1,
    all_devices: 2,
    createdAt: "2023-11-22T10:15:00Z",
    email: "m.brown@example.com",
  },
  {
    avatar: "/user2.png",
    name: "Emily Davis",
    id: "#76345UY2T8RE4",
    role: "proffessional",
    associated_user: 8,
    all_devices: 5,
    createdAt: "2024-01-05T08:45:00Z",
    email: "emily.davis@example.com",
  },
];

export const dummy_family: Family[] = [
  {
    id: "#98765FD4S3A21",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "family",
  },
  {
    id: "#12345GH6J7K89",
    name: "Robert Smith",
    email: "robert.smith@example.com",
    role: "family",
  },
  {
    id: "#56473UY8I9O0P",
    name: "Maria Garcia",
    email: "m.garcia@example.com",
    role: "family",
  },
];

export const dummy_devices: Devices[] = [
  {
    id: "#DEV192837465",
    device_name: "Heart Rate Monitor",
    device_status: "connected",
  },
  {
    id: "#DEV987654321",
    device_name: "Blood Pressure Cuff",
    device_status: "syncing",
  },
  {
    id: "#DEV112233445",
    device_name: "Pulse Oximeter",
    device_status: "failed",
  },
  {
    id: "#DEV556677889",
    device_name: "Glucose Monitor",
    device_status: "connected",
  },
];

export const dummy_events: SecurityEventLog[] = [
  {
    id: "evt_1",

    summary: {
      date: "2025-12-20T11:48:41Z",
      action: "New Login Action",
      country: "Indonesia",
      ipAddress: "180.242.130.27",
      service: "Custom rules",
    },

    matchedService: {
      service: "Custom rules",
      actionTaken: "Login Action",
      ruleset: {
        name: "default",
        id: "2e09703b",
      },
      rule: {
        name: "Global Rate Limit – 8 Requests in 10s",
        id: "3c484c2f",
      },
    },

    requestDetails: {
      rayId: "9b0e919b8d8bfc7",
      ipAddress: "180.242.130.27",
      asn: {
        id: "AS7713",
        organization: "Telekomunikasi Indonesia",
      },
      country: "Indonesia",
      userAgent: "Mozilla/5.0",
      httpVersion: "HTTP/1.1",
      referrer: null,
      method: "GET",
      host: "app.flowoptix.me",
      path: "/wp-content/plugins/wps-hide-login/wps-hide-login.php",
      queryString: "",
    },
  },

  {
    id: "evt_2",

    summary: {
      date: "2025-12-20T07:04:21Z",
      action: "Login Action",
      country: "Malaysia",
      ipAddress: "142.111.146.31",
      service: "Custom rules",
    },

    matchedService: {
      service: "Custom rules",
      actionTaken: "Login Action",
      ruleset: {
        name: "default",
        id: "5ab901cc",
      },
      rule: {
        name: "Suspicious Login Protection",
        id: "1d9a33ff",
      },
    },

    requestDetails: {
      rayId: "1af2399c1a9ef12",
      ipAddress: "142.111.146.31",
      asn: {
        id: "AS4788",
        organization: "Malaysia Telecom",
      },
      country: "Malaysia",
      userAgent: "Mozilla/5.0",
      httpVersion: "HTTP/1.1",
      referrer: "None (direct)",
      method: "GET",
      host: "app.flowoptix.me",
      path: "/login",
      queryString: "",
    },
  },
];

export const dummy_transactions: Transaction[] = [
  {
    id: "1",
    index: "0012023",
    payeePayer: "St Williams Hospital",
    transactionId: "THNCOI-17891-2023",
    plan: "Standard",
    transactionDate: "2015-05-27",
    clearDate: "2015-05-27",
    amount: 200.0,
    status: "Received",
    paymentMethod: "PayPal",
  },
  {
    id: "2",
    index: "0022023",
    payeePayer: "St Williams Hospital",
    transactionId: "THNCOI-13245-2023",
    plan: "Premium",
    transactionDate: "2012-05-19",
    clearDate: "2012-05-19",
    amount: 1200.0,
    status: "Received",
    paymentMethod: "Cheque",
  },
  {
    id: "3",
    index: "0032023",
    payeePayer: "St Williams Hospital",
    transactionId: "THNCOI-13445-2023",
    plan: "Enterprise",
    transactionDate: "2016-03-04",
    clearDate: "2016-03-04",
    amount: 16.0,
    status: "Pending",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "4",
    index: "0042023",
    payeePayer: "St Williams Hospital",
    transactionId: "THNCOI-19823-2023",
    plan: "Standard",
    transactionDate: "2016-03-04",
    clearDate: "2016-03-04",
    amount: 321.0,
    status: "Received",
    paymentMethod: "Card",
  },
  {
    id: "5",
    index: "0052023",
    payeePayer: "St Williams Hospital",
    transactionId: "THNCOI-12341-2023",
    plan: "Premium",
    transactionDate: "2013-07-27",
    clearDate: "2013-07-27",
    amount: 100.0,
    status: "Pending",
    paymentMethod: "Cheque",
  },
  {
    id: "6",
    index: "0062023",
    payeePayer: "St Williams Hospital",
    transactionId: "THNCOI-12345-2023",
    plan: "Standard",
    transactionDate: "2015-05-27",
    clearDate: "2015-05-27",
    amount: 500.0,
    status: "Received",
    paymentMethod: "PayPal",
  },
  {
    id: "7",
    index: "0072023",
    payeePayer: "St Williams Hospital",
    transactionId: "THNCOI-13432-2023",
    plan: "Premium",
    transactionDate: "2019-07-01",
    clearDate: "2019-07-01",
    amount: 71.0,
    status: "Pending",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "8",
    index: "0082023",
    payeePayer: "St Williams Hospital",
    transactionId: "THNCOI-11998-2023",
    plan: "Enterprise",
    transactionDate: "2016-09-23",
    clearDate: "2016-09-23",
    amount: 1000.0,
    status: "Received",
    paymentMethod: "Card",
  },
];

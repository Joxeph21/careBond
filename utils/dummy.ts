export const dummy_plans: Plan[] = [
  {
    id: "plan_1",
    name: "Standard",
    description: "Standard plan for small institutions",
    monthly_rate: 200,
    yearly_rate: 2000,
    features: ["Feature 1", "Feature 2"],
    promo_codes: ["PROMO10"],
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "plan_2",
    name: "Premium",
    description: "Premium plan for medium institutions",
    monthly_rate: 1200,
    yearly_rate: 12000,
    features: ["All Standard features", "Premium Feature 1"],
    promo_codes: ["PREMIUM20"],
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "plan_3",
    name: "Enterprise",
    description: "Enterprise plan for large institutions",
    monthly_rate: 5000,
    yearly_rate: 50000,
    features: ["All Premium features", "Enterprise Feature 1"],
    promo_codes: ["ENTERPRISE30"],
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
];

export const dummy_institutions: Institution[] = [
  {
    id: "inst_1",
    name: "St Williams Hospital",
    description: "Rent Act Matters",
    status: "Active",
    plan_status: "Active",
    contact_email: "jessica.hanson@example.com",
    last_billed_date: "2025-05-27T09:25:00Z",
    location: "United States",
    address: "123 Medical Way, New York, NY",
    phone: "+1-202-555-0173",
    plan: "Premium",
    plan_details: dummy_plans[1],
    next_payment_date: "2025-06-27T09:25:00Z",
    created_at: "2023-01-15T09:00:00Z",
    updated_at: "2025-05-27T09:25:00Z",
  },
  {
    id: "inst_2",
    name: "City Health Clinic",
    description: "Labour Matters",
    status: "Suspended",
    plan_status: "Inactive",
    contact_email: "willie.jennings@example.com",
    last_billed_date: "2025-05-19T14:42:00Z",
    location: "Nigeria",
    address: "45 Victoria Island, Lagos",
    phone: "+234 803 123 4567",
    plan: "Standard",
    plan_details: dummy_plans[0],
    next_payment_date: "2025-06-19T14:42:00Z",
    created_at: "2023-02-20T10:00:00Z",
    updated_at: "2025-05-19T14:42:00Z",
  },
  {
    id: "inst_3",
    name: "General Medical Center",
    description: "Criminal Matters",
    status: "Active",
    plan_status: "Active",
    contact_email: "tanya.hill@example.com",
    last_billed_date: "2025-08-02T10:12:00Z",
    location: "United Kingdom",
    address: "88 Baker Street, London",
    phone: "+44 20 7946 0958",
    plan: "Enterprise",
    plan_details: dummy_plans[2],
    next_payment_date: "2025-09-02T10:12:00Z",
    created_at: "2023-03-10T11:30:00Z",
    updated_at: "2025-08-02T10:12:00Z",
  },
];

export interface RawMetricData {
  id: string;
  date: string;
  value: number;
  name?: string;
}

export const RAW_USERS_DATA_24H: RawMetricData[] = [
  { id: "h1", date: "00-03", value: 10 },
  { id: "h2", date: "03-06", value: 5 },
  { id: "h3", date: "06-09", value: 20 },
  { id: "h4", date: "09-12", value: 45 },
  { id: "h5", date: "12-15", value: 30 },
  { id: "h6", date: "15-18", value: 55 },
  { id: "h7", date: "18-21", value: 40 },
  { id: "h8", date: "21-00", value: 15 },
];

export const RAW_USERS_DATA_7D: RawMetricData[] = [
  { id: "d1", date: "Sun", value: 150 },
  { id: "d2", date: "Mon", value: 230 },
  { id: "d3", date: "Tue", value: 180 },
  { id: "d4", date: "Wed", value: 290 },
  { id: "d5", date: "Thu", value: 250 },
  { id: "d6", date: "Fri", value: 320 },
  { id: "d7", date: "Sat", value: 210 },
];

export const RAW_USERS_DATA_30D: RawMetricData[] = [
  { id: "m1", date: "1-5", value: 500 },
  { id: "m2", date: "6-10", value: 750 },
  { id: "m3", date: "11-15", value: 600 },
  { id: "m4", date: "16-20", value: 900 },
  { id: "m5", date: "21-25", value: 850 },
  { id: "m6", date: "26-31", value: 1100 },
];

export const RAW_USERS_DATA_1Y: RawMetricData[] = [
  { id: "u1", date: "Jan", value: 400 },
  { id: "u2", date: "Feb", value: 300 },
  { id: "u3", date: "Mar", value: 200 },
  { id: "u4", date: "Apr", value: 278 },
  { id: "u5", date: "May", value: 189 },
  { id: "u6", date: "Jun", value: 239 },
  { id: "u7", date: "Jul", value: 349 },
  { id: "u8", date: "Aug", value: 400 },
  { id: "u9", date: "Sep", value: 300 },
  { id: "u10", date: "Oct", value: 200 },
  { id: "u11", date: "Nov", value: 278 },
  { id: "u12", date: "Dec", value: 189 },
];

export const RAW_USERS_DATA = RAW_USERS_DATA_1Y;

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

export const dummy_family: Family[] = [
  {
    id: "#98765FD4S3A21",
    full_name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "family",
  },
  {
    id: "#12345GH6J7K89",
    full_name: "Robert Smith",
    email: "robert.smith@example.com",
    role: "family",
  },
  {
    id: "#56473UY8I9O0P",
    full_name: "Maria Garcia",
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
    timestamp: "2025-12-20T11:48:41Z",
    ip_address: "180.242.130.27",
    country: "Indonesia",
    asn: 7713,
    as_organization: "Telekomunikasi Indonesia",
    method: "GET",
    path: "/wp-content/plugins/wps-hide-login/wps-hide-login.php",
    user_agent: "Mozilla/5.0",
    host: "app.flowoptix.me",
  },
  {
    id: "evt_2",
    timestamp: "2025-12-20T07:04:21Z",
    ip_address: "142.111.146.31",
    country: "Malaysia",
    asn: 4788,
    as_organization: "Malaysia Telecom",
    method: "GET",
    path: "/login",
    user_agent: "Mozilla/5.0",
    host: "app.flowoptix.me",
  },
];

export const dummy_transactions: Transaction[] = [
  {
    id: "1",
    institution: "St Williams Hospital",
    institution_details: dummy_institutions[0],
    transaction_id: "THNCOI-17891-2023",
    plan: "Standard",
    plan_details: dummy_plans[0],
    amount: "200.0",
    transaction_date: "2015-05-27",
    clear_date: "2015-05-27",
    status: "Received",
    payment_method: "PayPal",
    created_at: "2015-05-27T10:00:00Z",
  },
  {
    id: "2",
    institution: "St Williams Hospital",
    institution_details: dummy_institutions[0],
    transaction_id: "THNCOI-13245-2023",
    plan: "Premium",
    plan_details: dummy_plans[1],
    amount: "1200.0",
    transaction_date: "2012-05-19",
    clear_date: "2012-05-19",
    status: "Received",
    payment_method: "Cheque",
    created_at: "2012-05-19T10:00:00Z",
  },
  {
    id: "3",
    institution: "St Williams Hospital",
    institution_details: dummy_institutions[0],
    transaction_id: "THNCOI-13445-2023",
    plan: "Enterprise",
    plan_details: dummy_plans[2],
    amount: "16.0",
    transaction_date: "2016-03-04",
    clear_date: "2016-03-04",
    status: "Pending",
    payment_method: "Bank Transfer",
    created_at: "2016-03-04T10:00:00Z",
  },
  {
    id: "4",
    institution: "St Williams Hospital",
    institution_details: dummy_institutions[0],
    transaction_id: "THNCOI-19823-2023",
    plan: "Standard",
    plan_details: dummy_plans[0],
    amount: "321.0",
    transaction_date: "2016-03-04",
    clear_date: "2016-03-04",
    status: "Received",
    payment_method: "Card",
    created_at: "2016-03-04T10:00:00Z",
  },
  {
    id: "5",
    institution: "St Williams Hospital",
    institution_details: dummy_institutions[0],
    transaction_id: "THNCOI-12341-2023",
    plan: "Premium",
    plan_details: dummy_plans[1],
    amount: "100.0",
    transaction_date: "2013-07-27",
    clear_date: "2013-07-27",
    status: "Pending",
    payment_method: "Cheque",
    created_at: "2013-07-27T10:00:00Z",
  },
  {
    id: "6",
    institution: "St Williams Hospital",
    institution_details: dummy_institutions[0],
    transaction_id: "THNCOI-12345-2023",
    plan: "Standard",
    plan_details: dummy_plans[0],
    amount: "500.0",
    transaction_date: "2015-05-27",
    clear_date: "2015-05-27",
    status: "Received",
    payment_method: "PayPal",
    created_at: "2015-05-27T10:00:00Z",
  },
  {
    id: "7",
    institution: "St Williams Hospital",
    institution_details: dummy_institutions[0],
    transaction_id: "THNCOI-13432-2023",
    plan: "Premium",
    plan_details: dummy_plans[1],
    amount: "71.0",
    transaction_date: "2019-07-01",
    clear_date: "2019-07-01",
    status: "Pending",
    payment_method: "Bank Transfer",
    created_at: "2019-07-01T10:00:00Z",
  },
  {
    id: "8",
    institution: "St Williams Hospital",
    institution_details: dummy_institutions[0],
    transaction_id: "THNCOI-11998-2023",
    plan: "Enterprise",
    plan_details: dummy_plans[2],
    amount: "1000.0",
    transaction_date: "2016-09-23",
    clear_date: "2016-09-23",
    status: "Received",
    payment_method: "Card",
    created_at: "2016-09-23T10:00:00Z",
  },
];

export const DUMMY_LOGS = [
  {
    time: "Dec 20, 2025 11:48:41 AM",
    source_ip: {
      value: "180.242.130.27",
      url: "https://example.com/ip/180.242.130.27",
    },
    host: {
      value: "app.carebond.me",
      url: "https://app.carebond.me",
    },
    path: "/wp-content/plugins/wps-hi...",
  },
  {
    time: "Dec 20, 2025 10:55:30 AM",
    source_ip: {
      value: "185.247.137.68",
      url: "https://example.com/ip/185.247.137.68",
    },
    host: {
      value: "api.carebond.me:2052",
      url: "https://api.carebond.me:2052",
    },
    path: "/",
  },
  {
    time: "Dec 20, 2025 7:20:50 AM",
    source_ip: {
      value: "185.247.137.231",
      url: "https://example.com/ip/185.247.137.231",
    },
    host: {
      value: "api.carebond.me:2095",
      url: "https://api.carebond.me:2095",
    },
    path: "/",
  },
  {
    time: "Dec 20, 2025 7:04:21 AM",
    source_ip: {
      value: "142.111.146.31",
      url: "https://example.com/ip/142.111.146.31",
    },
    host: {
      value: "carebond.me",
      url: "https://carebond.me",
    },
    path: "/.env",
  },
  {
    time: "Dec 20, 2025 6:58:12 AM",
    source_ip: {
      value: "184.154.139.58",
      url: "https://example.com/ip/184.154.139.58",
    },
    host: {
      value: "www.carebond.me",
      url: "https://www.carebond.me",
    },
    path: "/this_is_a_404.html",
  },
  {
    time: "Dec 20, 2025 6:58:11 AM",
    source_ip: {
      value: "184.154.139.58",
      url: "https://example.com/ip/184.154.139.58",
    },
    host: {
      value: "www.carebond.me",
      url: "https://www.carebond.me",
    },
    path: "/",
  },
  {
    time: "Dec 20, 2025 6:21:25 AM",
    source_ip: {
      value: "104.210.140.131",
      url: "https://example.com/ip/104.210.140.131",
    },
    host: {
      value: "carebond.me",
      url: "https://carebond.me",
    },
    path: "/robots.txt",
  },
  {
    time: "Dec 20, 2025 5:48:48 AM",
    source_ip: {
      value: "178.128.49.244",
      url: "https://example.com/ip/178.128.49.244",
    },
    host: {
      value: "carebond.me",
      url: "https://carebond.me",
    },
    path: "/site/wp-includes/wlwmanife...",
  },
  {
    time: "Dec 20, 2025 5:48:48 AM",
    source_ip: {
      value: "178.128.49.244",
      url: "https://example.com/ip/178.128.49.244",
    },
    host: {
      value: "carebond.me",
      url: "https://carebond.me",
    },
    path: "/cms/wp-includes/wlwmanife...",
  },
  {
    time: "Dec 20, 2025 5:48:48 AM",
    source_ip: {
      value: "178.128.49.244",
      url: "https://example.com/ip/178.128.49.244",
    },
    host: {
      value: "carebond.me",
      url: "https://carebond.me",
    },
    path: "/test/wp-includes/wlwmanife...",
  },
];

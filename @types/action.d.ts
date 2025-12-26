declare type SecurityEventLog = {
  id: string;

  /** Table row (collapsed view) */
  summary: {
    date: string; // ISO string
    action: string;
    country: string;
    ipAddress: string;
    service: string;
  };

  matchedService: {
    service: string;
    actionTaken: string;
    ruleset: {
      name: string;
      id: string;
    };
    rule: {
      name: string;
      id: string;
    };
  };

  /** Expanded: Request details */
  requestDetails: {
    rayId: string;
    ipAddress: string;
    asn: {
      id: string;
      organization: string;
    };
    country: string;
    userAgent: string;
    httpVersion: string;
    referrer: string | null;
    method: "GET" | "POST" | "PUT" | "DELETE";
    host: string;
    path: string;
    queryString: string;
  };
};

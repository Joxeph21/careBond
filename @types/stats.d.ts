declare type InstitutionStats = {
    type : "total_patients" | "active_professionals" | "pending_alerts" | "connected_devices",
    trend: "postive" | "negative" | "neutral",
    trendValue: number,
    value: number,
    icon: string,
}
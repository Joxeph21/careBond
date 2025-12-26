declare type Activity = {
    title: string,
    activity: string,
    createdAt: string
}

declare type ALERT_TYPE = "warning" | "error" | "success"

declare type Alert = {
    title: string,
    createdAt: string,
    description: string,
    type: ALERT_TYPE
}

declare type Devices = {
    id: string,
    device_name: string
    device_status: "syncing" | "connected" | "failed" 
}
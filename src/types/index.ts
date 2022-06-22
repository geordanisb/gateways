export interface GatewayCreate {
    serial: string;
    name:   string;
    ipv4:   string;           
}

export interface GatewayEdit {
    serial?: string;
    name?:   string;
    ipv4?: string;
    createdAt? :   string;
}

export interface PeripheralCreate {
    uid:          number;
    vendor: string;  
    status: boolean;
    gatewayId: number;    
}

export interface PeripheralEdit {
    uid?:          number;
    vendor?: string;  
    status?: boolean;
    gatewayId?: number;
    createdAt? :   string;           
}
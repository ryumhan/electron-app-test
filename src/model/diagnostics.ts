interface CameraStatus {
    type: string;
    location: string;
    status: string;
}

interface ORU {
    name: string; // Hardware name
    productID: string; // Product ID
    serialNumber: string; // Serial number assigned by Raymarine
    softwareVersion: string;
    ipAddress: string;
    AvksPart: string; // ORU part number
    AvksSerial: string; // Serial number assigned by Avikus
}

interface CCU {
    name: string; // Hardware name(0~7)
    productID: string; // Product ID
    serialNumber: string; // Serial number assigned by Raymarine
    softwareVersion: string; // CCU software version
    ipAddress: string; // IP address of ORU in Avikus network
    AvksPart: string; // CCU part number
    AvksSerial: string; // Serial number assigned by Avikus
    camerasStatus: CameraStatus[];
}

export interface Diagnostics {
    oruInfo: ORU;
    ccuInfo: CCU[];
}

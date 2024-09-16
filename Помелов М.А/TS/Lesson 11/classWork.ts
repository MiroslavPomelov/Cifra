interface IIdentidier {
    id: number;
}

interface IDriving {
    driveId: number;
    vehicleId: number;
}

interface IGeo {
    startLocation: string;
    endLocation: string;
}

interface IDateTime {
    startTime: Date;
    endTime: Date;
}

interface TripData extends IIdentidier, IDriving, IGeo, IDateTime {
    id: number;
    driveId: number;
    vehicleId: number;
    startLocation: string;
    endLocation: string;
    startTime: Date;
    endTime: Date;
}

class Trip implements TripData {
    id!: number;
    driveId!: number;
    vehicleId!: number;
    startLocation!: string;
    endLocation!: string;
    startTime!: Date;
    endTime!: Date;

    start(): void {
        console.log('Поехали');
    };
    end(): void {
        console.log('Приехали');
    };
}

class Driver {
    driveId!: number;
    name!: string;
    vahicleId!: number;
    currentTrip!: string;

    startTrip(trip: Trip): boolean {
        return true;
    };
    endTrip(): boolean {
        return false;
    };
}

// class Vehicle{
//     id: number;
//     type: string;

// }
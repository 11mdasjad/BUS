export interface BusPassRecord {
  _id: string;
  passengerName: string;
  fatherGuardianName: string;
  mobileNumber: string;
  address: string;
  passengerPhoto: string;
  ticketNumber: string;
  busPassNumber: string;
  busRoute: string;
  fromLocation: string;
  toLocation: string;
  dateOfJourney: string;
  validUntil: string;
  seatNumber: string;
  busNumber: string;
  driverName: string;
  fareAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  seatCount: string;
  sleeperCount: string;
  paymentStatus: 'paid' | 'pending' | 'partial';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

let ticketCounter = 156;
let passCounter = 500;

export const samplePasses: BusPassRecord[] = [
  {
    _id: 'pass-157',
    passengerName: 'Raju Kumar singh',
    fatherGuardianName: 'Maa Laxmi Travels',
    mobileNumber: '7488202225',
    address: 'Maa Laxmi Complex, Banjari Pokhara, Gopalganj',
    passengerPhoto: '',
    ticketNumber: '157',
    busPassNumber: 'BP-00157',
    busRoute: 'Gopalganj - Delhi Volvo AC',
    fromLocation: 'Gopalganj',
    toLocation: 'Delhi',
    dateOfJourney: '2026-06-26',
    validUntil: '2026-07-28',
    seatNumber: '1 seat / 2 sleeper',
    busNumber: 'Volvo AC Sleeper',
    driverName: 'Raju Kumar Singh',
    fareAmount: 4000,
    advanceAmount: 500,
    balanceAmount: 3500,
    seatCount: '1 seat',
    sleeperCount: '2 sleeper',
    paymentStatus: 'partial',
    notes: 'Advance received ₹500, Balance ₹3500 payable on boarding.',
    createdAt: new Date('2026-07-28').toISOString(),
    updatedAt: new Date('2026-07-28').toISOString(),
  },
  {
    _id: 'pass-158',
    passengerName: 'Vikash Kumar',
    fatherGuardianName: 'Ramesh Prasad',
    mobileNumber: '9835012345',
    address: 'Gopalganj Main Market',
    passengerPhoto: '',
    ticketNumber: '158',
    busPassNumber: 'BP-00158',
    busRoute: 'Gopalganj - Gorakhpur Express',
    fromLocation: 'Gopalganj',
    toLocation: 'Gorakhpur',
    dateOfJourney: '2026-07-01',
    validUntil: '2026-07-30',
    seatNumber: '2 seat',
    busNumber: 'Volvo AC Coach',
    driverName: 'Suresh Singh',
    fareAmount: 1200,
    advanceAmount: 1200,
    balanceAmount: 0,
    seatCount: '2 seat',
    sleeperCount: '0 sleeper',
    paymentStatus: 'paid',
    notes: 'Full payment received in cash.',
    createdAt: new Date('2026-07-29').toISOString(),
    updatedAt: new Date('2026-07-29').toISOString(),
  },
];

export function getNextTicketNumber(): string {
  ticketCounter += 1;
  return `${ticketCounter}`;
}

export function getNextPassNumber(): string {
  passCounter += 1;
  return `BP-${String(passCounter).padStart(5, '0')}`;
}

export const clinic = {
  name: 'Clínica Demo',
  address: 'Av. Corrientes 1234, CABA',
  phone: '+54 11 4321-0000',
  hours: { weekdays: '8:00 a 20:00', saturday: '9:00 a 13:00', sunday: 'cerrado' },
  specialties: ['Medicina general', 'Pediatría', 'Cardiología', 'Ginecología', 'Nutrición'],
  insurances: ['OSDE', 'Swiss Medical', 'Galeno', 'IOMA'],
  booking: { minAdvanceHours: 24, slotMinutes: 30 },
} as const;

export type ClinicConfig = typeof clinic;

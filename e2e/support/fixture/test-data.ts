export type DemoblazeUser = {
  username: string;
  password: string;
};

export type ApiUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Contact = {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
};

const uniqueId = (): string => Date.now().toString().slice(-12);

export const buildDemoblazeUser = (): DemoblazeUser => ({
  username: `qa_${uniqueId()}`,
  password: `Qa!${uniqueId()}`
});

export const buildApiUser = (): ApiUser => ({
  firstName: `qa_${uniqueId()}`,
  lastName: `day${uniqueId()}`,
  email: `day.${uniqueId()}@example.com`,
  password: 'Password123!',
});

export const buildContact = (
  overrides: Partial<Contact> = {},
): Contact => {
  return {
    firstName: 'John',
    lastName: 'Smith',
    birthdate: '1990-01-15',
    email: `john.${uniqueId}@example.com`,
    phone: '2045550101',
    street1: '123 Main Street',
    street2: 'Unit 10',
    city: 'Winnipeg',
    stateProvince: 'Manitoba',
    postalCode: 'R3T6E3',
    country: 'Canada',
    ...overrides,
  };
};
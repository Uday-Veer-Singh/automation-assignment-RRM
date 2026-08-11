export type DemoblazeUser = {
  username: string;
  password: string;
};

const uniqueId = (): string => Date.now().toString().slice(-12);

export const buildDemoblazeUser = (): DemoblazeUser => ({
  username: `qa_${uniqueId()}`,
  password: `Qa!${uniqueId()}`
});

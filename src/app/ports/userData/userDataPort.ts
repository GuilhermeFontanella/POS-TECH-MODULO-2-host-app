export interface UserDataPort {
  getUserName(): string | null;
  getUserStored(): string | null;
  storeData(): void;
}
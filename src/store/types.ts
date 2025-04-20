// Common types
export type ID = string;

// Status types
export enum Status {
  Active = 'Aktywna',
  Inactive = 'Nieaktywna',
  Planned = 'Planowana',
  Completed = 'Zakończona',
  Suspended = 'Zawieszona',
}

// Campaign types
export interface Campaign {
  id: ID;
  title: string;
  description: string;
  status: Status;
  system: string;
  sessions: number;
  players: number;
  createdAt: string;
  updatedAt: string;
}

// Character types
export interface Character {
  id: ID;
  name: string;
  class: string;
  race: string;
  level: number;
  description: string;
  campaignId: ID;
  playerId: ID;
  createdAt: string;
  updatedAt: string;
}

// Session types
export interface Session {
  id: ID;
  number: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  campaignId: ID;
  confirmedPlayers: number;
  totalPlayers: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// World building types
export interface Location {
  id: ID;
  name: string;
  type: string;
  description: string;
  campaignId: ID;
  parentLocationId?: ID;
  visited: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface NPC {
  id: ID;
  name: string;
  race: string;
  occupation: string;
  description: string;
  campaignId: ID;
  locationId?: ID;
  factionId?: ID;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Faction {
  id: ID;
  name: string;
  description: string;
  campaignId: ID;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// User preferences
export interface UserPreferences {
  theme: 'dark' | 'light';
  sidebarCollapsed: boolean;
  fontSize: number;
} 
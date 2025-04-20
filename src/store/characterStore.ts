import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Character, ID } from './types';

// Generate a unique ID
const generateId = (): ID => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Mock data for initial development
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Thorin',
    class: 'Wojownik',
    race: 'Krasnolud',
    level: 5,
    description: 'Dzielny krasnolud, mistrz walki toporem i obrońca swoich towarzyszy.',
    campaignId: '1',
    playerId: 'user1',
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Elaria',
    class: 'Czarodziejka',
    race: 'Elf',
    level: 5,
    description: 'Potężna elficka czarodziejka specjalizująca się w magii ognia i iluzji.',
    campaignId: '1',
    playerId: 'user2',
    createdAt: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Grimm',
    class: 'Barbarzyńca',
    race: 'Człowiek',
    level: 5,
    description: 'Dziki wojownik z północy, którego siła i wytrzymałość są legendarne.',
    campaignId: '1',
    playerId: 'user3',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface CharacterState {
  characters: Character[];
  selectedCharacterId: ID | null;
  
  // Actions
  addCharacter: (character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCharacter: (id: ID, updatedCharacter: Partial<Omit<Character, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteCharacter: (id: ID) => void;
  selectCharacter: (id: ID | null) => void;
  getCharacter: (id: ID) => Character | undefined;
  getCharactersByCampaign: (campaignId: ID) => Character[];
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      characters: mockCharacters,
      selectedCharacterId: null,
      
      addCharacter: (characterData) => set((state) => {
        const newCharacter: Character = {
          ...characterData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        return { characters: [...state.characters, newCharacter] };
      }),
      
      updateCharacter: (id, updatedCharacter) => set((state) => {
        const characters = state.characters.map((character) => {
          if (character.id === id) {
            return {
              ...character,
              ...updatedCharacter,
              updatedAt: new Date().toISOString(),
            };
          }
          return character;
        });
        
        return { characters };
      }),
      
      deleteCharacter: (id) => set((state) => ({
        characters: state.characters.filter((character) => character.id !== id),
      })),
      
      selectCharacter: (id) => set({ selectedCharacterId: id }),
      
      getCharacter: (id) => {
        return get().characters.find((character) => character.id === id);
      },
      
      getCharactersByCampaign: (campaignId) => {
        return get().characters.filter((character) => character.campaignId === campaignId);
      },
    }),
    {
      name: 'character-storage',
    }
  )
); 
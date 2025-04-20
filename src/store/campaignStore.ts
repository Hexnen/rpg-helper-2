import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Campaign, ID, Status } from './types';

// Generate a unique ID
const generateId = (): ID => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Mock data for initial development
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Kroniki Mistycznych Krain',
    description: 'Epicka podróż przez Mistyczne Krainy, gdzie grupa bohaterów poszukuje fragmentów artefaktu mogącego powstrzymać przebudzenie pradawnego zła. Kampania łączy elementy wysokiego fantasy z intrygami politycznymi.',
    status: Status.Active,
    system: 'D&D 5e',
    sessions: 8,
    players: 5,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Poza Czasem i Przestrzenią',
    description: 'Eksploracja tajemnic wszechświata w kampanii science-fiction, gdzie gracze podróżują między wymiarami.',
    status: Status.Suspended,
    system: 'Starfinder',
    sessions: 12,
    players: 4,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Gwiezdne Szlaki',
    description: 'Eksploracja kosmosu i konflikty międzyplanetarne w odległej przyszłości.',
    status: Status.Planned,
    system: 'Stars Without Number',
    sessions: 5,
    players: 6,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Zapomniane Królestwa',
    description: 'Odkrywanie ruin starożytnych cywilizacji w świecie fantasy.',
    status: Status.Completed,
    system: 'Pathfinder 2e',
    sessions: 20,
    players: 5,
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface CampaignState {
  campaigns: Campaign[];
  selectedCampaignId: ID | null;
  
  // Actions
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCampaign: (id: ID, updatedCampaign: Partial<Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteCampaign: (id: ID) => void;
  selectCampaign: (id: ID | null) => void;
  getCampaign: (id: ID) => Campaign | undefined;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      campaigns: mockCampaigns,
      selectedCampaignId: null,
      
      addCampaign: (campaignData) => set((state) => {
        const newCampaign: Campaign = {
          ...campaignData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        return { campaigns: [...state.campaigns, newCampaign] };
      }),
      
      updateCampaign: (id, updatedCampaign) => set((state) => {
        const campaigns = state.campaigns.map((campaign) => {
          if (campaign.id === id) {
            return {
              ...campaign,
              ...updatedCampaign,
              updatedAt: new Date().toISOString(),
            };
          }
          return campaign;
        });
        
        return { campaigns };
      }),
      
      deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
      })),
      
      selectCampaign: (id) => set({ selectedCampaignId: id }),
      
      getCampaign: (id) => {
        return get().campaigns.find((campaign) => campaign.id === id);
      },
    }),
    {
      name: 'campaign-storage',
    }
  )
); 
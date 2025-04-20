'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Layout from '@/components/layout/Layout';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Card from '@/components/ui/Card';
import GridContainer from '@/components/layout/GridContainer';
import GridItem from '@/components/layout/GridItem';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import { useRouter } from 'next/navigation';
import CampaignTimelineEnhanced from '@/components/campaign/CampaignTimelineEnhanced';

// Custom TabPanel component to replace MUI Lab's TabPanel
interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  index: string;
  sx?: any;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, sx = {} } = props;
  
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ padding: 0, ...sx, position: 'relative' }}
      // Use 'hidden' for accessibility but keep the element in the layout
      aria-hidden={value !== index}
    >
      <Box 
        sx={{ 
          pt: 3,
          // Keep the panel in the DOM but visually hidden when not active
          // This prevents layout jumps when switching tabs
          display: value === index ? 'block' : 'none',
          minHeight: { xs: '50vh', sm: '400px' },
          position: 'relative'
        }}
      >
        {children}
      </Box>
    </div>
  );
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CampaignDetail({ params }: PageProps) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(params) as { id: string };
  const campaignId = unwrappedParams.id;
  
  const [tabValue, setTabValue] = useState('overview');
  const router = useRouter();
  
  // Mock campaign data
  const campaign = {
    id: campaignId,
    title: 'Kroniki Mistycznych Krain',
    description: 'Epicka podróż przez Mistyczne Krainy, gdzie grupa bohaterów poszukuje fragmentów artefaktu mogącego powstrzymać przebudzenie pradawnego zła. Kampania łączy elementy wysokiego fantasy z intrygami politycznymi.',
    status: 'Aktywna',
    system: 'D&D 5e',
    sessions: 8,
    players: 5
  };
  
  // Mock character data
  const characters = [
    {
      id: '1',
      name: 'Thorian Valenius',
      race: 'Człowiek',
      class: 'Paladyn',
      level: 8,
      description: 'Rycerz Świętego Zakonu Światła, opiekun słabszych i strażnik równowagi.'
    },
    {
      id: '2',
      name: 'Lyra Stormwind',
      race: 'Elf',
      class: 'Czarodziej',
      level: 8,
      description: 'Mistrzyni magii żywiołów, potomkini starożytnego rodu magów.'
    },
    {
      id: '3',
      name: 'Grimm Ironheart',
      race: 'Krasnolud',
      class: 'Wojownik',
      level: 8,
      description: 'Nieustępliwy wojownik, ostatni potomek klanu Ironheart, mistrz bojowego topora.'
    }
  ];

  // Mock data for the next session
  const nextSession = {
    number: 9,
    title: 'Cienie nad Azurowym Portem',
    date: '2025-04-21',
    time: '18:00-22:00',
    confirmed: 5,
    total: 5
  };
  
  // Mock data for recent events
  const recentEvents = [
    { id: 1, date: '2025-04-10', title: 'Znalezienie pierwszego fragmentu' },
    { id: 2, date: '2025-04-05', title: 'Spotkanie z Radą Magów' },
    { id: 3, date: '2025-03-28', title: 'Dotarcie do Azurowego Portu' }
  ];
  
  // Enhanced timeline data for timeline tab
  const timelineEvents = [
    {
      id: '1',
      date: '2025-03-15',
      title: 'Początek przygody',
      summary: 'Spotkanie drużyny w karczmie "Pod Złotym Smokiem". Zawiązanie współpracy i przyjęcie pierwszego zadania.',
      status: 'completed' as const,
      highlights: ['Pierwsze spotkanie', 'Zawiązanie sojuszu'],
      location: 'Mistyczne Krainy - Wioska Dębina',
      details: 'Bohaterowie poznali się w karczmie, gdzie usłyszeli plotki o zaginięciach w okolicznym lesie. Miejscowy burmistrz zaproponował nagrodę za rozwiązanie problemu.'
    },
    {
      id: '2',
      date: '2025-03-28',
      title: 'Dotarcie do Azurowego Portu',
      summary: 'Po długiej podróży drużyna dotarła do legendarnego miasta portowego, gdzie spotkała tajemniczego handlarza artefaktów.',
      status: 'completed' as const,
      highlights: ['Odkrycie miasta', 'Spotkanie z handlarzem'],
      location: 'Azurowy Port',
      details: 'W mieście bohaterowie poznali Telmara - handlarza rzadkimi artefaktami, który podzielił się informacją o pradawnym przedmiocie mogącym powstrzymać nadciągające zagrożenie.'
    },
    {
      id: '3',
      date: '2025-04-05',
      title: 'Spotkanie z Radą Magów',
      summary: 'Drużyna przedstawiła swoją misję przed Radą Magów, uzyskując ich wsparcie oraz dostęp do sekretnej biblioteki.',
      status: 'completed' as const,
      highlights: ['Uzyskanie wsparcia', 'Dostęp do biblioteki'],
      location: 'Kryształowa Wieża',
      details: 'Rada Magów z niepokojem przyjęła wieści o możliwym przebudzeniu pradawnego zła. Zaoferowali pomoc w postaci dostępu do sekretnej biblioteki oraz amuletu ochronnego.'
    },
    {
      id: '4',
      date: '2025-04-10',
      title: 'Znalezienie pierwszego fragmentu',
      summary: 'Po intensywnych poszukiwaniach drużyna odnalazła pierwszy fragment artefaktu ukryty w podziemiach opuszczonej świątyni.',
      status: 'current' as const,
      highlights: ['Zdobycie fragmentu', 'Walka z kultystami'],
      location: 'Ruiny Świątyni Świtu',
      details: 'Wyprawa do ruin okazała się niebezpieczna - drużyna musiała zmierzyć się z kultystami, którzy również poszukiwali fragmentu. Po intensywnej walce udało się zabezpieczyć artefakt.'
    },
    {
      id: '5',
      date: '2025-04-25',
      title: 'Poszukiwanie drugiego fragmentu',
      summary: 'Zgodnie z wiedzą zdobytą w bibliotece, drużyna planuje wyprawę do Lasu Szeptów, gdzie ukryty ma być drugi fragment.',
      status: 'upcoming' as const,
      highlights: ['Planowanie wyprawy', 'Przygotowanie ekwipunku'],
      location: 'Las Szeptów',
      details: 'Stare księgi wskazują, że drugi fragment znajduje się w sercu pradawnego lasu, strzeżony przez duchy natury. Drużyna przygotowuje się do trudnej konfrontacji.'
    },
    {
      id: '6',
      date: '2025-05-10',
      title: 'W poszukiwaniu ostatniego fragmentu',
      summary: 'Według przepowiedni, ostatni fragment znajduje się w najbardziej niebezpiecznym miejscu królestwa - Górach Cienia.',
      status: 'upcoming' as const,
      highlights: ['Przyszła misja'],
      location: 'Góry Cienia',
    },
  ];
  
  // Mock data for locations
  const locations = [
    { id: 1, name: 'Azurowy Port', type: 'Miasto', visited: true },
    { id: 2, name: 'Kryształowa Wieża', type: 'Dungeon', visited: false },
    { id: 3, name: 'Las Szeptów', type: 'Las', visited: true }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleTimelinePointClick = (point: any) => {
    console.log('Clicked on timeline point:', point);
    // Here you could open a modal with session details or navigate to a session page
  };

  return (
    <Layout title="Kampanie" subtitle={campaign.title}>
      {/* Campaign Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h1" component="h1">
              {campaign.title}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              sx={{ ml: 2, height: 36 }}
            >
              Edytuj
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip 
              label={campaign.system} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={campaign.status} 
              size="small" 
              color="success" 
              variant="outlined" 
            />
            <Chip 
              icon={<AccessTimeIcon />} 
              label={`${campaign.sessions} sesji`} 
              size="small" 
              color="default" 
              variant="outlined" 
            />
            <Chip 
              icon={<GroupIcon />} 
              label={`${campaign.players} graczy`} 
              size="small" 
              color="default" 
              variant="outlined" 
            />
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="campaign tabs" 
          variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab label="Przegląd" value="overview" />
          <Tab label="Sesje" value="sessions" />
          <Tab label="Postacie" value="characters" />
          <Tab label="Lokacje" value="locations" />
          <Tab label="Wątki" value="quests" />
          <Tab label="Timeline" value="timeline" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <CustomTabPanel value={tabValue} index="overview" sx={{ px: 0 }}>
        <GridContainer spacing={4}>
          {/* Campaign Description Card */}
          <GridItem xs={12} md={6}>
            <Card title="Podsumowanie kampanii">
              <Typography variant="body1">
                {campaign.description}
              </Typography>
            </Card>
          </GridItem>

          {/* Next Session Card */}
          <GridItem xs={12} md={6}>
            <Card 
              title="Nadchodząca sesja"
              subtitle={`${nextSession.date} • ${nextSession.time}`}
            >
              <Typography variant="h6" color="warning.main" sx={{ mb: 2 }}>
                Sesja #{nextSession.number}: {nextSession.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GroupIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {nextSession.confirmed}/{nextSession.total} graczy potwierdziło obecność
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" size="small">
                  Szczegóły sesji
                </Button>
              </Box>
            </Card>
          </GridItem>
        </GridContainer>
      </CustomTabPanel>

      {/* Characters Tab */}
      <CustomTabPanel value={tabValue} index="characters" sx={{ px: 0 }}>
        <GridContainer>
          {characters.map((character) => (
            <GridItem key={character.id} xs={12} sm={6} md={4}>
              <Card
                title={character.name}
                subtitle={`${character.race} ${character.class} (Poziom ${character.level})`}
              >
                <Typography variant="body2" color="text.secondary">
                  {character.description}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button variant="outlined" color="primary" size="small">
                    Profil
                  </Button>
                </Box>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </CustomTabPanel>

      {/* Locations Tab */}
      <CustomTabPanel value={tabValue} index="locations" sx={{ px: 0 }}>
        <GridContainer>
          {locations.map((location) => (
            <GridItem key={location.id} xs={12} sm={6} md={4}>
              <Card
                title={location.name}
                subtitle={location.type}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Chip 
                    size="small" 
                    color={location.visited ? "success" : "default"} 
                    label={location.visited ? "Odwiedzone" : "Nieodwiedzone"} 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="outlined" color="primary" size="small">
                    Szczegóły
                  </Button>
                </Box>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </CustomTabPanel>

      {/* Sessions Tab */}
      <CustomTabPanel value={tabValue} index="sessions" sx={{ px: 0 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Historia sesji</Typography>
        <GridContainer>
          {Array.from({ length: 8 }, (_, i) => i + 1).reverse().map((session) => (
            <GridItem key={session} xs={12}>
              <Card
                title={`Sesja #${session}`}
                subtitle="20 marca 2025 • 18:00-22:00"
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Sesja zakończona
                  </Typography>
                  <Button variant="outlined" color="primary" size="small">
                    Notatki
                  </Button>
                </Box>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </CustomTabPanel>

      {/* Quests Tab */}
      <CustomTabPanel value={tabValue} index="quests" sx={{ px: 0 }}>
        <GridContainer>
          <GridItem xs={12}>
            <Card title="Główny wątek: Fragmenty Artefaktu">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Poszukiwanie pięciu fragmentów starożytnego artefaktu, który może powstrzymać przebudzenie Vardagona, Lorda Otchłani.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Aktywny" color="success" size="small" />
                <Chip label="Główny wątek" color="primary" size="small" />
              </Box>
            </Card>
          </GridItem>
          
          <GridItem xs={12}>
            <Card title="Tajemnica Azurowego Portu">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Wyjaśnienie dziwnych zdarzeń w dokach Azurowego Portu - zaginięcia, niewyjaśnione smugi światła nocą.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Aktywny" color="success" size="small" />
                <Chip label="Poboczny wątek" color="default" size="small" />
              </Box>
            </Card>
          </GridItem>
          
          <GridItem xs={12}>
            <Card title="Kryształowa Wieża">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Odnalezienie legendarnej Kryształowej Wieży, w której znajduje się jeden z fragmentów artefaktu.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Planowany" color="warning" size="small" />
                <Chip label="Główny wątek" color="primary" size="small" />
              </Box>
            </Card>
          </GridItem>
        </GridContainer>
      </CustomTabPanel>

      {/* Timeline Tab */}
      <CustomTabPanel value={tabValue} index="timeline" sx={{ px: 0 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Timeline kampanii
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Śledź postęp waszej przygody poprzez kluczowe wydarzenia i sesje.
          </Typography>
        </Box>
        
        <Box sx={{ 
          height: '100%', 
          position: 'relative',
          overflow: 'hidden',
          // Fix height on mobile to match other tabs
          minHeight: { xs: '40vh', sm: '350px' }
        }}>
          <CampaignTimelineEnhanced 
            points={timelineEvents}
            onPointClick={handleTimelinePointClick}
            // Use vertical layout on mobile devices, will switch to horizontal on larger screens
            initialDirection="vertical"
          />
        </Box>
      </CustomTabPanel>
    </Layout>
  );
} 
'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Layout from '@/components/layout/Layout';
import GridContainer from '@/components/layout/GridContainer';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/ui/Card';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useCampaignStore, getRelativeTime } from '@/store';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  
  // Use the campaign store instead of mock data
  const campaigns = useCampaignStore((state) => state.campaigns);
  
  const handleOpenCampaign = (id: string) => {
    router.push(`/campaign/${id}`);
  };
  
  return (
    <Layout>
      <Box
        component="section"
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <div>
          <Typography variant="h1" sx={{ mb: 1 }}>Kampanie</Typography>
          <Typography variant="body1" color="text.secondary">
            Zarządzaj swoimi kampaniami RPG w jednym miejscu
          </Typography>
        </div>
        
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          sx={{ borderRadius: '20px', px: 3 }}
        >
          Nowa kampania
        </Button>
      </Box>
      
      <GridContainer>
        {campaigns.map((campaign) => (
          <GridItem key={campaign.id}>
            <Card 
              title={campaign.title}
              subtitle={`Kampania • ${campaign.sessions} sesji • ${campaign.players} graczy • ${campaign.status}`}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {campaign.description}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  Ostatnia aktualizacja: {getRelativeTime(campaign.updatedAt)}
                </Typography>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small"
                  onClick={() => handleOpenCampaign(campaign.id)}
                >
                  Otwórz
                </Button>
              </Box>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </Layout>
  );
} 
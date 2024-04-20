import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: 'auto',
  marginTop: 20,
  backgroundColor: '#d5d7dc',
});

const StyledCircle = styled('div')(({ color, isActive }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: isActive ? color : '#777',
  margin: '0 10px', // Adjusted margin for spacing between circles
}));

const CircularCard = ({ color, isActive }) => {
  return <StyledCircle color={color} isActive={isActive} />;
};

const Signal = ({ isActive }) => {
  return (
    <StyledCard>
      <CardContent>
        <Grid container justifyContent="center" flexDirection="row"> {/* Set flexDirection to 'row' */}
          <CircularCard color={isActive ? 'green' : '#777'} isActive={isActive} />
          <CircularCard color={isActive ? '#777' : 'red'} isActive={!isActive} />
          <CircularCard color={isActive ? '#777' : '#777'} isActive={!isActive} />
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default Signal;


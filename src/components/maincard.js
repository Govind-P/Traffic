
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Timer from './timer';
import ImageCover from './image';
import Signal from './signal';

const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: 'auto',
  marginTop: 20,
});

const ComponentWrapper = styled('div')({
  marginBottom: 10, // Adjust the gap between components
});

const FourComponentCard = ({ imageUrl, isActive, onTimerFinished, nextTimer }) => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (isActive) {
      setCountdown(nextTimer);
    }
  }, [isActive, nextTimer]);

  useEffect(() => {
    if (isActive && countdown > 0) {
      const timer = setTimeout(() => {
        onTimerFinished(); // Notify App.js that the timer has finished
      }, countdown * 1000);

      return () => clearTimeout(timer);
    }
  }, [isActive, countdown, onTimerFinished]);

  return (
    <StyledCard>
      <CardContent>
        <ComponentWrapper>
          <ImageCover imageUrl={imageUrl} />
        </ComponentWrapper>
        <ComponentWrapper>
          <Signal  isActive={isActive}></Signal>
        </ComponentWrapper>
        {isActive && (
          <ComponentWrapper>
            <Timer countdown={countdown} onTimerFinished={onTimerFinished} />
          </ComponentWrapper>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default FourComponentCard;

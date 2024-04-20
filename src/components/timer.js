/*import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Timer({ countdown, onTimerFinished }) {
  const [seconds, setSeconds] = useState(countdown);
  const [progressValue,setProgress] =useState(100);

  useEffect(() => {
    if (countdown > 0) {
      setProgress((seconds / countdown) * 100);
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      if (seconds === -1) {
        clearInterval(timer);
        onTimerFinished(); // Notify parent component that the timer has finished
      }

      return () => clearInterval(timer);
    }
  }, [countdown, seconds, onTimerFinished]);
  
  
  

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', paddingTop: '10px' }}>
      {countdown > 0 && (
        <CircularProgress variant="determinate" value={progressValue} size={120} thickness={6} />
      )}
      {countdown > 0 && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div" color="text.secondary">
            {seconds}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

Timer.propTypes = {
  countdown: PropTypes.number.isRequired,
  onTimerFinished: PropTypes.func.isRequired,
};

export default Timer;*/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Timer({ countdown, onTimerFinished }) {
  const [seconds, setSeconds] = useState(countdown);

  useEffect(() => {
    setSeconds(countdown); // Reset the timer when countdown changes
  }, [countdown]);

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      if (countdown > 0) {
        onTimerFinished();
      }
    }

    return () => clearInterval(timer);
  }, [seconds, countdown, onTimerFinished]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="div" color="text.secondary">
        {formatTime(seconds)}
      </Typography>
    </Box>
  );
}

Timer.propTypes = {
  countdown: PropTypes.number.isRequired,
  onTimerFinished: PropTypes.func.isRequired,
};

export default Timer;


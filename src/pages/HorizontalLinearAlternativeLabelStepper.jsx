import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import StepConnector from '@mui/material/StepConnector';
import Check from '@mui/icons-material/Check';
const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];
const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: ownerState.active || ownerState.completed ? '#fff' : '#000',
  backgroundColor: ownerState.active || ownerState.completed ? 'red' : '#ccc',
  zIndex: 1,
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? <Check /> : props.icon}
    </CustomStepIconRoot>
  );
}

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel connector={<StepConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

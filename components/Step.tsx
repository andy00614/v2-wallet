'use client'
import { steps } from "@/config/step"
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from "@chakra-ui/react"


import { useBreakpointValue } from "@chakra-ui/react";

function CreateStep({ activeStep, className }: { activeStep: number, className?: string }) {
  const orientation = useBreakpointValue({ base: "vertical", md: "horizontal" });

  return (
    // @ts-ignore
    <Stepper index={activeStep} className={className} orientation={orientation}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

export default CreateStep


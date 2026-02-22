import { Check } from "@mui/icons-material";
import { StepCircle, StepItem, StepLabel, StepLine, StepperContainer, StepWrapper } from "./Stepper.styles";

export default function Stepper({
  stepActive = 1,
  onStepClick,
}: {
  stepActive?: number;
  onStepClick?: (step: number) => void;
}) {
  const steps = [
    { number: 1, name: "Cadastro" },
    { number: 2, name: "Endereço" },
  ];

  return (
    <StepperContainer>
      {steps.map((step, index) => {
        const isActive = stepActive === step.number;
        const isCompleted = stepActive > step.number;

        return (
          <StepItem key={step.number}>
            {index < steps.length - 1 && <StepLine $completed={isCompleted} />}

            <StepWrapper
              role={onStepClick ? "button" : undefined}
              tabIndex={onStepClick ? 0 : -1}
              onClick={() => onStepClick?.(step.number)}
              onKeyDown={(e) => {
                if (!onStepClick) return;
                if (e.key === "Enter" || e.key === " ") onStepClick(step.number);
              }}
              style={{ cursor: onStepClick ? "pointer" : "default" }}
            >
              <StepCircle $active={isActive} $completed={isCompleted}>
                {(!(isActive) && isCompleted) ? <Check /> : step.number}
              </StepCircle>
              <StepLabel $active={isActive}>{step.name}</StepLabel>
            </StepWrapper>
          </StepItem>
        );
      })}
    </StepperContainer>
  );
}
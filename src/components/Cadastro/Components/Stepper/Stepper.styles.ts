import styled from "styled-components";

const CIRCLE_SIZE = 40;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;

export const StepperContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const StepItem = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const StepLine = styled.div<{ $completed?: boolean }>`
  position: absolute;
  top: ${CIRCLE_RADIUS}px;
  left: 50%;
  width: 100%;
  height: 2px;
  transform: translateX(0);
  background: ${(p) => (p.$completed ? "#1e2533" : "#c8cdd5")};
  z-index: 1;
`;

export const StepWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

interface StepCircleProps {
  $active: boolean;
  $completed: boolean;
}

export const StepCircle = styled.div<StepCircleProps>`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1;
  transition: all 0.3s ease;

  background: ${(p) => (p.$active || p.$completed ? "#1e2533" : "#e2e8f0")};
  color: ${(p) => (p.$active || p.$completed ? "#fff" : "#a0aec0")};
  border: 2px solid ${(p) => (p.$active || p.$completed ? "#1e2533" : "#e2e8f0")};

  & svg {
    font-size: 18px;
  }
`;

interface StepLabelProps {
  $active: boolean;
}

export const StepLabel = styled.span<StepLabelProps>`
  font-size: 0.85rem;
  font-weight: ${(p) => (p.$active ? "600" : "400")};
  color: ${(p) => (p.$active ? "#1e2533" : "#a0aec0")};
`;
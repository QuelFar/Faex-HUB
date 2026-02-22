import styled from "styled-components";

// ============================================================
// FORM LAYOUT
// ============================================================

export const FormRow = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0;
  }
`;

interface FieldGroupProps {
  $flex?: number;
}

export const FieldGroup = styled.div<FieldGroupProps>`
  flex: ${(props) => props.$flex || 1};
  margin-bottom: 18px;
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 6px;
`;

export const ErrorText = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 0.78rem;
  color: #e53e3e;
`;

// ============================================================
// INPUTS
// ============================================================

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  font-size: 0.9rem;
  font-family: inherit;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  outline: none;
  color: #2d3748;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #a0aec0;
  }

  &:hover {
    border-color: #b0b8c9;
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &[aria-invalid="true"] {
    border-color: rgba(229, 62, 62, 0.7);
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.08);
  }
`;

export const InputWithAdornment = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & ${StyledInput} {
    padding-right: 44px;
  }
`;

export const AdornmentButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  color: #a0aec0;
  padding: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  & svg {
    font-size: 18px;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  font-size: 0.9rem;
  font-family: inherit;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  outline: none;
  color: #2d3748;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a0aec0' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #b0b8c9;
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &[aria-invalid="true"] {
    border-color: rgba(229, 62, 62, 0.7);
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.08);
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  font-size: 0.9rem;
  font-family: inherit;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  outline: none;
  color: #2d3748;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #a0aec0;
  }

  &:hover {
    border-color: #b0b8c9;
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &[aria-invalid="true"] {
    border-color: rgba(229, 62, 62, 0.7);
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.08);
  }
`;

// ============================================================
// RADIO BUTTONS
// ============================================================

export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 4px;

  @media (max-width: 480px) {
    gap: 14px;
  }
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #2d3748;

  input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #1e2533;
    cursor: pointer;
  }
`;

// ============================================================
// BOTOES E LINKS
// ============================================================

export const SubmitButton = styled.button`
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 24px auto 0;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  color: #fff;
  background: #1e2533;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;

  &:hover {
    background: #151b27;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(30, 37, 51, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BackLink = styled.button`
  display: block;
  margin: 16px auto 0;
  background: none;
  border: none;
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #2d3748;
    text-decoration: underline;
  }
`;
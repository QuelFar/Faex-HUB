import { useState } from "react";
import { CadastroCard, CadastroContainer, Divider, Logo, Title } from "./Cadastro.styles";
import Input from "./Components/Input/Input";

export function Cadastro() {
  const totalSteps = 2;
  const [stepActive, setStepActive] = useState(1);

  const next = () => setStepActive((s) => Math.min(s + 1, totalSteps));
  const back = () => setStepActive((s) => Math.max(s - 1, 1));

  return (
    <CadastroContainer>
      <CadastroCard>
        <Logo src="/logo-faex-hub.png" alt="Logo FAEX Hub" />
        <Divider />
        <Title>Novo cadastro</Title>
        <Input
          stepActive={stepActive}
          onNext={next}
          onBack={back}
          onGoToStep={setStepActive}
        />
      </CadastroCard>
    </CadastroContainer>
  );
}
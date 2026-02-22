import { CadastroCard, CadastroContainer, Divider, Logo, Title } from "./Cadastro.styles";
import CadastroWizard from "./Components/Input/Input";

export function Cadastro() 
{
  return (
    <CadastroContainer>
      <CadastroCard>
        <Logo src="/logo-faex-hub.png" alt="Logo FAEX Hub" />
        <Divider />
        <Title>Novo cadastro</Title>

        <CadastroWizard />
      </CadastroCard>
    </CadastroContainer>
  );
}
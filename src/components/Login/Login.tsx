/**
 * Login.tsx - PÁGINA DE LOGIN
 *
 * Este é o componente principal da tela de login.
 * Ele contém o formulário de autenticação e os avatares flutuantes de fundo.
 *
 * Conceitos importantes aqui:
 * - useState (Hook de estado): permite que o componente "lembre" de dados.
 * - Formulários controlados: o React controla o valor dos inputs.
 * - Array.map(): percorre uma lista e renderiza um componente para cada item.
 * - Eventos: handleSubmit, onChange, onClick.
 */

// useState é um "Hook" — uma função especial do React que adiciona funcionalidades
// a componentes funcionais. Neste caso, adiciona "estado" (memória) ao componente.
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importa os componentes estilizados que criamos no arquivo Login.styles.ts.
// Cada um desses é um componente com CSS embutido (styled-components).
import {
  LoginContainer,
  FloatingAvatars,
  FloatingAvatar,
  LoginCard,
  Logo,
  Divider,
  Title,
  LoginButton,
  CadastrarButton,
  ForgotPasswordLink,
} from "./Login.styles";

// Importa o componente Avatar que criamos (componente reutilizável).
import Avatar from "../Avatar/Avatar";

// Reutiliza os styled-components de input do Cadastro para manter o padrão visual.
import {
  FieldGroup,
  FieldLabel,
  StyledInput,
  InputWithAdornment,
  AdornmentButton,
} from "../Cadastro/Components/Input/Input.style";

// Ícones do Material UI para o botão de mostrar/ocultar senha.
import { Visibility, VisibilityOff } from "@mui/icons-material";

// ============================================================
// INTERFACES TYPESCRIPT
// ============================================================

// Interface que define a estrutura de cada avatar flutuante.
interface AvatarData {
  src: string;
  alt: string;
  color: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: string;
  hideOnMobile?: boolean;
}

// ============================================================
// DADOS DOS AVATARES FLUTUANTES
// ============================================================

// Array de objetos: cada objeto representa um avatar flutuante na tela.
// Esses dados controlam a posição, tamanho, cor e animação de cada avatar.
// Nota: as imagens ficam na pasta "public/" e são acessadas pela raiz "/".
const avatars: AvatarData[] = [
  {
    src: "/rosto_01.png", // Caminho da imagem (pasta public)
    alt: "Usuário 1", // Texto alternativo (acessibilidade)
    color: "#f8c8d4", // Cor de fundo do avatar
    size: 120, // Tamanho em pixels
    top: "18%", // Posição: 18% do topo da tela
    left: "6%", // Posição: 6% da esquerda
    delay: "0s", // Atraso na animação (começa imediatamente)
  },
  {
    src: "/rosto_02.png",
    alt: "Usuário 2",
    color: "#f4a6a0",
    size: 85,
    top: "6%",
    right: "28%",
    delay: "1s", // Começa a animação 1 segundo depois
  },
  {
    src: "/rosto_03.png",
    alt: "Usuário 3",
    color: "#f5b0a8",
    size: 115,
    top: "8%",
    right: "4%",
    delay: "2s",
  },
  {
    src: "/rosto_04.png",
    alt: "Usuário 4",
    color: "#a8dbc5",
    size: 55,
    top: "42%",
    right: "16%",
    delay: "3s",
  },
  {
    src: "/rosto_05.png",
    alt: "Usuário 5",
    color: "#c8b8e8",
    size: 80,
    top: "45%",
    left: "16%",
    delay: "1.5s",
    hideOnMobile: true, // Este avatar será ESCONDIDO em telas pequenas (celular)
  },
  {
    src: "/rosto_06.png",
    alt: "Usuário 6",
    color: "#b8dfc8",
    size: 105,
    bottom: "10%", // Posição: 10% do fundo da tela
    left: "5%",
    delay: "2.5s",
  },
  {
    src: "/rosto_07.png",
    alt: "Usuário 7",
    color: "#f0cfa0",
    size: 130,
    bottom: "8%",
    right: "3%",
    delay: "0.5s",
    hideOnMobile: true,
  },
];

// ============================================================
// COMPONENTE LOGIN
// ============================================================

const Login = () => {
  const navigate = useNavigate();

  // ---- HOOKS DE ESTADO (useState) ----
  // useState retorna um array com 2 elementos: [valorAtual, funçãoParaAlterar].
  // Usamos "desestruturação de array" para nomeá-los.
  // Quando chamamos a função "set", o React re-renderiza o componente com o novo valor.

  const [email, setEmail] = useState(""); // Estado para armazenar o email digitado
  const [senha, setSenha] = useState(""); // Estado para armazenar a senha digitada
  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado booleano: mostrar ou ocultar a senha

  // ---- FUNÇÕES DE EVENTO (handlers) ----

  // Função executada quando o formulário é enviado (botão "Entrar" clicado).
  // "event.preventDefault()" impede o comportamento padrão do formulário,
  // que seria recarregar a página inteira (comportamento HTML tradicional).
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login:", { email, senha });
  };

  // Função executada quando o link "Esqueceu sua senha?" é clicado.
  const handleEsqueceuSenha = () => {
    console.log("Esqueci minha senha");
  };

  // ---- JSX (o que será renderizado na tela) ----
  // JSX é uma sintaxe que parece HTML, mas é JavaScript.
  // O React converte isso em chamadas de função para criar elementos na tela.

  return (
    // Container principal que ocupa toda a tela
    <LoginContainer>

      {/* ---- AVATARES FLUTUANTES (fundo decorativo) ---- */}
      <FloatingAvatars>
        {/* .map() percorre o array "avatars" e retorna um componente para CADA item.
            É assim que renderizamos listas dinâmicas no React.
            A prop "key" é OBRIGATÓRIA em listas — ajuda o React a identificar cada item. */}
        {avatars.map((avatar, index) => (
          <FloatingAvatar
            key={index}
            // Props com "$" na frente: convenção do styled-components para props
            // que são usadas APENAS para estilização (não são passadas ao DOM HTML).
            // Isso evita warnings no console do navegador.
            $delay={avatar.delay}
            $top={avatar.top}
            $bottom={avatar.bottom}
            $left={avatar.left}
            $right={avatar.right}
            $hideOnMobile={avatar.hideOnMobile}
          >
            {/* Componente Avatar reutilizável que criamos */}
            <Avatar
              src={avatar.src}
              alt={avatar.alt}
              color={avatar.color}
              size={avatar.size}
            />
          </FloatingAvatar>
        ))}
      </FloatingAvatars>

      {/* ---- CARD DE LOGIN (formulário central) ---- */}
      {/* elevation={0} remove a sombra padrão do Card do MUI (usamos nossa própria sombra) */}
      <LoginCard>
        {/* Logo da aplicação */}
        <Logo src="/logo-faex-hub.png" alt="Logo FAEX Hub" />
        <Divider />

        <Title>Entre na sua Conta</Title>

        <form onSubmit={handleSubmit}>
          {/* ---- CAMPO DE EMAIL ---- */}
          <FieldGroup>
            <FieldLabel>Email</FieldLabel>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </FieldGroup>

          {/* ---- CAMPO DE SENHA ---- */}
          <FieldGroup>
            <FieldLabel>Senha</FieldLabel>
            <InputWithAdornment>
              <StyledInput
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
              <AdornmentButton
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? <VisibilityOff /> : <Visibility />}
              </AdornmentButton>
            </InputWithAdornment>
          </FieldGroup>

          {/* ---- BOTÃO DE LOGIN ---- */}
          <LoginButton type="submit">
            Entrar
          </LoginButton>

          {/* ---- BOTÃO DE CADASTRO (outlined) ---- */}
          <CadastrarButton
            type="button"
            onClick={() => navigate("/cadastro")}
          >
            Cadastrar-se
          </CadastrarButton>

          {/* ---- LINK "ESQUECEU SUA SENHA?" ---- */}
          {/* component="button" transforma o Link em um <button> no HTML.
              type="button" evita que ele dispare o submit do formulário. */}
          <ForgotPasswordLink
            onClick={handleEsqueceuSenha}
          >
            Esqueceu seu senha?
          </ForgotPasswordLink>

          
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;

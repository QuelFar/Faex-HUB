import styled from "styled-components";

// ============================================================
// CONTAINER E CARD
// ============================================================

export const CadastroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8ecff;
  padding: 20px;
`;

export const CadastroCard = styled.div`
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 520px;

  @media (min-width: 1024px) {
    max-width: 560px;
    padding: 52px 44px;
  }
`;

export const Logo = styled.img`
  display: block;
  max-width: 121px;
  height: auto;
  margin: 0 auto 16px;

  @media (min-width: 1024px) 
  {
    max-width: 121px;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1.5px solid #e2e8f0;
  margin: 0 auto 24px;
  width: 234px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700 bold;
  color: #1e2533;
  margin-bottom: 24px;
  text-align: center;

  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;
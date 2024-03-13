import { Button } from '@chakra-ui/react';

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100svh;
  max-height: 100svh;
  margin: 0;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.lightText};

  input ~ .border {
    position: absolute;
    bottom: -0.05rem;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${(props) => props.theme.colors.primary};

    :focus-visible {
      outline: none;
    }
  }

  input ~ .password {
    bottom: 1.1rem;
  }

  input:focus ~ .border {
    width: 100%;
    transition: 0.5s;
  }

  input {
    border: 0;
    padding: 0.2rem;
    border-bottom: 0.03rem solid #ccc;
  }

  svg {
    cursor: pointer;
    position: relative;
    bottom: 1.7rem;
    left: 93.5%;
    width: 18px;
    height: 18px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0.5rem;
  }
`;

export const LeftDiv = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;

  img {
    width: 24rem;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

export const RightDiv = styled.form`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  img {
    display: none;
  }

  @media (max-width: 700px) {
    width: 100vw;
    height: 100svh;

    img {
      display: block;
      width: 60%;
    }
  }
`;

export const InputLogin = styled.input`
  background-color: ${(props) => props.theme.colors.darkBlue} !important;
  height: 2rem;
  width: 100%;
  color: ${(props) => props.theme.colors.lightText};
  font-size: 1rem;
  border: 0;

  ::placeholder {
    color: ${(props) => props.theme.colors.mutedText};
  }

  :focus {
    outline: 0;
  }
`;

export const InputPassword = styled.input`
  background-color: ${(props) => props.theme.colors.darkBlue} !important;
  height: 2rem;
  width: 100%;
  color: ${(props) => props.theme.colors.lightText};
  font-size: 1rem;
  border: 0;

  ::placeholder {
    color: ${(props) => props.theme.colors.mutedText};
  }

  :focus {
    outline: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  gap: 0.2rem;
`;

export const Label = styled.p`
  font-size: 1.2rem;
`;

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Line = styled.span``;

export const ButtonLogin = styled(Button)`
  width: 16rem;
  height: 4rem;
  line-height: 4rem;
`;

export const Links = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.lightText};
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  text-decoration: none;
`;

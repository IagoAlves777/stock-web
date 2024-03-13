import React, { useState, FormEvent, ChangeEvent } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { Button } from '@chakra-ui/react';

import { useTheme } from 'styled-components';

import { buttonSubmit } from '@components';
import { useAuth } from '@store/auth';

import iziLogo from '../../../assets/logo.png';

import { Container, InputContainer, InputLogin, InputPassword, Label, LeftDiv, Line, RightDiv, Row } from './styles';

const Login: React.FC = () => {
  const { colors } = useTheme();
  const login = useAuth((state) => state.login);

  const isLoading = useAuth((state) => state.isLoading);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    let auxUserName = username.replaceAll('.', '');

    auxUserName = auxUserName.replaceAll('-', '');

    await login({ login: auxUserName, password });
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <Container>
      <LeftDiv>
        <img src={iziLogo} alt="Izi logo" />
      </LeftDiv>
      <RightDiv onSubmit={handleLogin}>
        <img src={iziLogo} alt="Izi logo" />
        <Row>
          <Label>Usuário</Label>
          <InputContainer>
            <InputLogin
              placeholder="Seu usuário"
              value={username}
              onChange={handleChangeUsername}
              required
              autoComplete="off"
              style={{
                outline: '0',
              }}
            />
            <Line className="border" />
          </InputContainer>
        </Row>
        <Row>
          <Label>Senha</Label>
          <InputContainer>
            <InputPassword
              type={viewPassword ? 'text' : 'password'}
              placeholder="Sua senha"
              value={password}
              onChange={handleChangePassword}
              required
              autoComplete="off"
              style={{
                outline: '0',
              }}
            />
            <Line className="border password" />
            {viewPassword && <FiEyeOff size={18} onClick={() => setViewPassword(false)} />}
            {!viewPassword && <FiEye size={18} onClick={() => setViewPassword(true)} />}
          </InputContainer>
        </Row>

        <Button type="submit" {...buttonSubmit} height="3rem" width="16rem" isLoading={isLoading}>
          ENTRAR
        </Button>
      </RightDiv>
    </Container>
  );
};

export default Login;

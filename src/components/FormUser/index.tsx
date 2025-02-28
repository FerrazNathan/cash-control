import { Link } from 'react-router-dom'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

import * as S from './styles'

interface FormUserProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  register: UseFormRegister<{
    email: string
    password: string
    confirmPassword?: string
  }>
  errors: FieldErrors<{
    email: string
    password: string
    confirmPassword?: string
  }>
  isSubmitting: boolean
  isRegisterUser?: boolean
}

export function FormUser({
  handleSubmit,
  register,
  errors,
  isSubmitting,
  isRegisterUser = false,
}: FormUserProps) {

  return (
    <S.Content>
      <S.LogoContainer>
        <h2>Cash Control</h2>
        {isRegisterUser ? (
          <span>Crie sua conta</span>
        ) : (
          <span>Controle suas finanças de forma simples</span>
        )}
      </S.LogoContainer>
      
      <S.Form onSubmit={handleSubmit}>
        <S.InputContainer>
          <input
            type="email"
            placeholder="E-mail"
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </S.InputContainer>

        <S.InputContainer>
          <input
            type="password"
            placeholder="Senha"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </S.InputContainer>

        {isRegisterUser && (
          <S.InputContainer>
            <input
              type="password"
              placeholder="Confirme a senha"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </S.InputContainer>
        )}

        {isRegisterUser && (
          <>
            <S.SignInButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </S.SignInButton>

            <S.CreateAccountLink>
              Já tem uma conta? <Link to="/">Fazer login</Link>
            </S.CreateAccountLink>
          </>
        )}

        {!isRegisterUser && (
          <>
            <S.SignInButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </S.SignInButton>

            <S.CreateAccountLink>
              Não tem uma conta? <Link to="/register">Criar conta</Link>
            </S.CreateAccountLink>
          </>
        )}
      </S.Form>
    </S.Content>
  )
}
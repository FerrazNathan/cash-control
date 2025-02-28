import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import * as S from './styles'

const signInFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

type SignInFormInputs = z.infer<typeof signInFormSchema>

export function SignInUser() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  
  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting, errors } 
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInFormSchema)
  })

  async function handleSignIn(data: SignInFormInputs) {
    try {
      await signIn(data)
      navigate('/transactions')
    } catch (error) {
      alert('Credenciais inválidas')
      console.error('Credenciais inválidas:', error)
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.LogoContainer>
          <h1>Cash Control</h1>
          <span>Controle suas finanças de forma simples</span>
        </S.LogoContainer>

        <S.Form onSubmit={handleSubmit(handleSignIn)}>
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

          <S.SignInButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </S.SignInButton>

          <S.CreateAccountLink>
            Não tem uma conta? <Link to="/register">Criar conta</Link>
          </S.CreateAccountLink>
        </S.Form>
      </S.Content>
    </S.Container>
  )
}
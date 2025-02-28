import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import * as S from './styles' // Podemos reutilizar os mesmos estilos do SignIn

const registerFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword']
})

type RegisterFormInputs = z.infer<typeof registerFormSchema>

export function RegisterUser() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  
  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting, errors } 
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema)
  })

  async function handleRegister(data: RegisterFormInputs) {
    try {
      await signUp({
        email: data.email,
        password: data.password
      })
      navigate('/transactions')
    } catch (error) {
      alert('Erro ao criar conta')
      console.error('Erro ao criar conta:', error)
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.LogoContainer>
          <h1>Cash Control</h1>
          <span>Crie sua conta</span>
        </S.LogoContainer>

        <S.Form onSubmit={handleSubmit(handleRegister)}>
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

          <S.SignInButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </S.SignInButton>

          <S.CreateAccountLink>
            Já tem uma conta? <Link to="/">Fazer login</Link>
          </S.CreateAccountLink>
        </S.Form>
      </S.Content>
    </S.Container>
  )
}
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FormUser } from '../FormUser'
import { toast } from 'react-toastify'

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
      toast.success('Login realizado com sucesso')
    } catch (error) {
      toast.error('Credenciais inválidas')
      console.error('Credenciais inválidas:', error)
    }
  }

  return (
    <S.Container>
      <FormUser 
        handleSubmit={handleSubmit(handleSignIn)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </S.Container>
  )
}
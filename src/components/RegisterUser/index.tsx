import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FormUser } from '../FormUser'
import { toast } from 'react-toastify'

import * as S from './styles'

const registerFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().optional()
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
      toast.success('Conta criada com sucesso')
    } catch (error) {
      toast.error('Erro ao criar conta')
      console.error('Erro ao criar conta:', error)
    }
  }

  return (
    <S.Container>
      <FormUser 
        handleSubmit={handleSubmit(handleRegister)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        isRegisterUser
      />
    </S.Container>
  )
}
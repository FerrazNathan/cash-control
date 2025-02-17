import logo from '../../assets/logo.svg'

import * as S from './styles'

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.ContainerLogo>
          <img src={logo} alt="Logotipo da marca" />
          <span>Cash Control</span>
        </S.ContainerLogo>
        <S.NewTransactionButton>
          Nova Transação
        </S.NewTransactionButton>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
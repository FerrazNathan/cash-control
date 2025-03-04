import { useTheme } from '../../hooks/useTheme'
import { Modal } from '../Modal'

import * as S from './styles'

interface DeleteConfirmationProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export function DeleteConfirmation({ isOpen, onClose, onConfirm }: DeleteConfirmationProps) {
	const { contrast } = useTheme()

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Tem certeza que deseja excluir esta transação?"
		>
			<S.ContainerActions>
				<S.ButtonConfirm
					contrast={contrast}
					onClick={() => {
						onConfirm()
						onClose()
					}}
				>
					Sim
				</S.ButtonConfirm>
				<S.ButtonCancel
					contrast={contrast}
					onClick={onClose}
				>
					Não
				</S.ButtonCancel>
			</S.ContainerActions>
		</Modal>
	)
} 
import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react';
import * as S from './styles'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  contrast?: boolean;
  currentTheme: string;
}

export function Pagination({ 
	currentPage, 
	totalPages, 
	onPageChange, 
	contrast,
	currentTheme
}: PaginationProps) {

  function getPageNumbers(current: number, total: number) {
		// Se tiver 3 páginas ou menos, mostra todas
		if (total <= 3) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}
	
		const pages: (number | string)[] = [];
	
		// Na primeira página: mostra 1, 2, 3, ..., última
		if (current === 1) {
			pages.push(1, 2, 3, '...', total);
		}
		// Na segunda página: mostra 1, 2, 3, ..., última
		else if (current === 2) {
			pages.push(1, 2, 3, '...', total);
		}
		// Na penúltima página: mostra 1, ..., penúltima-1, penúltima, última
		else if (current === total - 1) {
			pages.push(1, '...', total - 2, total - 1, total);
		}
		// Na última página: mostra 1, ..., penúltima, última
		else if (current === total) {
			pages.push(1, '...', total - 1, total);
		}
		// Em qualquer outra página do meio
		else {
			pages.push(1, current - 1, current, current + 1, '...', total);
		}
	
		return pages;
	}

  return (
    <S.PaginationContainer>
      <S.ButtonArrow
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        contrast={contrast}
      >
        <ArrowCircleLeft size={32} color={contrast ? 'yellow' : currentTheme === 'dark' ? 'white' : 'black'} />
      </S.ButtonArrow>

      {getPageNumbers(currentPage, totalPages).map((page, index) => (
        page === '...' ? (
          <S.Ellipsis key={`ellipsis-${index}`} contrast={contrast}>...</S.Ellipsis>
        ) : (
          <S.PageButton
            key={page}
            onClick={() => onPageChange(page as number)}
            isActive={currentPage === page}
            contrast={contrast}
            currentTheme={currentTheme}
          >
            {page}
          </S.PageButton>
        )
      ))}

      <S.ButtonArrow 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        contrast={contrast}
      >
        <ArrowCircleRight size={32} color={contrast ? 'yellow' : currentTheme === 'dark' ? 'white' : 'black'} />
      </S.ButtonArrow>
    </S.PaginationContainer>
  );
} 
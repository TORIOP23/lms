'use client';
import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import '@/css/components/pagination.css';
import Link from 'next/link';

export default function Pagination({ totalPage }: { totalPage: number }) {
  if (!totalPage) totalPage = 1;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPage);
  const nextPage = () => {};
  const prevPage = () => {};
  return (
    <ul className="pagination d-flex justify-content-center mt-4">
      <li className="page-item">
        <Link
          className="page-link"
          href={currentPage > 1 ? createPageURL(currentPage - 1) : ''}
          aria-label="Next"
          style={{ cursor: 'pointer' }}
        >
          <span>&laquo;</span>
        </Link>
      </li>
      {allPages.map((page) => {
        return (
          <li className="page-item" key={page}>
            {/* <button></button> */}
            <Link
              className={page != currentPage ? 'page-link' : 'page-link active'}
              href={createPageURL(page as number)}
            >
              {page}
            </Link>
          </li>
        );
      })}
      <li className="page-item">
        <Link
          href={currentPage < totalPage ? createPageURL(currentPage + 1) : ''}
          className="page-link"
          aria-label="Next"
          style={{ cursor: 'pointer' }}
        >
          <span aria-hidden="true">&raquo;</span>
        </Link>
      </li>
    </ul>
  );
}

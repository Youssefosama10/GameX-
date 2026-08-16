import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (nextPage: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((value) => {
    return value === 1 || value === totalPages || Math.abs(value - page) <= 1;
  });

  return (
    <nav className="gx-pagination" aria-label="Pagination">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="gx-pagination__btn">
          Previous
        </Link>
      ) : (
        <span className="gx-pagination__btn is-disabled">Previous</span>
      )}
      {pages.map((value, index) => {
        const previous = pages[index - 1];
        return (
          <span key={value} className="gx-pagination__group">
            {previous && value - previous > 1 ? <span className="gx-pagination__ellipsis">…</span> : null}
            <Link
              href={hrefFor(value)}
              className={`gx-pagination__page ${value === page ? "is-active" : ""}`}
            >
              {value}
            </Link>
          </span>
        );
      })}
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className="gx-pagination__btn">
          Next
        </Link>
      ) : (
        <span className="gx-pagination__btn is-disabled">Next</span>
      )}
    </nav>
  );
}

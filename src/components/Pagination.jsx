export default function Pagination({ jobsPerPage, totalJobs, paginate, currentPage }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="my-4">
        <ul className="flex justify-center">
          {pageNumbers.map(number => (
            <li key={number} className={`mx-1 ${currentPage === number ? 'text-blue-600 font-bold' : ''}`}>
              <a onClick={() => paginate(number)} href="#" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-400">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  
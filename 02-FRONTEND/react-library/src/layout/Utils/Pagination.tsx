// Pagination Component
export const Pagination: React.FC<{
    currentPage: number;       // Current active page
    totalPages: number;        // Total number of pages
    paginate: any;             // Function to handle page changes
  }> = (props) => {
    const pageNumbers = [];    // Array to store the page numbers to be displayed
  
    // Check if the current page is the first page
    if (props.currentPage === 1) {
      // Logic for the first page
      pageNumbers.push(props.currentPage);  // Add the current page to the list
  
      // If there is at least one more page after the current page, add it to the list
      if (props.totalPages >= props.currentPage + 1) {
        pageNumbers.push(props.currentPage + 1);
      }
  
      // If there are at least two more pages after the current page, add the next one to the list
      if (props.totalPages >= props.currentPage + 2) {
        pageNumbers.push(props.currentPage + 2);
      }
    } else if (props.currentPage > 1) {
      // Logic for pages other than the first
  
      // If the current page is at least 3, add the two pages before the current page to the list
      if (props.currentPage >= 3) {
        pageNumbers.push(props.currentPage - 2);
        pageNumbers.push(props.currentPage - 1);
      } else {
        // If the current page is less than 3, add only one page before the current page to the list
        pageNumbers.push(props.currentPage - 1);
      }
  
      // Add the current page to the list
      pageNumbers.push(props.currentPage);
  
      // If there is at least one more page after the current page, add it to the list
      if (props.totalPages >= props.currentPage + 1) {
        pageNumbers.push(props.currentPage + 1);
      }
  
      // If there are at least two more pages after the current page, add the next one to the list
      if (props.totalPages >= props.currentPage + 2) {
        pageNumbers.push(props.currentPage + 2);
      }
    }
  
    // JSX for rendering the pagination UI
    return (
      <nav aria-label="...">
        <ul className="pagination">
          {/* Button for the first page */}
          <li className="page-item" onClick={() => props.paginate(1)}>
            <button className="page-link">First Page</button>
          </li>
  
          {/* Display page numbers */}
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${props.currentPage === number ? "active" : ""}`}
              onClick={() => props.paginate(number)}
            >
              <button className="page-link">{number}</button>
            </li>
          ))}
  
          {/* Button for the last page */}
          <li
            className="page-item"
            onClick={() => props.paginate(props.totalPages)}
          >
            <button className="page-link">Last Page</button>
          </li>
        </ul>
      </nav>
    );
  };
  
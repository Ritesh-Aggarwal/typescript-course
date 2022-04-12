import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function Paginator(props: {
  page: number;
  total: number;
  limit: number;
}) {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        {props.page > 1 && (
          <a
            href={`?page=${props.page - 1}`}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
        )}
        {props.page < Math.ceil(props.total / props.limit) && (
          <a
            href={`?page=${props.page + 1}`}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(props.page - 1) * props.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {props.page && props.page * props.limit}
            </span>{" "}
            of <span className="font-medium">{props.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {props.page > 1 && (
              <a
                href={`?page=${props.page - 1}`}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            {Array.from(Array(Math.ceil(props.total / props.limit)).keys()).map(
              (i) => {
                return (
                  <a
                    key={i}
                    href={`?page=${i + 1}`}
                    className={` ${
                      i + 1 === props.page
                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 "
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 "
                    } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {i + 1}
                  </a>
                );
              }
            )}

            {props.page < Math.ceil(props.total / props.limit) && (
              <a
                href={`?page=${props.page + 1}`}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

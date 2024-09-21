# Libraries Pagination Hook

This project contains a custom React hook for handling pagination of libraries. The hook provides functionalities to manage sorting, searching, and pagination of library data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Scripts](#scripts)
- [Testing](#testing)
- [Contributing](#contributing)

## Installation

To install the dependencies, run:

```sh
yarn install
```

## Usage

To use the pagination hook, import it and call it within a functional component:

```typescript
import usePagination, { PaginationType } from './hooks/usePagination';

const MyComponent = () => {
  const { data, loading, error, onSort, onSearch, pageNumber } = usePagination(PaginationType.LIBRARY);

  // Render your component with the paginated data
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {data.map(library => (
          <li key={library.id}>{library.name}</li>
        ))}
      </ul>
      <button onClick={() => onSort('name')}>Sort by Name</button>
      <input type="text" onChange={(e) => onSearch(e.target.value)} placeholder="Search..." />
      <p>Page: {pageNumber}</p>
    </div>
  );
};
```
## API

### `usePagination`

The `usePagination` hook manages the state and logic for paginating library data.

#### Parameters

- `type: PaginationType` - The type of pagination to use (e.g., `PaginationType.LIBRARY`).

#### Returns

- `data: ILibrary[]` - The paginated data.
- `loading: boolean` - Indicates if the data is currently being loaded.
- `error: string` - Error message if data loading fails.
- `onSort: (field: string) => void` - Function to sort the data by a specific field.
- `onSearch: (query: string) => void` - Function to search the data with a specific query.
- `pageNumber: number` - The current page number.

## Scripts

The following scripts are available in the `package.json` file:

- **start**: Runs the development server.
  ```sh
  yarn start
  ```
- **build**: Builds the project for production.
  ```sh
  yarn build
  ```
- **lint**: Lints the codebase using ESLint.
  ```sh
  yarn lint
  ```
- **type-check:**: Checks the TypeScript types without emitting any files.
  ```sh
  yarn type-check
  ```
- **test:**:Runs the tests using Jest.
  ```sh
  yarn test
  ```
- **coverage:**:Runs the tests and generates a coverage report using Jest.
  ```sh
  yarn coverage
  ```

## Testing

To run the tests, use:

```sh
yarn test
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request. When contributing, please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

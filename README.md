# James NestJS Services API

Backend API to Get, Filter, and Paginate Services. 

## Setup

Ensure Docker is installed and running. Clone the repo and perform the following steps: 

```bash
yarn
yarn start:db
yarn seed
yarn start:dev
```
After that, make an API call to `GET http://localhost:3000/api/v1/services`.

## Setup Guide
`yarn start:db` will run the script that starts the official Postgres Docker image, and it will be the main DB the server relies on. After that, running `yarn seed` will populate the database with 50 Service records. Finally, running `yarn start:dev` will run the development server. 

## API Endpoints
```
GET /api/v1/services
 - This is the Index endpoint and the Search endpoint. There are 4 query parameters:
    - pgnum: integer type. determines the current page of the results
    - pgsize: integer type. determines the number of records in a page
    - find: string type. represents the search string. Returns all records with name and/or description that contains this string. Uses ILIKE command.
    - sort: type 'ASC' | 'DESC'. Orders the result by the name alphabetically. 
  - Sample cURL: curl --location --request GET 'localhost:3000/api/v1/services?pgsize=5&find=et&sort=asc&pgnum=2'

GET /api/v1/services/:id
  - Returns a single Service, including all its attributes and versions. 
  - Sample cURL: curl --location --request GET 'localhost:3000/api/v1/services/35'

```

## Next Steps
I usually start with Test Driven design. I didn't have enough time right now, but in the future, I will take advantage of NestJS's dependency injection integration, to make new Interfaces that captures the abstract behaviours of Repositories and Services. Then, I can create Jest mocks that will implement these interfaces, to create mocks that capture the behaviour. I will start with Unit tests in the Repository and service levels, creating mocks when needed. Then, I will finally create Controller e2e integration tests. 
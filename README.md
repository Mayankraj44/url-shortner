# URL Shortener

A simple, fast URL shortener that converts long URLs into short, shareable links and redirects visitors to their original destinations.

## Features

- Create short links from long URLs
- Redirect users to the original URL
- Optional custom aliases
- Link expiration support
- Click analytics and visit counts
- Input validation and duplicate-link handling
- REST API for creating and managing links

## How It Works

1. A client submits a long URL through the web interface or API.
2. The application validates the URL and generates a unique short code.
3. The code is stored with the original URL.
4. When someone visits `/<short-code>`, the application looks up the destination and redirects the request.

```text
https://example.com/very/long/article/path
                    |
                    v
https://short.example/abc123
```

## Project Structure

```text
.
├── README.md
├── src/                 # Application source code
├── public/              # Static web assets
├── tests/               # Automated tests
├── package.json         # Node.js dependencies and scripts
└── .env.example         # Example environment variables
```

> Update this section to reflect the final framework and folder structure used by the project.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or yarn
- A database supported by the application

### Installation

```bash
git clone <repository-url>
cd url-shortner
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Configure the required values in `.env`:

```env
PORT=3000
BASE_URL=http://localhost:3000
DATABASE_URL=<database-connection-string>
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Run Tests

```bash
npm test
```

## API

The API below is a suggested interface and should be adjusted to match the implementation.

### Create a Short URL

```http
POST /api/links
Content-Type: application/json

{
  "url": "https://example.com/very/long/article/path",
  "customCode": "optional-code"
}
```

Example response:

```json
{
  "id": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "originalUrl": "https://example.com/very/long/article/path",
  "createdAt": "2026-11-19T00:00:00.000Z"
}
```

### Redirect to the Original URL

```http
GET /abc123
```

### Get Link Details

```http
GET /api/links/abc123
```

### Delete a Link

```http
DELETE /api/links/abc123
```

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port used by the application | `3000` |
| `BASE_URL` | Public URL used to generate short links | `http://localhost:3000` |
| `DATABASE_URL` | Database connection string | `postgres://user:pass@localhost:5432/urlshortener` |

## Security and Production Notes

- Validate URLs before storing or redirecting them.
- Restrict or sanitize custom aliases.
- Use HTTPS in production.
- Rate-limit link creation and redirect endpoints.
- Add authentication before exposing link-management operations.
- Use collision-safe short-code generation.
- Consider a cache for frequently requested redirects.
- Never expose database credentials or private environment variables.

## Deployment

Set all required environment variables in your hosting provider, build the application, and ensure the database is reachable. Configure the public base URL to point to the deployed domain.

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit the changes: `git commit -m "Add my feature"`
4. Push the branch: `git push origin feature/my-feature`
5. Open a pull request.

## License

Add your preferred license, for example the MIT License.

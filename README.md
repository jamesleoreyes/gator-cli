# Gator CLI

CLI for managing and aggregating RSS feeds. Gator CLI allows you to discover, follow, and browse RSS feeds from your terminal.

## Prerequisites

Before you can use Gator CLI, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **PostgreSQL** database server
- **npm** or **pnpm**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jamesleoreyes/gator-cli.git
   cd gator-cli
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Configuration

Gator CLI requires a configuration file located at `~/.gatorconfig.json` in your home directory. Create this file with the following structure:

```json
{
  "dbUrl": "postgresql://username:password@localhost:5432/database_name",
  "currentUserName": ""
}
```

### Configuration Fields

- **`dbUrl`** (required): PostgreSQL connection string for your database
  - Format: `postgresql://username:password@host:port/database_name`
  - Example: `postgresql://postgres:mypassword@localhost:5432/gator_db`

- **`currentUserName`** (optional): The username of the currently logged-in user. This is automatically set when you use the `login` or `register` commands.

### Example Setup

```bash
# Create the config file
cat > ~/.gatorconfig.json << EOF
{
  "dbUrl": "postgresql://postgres:password@localhost:5432/gator_db",
  "currentUserName": ""
}
EOF
```

## Database Setup

1. Create a PostgreSQL database:
   ```bash
   createdb gator_db
   ```

2. Run database migrations:
   ```bash
   pnpm run drizzle:migrate
   ```

## Usage

Run commands using pnpm:

```bash
pnpm start <command> [arguments]
```

Or directly with tsx:

```bash
pnpx tsx ./src/index.ts <command> [arguments]
```

## Available Commands

### Authentication Commands

#### `register <username>`
Register a new user account and automatically log in.

```bash
pnpm start register alice
```

#### `login <username>`
Log in as an existing user.

```bash
pnpm start login alice
```

#### `users`
List all registered users. The currently logged-in user is marked with an asterisk.

```bash
pnpm start users
```

### Feed Management Commands

#### `addfeed <name> <url>`
Add a new RSS feed to the system. Requires authentication.

```bash
pnpm start addfeed "Tech News" https://example.com/feed.xml
```

#### `feeds`
List all RSS feeds in the system.

```bash
pnpm start feeds
```

#### `follow <url>`
Follow an existing RSS feed. Requires authentication.

```bash
pnpm start follow https://example.com/feed.xml
```

#### `unfollow`
Unfollow a feed. Requires authentication.

```bash
pnpm start unfollow
```

#### `following`
List all feeds followed by the currently logged-in user. Requires authentication.

```bash
pnpm start following
```

### Content Commands

#### `browse [limit]`
Browse posts from feeds you follow. Requires authentication.

- Default limit: 2 posts
- Optional limit parameter: specify number of posts to display

```bash
pnpm start browse
pnpm start browse 10
```

#### `agg <time_between_reqs>`
Start the feed aggregator that periodically collects new posts from all feeds.

> **⚠️ Warning:** Be careful when setting the aggregation interval. Using intervals that are too short (e.g., less than 5 seconds) can overwhelm RSS feed servers and may result in your IP being blocked or rate-limited. It's recommended to use intervals of at least 1 minute (`1m`) or longer to be respectful to feed providers and avoid accidentally DOS'ing their servers.

- **`time_between_reqs`**: Time interval between feed collection cycles
  - Format: `1s` (seconds), `1m` (minutes), `1h` (hours)
  - Examples: `30s`, `5m`, `1h`
  - **Recommended minimum:** `5m` (5 minutes)

```bash
pnpm start agg 1m
```

The aggregator runs continuously until interrupted with `Ctrl+C`.

### Utility Commands

#### `reset`
Reset the database by deleting all users. Use with caution!

```bash
pnpm start reset
```

## Commands Requiring Authentication

The following commands require you to be logged in (use `login` or `register` first):

- `addfeed`
- `follow`
- `unfollow`
- `following`
- `browse`

## Development

### Generate Database Migrations

After modifying the schema in `src/db/schema.ts`:

```bash
pnpm run drizzle:generate
```

### Run Migrations

Apply pending migrations:

```bash
pnpm run drizzle:migrate
```

## Project Structure

```bash
gator-cli/
├── src/
│   ├── commands/          # Command handlers
│   ├── configs/           # Configuration management
│   ├── db/                # Database schema and queries
│   ├── middlewares/       # Command middlewares (e.g., auth)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── index.ts           # Main entry point
├── drizzle.config.ts      # Drizzle ORM configuration
└── package.json           # Dependencies and scripts
```

## Troubleshooting

### Config File Not Found
If you see errors about the config file, ensure `~/.gatorconfig.json` exists and contains valid JSON with a `dbUrl` field.

### Database Connection Errors
- Verify PostgreSQL is running
- Check that the `dbUrl` in your config file is correct
- Ensure the database exists and migrations have been run

### Authentication Errors
Some commands require you to be logged in. Use `login <username>` or `register <username>` first.

## License

ISC

# Database Migrations Documentation

This directory contains the migration files for the PawPal application database. Migrations are used to manage changes to the database schema over time, allowing for version control of the database structure.

## Migration Files

- Each migration file should be named in the format `YYYYMMDDHHMMSS_description.ts`, where:
  - `YYYYMMDDHHMMSS` is the timestamp of when the migration was created.
  - `description` is a brief description of the changes made in the migration.

## Running Migrations

To run the migrations, use the following command:

```
npm run migrate
```

Ensure that your database connection is properly configured in the environment variables before running migrations.

## Rollback Migrations

If you need to rollback the last migration, you can use the following command:

```
npm run migrate:rollback
```

## Best Practices

- Always create a backup of your database before running migrations.
- Test migrations in a development environment before applying them to production.
- Document any changes made in the migration files for future reference.
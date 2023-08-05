Migrations are essential when you modify your database schema and wanna preserve existing data.

## How to create database migrations using Prisma ? Here is an overview :

1. **Generate Migration** : Open your terminal and run the following command, depending on your package manager.

    ```bash
    npx prisma migrate dev --name <migration-name>
    # or
    yarn prisma migrate dev --name <migration-name>
    # or
    pnpx prisma migrate dev --name <migration-name>
    ```

    This command generates a new migration with the specified name in the `prisma/migrations` directory.  
    The migration file will contain the changes defined in your `schema.prisma`.

    You can also use the `--create-only` option to generate the file without applying it immediately, to edit it for example :

    ```bash
    npx prisma migrate dev --name <migration-name> --create-only
    # or
    yarn prisma migrate dev --name <migration-name> --create-only
    # or
    pnpx prisma migrate dev --name <migration-name> --create-only
    ```

2. **Apply Migration** : Once the migration is generated, you need to apply it to your database :

    ```bash
    npx prisma migrate deploy
    # or
    yarn prisma migrate deploy
    # or
    pnpx prisma migrate deploy
    ```

    This command applies the generated migration to your database, making the necessary changes to the schema.

3. **Regenerate Prisma Client** : After applying the migration, it's good to regenerate your Prisma Client to reflect the changes in the schema :

    ```bash
    npx prisma generate
    # or
    yarn prisma generate
    # or
    pnpx prisma generate
    ```

    This command generates the necessary Prisma Client code based on the updated schema, allowing you to interact with your database using the latest schema changes.

4. **Check Database** :

    After this, check that your database schema matches your schema.prisma file and that the changes have been successfully applied.

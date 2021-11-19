# Hublot Social API - Cinquin Andy 😁

## Quick start
- Clone the project
- `npm install`
- create a `.env` file with the following content 
```
    PORT = 6667

    DEV_DATABASE_URL=postgres://**postgres**:**password**@127.0.0.1:5432/**hublotSocial**
    TEST_DATABASE_URL=postgres://<dbUsername>:<dbPassword>@127.0.0.1:5432/<dbName_test>
    PROD_DATABASE_URL=postgres://<dbUsername>:<dbPassword>@127.0.0.1:5432/<dbName_prod>
    NODE_ENV=development
```
- DEV_DATABASE_URL=postgres://`user`:`password`@127.0.0.1:5432/`name_bdd`
- create database in postgres
- in the project launch `npx sequelize-cli db:migrate`
- `npm run start:dev`
- you can now use the api :D

## Optionnal
- if you want to test the project, you can import the insomnia.json file in insomnia or PostMan !

## Overview

Design an AST to represent a subset of the Prisma 2 schema definition language.

Implement a parser that takes the schema string as an input and has that AST as an output.

Implement a pretty printer that can print the AST.

**Expected Time needed**: ~1d

## Details

The goal is to be able to parse the following schema string into a self designed AST:

    model User {
      id     Int @id
      name   String
      email  String
    	age    Int?
      posts  Post[]
    }
    
    model Post {
      id       Int @id
      title    String
      content  String
      author   User
    }

The goal is **not** to implement the whole Prisma 2 schema reference. However, here you can look up the full spec [https://github.com/prisma/specs/tree/master/schema](https://github.com/prisma/specs/tree/master/schema)

You should be able to pretty print the exact same AST.

While it’s allowed to write your own parser, we recommend using [https://pegjs.org/](https://pegjs.org/) as it will save you a lot of time.

## Bonus

If you have more time / are fast or just like the challenge, your AST, parser and printer can also support the following:

    datasource db1 {
      provider = "mysql"
      url = "mysql://localhost:3306"
    }
    
    datasource db2 {
      provider = "postgresql"
      url = "postgresql://localhost:5432"
    }
    
    datasource db3 {
      provider = "sqlite"
      url = "file:dev.db"
      enabled = true
    }
    
    generator photon {
      provider = "photonjs"
    }
    
    model User {
      id     Int @id
      name   String
      email  String
    	age    Int?
      posts  Post[]
    }
    
    model Post {
      id         Int @id
      title      String
      content    String
      createdAt  DateTime @default(now())
      author     User
    }

## Submission

It should be implemented in TypeScript. Any helper library is allowed, any code style, too.

We recommend to use either `tslint` or `eslint-typescript` together with these prettier settings in the `.prettierrc.yml`

    tabWidth: 2
    trailingComma: all
    singleQuote: true
    semi: false
    printWidth: 120

Optimally the code includes a few tests, for example using Jest's snapshot tests.

Please create the project either as a private or public GitHub repo. In case you want to keep it private, please invite `timsuchanek` to the repo.
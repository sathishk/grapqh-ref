````md
# GraphQL Development Standards

This project adheres to strict GraphQL linting and schema design standards to ensure high-quality APIs and reliable client-side data management. We use **@graphql-eslint** to enforce these rules.

---

## 1. Schema vs. Operation Separation

We maintain a strict boundary between our **Schema** (the data blueprint) and **Operations** (the queries/mutations).

**Standard**
- Schema files (`.graphql`) define types
- Operation files (`.gql`) define executable actions

**Why it matters**  
This prevents *executable logic* from leaking into the schema, ensuring the server definition remains a clean source of truth while clients maintain their own specific data requirements.

---

## 2. Documentation as Code (`require-description`)

We use GraphQL's native string descriptions instead of standard code comments.

**Example**

```graphql
""" Represents a registered user in our system """
type User {
  id: ID!
  name: String!
}
````

**Why it matters**
Unlike `#` comments, `""" descriptions """` are part of the **Introspection Schema**.
This means tools like **GraphiQL**, **Postman**, and **Apollo Sandbox** automatically display this documentation while browsing the API—eliminating the need for external documentation.

---

## 3. Mandatory Unique Identifiers (`require-selections` on `id`)

Whenever a type has an `id` field available, it **must be included** in the client query.

**Example (Correct)**

```graphql
query {
  person(id: "1") {
    id    # Mandatory
    name
  }
}
```

**Why it matters**
This is critical for **Cache Normalization**. Frontend clients (Apollo, Relay, etc.) use the `id` to normalize data.
If a person’s `name` is fetched in one query and `age` in another, the client can merge both results into a single UI update **only if the `id` is present**.

---

## 4. Standardized Naming Conventions

All types, fields, and arguments follow strict casing rules:

* **Types** → `PascalCase`
* **Fields & Arguments** → `camelCase`

**Why it matters**
Consistency reduces friction during development and prevents *breaking changes* when integrating with frontend tools such as **GraphQL Code Generator**.

---

## How to Lint

To validate your GraphQL files against these standards, run:

```bash
npm run lint
# or
npx eslint .
```

---

## Troubleshooting Common Errors

| Error                            | Solution                                                            |
| -------------------------------- | ------------------------------------------------------------------- |
| The definition is not executable | Move type definitions to `schema.graphql` or check ESLint overrides |
| Description is required          | Add a `""" description """` above the type or field                 |
| Field `id` must be selected      | Add the `id` field to your query selection set                      |

---

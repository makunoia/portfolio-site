# Repository Guidelines

## Project Structure & Module Organization
- The Next.js app router lives in `src/app`; public UI sits in `(app)` while Payload overrides remain in `(payload)`. Colocate route-specific components inside their folder to keep ownership clear.
- Shared styling and config stay in `src/fonts`, `tailwind.config.ts`, and `postcss.config.cjs`. Payload schema is defined in `payload.config.ts`, with generated types versioned in `payload-types.ts`.
- AI helpers stay in `embedding/`; keep scripts and data there so the browser bundle stays lean.

## Build, Test, and Development Commands
- `npm run dev` starts Next.js with Turbopack; switch to `npm run devsafe` if caches misbehave.
- `npm run build` followed by `npm run start` verifies the production bundle locally.
- `npm run lint` runs the ESLint + Next ruleset and should pass before every commit.
- `npm run payload` opens the Payload CLI for migrations, while `npm run generate:types` refreshes Payload typings and `npm run embed:personal` rebuilds the vector embeddings.

## Coding Style & Naming Conventions
- Write TypeScript with 2-space indentation. Components and files use `PascalCase.tsx`; hooks use `useCamelCase`.
- Prefer functional components, server-first patterns, and Tailwind utilities. Compose variants with `class-variance-authority` as in `src/app/(app)/components`.
- Import shared code through the `@/` alias and limit modules to a single default export when possible.

## Testing Guidelines
- No automated suite exists yet; rely on `npm run lint` plus manual passes across `/`, `/projects`, `/journal`, and `/about-me` before shipping.
- When adding tests, colocate them as `Component.test.tsx`, use React Testing Library, and assert on behavior rather than snapshots.

## Commit & Pull Request Guidelines
- Follow the current history: one concise, capitalized sentence in the imperative (e.g., `Add navbar animation`, `Update chat formatting`). Group related work and avoid "fix follow-up" commits.
- PRs must describe the change, list validation steps (lint, build, critical routes), call out env or content changes, and attach screenshots for UI tweaks. Link to Payload entries or issues where relevant.

## Security & Configuration Tips
- Manage secrets in `.env` files (scaffold with `node generate-env.js`) and keep them out of git.
- Scope S3 and database credentials to least privilege, and rotate embedding keys after sharing exports.

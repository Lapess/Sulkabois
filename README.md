<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Password-based authentication block installed via the [Supabase UI Library](https://supabase.com/ui/docs/nextjs/password-based-auth)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

```env
NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[INSERT SUPABASE PROJECT API PUBLISHABLE OR ANON KEY]
```

> [!NOTE]
> This example uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, which refers to Supabase's new **publishable** key format.
> Both legacy **anon** keys and new **publishable** keys can be used with this variable name during the transition period. Supabase's dashboard may show `NEXT_PUBLIC_SUPABASE_ANON_KEY`; its value can be used in this example.
> See the [full announcement](https://github.com/orgs/supabase/discussions/29260) for more information.

Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Local vs production env

Keep two env files. Do not overwrite one with the other.

| File | Used by |
|---|---|
| `.env.local` | `npm run dev`, local Drizzle commands |
| `.env.prod` | `*:prod` Drizzle commands |

Next.js does not load `.env.prod`. For the deployed app, set the same variables in the host dashboard (Vercel, etc.).

Each file needs:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
DATABASE_URL=
```

Local values come from `npx supabase status` (API URL, publishable key, DB URL). There must be no spaces around `=`. Restart `npm run dev` after changing `.env.local`.

### Local Supabase

```bash
npx supabase start
npx supabase status
npm run dev
```

Studio: [http://127.0.0.1:54323](http://127.0.0.1:54323)  
Mailpit (magic links): [http://127.0.0.1:54324](http://127.0.0.1:54324)

### Drizzle

`generate` writes SQL files under `./drizzle`. `migrate` applies those files. `push` syncs `schema.ts` straight to the database with no SQL to review.

| Command | Env file | What it does |
|---|---|---|
| `npm run db:generate` | `.env.local` | Writes SQL only; does not touch any database |
| `npm run db:migrate` | `.env.local` | Applies pending SQL in `./drizzle` to the local container |
| `npm run db:migrate:prod` | `.env.prod` | Applies the same pending SQL to hosted Supabase |
| `npm run db:push` | `.env.local` | Live schema sync to the local container |
| `npm run db:push:prod:explain` | `.env.prod` | Dry-run of push against hosted; no writes |
| `npm run db:push:prod` | `.env.prod` | Live schema sync to hosted Supabase |
| `npm run db:studio` | `.env.local` | Drizzle Studio against local |
| `npm run db:studio:prod` | `.env.prod` | Drizzle Studio against hosted |

`generate` compares `schema.ts` to the last snapshot in `./drizzle`, not to the live database. The first generate always emits `CREATE TABLE` for every table. That SQL must not be applied: local and prod already have those tables. The first folder is a **baseline** (snapshot only; `migration.sql` is a no-op). Stamp it with `npm run db:migrate` locally and `npm run db:migrate:prod` (or CI) so Drizzle records it as applied. Later generates will only emit the diff.

For production schema changes after the baseline, use migrate, not push:

1. Edit `src/db/schema.ts`.
2. `npm run db:generate` and read the SQL in `./drizzle`.
3. `npm run db:migrate` against local and confirm the app still works.
4. `npm run db:migrate:prod` only after that SQL looks correct.

`db:migrate:prod` applies every unapplied file in `./drizzle`. It does not print a dry-run. Review the SQL before you run it.

CI is `.github/workflows/migrate.yml`. It runs `drizzle-kit migrate` on push to `main`. Add a repository secret named `DATABASE_URL` (the hosted connection string). Do not commit `.env.prod`.

`drizzle-kit push` is a live schema sync, not a reviewed migration. Do not run `db:push:prod` unless `db:push:prod:explain` prints no SQL. Never pass `--force`. Config is locked to the `public` schema so push cannot touch Supabase `auth` / `storage` / `realtime`.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)

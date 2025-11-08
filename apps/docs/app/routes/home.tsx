import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'QubicKit Docs' },
    {
      name: 'description',
      content: 'Documentation for QubicKit packages (core, SDK, CLI, web).',
    },
  ];
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <section className="px-4 py-16 flex flex-col gap-6 max-w-4xl mx-auto text-center">
        <p className="text-sm font-semibold tracking-wide text-fd-primary uppercase">
          Official entrypoint for building on Qubic
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-balance">
          QubicKit is a four-package monorepo you install, not fork.
        </h1>
        <p className="text-fd-muted-foreground text-lg">
          Add the packages to your app with Bun, use these docs as your operating manual,
          and start shipping transports, SDK flows, CLI tooling, and web dashboards the
          moment you are ready.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            className="text-sm bg-fd-primary text-fd-primary-foreground rounded-full font-medium px-4 py-2.5"
            to="/docs/getting-started"
          >
            Install QubicKit packages
          </Link>
          <Link
            className="text-sm border border-fd-border rounded-full font-medium px-4 py-2.5"
            to="/docs/core/overview"
          >
            Explore @qubickit/core
          </Link>
          <Link
            className="text-sm border border-dashed border-fd-border rounded-full font-medium px-4 py-2.5"
            to="/docs/sdk"
          >
            See the SDK roadmap
          </Link>
        </div>
        <div className="rounded-3xl border border-fd-border bg-fd-card p-6 text-left space-y-3">
          <p className="text-sm font-medium text-fd-muted-foreground">
            Install each package directly from npm as you need it:
          </p>
          <pre className="bg-black text-white text-left rounded-2xl text-sm p-4 overflow-x-auto">
            <code>
              # transports, transactions, identity helpers
              bun add @qubickit/core{'\n'}
              # wallet/session orchestration (when ready)
              bun add @qubickit/sdk{'\n'}
              # CLI as a dependency or install globally
              bun add @qubickit/cli{'\n'}
              # React hooks/components (when ready)
              bun add @qubickit/web
            </code>
          </pre>
          <p className="text-sm text-fd-muted-foreground">
            No repo clone required—pull in only the packages your project needs, then follow the
            guides below to wire transports, wallets, CLIs, or React clients.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 text-left">
          <article className="rounded-2xl border border-fd-border p-5 h-full bg-fd-card">
            <h2 className="font-semibold mb-2">@qubickit/core today</h2>
            <ul className="space-y-1 text-sm text-fd-muted-foreground list-disc list-inside">
              <li>Schema-backed Archive/HTTP/Stats/Query clients</li>
              <li>Transaction drafting, signing, broadcasting, and monitoring</li>
              <li>Identity helpers, watchers, cache adapters, diagnostics</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-fd-border p-5 h-full bg-fd-card">
            <h2 className="font-semibold mb-2">Whole-monorepo view</h2>
            <ul className="space-y-1 text-sm text-fd-muted-foreground list-disc list-inside">
              <li>SDK: wallet/session orchestration over the core transports</li>
              <li>CLI: Bun-based automation & health tooling that installs globally</li>
              <li>Web: React hooks + components powered by the SDK</li>
            </ul>
          </article>
        </div>
      </section>
    </HomeLayout>
  );
}

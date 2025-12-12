import { Step, Steps } from "@/components/steps";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center gap-8 px-6 py-16">
      <div className="space-y-2 max-w-3xl">
        <div className="inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-wide text-slate-500">
          qubickit (@qubics/kit)
        </div>
        <h1 className="text-4xl font-bold text-slate-900">
          Typed SDK for Qubic endpoints, contracts, and crypto
        </h1>
        <p className="text-lg text-slate-600">
          Call HTTP/Query/RPC, use generated contract bindings, and
          sign/broadcast transactions with one toolkit. Works in Node and
          browsers, with pluggable transports.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs"
          className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
        >
          Documentation
        </Link>
        <Link
          href="/docs/clients"
          className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 hover:bg-slate-50"
        >
          Clients
        </Link>
        <Link
          href="/docs/contracts"
          className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 hover:bg-slate-50"
        >
          Contracts
        </Link>
        <Link
          href="/docs/broadcast"
          className="rounded-md border border-slate-200 px-4 py-2 text-slate-900 hover:bg-slate-50"
        >
          Broadcasting
        </Link>
      </div>
      <div className="w-full max-w-4xl text-left space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          3-step workflow
        </div>
        <Steps>
          <Step>
            <h3 className="text-base font-semibold text-slate-900">
              Install & configure
            </h3>
            <p className="text-sm text-slate-600">
              Add <code>@qubics/kit</code>, point transports at preferred Qubic
              endpoints, and set auth headers once.
            </p>
          </Step>
          <Step>
            <h3 className="text-base font-semibold text-slate-900">
              Call typed clients
            </h3>
            <p className="text-sm text-slate-600">
              Reuse the same transport to talk to HTTP, Query V2, JSON-RPC, and
              generated contract bindings with IntelliSense.
            </p>
          </Step>
          <Step>
            <h3 className="text-base font-semibold text-slate-900">
              Sign & broadcast
            </h3>
            <p className="text-sm text-slate-600">
              Build transactions from procedures, sign them with the crypto
              helpers, and broadcast with one helper.
            </p>
          </Step>
        </Steps>
      </div>
    </div>
  );
}

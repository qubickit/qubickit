import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Steps({ children, className }: Props) {
  return (
    <div
      className={`grid gap-4 text-left md:grid-cols-3 ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );
}

export function Step({ children, className }: Props) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border border-slate-200 bg-white/70 p-4 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );
}

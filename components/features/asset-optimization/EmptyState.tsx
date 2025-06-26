import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 p-8 text-center">
      <div className="mb-4 rounded-full bg-slate-800 p-4">
        <Sparkles className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

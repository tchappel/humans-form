import { AlertCircle } from "lucide-react";

interface FieldErrorsProps {
  errors?: string[];
}

export function FieldErrors({ errors }: FieldErrorsProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="space-y-1">
      {errors.map((error, index) => (
        <p
          key={index}
          className="text-sm text-destructive font-medium flex items-start gap-1.5"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      ))}
    </div>
  );
}

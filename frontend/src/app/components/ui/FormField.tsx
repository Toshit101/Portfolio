import { forwardRef } from "react";
import { clsx } from "clsx";

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, id, error, multiline = false, rows = 4, disabled, value, onChange, type = "text", placeholder, required }, ref) => {
    const inputClasses = clsx(
      "w-full bg-input-background text-foreground rounded px-4 py-3",
      "border border-border",
      "placeholder:text-muted-foreground/50",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
      "transition-all duration-100",
      error && "border-destructive ring-1 ring-destructive",
      disabled && "opacity-40 cursor-not-allowed",
      value && !error && "border-border/50"
    );

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
        </label>
        {multiline ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            className={clsx(inputClasses, "resize-none")}
          />
        ) : (
          <input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )}
        {error && (
          <p className="text-xs text-destructive mt-0.5" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;

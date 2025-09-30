import { ZodFormattedError } from 'zod';

/** Type guard: garante que v tem `_errors: string[]` */
function isFormattedErrorObject(v: unknown): v is { _errors: string[] } {
  return (
    typeof v === 'object' &&
    v !== null &&
    '_errors' in v &&
    Array.isArray((v as { _errors?: unknown })._errors) &&
    // Opcional: garantir que cada item seja string
    ((v as { _errors?: unknown })._errors as unknown[]).every(
      item => typeof item === 'string',
    )
  );
}

export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
  // Pegamos só as propriedades "próprias" do objeto e as tratamos como chaves do formatted error
  const keys = Object.keys(error) as (keyof ZodFormattedError<T>)[];

  return keys
    .flatMap(key => {
      const field = error[key] as unknown;

      if (Array.isArray(field)) {
        // campo já é string[]
        return field as string[];
      }

      if (isFormattedErrorObject(field)) {
        // campo é um ZodFormattedError-like com _errors
        return field._errors;
      }

      // nenhum erro nessa chave
      return [];
    })
    .filter(Boolean);
}

import { Inject } from '@nestjs/common';

export function Language(): (
    target: Record<string, any>,
    key: string | symbol,
    index?: number
) => void {
    return Inject(`LanguageService`);
}

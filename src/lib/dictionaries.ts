import 'server-only';
import { cache } from 'react';

export const getDictionary = cache((locale: "en-US"|"en"|"fr-FR"|"fr") => import(`@/dictionaries/${locale.split('-')[0]}.json`).then(module => module.default));
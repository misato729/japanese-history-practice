import type { EssayScoringProfile } from '../../shared/types/essay.ts'

/** Reviewed, versioned subject rules belong here. No subject content is configured yet. */
export const essayRuleProfiles: EssayScoringProfile[] = []

export function getEssayRuleProfile(id: string, version?: number): EssayScoringProfile | undefined {
  return essayRuleProfiles.find(profile => profile.id === id && (version === undefined || profile.version === version))
}

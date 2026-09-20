/**
 * Component Name: useFinBSAi
 * Module: Finance / FinBS
 * Purpose: Placeholder AI extension point for FinBS (no behaviour yet).
 * Author/Version: UXLab / v1.0
 * AI Tags: ai hook, executive report narration, learning analytics, decision assessment, placeholder
 */

// Future AI integrations (Executive Report Narration, Learning Analytics, Decision Assessment) attach here
export default function useFinBSAi() {
  // Placeholder contract: keep this shape stable so the UI needs no change when AI is enabled
  return {
    isEnabled: false,
    narration: null,
    insights: [],
    requestNarration: async () => null,
  };
}

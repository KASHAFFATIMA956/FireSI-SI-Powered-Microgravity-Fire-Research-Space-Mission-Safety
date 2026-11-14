// Optional AppDeploy backend example.
// The downloadable local build runs without this endpoint and uses a transparent offline SI brief.
import { ai, router, json, error } from '@appdeploy/sdk';

export const handler = router({
  'POST /api/insights': [async ({ body }) => {
    const input = body as { dataset?: unknown; investigationSummary?: unknown[] };
    if (!input?.dataset || !Array.isArray(input.investigationSummary)) {
      return error('A dataset summary is required to generate an insight.', 400);
    }
    try {
      const result = await ai.generate({
        system: 'You are a cautious spaceflight fire-safety research analyst. Use only supplied evidence. Do not invent findings or safety thresholds. State that the supplied risk index is undocumented and not validated. Separate observations from hypotheses.',
        prompt: JSON.stringify(input),
        maxTokens: 850,
        temperature: 0.25
      });
      return json({ insight: result.text });
    } catch {
      return error('The SI analyst is temporarily unavailable. Please retry.', 502);
    }
  }]
});
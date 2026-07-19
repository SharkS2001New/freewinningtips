import { useState } from 'react';
import { buildMatchTipAnalysis } from '@/components/functions/matchTipAnalysis';

export default function MatchAnalysisBlock({
  fixture,
  tip,
  probability,
  odds,
  predictionType = 'all',
}) {
  const [open, setOpen] = useState(false);
  const analysis = buildMatchTipAnalysis({
    fixture,
    tip,
    probability: typeof probability === 'string' ? probability.replace('%', '') : probability,
    odds,
    predictionType,
  });

  if (!analysis) return null;

  return (
    <div className="match-analysis">
      <button
        type="button"
        className="match-analysis-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? 'Hide Analysis' : 'Read Analysis'}
      </button>
      {open && (
        <div className="match-analysis-body">
          <p className="match-analysis-summary"><strong>{analysis.summary}</strong></p>
          <p>{analysis.body}</p>
        </div>
      )}
    </div>
  );
}

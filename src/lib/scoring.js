/**
 * MX Muse - Assessment Scoring Logic
 *
 * Ported from the proven Wix implementation. Do not alter the formulas
 * without a data-validation plan. The percentage weightings, the gap
 * formula, and the profile type thresholds have been calibrated against
 * real assessment results.
 */


/**
 * Calculate natural talent percentages from answers to questions 1-24.
 *
 * Each question type contributes differently:
 *   - ranking: each archetype gets (5 - rank) points, so rank 1 = 4 pts, rank 4 = 1 pt
 *   - points:  the points assigned by the user go straight through
 *   - select:  the chosen archetype gets 4 pts, others get 1 pt each
 *              Q4 is a "drain" question (inverted): chosen = 0 pts, others = 2 pts
 */
export function calculateTalentPercentages(answers, questions) {
  const scores = { storyteller: 0, strategist: 0, scientist: 0, builder: 0 };

  for (let qNum = 1; qNum <= 24; qNum++) {
    const question = questions.find(q => q.number === qNum);
    const answer = answers[qNum];
    if (!question || !answer) continue;

    if (question.type === 'ranking') {
      scores.storyteller += (5 - answer.storyteller);
      scores.strategist  += (5 - answer.strategist);
      scores.scientist   += (5 - answer.scientist);
      scores.builder     += (5 - answer.builder);
    }
    else if (question.type === 'points') {
      scores.storyteller += answer.storyteller;
      scores.strategist  += answer.strategist;
      scores.scientist   += answer.scientist;
      scores.builder     += answer.builder;
    }
    else if (question.type === 'select') {
      const isDrain = question.isDrain === true;

      if (isDrain) {
        scores.storyteller += (answer === 'storyteller') ? 0 : 2;
        scores.strategist  += (answer === 'strategist')  ? 0 : 2;
        scores.scientist   += (answer === 'scientist')   ? 0 : 2;
        scores.builder     += (answer === 'builder')     ? 0 : 2;
      } else {
        scores.storyteller += (answer === 'storyteller') ? 4 : 1;
        scores.strategist  += (answer === 'strategist')  ? 4 : 1;
        scores.scientist   += (answer === 'scientist')   ? 4 : 1;
        scores.builder     += (answer === 'builder')     ? 4 : 1;
      }
    }
  }

  const total = scores.storyteller + scores.strategist + scores.scientist + scores.builder;

  const percentages = {
    storyteller: Math.round((scores.storyteller / total) * 100),
    strategist:  Math.round((scores.strategist  / total) * 100),
    scientist:   Math.round((scores.scientist   / total) * 100),
    builder:     Math.round((scores.builder     / total) * 100)
  };

  return normaliseToSumOf100(percentages);
}


/**
 * Calculate current role demand percentages from answers to questions 25-30.
 *
 * Q25 is a percentage question (four values summing to 100).
 * Q26-30 are select questions that contribute weighted points.
 */
export function calculateRolePercentages(answers, questions) {
  const totals = { storyteller: 0, strategist: 0, scientist: 0, builder: 0 };
  let questionCount = 0;

  for (let qNum = 25; qNum <= 30; qNum++) {
    const question = questions.find(q => q.number === qNum);
    const answer = answers[qNum];
    if (!question || !answer) continue;

    if (question.type === 'percentage') {
      totals.storyteller += answer.storyteller;
      totals.strategist  += answer.strategist;
      totals.scientist   += answer.scientist;
      totals.builder     += answer.builder;
      questionCount++;
    }
    else if (question.type === 'select') {
      totals.storyteller += (answer === 'storyteller') ? 40 : 20;
      totals.strategist  += (answer === 'strategist')  ? 40 : 20;
      totals.scientist   += (answer === 'scientist')   ? 40 : 20;
      totals.builder     += (answer === 'builder')     ? 40 : 20;
      questionCount++;
    }
  }

  if (questionCount === 0) {
    return { storyteller: 0, strategist: 0, scientist: 0, builder: 0 };
  }

  const averaged = {
    storyteller: Math.round(totals.storyteller / questionCount),
    strategist:  Math.round(totals.strategist  / questionCount),
    scientist:   Math.round(totals.scientist   / questionCount),
    builder:     Math.round(totals.builder     / questionCount)
  };

  return normaliseToSumOf100(averaged);
}


/**
 * Determine the profile type label based on talent percentages.
 *
 * Tiered rules (highest-priority match wins):
 *   1. Pure X            if top talent >= 70%
 *   2. X-Dominant        if top talent >= 50%
 *   3. X-Y Hybrid        if top two both >= 25% AND sum >= 50%
 *   4. X-Y-Z Tri-Talent  if top three all >= 20%
 *   5. Quad-Balanced     if all four >= 20%
 *   6. X-Dominant        fallback
 */
export function determineProfileType(talentPercentages) {
  const sorted = [
    { name: 'Storyteller', value: talentPercentages.storyteller },
    { name: 'Strategist',  value: talentPercentages.strategist },
    { name: 'Scientist',   value: talentPercentages.scientist },
    { name: 'Builder',     value: talentPercentages.builder }
  ].sort((a, b) => b.value - a.value);

  if (sorted[0].value >= 70) {
    return `Pure ${sorted[0].name}`;
  }

  if (sorted[0].value >= 50) {
    return `${sorted[0].name}-Dominant`;
  }

  if (sorted[0].value >= 25 && sorted[1].value >= 25 && (sorted[0].value + sorted[1].value) >= 50) {
    return `${sorted[0].name}-${sorted[1].name} Hybrid`;
  }

  if (sorted[0].value >= 20 && sorted[1].value >= 20 && sorted[2].value >= 20) {
    return `${sorted[0].name}-${sorted[1].name}-${sorted[2].name} Tri-Talent`;
  }

  if (sorted[0].value >= 20 && sorted[3].value >= 20) {
    return 'Quad-Balanced';
  }

  return `${sorted[0].name}-Dominant`;
}


/**
 * Calculate the MX Gap score (0-10).
 *
 * Two penalty types:
 *   - Underutilised: natural talent >=25% but role doesn't use it
 *   - Overextended: role demands more than natural talent
 */
export function calculateMXGap(talentPercentages, rolePercentages) {
  let underutilised = 0;
  let overextended = 0;

  const archetypes = ['storyteller', 'strategist', 'scientist', 'builder'];
  archetypes.forEach(archetype => {
    const natural = talentPercentages[archetype];
    const role = rolePercentages[archetype];

    if (natural >= 25 && natural > role) {
      underutilised += (natural - role);
    }

    if (role > natural) {
      overextended += (role - natural);
    }
  });

  const combined = underutilised + overextended;
  const score = Math.min(Math.round((combined / 100) * 10), 10);

  return score;
}


/**
 * Ensure four percentages sum to exactly 100.
 */
function normaliseToSumOf100(percentages) {
  const sum = percentages.storyteller + percentages.strategist +
              percentages.scientist + percentages.builder;

  if (sum === 100) return percentages;

  const drift = 100 - sum;
  const entries = Object.entries(percentages);
  entries.sort((a, b) => b[1] - a[1]);
  const largestKey = entries[0][0];

  return {
    ...percentages,
    [largestKey]: percentages[largestKey] + drift
  };
}


/**
 * Top-level: run the full scoring calculation.
 */
export function calculateResults(answers, questions) {
  const talentPercentages = calculateTalentPercentages(answers, questions);
  const rolePercentages = calculateRolePercentages(answers, questions);
  const profileType = determineProfileType(talentPercentages);
  const mxGap = calculateMXGap(talentPercentages, rolePercentages);

  return {
    talentPercentages,
    rolePercentages,
    profileType,
    mxGap
  };
}

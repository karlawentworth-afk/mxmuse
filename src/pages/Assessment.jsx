import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import questionData from '../data/questions.json';
import { calculateResults } from '../lib/scoring';
import { supabase } from '../lib/supabase';
import ProgressBar from '../components/assessment/ProgressBar';
import SectionBreak from '../components/assessment/SectionBreak';
import SelectQuestion from '../components/assessment/SelectQuestion';
import RankingQuestion from '../components/assessment/RankingQuestion';
import PointsQuestion from '../components/assessment/PointsQuestion';
import PercentageQuestion from '../components/assessment/PercentageQuestion';
import InfoForm from '../components/assessment/InfoForm';

const questions = questionData.questions;
const sectionBreaks = questionData.sectionBreaks;

// Subtle background tints that shift through the assessment journey
const QUESTION_TINTS = {
  // Q1-6: warm (storyteller territory)
  1: '#FAFAF8', 2: '#FAFAF8', 3: '#FAFAF8', 4: '#FAFAF8', 5: '#FAFAF8', 6: '#FAFAF8',
  // Q7-12: cool (strategist territory)
  7: '#F8F9FB', 8: '#F8F9FB', 9: '#F8F9FB', 10: '#F8F9FB', 11: '#F8F9FB', 12: '#F8F9FB',
  // Q13-18: violet (scientist territory)
  13: '#FAF8FC', 14: '#FAF8FC', 15: '#FAF8FC', 16: '#FAF8FC', 17: '#FAF8FC', 18: '#FAF8FC',
  // Q19-24: teal (builder territory)
  19: '#F7FBFA', 20: '#F7FBFA', 21: '#F7FBFA', 22: '#F7FBFA', 23: '#F7FBFA', 24: '#F7FBFA',
  // Q25-30: neutral (role demand)
  25: '#F9F9F7', 26: '#F9F9F7', 27: '#F9F9F7', 28: '#F9F9F7', 29: '#F9F9F7', 30: '#F9F9F7',
};

function generateShuffleOrders() {
  const orders = {};
  questions.forEach(q => {
    if (q.type === 'select') {
      const indices = [0, 1, 2, 3];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        ;[indices[i], indices[j]] = [indices[j], indices[i]];
      }
      orders[q.number] = indices;
    }
  });
  return orders;
}

export default function Assessment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showSectionBreak, setShowSectionBreak] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const shuffleOrders = useMemo(() => generateShuffleOrders(), []);

  const refSource = searchParams.get('ref') || null;
  const referredBy = searchParams.get('from') || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestion, showSectionBreak, showInfoForm]);

  const question = questions.find(q => q.number === currentQuestion);
  const answer = answers[currentQuestion];

  const isAnswerValid = useCallback(() => {
    if (!answer) return false;
    if (!question) return false;

    if (question.type === 'select') {
      return typeof answer === 'string' && answer.length > 0;
    }

    if (question.type === 'ranking') {
      const ranks = Object.values(answer);
      return ranks.length === 4 && new Set(ranks).size === 4 &&
             ranks.every(r => r >= 1 && r <= 4);
    }

    if (question.type === 'points' || question.type === 'percentage') {
      const total = (answer.storyteller || 0) + (answer.strategist || 0) +
                    (answer.scientist || 0) + (answer.builder || 0);
      return total === 100;
    }

    return false;
  }, [answer, question]);

  function handleAnswer(value) {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  }

  function handleNext() {
    if (!isAnswerValid()) return;

    if (sectionBreaks[String(currentQuestion)]) {
      setShowSectionBreak(true);
      return;
    }

    if (currentQuestion >= 30) {
      setShowInfoForm(true);
      return;
    }

    setCurrentQuestion(prev => prev + 1);
  }

  function handleBack() {
    if (showInfoForm) {
      setShowInfoForm(false);
      return;
    }
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  }

  function handleSectionBreakContinue() {
    setShowSectionBreak(false);
    if (currentQuestion >= 30) {
      setShowInfoForm(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  }

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const results = calculateResults(answers, questions);

      const row = {
        first_name: formData.firstName.trim(),
        email: formData.email.trim(),
        job_title: formData.jobTitle.trim(),
        seniority: formData.seniority,
        talent_storyteller: results.talentPercentages.storyteller,
        talent_strategist: results.talentPercentages.strategist,
        talent_scientist: results.talentPercentages.scientist,
        talent_builder: results.talentPercentages.builder,
        role_storyteller: results.rolePercentages.storyteller,
        role_strategist: results.rolePercentages.strategist,
        role_scientist: results.rolePercentages.scientist,
        role_builder: results.rolePercentages.builder,
        profile_type: results.profileType,
        mx_gap_score: results.mxGap,
        raw_answers: answers,
        ref_source: refSource,
        referred_by: referredBy
      };

      if (!supabase) {
        console.warn('Supabase not configured. Results not saved.');
        navigate(`/results/dev-${Date.now()}`);
        return;
      }

      const { data, error } = await supabase
        .from('assessments')
        .insert(row)
        .select('id')
        .single();

      if (error) throw error;

      navigate(`/results/${data.id}`);
    } catch (err) {
      console.error('Failed to save assessment:', err);
      setSubmitError('Something went wrong saving your results. Please try again.');
      setIsSubmitting(false);
    }
  }

  // Section break screen
  if (showSectionBreak) {
    return (
      <div className="min-h-screen flex flex-col">
        <SectionBreak
          text={sectionBreaks[String(currentQuestion)]}
          onContinue={handleSectionBreakContinue}
          questionNumber={currentQuestion}
        />
      </div>
    );
  }

  // Info form screen
  if (showInfoForm) {
    return (
      <div className="min-h-screen bg-off-white flex flex-col">
        <div className="max-w-2xl mx-auto w-full px-6 pt-8">
          <ProgressBar current={30} total={30} />
        </div>
        <div className="flex-1">
          <InfoForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          {submitError && (
            <p className="text-center text-storyteller text-sm mt-4 px-6">{submitError}</p>
          )}
          <div className="text-center pb-8">
            <button
              onClick={handleBack}
              className="text-sm text-mid-gray hover:text-near-black transition-colors"
            >
              Back to questions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  const bgTint = QUESTION_TINTS[currentQuestion] || '#FAFAF8';

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-700"
      style={{ backgroundColor: bgTint }}
    >
      <div className="max-w-2xl mx-auto w-full px-6 pt-8">
        <ProgressBar current={currentQuestion} total={30} />
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl lg:text-[2.25rem] font-heading font-semibold text-near-black mb-10 md:mb-12 leading-snug">
          {question.text}
        </h2>

        {question.type === 'select' && (
          <SelectQuestion
            question={question}
            value={answer}
            onChange={handleAnswer}
            shuffleOrder={shuffleOrders[question.number]}
          />
        )}

        {question.type === 'ranking' && (
          <RankingQuestion
            question={question}
            value={answer}
            onChange={handleAnswer}
          />
        )}

        {question.type === 'points' && (
          <PointsQuestion
            question={question}
            value={answer}
            onChange={handleAnswer}
          />
        )}

        {question.type === 'percentage' && (
          <PercentageQuestion
            question={question}
            value={answer}
            onChange={handleAnswer}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-warm-gray/50">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 1}
            className={`text-sm font-medium transition-colors ${
              currentQuestion === 1
                ? 'text-warm-gray cursor-not-allowed'
                : 'text-mid-gray hover:text-near-black'
            }`}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswerValid()}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              isAnswerValid()
                ? 'bg-muse-teal text-white hover:bg-muse-teal-dark shadow-sm'
                : 'bg-warm-gray text-mid-gray cursor-not-allowed'
            }`}
          >
            {currentQuestion === 30 ? 'Continue' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

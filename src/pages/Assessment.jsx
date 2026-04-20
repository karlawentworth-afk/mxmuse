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

// Generate stable shuffle orders for select questions (one per session)
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

  // Stable shuffle orders for select questions, generated once per session
  const shuffleOrders = useMemo(() => generateShuffleOrders(), []);

  // Capture referral params from URL
  const refSource = searchParams.get('ref') || null;
  const referredBy = searchParams.get('from') || null;

  // Scroll to top on question change
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

    // Check if we need to show a section break after this question
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
        // No Supabase configured, generate a fake ID for development
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
      <div className="min-h-screen bg-off-white flex flex-col">
        <div className="max-w-2xl mx-auto w-full px-6 pt-8">
          <ProgressBar current={currentQuestion} total={30} />
        </div>
        <div className="flex-1 flex items-center">
          <SectionBreak
            text={sectionBreaks[String(currentQuestion)]}
            onContinue={handleSectionBreakContinue}
          />
        </div>
      </div>
    );
  }

  // Info form screen (after question 30)
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
  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-6 pt-8">
        <ProgressBar current={currentQuestion} total={30} />
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-near-black mb-8 leading-snug">
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
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-warm-gray">
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
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              isAnswerValid()
                ? 'bg-muse-teal text-white hover:bg-muse-teal-dark'
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

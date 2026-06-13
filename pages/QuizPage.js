const BasePage = require('./BasePage');

class QuizPage extends BasePage {
  constructor(page) {
    super(page);
    // Course grid view
    this.coursesGrid       = '.courses-grid, .quiz-grid, [class*="courses"]';
    this.courseCards       = '.course-card, [class*="course-card"]';
    this.levelBadges       = '.level-badge, [class*="level-badge"], .badge';
    this.searchInput       = 'input[type="search"], input[placeholder*="search" i]';
    this.courseDialog      = '.dialog, .modal, [class*="dialog"], [class*="modal"]';
    this.cancelBtn         = 'button:has-text("Cancel"), .cancel-btn';
    this.startQuizBtn      = 'button:has-text("Start"), button:has-text("Begin"), .start-quiz-btn';

    // Quiz view
    this.quizView          = '.quiz-view, [class*="quiz-view"], .question-section';
    this.quizTimer         = '.timer, [class*="timer"]';
    this.questionCard      = '.question-card, .question, [class*="question-card"]';
    this.optionsList       = '.options, .choices, [class*="options"]';
    this.optionItems       = '.option, .choice, [class*="option"]';
    this.prevBtn           = 'button:has-text("Previous"), button:has-text("Prev"), .prev-btn';
    this.nextBtn           = 'button:has-text("Next"), .next-btn';
    this.submitBtn         = 'button:has-text("Submit"), .submit-btn';
    this.questionDots      = '.question-dot, .dot, [class*="question-dot"]';
    this.resultsView       = '.results, [class*="results"], .quiz-results';
    this.certificateModal  = '.certificate, [class*="certificate"]';
  }

  async open() {
    await this.navigate('/quiz.html');
  }

  async getCourseCardCount() {
    return await this.page.locator(this.courseCards).count();
  }

  async getLevelBadgeCount() {
    return await this.page.locator(this.levelBadges).count();
  }

  async clickCourseCard(index = 0) {
    await this.page.locator(this.courseCards).nth(index).click();
  }

  async isDialogVisible() {
    return await this.page.locator(this.courseDialog).isVisible();
  }

  async clickCancel() {
    await this.page.click(this.cancelBtn);
  }

  async clickStartQuiz() {
    await this.page.click(this.startQuizBtn);
  }

  async isQuizViewVisible() {
    return await this.page.locator(this.quizView).isVisible();
  }

  async isTimerVisible() {
    return await this.page.locator(this.quizTimer).isVisible();
  }

  async isPrevBtnDisabled() {
    return await this.page.locator(this.prevBtn).isDisabled();
  }

  async clickNext() {
    await this.page.click(this.nextBtn);
  }

  async clickPrev() {
    await this.page.click(this.prevBtn);
  }

  async getQuestionText() {
    return await this.page.locator(this.questionCard).first().textContent();
  }

  async searchCourse(term) {
    await this.page.fill(this.searchInput, term);
  }

  async getVisibleCardCount() {
    return await this.page.locator(this.courseCards).filter({ hasNotClass: 'hidden' }).count();
  }
}

module.exports = QuizPage;

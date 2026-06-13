const BasePage = require('./BasePage');

class TaskPage extends BasePage {
  constructor(page) {
    super(page);
    // Task form
    this.titleInput       = 'input[placeholder*="title" i], #task-title, input[name="title"]';
    this.descInput        = 'textarea[placeholder*="description" i], #task-desc, textarea[name="description"]';
    this.dueDateInput     = 'input[type="date"], #due-date';
    this.priorityBtns     = '.priority-btn, [class*="priority"] button, button[data-priority]';
    this.highPriorityBtn  = '.priority-btn[data-priority="high"], button:has-text("High")';
    this.medPriorityBtn   = '.priority-btn[data-priority="medium"], button:has-text("Medium")';
    this.lowPriorityBtn   = '.priority-btn[data-priority="low"], button:has-text("Low")';
    this.subtaskInput     = 'input[placeholder*="subtask" i], #subtask-input';
    this.addSubtaskBtn    = 'button:has-text("Add"), .add-subtask-btn';
    this.createTaskBtn    = 'button[type="submit"]:has-text("Create"), button:has-text("Add Task"), .create-task-btn';
    this.resetBtn         = 'button[type="reset"], button:has-text("Reset"), .reset-btn';

    // Task list
    this.taskList         = '.task-list, [class*="task-list"]';
    this.taskItems        = '.task-item, .task-card, [class*="task-item"]';
    this.subtaskList      = '.subtask-list, [class*="subtask-list"]';
    this.subtaskItems     = '.subtask-item, [class*="subtask-item"]';
    this.errorMsg         = '.error-message, [class*="error"], [class*="toast"]';

    // Filter tabs
    this.filterTabs       = '.filter-tab, .tab-btn, [class*="filter-tab"]';
    this.allFilterTab     = '.filter-tab:has-text("All"), .tab:has-text("All"), button:has-text("All")';
    this.inProgressTab    = 'button:has-text("In Progress"), .tab:has-text("In Progress")';
    this.completedTab     = 'button:has-text("Completed"), .tab:has-text("Completed")';

    // Calendar
    this.calendarGrid     = '.calendar, [class*="calendar"]';
    this.monthLabel       = '.month-label, [class*="month"], .calendar-header span';
  }

  async open() {
    await this.navigate('/task.html');
  }

  async fillTitle(title) {
    await this.page.fill(this.titleInput, title);
  }

  async fillDescription(desc) {
    await this.page.fill(this.descInput, desc);
  }

  async fillDueDate(date) {
    await this.page.fill(this.dueDateInput, date);
  }

  async selectPriority(level = 'High') {
    const selectorMap = {
      'High': this.highPriorityBtn,
      'Medium': this.medPriorityBtn,
      'Low': this.lowPriorityBtn
    };
    await this.page.click(selectorMap[level] || this.highPriorityBtn);
  }

  async addSubtask(subtaskText) {
    await this.page.fill(this.subtaskInput, subtaskText);
    await this.page.click(this.addSubtaskBtn);
  }

  async clickCreateTask() {
    await this.page.click(this.createTaskBtn);
  }

  async clickReset() {
    await this.page.click(this.resetBtn);
  }

  async getTaskCount() {
    return await this.page.locator(this.taskItems).count();
  }

  async getSubtaskCount() {
    return await this.page.locator(this.subtaskItems).count();
  }

  async clickFilterTab(tabName) {
    await this.page.locator(`button:has-text("${tabName}")`).first().click();
  }

  async isCalendarVisible() {
    return await this.page.locator(this.calendarGrid).isVisible();
  }

  async getMonthLabelText() {
    return await this.page.locator(this.monthLabel).first().textContent();
  }

  async isTitleInputEmpty() {
    return (await this.page.inputValue(this.titleInput)) === '';
  }

  async isPrioritySelected(level = 'High') {
    const selectorMap = {
      'High': this.highPriorityBtn,
      'Medium': this.medPriorityBtn,
      'Low': this.lowPriorityBtn
    };
    const btn = this.page.locator(selectorMap[level]).first();
    const classList = await btn.getAttribute('class') || '';
    return classList.includes('active') || classList.includes('selected') || classList.includes('priority-high');
  }
}

module.exports = TaskPage;

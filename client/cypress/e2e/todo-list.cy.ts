import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for todo 'Fry'
    cy.get('[data-test=todoOwnerInput]').type('Fry');

    // All of the todo cards should have the owner we are filtering by
    page.getTodoCards().each($card => {
      cy.wrap($card).find('.todo-card-owner').should('have.text', 'Fry');
    });

    // (We check this two ways to show multiple ways to check this)
    page.getTodoCards().find('.todo-card-owner').each($owner =>
      expect($owner.text()).to.equal('Fry')
    );
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'video games'
    cy.get('[data-test=todoCategoryInput]').type('video games');

    page.getTodoCards().should('have.lengthOf.above', 0);

  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    // Filter for companies that contain 'ti'
    cy.get('[data-test=todoCategoryInput]').type('groce');

    page.getTodoCards().should('have.lengthOf', 76);

  });

  it('Should type something in the body filter and check that it returned correct elements', () => {
    // Filter for todos of body 'non su'
    cy.get('[data-test=todoBodyInput]').type('non su');

    page.getTodoCards().should('have.lengthOf', 3);

    // Go through each of the cards that are being shown and get the owners
    page.getTodoCards().find('.todo-card-owner')
      // We should see these todos whose body contains non su
      .should('contain.text', 'Barry')
      .should('contain.text', 'Blanche')
      .should('contain.text', 'Workman')
      // We shouldn't see these todos
      .should('not.contain.text', 'Dawn')
      .should('not.contain.text', 'Fry');
  });

  it('Should change the view', () => {
    // Choose the view type "List"
    page.changeView('list');

    // We should not see any cards
    // There should be list items
    page.getTodoCards().should('not.exist');
    page.getTodoListItems().should('exist');

    // Choose the view type "Card"
    page.changeView('card');

    // There should be cards
    // We should not see any list items
    page.getTodoCards().should('exist');
    page.getTodoListItems().should('not.exist');
  });

  it('Should click view profile on a todo and go to the right URL', () => {
    page.getTodoCards().first().then((card) => {
      const firstTodoOwner = card.find('.todo-card-owner').text();
      const firstTodoCategory = card.find('.todo-card-category').text();

      // When the view profile button on the first todo card is clicked, the URL should have a valid mongo ID
      page.clickViewProfile(page.getTodoCards().first());

      // The URL should contain '/todos/' (note the ending slash) and '/todos/' should be followed by a mongo ID
      cy.url()
        .should('contain', '/todos/')
        .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

      // On this profile page we were sent to, the owner and category should be correct
      cy.get('.todo-card-owner').first().should('have.text', firstTodoOwner);
    });
   });

});

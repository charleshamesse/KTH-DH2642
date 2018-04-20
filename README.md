# KTH-DH2642

## Mid-project review

Our webpage can be found here <https://kth-dh2642-books.firebaseapp.com/home>

### Short description of the project

Our project is a website that alows the user easy access to the Google Books API.

With our webpage users can use advanced search queries to find books they are looking for.
 Users can then add these books to reading lists or mark them as one of their favorite books.

If time allows, we wan't to enable users to comment on books, publish their reading list and interact 
with other users of the system in some way.

### What we have done

So far we have implemented the following:

- Set up React/Redux, WebPack, eslint rules
- Set up a Firebase project for the website
- Authentication/Log in via Google
- Display user specific data (username, favorite books etc)
- Retrieved books from the API and display them
- Allow users to search for books using a query string
- Allow users to click on a book and get its details (so far, only the description)
- Allow users to mark books as favorite
- Created a drag-and-drop feature to sort users' reading list (the drag-and-drop component is done but so far it's still mockup data)

### What we still plan to do

There is still a lot of work left to be done.

These are the things we will definitely do before the final submission
- Make all screens of the site fully responsive
- Implement the user profile screen
- Allow for advanced search queries
- Display more than 10 search results via pagination most likely
- Iteratively refactor and do architecture reviews (mostly making sure all of our app's state is consistent, e.g. right now the search has been quickly implemented partly using the component's state, this will be refactored)

If time allows we want to implement the following:
- Allow users to comment on books
- Allow users to publish their reading list/favorite books. Making it available for other users

### Project file structure

- app
  - actions
    - index.js => Contains the Redux action definitions and API calls
  - assets
    - img/ => Contains images used in the project
  - components
    - BookCard => Card component for a book in the search
    - BookShelfBar => List of drag-and-droppable BookShelfCards
    - BookShelfCard => Card component for a book in the bookshelf
    - Footer => Static page footer
    - Header => Nav bar and website name
    - LoadingSpinner => Spinner for all API calls
  - reducers
    - index.js => Aggregates reduces
    - reducer_books.js => Search reducer
    - reducer_bookshelfbar.js => Drag-and-droppable bookshelf reducer
    - reducer_book_detail.js => Book detail reducer
  - scenes
    - BookDetail => React component that displays information for a specific book.
    - Bookshelf => Shows the user's favorite books and allows (will allow*) to drag-and-drop to place them in a specific order
    - Introduction => React component that displays the welcoming screen in the webpage
    - Login => React component for the login screen. Currently only supports google login
    - Logout => When rendered logs the user out. 
    - Profile => React component that displays user information such as favorite books etc.
    - Recommendations => React component that displays recommended books for the user. Currently only displays results from a hard-coded query
    - Search => React component that allows the user to search for books. Displays the search results.
  - custom.scss => Defines the CSS variables to apply to bootstrap, calls bootstrap, then adds a number of specific CSS styles
  - index.js => Entry point of the app. Sets up firebase connection. Defines all available routes.
- build/ => Contains the results from running `npm run build`. Contains bundled version of webpage. Firebase uses this folder to host the project
- .eslintrc => Project specific linting rules. Makes sure all developers follow the same coding rules. We use AirBNB's linter settings with some adjustments.

## Information for developers

### To deploy

  1. npm install -g firebase-tools
  2. npm run build
  3. firebase init
  4. firebase deploy

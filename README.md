# KTH-DH2642

## Mid-project review

Our webpage can be found here <https://kth-dh2642-books.firebaseapp.com/home>

### Short description of the project

Our project is a website that alows the user easy access to the google.books API.

With our webpage users can use advanced search queries to find books they are looking for.
 Users can then add these books to reading lists or mark them as one of their favorite books.

If time allows, we wan't to enable users to comment on books, publish their reading list and interact 
with other users of the system in some way.

### What we have done

So far we have implemented the following:

- Set up react/redux, webpack, eslint rules
- Set up a Firebase project for the website
- Log in via google
- Display user specific data(username, favorite books etc)
- Retrived books from the API and display them
- Allow users to mark books as favorite
- Created a drag-and-drop feature to sort users reading list

### What we still plan to do

There is still a lot of work left to be done.

These are the things we will definitely do before the final submission

- Make all screens of the site fully responsive
- Currently users can only mark books as favorite. We also want to allow users to also create reading lists.
- Implement the user profile screen
- Allow for advanced search queries
- Display more than 10 search results via pagination most likely

If time allows we wan't to implement the following:

- Allow users to comment on books
- Allow users to publish their reading list/favorite books. Making it available for other users

### Project file structure

- app
  - actions
    - index.js => **CHARLES**
  - assets
    - img/ => Contains images used in the project
  - components
    - BookCard
    - BookShelfBar
    - BookShelfCard
    - Footer
    - Header
    - LoadingSpinner
  - reducers
    - index.js
    - reducer_books.js
    - reducer_bookshelfbar.js
  - scenes
    - BookDetail => React component that displays information for a specific book.
    - Bookshelf | **CHARLES**
    - Introduction => React component that displays the welcoming screen in the webpage
    - Login => React component for the login screen. Currently only supports google login
    - Logout => When rendered logs the user out. 
    - Profile => React component that displays user information such as favorite books etc.
    - Recommendations => React component that displays recommended books for the user. Currently only displays results from a hard-coded query
    - Search => React component that allows the user to search for books. Displays the search results.
  - custom.scss => **CHARLES**
  - index.js => Entry point of the app. Sets up firebase connection. Defines all available routes.
- build/ => Contains the results from running `npm run build`. Contains bundled version of webpage. Firebase uses this folder to host the project
- .eslintrc => Project specific linting rules. Makes sure all developers follow the same coding rules. We use AirBNB's linter settings with some adjustments.

## Information for developers

### To deploy

  1. npm install -g firebase-tools
  2. npm run build
  3. firebase init
  4. firebase deploy

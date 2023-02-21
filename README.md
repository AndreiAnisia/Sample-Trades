# Sample-Trades
Sample Trades Table
Click [here](https://sample-trades.netlify.app/) to navigate to the site.

To run the project:
1. npm install
2. npm run dev

Note: This project is deployed on netlify and this repository is linked to it so when you push new changes here, the project is automatically re-build and the new version is deployed on live.

Considerations:
1. You can add a new trade in the table. 
2. For each trade you have 2 options: Amend Trade and Delete Trade.
3. For the options above I used a modal. The modal behaves differently depending on the option you choose. An improvement that can be done here is making Modal component a HOC and just pass the component you want to render inside it. 
4. The code can be highly optimized by doing a better separation of concerns, wrapping functions and values in useCallback and useMemo to avoid unnecessary re-renders, using useReducer where we have multiple useState.
5. The error handling is not very suggestive for the user, as we use a generic message for all type or input errors. Other input errors are prevented by using regular expressions. These regex are not perfect and might not let the user enter what in his opinion is valid data. 

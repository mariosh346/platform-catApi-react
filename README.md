# GlobalWebIndex Engineering Challenge

## Exercise: CatLover

Create a React application for cat lovers which is going to build upon thecatapi.com and will have 3 views.
The **first** view displays a list of 10 random cat images and a button to load more. Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available. This would be a link to the second view below - the breed detail. The modal should also contain a form to mark the image as your favourite (a part of the third view as well). Make sure you can copy-paste the URL of the modal and send it to your friends - they should see the same image as you can see.

The **second** view displays a list of cat breeds. Each breed opens a modal again with a list of cat images of that breed. Each of those images must be a link to the image detail from the previous point.

The **third** view allows you do the following things:

- Display your favourite cats
- Remove an image from your favourites (use any UX option you like)

You can find the API documentation here: https://developers.thecatapi.com/
We give you a lot of freedom in technologies and ways of doing things. We only insist on you using React.js. Get creative as much as you want, we WILL appreciate it. You will not be evaluated based on how well you follow these instructions, but based on how sensible your solution will be. In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.

## Submission

Once you have built your app, share your code in the mean suits you best
Good luck, potential colleague!

# Platform Cat Api React Solution
Check the live site on GitHub Pages at https://mariosh346.github.io/platform-catApi-react/

## Prerequisites
- nvm (Node Version Manager) or Node v22

## Setup

1. Clone the repository:
```bash
git clone https://github.com/mariosh346/platform-catApi-react.git
cd platform-catApi-react
```

2. Install Node.js using nvm:
```bash
nvm install 22
nvm use 22
```

3. Install pnpm:
```bash
npm install -g pnpm
```

4. Install dependencies using pnpm:
```bash
pnpm install
```

## Running the Application

- Start the development server:
```bash
pnpm dev
```

- Build for production:
```bash
pnpm build
```

## Testing

Run Cypress tests:
```bash
pnpm cypress
```

## Deployment

To deploy the project to GitHub Pages, run the following command:

```sh
pnpm deploy
```

Note: Once deployed, check the live site on GitHub Pages at https://mariosh346.github.io/platform-catApi-react/

## Next steps

- Add state management like redux
- Use useQuery for caching apis
- Make components async for better load speed


## Tech Stack

- React
- TypeScript
- Vite
- Cypress

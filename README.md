## Project: CatLover

A React application for cat lovers which is going to build upon thecatapi.com and will have 3 views.
The **first** view displays a list of 10 random cat images and a button to load more. Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available. This would be a link to the second view below - the breed detail. The modal should also contain a form to mark the image as your favourite (a part of the third view as well). Make sure you can copy-paste the URL of the modal and send it to your friends - they should see the same image as you can see.

The **second** view displays a list of cat breeds. Each breed opens a modal again with a list of cat images of that breed. Each of those images must be a link to the image detail from the previous point.

The **third** view allows you do the following things:

- Display your favourite cats
- Remove an image from your favourites (use any UX option you like)

API documentation here: https://developers.thecatapi.com/

# Solution
Deploying after every commit on GitHub Pages at https://mariosh346.github.io/platform-catApi-react/ with the help of Github Actions

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

## Commit
1. create ssh keys https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
2. git config --global gpg.format ssh
3. git config --global user.signingkey git config --global user.signingkey C:\Users\mario\.ssh\id_XXXX.pub
4. Add the .pub data to https://github.com/settings/keys as signing key
5. Auto sign all commits ```bash
git config --global commit.gpgsign true
git config --global tag.gpgSign true
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
- Introduce small reusable components like Button, Link

## Tech Stack

- React
- TypeScript
- Vite
- Cypress

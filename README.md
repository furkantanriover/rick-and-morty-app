# Rick and Morty APP

This application takes data from the Rick and Morty API, displays a list of characters, and allows users to filter characters based on their selections using a MultipleSelect component.

## Description

The Rick and Morty character explorer is designed to showcase how to fetch and display data from an external API in a React Native application. Key features include:

- Fetching data from the Rick and Morty API.
- Displaying a list of characters with their details such as name, status, and origin.
- Implementing a MultipleSelect component to filter characters based on user selection.
- Providing a responsive and smooth user experience with animations and skeleton loaders while data is being fetched.

## Features

- **React Native**: Mobile application development framework.
- **Expo**: A platform for making universal React applications.
- **Navigation**: Implemented using `@react-navigation` and its various packages.
- **State Management**: Using `@tanstack/react-query` for server-state synchronization.
- **Styling**: Styled with `nativewind` and `tailwindcss`.
- **API Integration**: Axios is used for making API requests.
- **Reanimated Animations**: Smooth animations using `react-native-reanimated`.
- **Content Loader**: Placeholder skeleton screens using `react-content-loader`.
- **Toast Notifications**: Informing users of API request statuses using `react-native-toast-message`.
- **Zustand**:A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/furkantanriover/case-study-seven-apps.git
   cd case-study-seven-apps
   ```

2. **Install dependencies:**

```bash
npm install
```

```bash
yarn install
```

```bash
bun install
```

3. **Running the Project:**

## Android

```bash
bunx or npx expo run:android
```

```bash
bunx or npx expo start
```

## iOS

```bash
bunx or npx expo run:ios
```

```bash
bunx or npx expo start
```

## Web

```bash
bunx or npx expo run:web
```

```bash
bunx or npx expo start
```

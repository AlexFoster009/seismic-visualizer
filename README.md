# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Dependencies in `seismograph-visualization`

### Core Libraries

- **react & react-dom**: These are the core libraries for building and rendering React components. They're essential for any React-based application.
    > **Why?**: To utilize the React framework for building user interfaces.

- **react-scripts**: This is a set of scripts from the Create React App. It provides configurations for Babel, Webpack, and scripts for starting, building, and testing the app.
    > **Why?**: Simplifies the setup and configuration process for a React application.

### UI & Styling

- **@mui/material, @mui/icons-material, @mui/lab, & @mui/x-date-pickers**: MUI is a popular React UI framework that implements Google's Material Design. These packages provide UI components, icons, lab components, and date pickers respectively.
    > **Why?**: To create a consistent and attractive UI without building every component from scratch.

- **@emotion/react & @emotion/styled**: Emotion is a library designed for writing CSS styles with JavaScript. It's powerful and works well with React.
    > **Why?**: Offers dynamic styling capabilities and enhances component-based styling.

### Data Visualization & Mapping

- **chart.js & react-chartjs-2**: Chart.js is a simple yet flexible JavaScript charting library. `react-chartjs-2` provides React components for Chart.js.
    > **Why?**: For creating interactive charts to visualize seismic data.

- **chartjs-adapter-date-fns**: This is an adapter to allow Chart.js to use `date-fns` for date operations.
    > **Why?**: Enables Chart.js to work with date functions seamlessly.

- **@react-google-maps/api**: Provides a set of React components wrapping the Google Maps JavaScript API.
    > **Why?**: If there's a need to show locations or geographical data, this library simplifies the process.

### Date Handling

- **date-fns & @date-io/date-fns**: `date-fns` provides utility functions for manipulating dates. `@date-io/date-fns` is an abstraction over date management libraries for MUI pickers.
    > **Why?**: Simplifies date operations and ensures compatibility with MUI date pickers.

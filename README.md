# Astro UI

Astro UI is a React UI library based on TailwindCSS.
Astro UI is still a work-in-progress and no major release has been published.

A temporary storybook demo can be found at [https://aspiralabs.github.io/astro-ui](https://aspiralabs.github.io/astro-ui)

## Install Astro UI

Install using your prefered package manager.

```bash
yarn add @aspiralabs/astro-ui
```

```bash
npm i @aspiralabs/astro-ui
```

## Usage

### Step One:

Wrap your `tailwind.config.js` in the included Astro Configuration

```javascript
const AstroUI = require('@aspiralabs/astro-ui/config');

module.export = AstroUI({
    content: [],
    ... // Rest of your tailwind config
});
```

### Step Two:

Wrap your React app with the `AstroProvider` at the highest level

**Next.js Example:**

```javascript
// pages/_app.tsx

import { AstroProvider } from '@aspiralabs/astro-ui';
import { AppProps } from 'next/app';
import React from 'react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AstroProvider>
            <Component {...pageProps} />
        </AstroProvider>
    );
}

export default MyApp;
```

**CRA Example:**

```javascript
// index.tsx

import { AstroProvider } from '@aspiralabs/astro-ui';
const App = () => {
    return <AstroProvider>... Rest of Code</AstroProvider>;
};

export default App;
```

## Roadmap

This roadmap is subject to change.

_General_

-   [x] Button
-   [x] Typography
-   [x] Icon

_Data Input_

-   [x] Input
-   [x] Select (custom select wip)
-   [x] Checkbox
-   [ ] Radio
-   [ ] Toggle
-   [ ] Upload
-   [ ] Slider
-   [x] Date picker
-   [ ] Time picker
-   [x] Form

_Layout_

-   [ ] Divider
-   [ ] Space (Flex)

_Display_

-   [x] Card
-   [ ] Accordion
-   [x] Badge
-   [x] Tooltips
-   [x] Tables

_Navigation_

-   [x] Tabs
-   [ ] Breadcrumb
-   [x] Menu
-   [x] Sidebar
-   [x] Timeline

_Overlay_

-   [x] Modal
-   [x] Toast messages / Notification
-   [x] Timeline

_Utility_

-   [x] BlockUI

_Hooks_

-   [x] Debounce

_Misc_

-   [ ] Storybook docs
-   [ ] Theming (in progress)
-   [ ] Documentation website

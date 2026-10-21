# Home7 Solar Screen (Shareable)

This folder contains the Home7 top area only:
- top navigation/header
- animated solar-system hero

It intentionally stops before **"Choose Your Horoscope Layout"**.

## Files

- `Home7SolarScreen.tsx` - React component for header + hero
- `solar-system.css` - full solar animation/base CSS
- `home7-overrides.css` - Home7-specific image/background overrides

## Required image assets

Make sure these files exist in the target project's public/static root:

- `/slide_bg.jpg`
- `/sun.png`
- `/mercury.png`
- `/venus.png`
- `/earth.png`
- `/mars.png`
- `/jupiter.png`

## Usage

1. Copy this folder into your target project.
2. Import and render:

```tsx
import Home7SolarScreen from "./home7-solar-screen/Home7SolarScreen";

export default function Page() {
  return <Home7SolarScreen />;
}
```

## Notes

- The component uses utility classes like `bg-white`, `max-w-6xl`, etc.
- If your target project does not use Tailwind, replace those class names with your own CSS.


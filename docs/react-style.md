# React style

Extracted from the samples in `style/`. Edit by hand as needed — this is what the agents follow.

## Folder layout

- `src/components/reusable/<name>/` — generic components used anywhere (e.g. `button/`, `navbar/` is actually in `specific/` since it's page-structure, not generic).
- `src/components/specific/<name>/` — components tied to one feature/page.
- `src/routes/<name>/` — one folder per page/route.
- `src/context/<Name>Provider.tsx` — React context providers.
- `src/hooks/use<Name>.ts` — custom hooks.
- `src/constants/<name>.ts` — shared constant values.

Example from the samples:
```
src/components/reusable/button/Button.tsx
src/components/reusable/button/styles.module.css
src/components/specific/navbar/Navbar.tsx
src/components/specific/navbar/styles.module.css
src/routes/home/Home.tsx
src/routes/home/styles.module.css
```

## Naming

- Component folder: camelCase (`button/`, `navbar/`).
- Component file: PascalCase matching the component name (`Button.tsx`, `Navbar.tsx`).
- Every component's CSS module is always named exactly `styles.module.css`, never component-specific.
- Hooks: `use<Name>.ts` default-exporting `use<Name>()` (`hooks/useModal.ts` → `useModal()`).
- Context providers: `<Name>Provider.tsx` exporting both the provider and its context object as named exports:
  ```ts
  export { ModalProvider, modalContext };
  ```
- Constants: UPPER_SNAKE_CASE object keys for grouped values, e.g. `constants/color.ts`:
  ```ts
  export const STATUS_COLORS = {
    error: "#EF4444",
    warning: "#F59E0B",
  };
  ```

## Component structure

- Always a `default function` component, same name as the file:
  ```tsx
  export default function Button({ ... }: { ... }) {
    return ( ... );
  }
  ```
- For plain components (not context providers), prop types are declared inline in the function signature, not as a separate `type`/`interface`, and defaults are given right in the destructuring:
  ```tsx
  export default function Button({
    onClick = () => {},
    title = "click",
    disabled = false,
  }: {
    onClick?: any;
    title?: string;
    disabled?: boolean;
  }) { ... }
  ```
- Loosely typed callback/children props are acceptable as `any` (seen in `Button`'s `onClick?: any`, `children?: any` and `ModalProvider`'s `children: any`) — don't over-type these.
- Context providers use a separate named `interface <name>ContextType` instead of inline typing:
  ```ts
  interface modalContextType {
    open: (n?: ReactElement, h?: string, w?: string) => void;
    close: () => void;
  }
  ```

## Props and state handling

- `useState`/`useEffect` from `react` for local state.
- Boolean UI state (menu open, expanded) toggled with a setter callback: `setOpen((prev) => !prev)`.
- Dynamic/parameterized CSS values are passed through inline `style` using CSS custom properties, cast to `React.CSSProperties`, and consumed by the CSS module via `var()`:
  ```tsx
  style={{ "--btn-color": color, "--title-color": titleColor } as React.CSSProperties}
  ```
  ```css
  .mainContainer {
    background-color: var(--btn-color) !important;
  }
  ```

## Hooks

- A custom hook is a thin wrapper around a context, returning a plain object of the values/functions needed:
  ```ts
  export default function useModal() {
    const modalSettings = useContext(modalContext);
    return { open: modalSettings.open, close: modalSettings.close };
  }
  ```

## Styling approach

- CSS Modules, one `styles.module.css` per component folder, imported as `styles`:
  ```tsx
  import styles from "./styles.module.css";
  className={styles.mainContainer}
  ```
- Class names are camelCase (`mainContainer`, `navContainer`, `primaryButton`).
- A single global `src/index.css` holds the reset, base typography, scrollbar styling, and reusable utility flex classes (`.centered-row`, `.left-col`, `.right-col`, etc.) used directly as plain `className` strings instead of CSS modules.

## Imports order

Observed order, top to bottom:
1. External packages (`react`, `react-router-dom`).
2. The component's own `styles.module.css`.
3. Local/relative imports for closely related files (sibling or nearby components), e.g. `import ProfileButton from "../../reusable/profileButton/ProfileButton"`.
4. Cross-cutting internal imports (constants, context, types, icons) via the `@/` alias, e.g. `import logos from "@/constants/logos"`.

Example from `Navbar.tsx`:
```tsx
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import ProfileButton from "../../reusable/profileButton/ProfileButton";
import logos from "@/constants/logos";
import Logo from "@/components/reusable/logo/Logo";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
```

## Formatting

- Double quotes for strings and JSX attributes.
- Semicolons everywhere.
- Type-only named imports use the inline `type` keyword: `import { type ReactElement } from "react"`.

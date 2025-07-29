# Whitelabelling Guide for TARS (Bot)

This guide explains how to fully whitelabel the TARS platform and bot, so you can rebrand it for your organization or clients. It covers all codebase locations and steps required for a seamless rebrand.

---

## 1. Branding & Naming

### A. Product Name
- **Search & Replace** all instances of `TARS`, `Onyx`, or any previous brand name in:
  - UI text (frontend)
  - Documentation and README files
  - Email templates
  - API responses (if any branding is exposed)
- **Files to check:**
  - `README.md`, docs/
  - `web/src/components/`, `web/src/app/`, `web/public/`
  - `backend/onyx/` (for API branding)

### B. Logo & Favicon
- **Replace logo assets** in:
  - `web/public/logo.png`, `logo-dark.png`, `logo.svg`, `logotype.png`, `onyx.ico`
  - Any other images in `web/public/` or referenced in the UI
- **Update favicon** in `web/public/onyx.ico` and update references in `web/src/app/layout.tsx` or `web/next.config.js` if needed

### C. Email & Meta Branding
- **Update email templates** (if used):
  - `backend/onyx/auth/email_utils.py` or similar
- **Update meta tags** for title, description, and social sharing in:
  - `web/src/app/layout.tsx` or `web/src/app/head.tsx`

---

## 2. Logo SVG & Icon Customization

### A. SVG Path in icons.tsx
- **SVG paths for the main logo are hardcoded** in:
  - `web/src/components/icons/icons.tsx`
- **To change the logo:**
  1. Open `web/src/components/icons/icons.tsx`
  2. Locate the `OnyxIcon` and `OnyxLogoTypeIcon` components
  3. Replace the `<svg>...</svg>` content with your own SVG path/code
  4. Adjust the `viewBox`, `width`, and `height` as needed for your logo
- **Tip:** Use a vector editor (like Figma or Illustrator) to export your logo as SVG, then copy the path(s) into the component.

### B. Other Iconography
- If you want to change other icons, update their SVGs in the same file or in `web/src/components/icons/`

---

## 3. UI Colors & Theme
- **Update Tailwind or CSS theme** in:
  - `web/tailwind-themes/` and `web/tailwind.config.js`
- **Change primary/secondary colors** to match your brand
- **Update any custom CSS variables** in `web/src/styles/` or global CSS files

---

## 4. Bot Name & Avatar (Slack/Other Integrations)
- **Slack Bot Name & Icon:**
  - Change in the Slack App configuration (Slack API dashboard)
  - Update bot display name, icon, and description
- **Other Integrations:**
  - Update bot name and avatar in the respective platform's developer console

---

## 5. Documentation & Legal
- **Update all documentation** to reflect your new brand
- **Replace screenshots** in `/web/screenshots/` if they show old branding
- **Update license and copyright** if required

---

## 6. Advanced: Dynamic Whitelabelling (Optional)
- For multi-tenant or SaaS deployments, consider making branding configurable via environment variables or a settings file.
- Example: Store logo URLs, product name, and theme colors in a config file or database, and load them dynamically in the frontend.

---

## 7. Testing
- **Clear browser cache** and restart the frontend after making changes
- **Test on all platforms** (web, Slack, mobile, etc.) to ensure branding is consistent

---

## Summary Checklist
- [ ] Product name replaced everywhere
- [ ] Logo and favicon updated
- [ ] SVG paths in `icons.tsx` replaced
- [ ] UI theme/colors updated
- [ ] Bot name and avatar updated in integrations
- [ ] Documentation/screenshots updated
- [ ] Legal and license info updated

---

**For any SVG/logo changes, always update `web/src/components/icons/icons.tsx` as this is where the main logo SVG paths are hardcoded.**

If you need help with SVG conversion or dynamic branding, contact the technical team. 

## Using Public Directory SVGs in React Components

- Place your logo SVGs (e.g., logo.svg, logotype.svg) in the web/public directory.
- In any React component (e.g., web/src/components/icons/icons.tsx), reference them with:
  - <img src="/logo.svg" ... />
  - <img src="/logotype.svg" ... />
- No import statement or preamble change is needed—these files are served from the root URL.
- This is the recommended approach for static logo assets in Next.js and React projects.

**Example:**
```tsx
export const OnyxIcon = ({ size = 16, className = '' }: IconProps) => (
  <img src="/logo.svg" width={size} height={size} className={className} alt="Logo" />
);
```

Update your logo by simply replacing the SVG files in web/public—no code changes required. 
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React + TypeScript + Vite application using shadcn/ui components and Tailwind CSS 4.x.

## Development Commands

- `npm run dev` - Start dev server with HMR
- `npm run build` - TypeScript check + production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Build tool**: Vite 7.x with @vitejs/plugin-react (using Babel for Fast Refresh)
- **Styling**: Tailwind CSS 4.x via @tailwindcss/vite plugin
- **UI Components**: shadcn/ui (new-york style) + Radix UI primitives
- **Icons**: lucide-react

### Path Aliases
Configured in vite.config.ts:
- `@/*` maps to `src/*`
- Standard shadcn paths: `@/components`, `@/lib`, `@/components/ui`, `@/hooks`

### Component Structure
- `src/components/ui/` - shadcn/ui components (label, radio-group, select, input)
- `src/lib/utils.ts` - Contains `cn()` helper for className merging (clsx + tailwind-merge)

### Styling Patterns
- Use `cn()` from `@/lib/utils` for conditional className merging
- Tailwind config uses neutral base color with CSS variables
- Component variants via class-variance-authority (cva)

### ESLint Config
Uses flat config format with:
- typescript-eslint recommended rules
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh for Vite HMR
- Ignores: `dist/`

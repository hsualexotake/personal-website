# Personal website

A story-led personal website built with Astro, TypeScript, and one focused React island. It is
static by default, editable through Pages CMS, and designed to keep content separate from the
presentation layer.

The repository currently contains clearly labeled demo content. Replace it before publishing.

## Stack

- Astro with strict TypeScript and static output
- React for the scroll-linked timeline only
- Modern CSS with project-wide design tokens
- Git-backed Markdown and JSON content
- Pages CMS for visual editing
- Vercel for hosting and preview deployments

## Local development

Use the Node version in `.nvmrc` and npm:

```sh
nvm use
npm install
npm run dev
```

The development server starts at `http://localhost:4321`.

Useful commands:

```sh
npm run check         # Astro and TypeScript diagnostics
npm run lint          # JavaScript, TypeScript, React, and Astro linting
npm run format:check  # Verify formatting
npm run build         # Type-check and produce the static site
```

## Updating content

Content has one source of truth:

- `src/data/site.json` contains the name, contact details, social links, résumé, and SEO defaults.
- `src/content/pages` contains the Home introduction and About narrative.
- `src/content/timeline` contains independently reorderable timeline milestones.
- `src/content/work` contains project metadata and Markdown case studies.
- `src/content/bside` contains the informal B—side archive, including images and notes.
- `public/media` receives images and documents uploaded through the CMS.

To use the visual editor:

1. Visit [Pages CMS](https://app.pagescms.org) and sign in with GitHub.
2. Install its GitHub app for this repository.
3. Open the repository. Pages CMS automatically reads `.pages.yml`.
4. Edit and save content. Each save is a Git commit and triggers a new Vercel deployment.

Content can also be edited directly in Git. Astro validates the schema during every build, so an
invalid entry fails before deployment.

## Replacing the demo

Before launch:

1. Replace every value in `src/data/site.json`, including the placeholder email and social URLs.
2. Rewrite the Home and About Markdown files.
3. Replace or remove every demo timeline milestone.
4. Replace the demo projects with real case studies and upload media through Pages CMS.
5. Replace or remove the five starter B—side entries and upload their images.
6. Add a résumé and social preview image if wanted; both remain hidden when empty.
7. Set `SITE_URL` to the connected production domain in Vercel.

## Deployment

Import the GitHub repository into Vercel. The project uses Astro's static output, so it needs no
server adapter or runtime service. Configure `SITE_URL` in Production and Preview environments,
then connect the custom domain through Vercel's dashboard.

GitHub Actions checks formatting, linting, and the production build on pushes and pull requests.

## Code conventions

- Prefer Astro components and server-rendered HTML. Add a client island only when an interaction
  cannot be expressed cleanly with HTML and CSS.
- Keep reusable visual values in `src/styles/global.css`; do not scatter one-off color or spacing
  literals through components.
- Keep content in the CMS-managed files rather than hard-coding personal details into templates.
- New content fields require matching updates to the Astro schema and `.pages.yml`.
- Preserve the reduced-motion and no-JavaScript reading experience when changing animation.

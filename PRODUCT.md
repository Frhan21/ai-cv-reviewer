# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

HireLens serves job seekers across experience levels who want to evaluate and tailor a CV before applying for a role.

## Product Purpose

HireLens reviews a PDF CV against a target role, seniority level, and optional job description. It returns an overall score, ATS score, keyword coverage, section-level feedback, strengths, weaknesses, and actionable suggestions. Success means users can identify the changes that matter before submitting an application.

## Positioning

The product combines CV review with role-specific context in one flow: users provide the role, seniority, and job description alongside the CV so the feedback can address a specific application rather than a generic resume checklist.

## Operating Context

Users arrive while preparing or revising a job application. The primary workflow is: understand the service, upload a PDF CV, provide target-role context, wait for analysis, then review prioritized feedback and run another analysis after revising the document.

## Capabilities and Constraints

- Accepts PDF CV uploads up to 5 MB.
- Requires a target role and seniority level.
- Accepts an optional job description for more specific analysis.
- Produces overall and ATS scores, keyword matches, section feedback, strengths, weaknesses, and suggestions.
- Uses a Next.js web application and stores the current result in session storage.
- The redesign covers the landing page, analysis form, loading state, and results screen.
- A focused Three.js scene may support the experience, with performance and reduced-motion fallbacks.

## Brand Commitments

- Product name: HireLens AI.
- Preserve the existing blue, violet, navy, white, and pale-blue palette.
- The user requested a 3D reference connected to work, job review, or job applications.
- Existing marketing claims and testimonials remain for this iteration at the user's request; their supporting evidence is not present in the repository.

## Evidence on Hand

- Working upload and analysis flow in the repository.
- Existing result schema and result components.
- Existing product logo at `public/logo-removebg-preview.png`.
- No supporting source files were found for the current usage counts, successful-hire count, company comparisons, or testimonials.

## Product Principles

- Keep application context attached to every review.
- Turn analysis into prioritized, actionable changes.
- Keep the upload-to-results path clear and interruption-free.
- Use expressive motion to explain progress and matching, not to delay work.
- Preserve user confidence through accessible states, honest system feedback, and readable results.

## Accessibility & Inclusion

Support keyboard navigation, visible focus, sufficient contrast, reduced motion, responsive layouts, and non-WebGL fallbacks so the core review flow remains usable across devices and capabilities.

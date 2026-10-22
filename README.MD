# Area — Responsive Multi-Page Website Built from a Figma Design

A project for the web design practical training: a Figma mockup was turned into a working website for a fictional analytics service called **Area** (regional data visualization). The site is built with plain HTML, CSS and JavaScript, with no frameworks.

| | |
|---|---|
| **Student** | Oleksandr Myslyuk |
| **Group** | PI-23-03, specialty 121 "Software Engineering" |
| **Institution** | Professional College of Electronic Devices, Ivano-Frankivsk National Technical University of Oil and Gas |
| **Practice supervisor** | Instructor I. I. Vovk |
| **Year** | 2026 |

---

## Project Goal

To reinforce knowledge of HTML, CSS and JavaScript in practice: build a website from a ready-made mockup that looks correct on screens of different widths, has interactive elements, and loads data from a database.

## Pages

| Page | File | Contents |
|---|---|---|
| Home | `index.html` | Hero, benefits, "Specs" and "How-to" sliders, "Get in Touch" modal, user reviews with search, filter and sorting |
| About | `about.html` | Mission, team, company values |
| Careers | `careers.html` | List of job openings, application form |
| Contact | `contact.html` | Contact form with validation, FAQ accordion |
| 404 | `404.html` | "Page Not Found" page |

## Features

- **Responsive layout (mobile-first).** Three modes: mobile, tablet (800px to 1279px) and desktop (1280px and up). Different images are loaded for different screen sizes.
- **Burger menu** that locks page scrolling while the menu is open.
- **Sticky header** that changes on scroll (only on screens 800px and wider).
- **Custom sliders** for "Specs" and "How-to", written in vanilla JS (movement via `transform: translateX()`). They work on screens narrower than 1280px; on desktop the blocks are shown in full.
- **Scroll animations** for appearing elements (AOS library).
- **"Get in Touch" modal** with field validation (name, email, message) and error messages.
- **Reviews from a database.** Data is loaded from the `reviews` table in Supabase. Includes text search (by text, name and role), a rating filter, four sorting options (newest, oldest, rating high to low and low to high), a filter reset button, and loading, error and "nothing found" states.
- **Careers page:** job openings are rendered from a JS array, and each card shows the employment type, location and department.
- **Contact form:** client-side validation (name, email via regular expression, subject, message of at least 10 characters) and an FAQ accordion.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic markup |
| CSS3 | Flexbox (main layout), Grid, media queries, CSS variables in `variables.css` |
| BEM | Class naming |
| JavaScript (ES6+) | Menu, sliders, modal, forms, reviews, job listings |
| [Supabase](https://supabase.com/) (`supabase-js` v2) | Storing and fetching reviews |
| [AOS](https://michalsnik.github.io/aos/) 2.3.1 | Scroll animations |
| [Font Awesome](https://fontawesome.com/) 7.0.1 | Icons |
| Figma | Source of the mockup |
| Git / GitHub | Version control and publishing |

## Author
**Oleksandr Myslyuk**, group PI-23-03

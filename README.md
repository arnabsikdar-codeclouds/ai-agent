# ExampleCompany - IT Solutions & Services

A modern, responsive landing page for an IT solutions company built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive Design** - Fully responsive layout with mobile hamburger menu
- **Dark Theme** - Sleek dark UI with gradient accents
- **Scroll Animations** - Intersection Observer-based fade-in animations
- **Stats Counter** - Animated number counters triggered on scroll
- **Contact Form** - Enquiry form with loading state and success/error feedback (submits via Make/Integromat webhook)
- **Smooth Scrolling** - Anchor-based smooth scroll navigation
- **Sticky Navbar** - Transparent navbar with blur effect on scroll

## Sections

- Hero with code window visual
- Services (Web Dev, Cloud, Mobile, AI/ML, Cybersecurity, UI/UX)
- About / Why Choose Us
- Stats (Projects, Team, Satisfaction, Experience)
- Contact / Enquiry Form
- Footer

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (No frameworks)
- Google Fonts (Inter)

## Make.com Integration

The contact form is powered by a [Make.com](https://www.make.com/) (formerly Integromat) automation scenario.

**Scenario:** [Integration Webhooks → Gmail](https://eu1.make.com/public/shared-scenario/1OdhEvki1X8/integration-webhooks-gmail)

### Flow

```
                                          ┌─ Approved ─→ Gmail (Send email) ─→ Gmail (Send email) ─→ Google Sheets (Add Row)
User submits form → Webhook → OpenAI → Router
                                          └─ Rejected ─→ Google Sheets (Add Row)
```

### How It Works

1. **Webhook Trigger** - The form in `script.js` sends a `POST` request with `FormData` to a Make.com webhook endpoint (`hook.eu1.make.com`). The webhook captures four fields:
   - `name` - Full name of the enquirer
   - `email` - Their email address
   - `subject` - Enquiry subject
   - `message` - Message body
2. **OpenAI (ChatGPT)** - The enquiry data is sent to OpenAI via a simple text prompt to analyze/process the submission (e.g., classify intent, generate a response, or validate the enquiry).
3. **Router** - Based on the OpenAI output, the flow splits into two paths:
   - **Approved path:**
     - **Gmail #1** - Sends a notification email (e.g., to the company inbox with enquiry details).
     - **Gmail #2** - Sends a second email (e.g., an auto-reply/acknowledgement to the enquirer).
     - **Google Sheets** - Logs the approved enquiry as a new row in a spreadsheet.
   - **Rejected/Fallback path:**
     - **Google Sheets** - Logs the rejected/spam enquiry in a separate sheet or with a rejected status.

### Frontend Handling

- On submit, the form shows a loading spinner and disables the button.
- On success (`200 OK`), a green success message is displayed and the form resets.
- On failure, a red error message prompts the user to try again or email directly.
- Messages auto-dismiss after 5 seconds.

## Getting Started

Open `index.html` in a browser. No build step required.

## Project Structure

```
├── index.html   # Main HTML page
├── style.css    # All styles
├── script.js    # Interactivity & form handling
└── README.md
```

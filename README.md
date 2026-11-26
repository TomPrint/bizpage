# Bizpage

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

Firebase Hosting serves the static production build from `dist/bizpage/browser`.
Unknown URLs use `public/404.html` as the custom HTTP 404 page; Angular also
handles unknown routes during client-side navigation. Keep both error views
consistent when updating their content. The sitemap and `llms` files should
list only published routes.

## Private client panel

The Polish-language panel is available at `/admin-login`. It stores client
contact details (including address, company NIP, industry and size), notes, call/email activity and an optional follow-up date in
Cloud Firestore. A follow-up is highlighted from the start of its selected date
in the browser's local time; there are no email or push notifications. The
client form fields are optional. New clients appear first; older
records without a creation timestamp appear afterward in alphabetical order.
The client table can be searched by name, company or NIP and sorted by name or
industry. The table shows the company name rather than the contact person's
name; on mobile it shows only the company name. Selecting it opens a
responsive details view with contact information, notes and activity history.
Status is optional (X means refusal, V means interested) and can be set when
creating or editing a client, or changed when adding an activity. Existing
clients without a status remain unset. Activity and status changes are saved
together.
Adding an activity requires a type, date, non-blank note and a status choice;
"Bez zmiany" keeps the client's current status.
Activity dates are entered and displayed without a time; existing timestamps
remain intact. The table's last activity is the latest dated activity; undated activities do
not affect it. The latest activity date is stored on the client document and
updated atomically with new activities. On the first load after this change,
the panel reads existing activity histories once to initialize missing summaries;
subsequent table loads read only the client documents. Activity histories are
loaded when opening client details. Refresh any older open panel tabs after
deployment so they also maintain the summaries when adding activities.
The panel is excluded from the sitemap and has `noindex` metadata and a Hosting
`X-Robots-Tag` header. These are not access controls.

Before deploying, the project owner must:

1. In the Firebase project `wickywave`, enable the Google sign-in provider in
   Authentication and configure its support email. Add `localhost` and
   `wickywave.pl` to Authentication's authorized domains as needed. Protect
   the administrator's Google account with two-step verification.
2. Create a Cloud Firestore database and register a Firebase web app if one
   does not already exist. Copy its web configuration into
   `src/app/admin/firebase-config.ts`. These client configuration values are
   public identifiers, not credentials; never put the password or a service
   account key in this file. The panel reports an error until configured.
3. Sign in once using the administrator's Google account, then copy that
   user's Authentication **UID** from Firebase Console > Authentication >
   Users into `firestore.rules`, replacing `REPLACE_WITH_ADMIN_UID`. Only this UID can access the panel's
   `clients` collection and its `activities` subcollections. Security depends
   on deploying these rules, not on hiding the URL or the UI.
4. Review the rules against any existing Firestore data and rules before
   deployment: this ruleset denies every other collection, and deploying it
   replaces the database's current rules. Merge deliberately if the database
   already serves other applications. Deploy rules with
   `firebase deploy --only firestore:rules`, then deploy Hosting with
   `npm run deploy:firebase`. The Hosting-only script does not deploy rules.
5. Test sign-in, saving and reading data, and rejection of an unrelated account
   in the actual Firebase project before storing real client data.

Firebase's free quotas and limits apply; review current Firebase pricing,
usage and retention/backup requirements before use. Protect access to the
Firebase console too. Other Google accounts can authenticate, so UID-based
Firestore rules are essential to restrict access to client data.

## Languages

The site supports Polish, English and German. Polish pages use the existing
unprefixed URLs; English and German pages use `/en` and `/de` respectively.
Each published route is prerendered in all three languages and includes
language-specific canonical and alternate links. The language switcher
navigates to the equivalent localized URL, preserving query and fragment.
Unprefixed URLs always display Polish, so crawlers and visitors see the same
content. Internal links retain the selected language across navigation.

Polish and English translations are in `src/app/i18n/translations.ts`, with
German translations in `src/app/i18n/translations.de.ts`. When adding a key,
provide all three translations.
Update all three `public/llms*.txt` files and the sitemap when published
pages or product descriptions change.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

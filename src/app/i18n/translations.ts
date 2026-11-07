export type Locale = 'pl' | 'en';

export const translations: Record<string, Record<Locale, string>> = {
  'brand.name': { pl: 'WickyWave Software', en: 'WickyWave Software' },

  // ── SEO: tytuły i meta-opisy (title ≤60 znaków, description ≤160 znaków) ──
  'seo.home.title': { pl: 'WickyWave Software — dedykowane aplikacje webowe dla firm', en: 'WickyWave Software — Custom Web Applications for Businesses' },
  'seo.home.description': {
    pl: 'Projektujemy i wdrażamy dedykowane aplikacje B2B, panele administracyjne i systemy wewnętrzne oparte na Django, Angular i nowoczesnych API.',
    en: 'We design and build custom B2B applications, admin panels and internal systems powered by Django, Angular and modern APIs.'
  },
  'seo.home.keywords': {
    pl: 'tworzenie oprogramowania, dedykowane oprogramowanie, software house, aplikacje webowe, aplikacje B2B, systemy informatyczne, automatyzacja procesów, integracje API',
    en: 'software development, custom software, software house, web applications, B2B applications, business software, process automation, API integrations'
  },
  'seo.offer.title': { pl: 'Oferta — aplikacje webowe, panele i automatyzacja | WickyWave', en: 'Offer — Web Apps, Admin Panels & Automation | WickyWave' },
  'seo.offer.description': {
    pl: 'Aplikacje webowe B2B/B2C, strony internetowe (landing page), panele administracyjne, automatyzacja, integracje API i opieka powdrożeniowa.',
    en: 'B2B/B2C web applications, websites (landing pages), admin panels, automation, API integrations and post-launch support.'
  },
  'seo.about.title': { pl: 'O nas — software house WickyWave', en: 'About us — WickyWave software house' },
  'seo.about.description': {
    pl: 'Software house IT zorientowany na rezultat — łączymy technologię, design i analitykę, aby poprawiać wyniki biznesowe klientów.',
    en: 'An outcome-focused IT software house — we combine technology, design and analytics to improve our clients\' business results.'
  },
  'seo.news.title': { pl: 'Aktualności — case studies i poradniki | WickyWave', en: 'News — case studies & guides | WickyWave' },
  'seo.news.description': {
    pl: 'Case studies, praktyczne poradniki i aktualności o trendach produktowych od zespołu WickyWave Software.',
    en: 'Case studies, practical guides and product trend updates from the WickyWave Software team.'
  },
  'seo.contact.title': { pl: 'Kontakt — porozmawiajmy o Twoim projekcie | WickyWave', en: 'Contact — let\'s talk about your project | WickyWave' },
  'seo.contact.description': {
    pl: 'Napisz do nas, aby omówić swój projekt.',
    en: 'Reach out to discuss your project.'
  },
  'seo.privacy.title': { pl: 'Polityka prywatności | WickyWave Software', en: 'Privacy policy | WickyWave Software' },
  'seo.privacy.description': {
    pl: 'Dowiedz się, jak WickyWave Software przetwarza dane osobowe i pliki cookie zgodnie z RODO.',
    en: 'Learn how WickyWave Software processes personal data and cookies in compliance with GDPR.'
  },
  'seo.xoaila.title': { pl: 'Xoaila — aktywny SaaS do pozycjonowania w AI | WickyWave', en: 'Xoaila — active SaaS for AI search visibility | WickyWave' },
  'seo.xoaila.description': {
    pl: 'Xoaila pomaga markom budować widoczność w nowym modelu wyszukiwania: od klasycznego SEO po odpowiedzi generowane przez AI.',
    en: 'Xoaila helps brands build visibility in the new search model: from classic SEO to AI-generated answer surfaces.'
  },

  'menu.home': { pl: 'Home', en: 'Home' },
  'menu.activeSaas': { pl: 'Aktywne SaaS', en: 'Active SaaS' },
  'menu.offer': { pl: 'Oferta', en: 'Offer' },
  'menu.about': { pl: 'O nas', en: 'About us' },
  'menu.news': { pl: 'Aktualności', en: 'News' },
  'menu.contact': { pl: 'Kontakt', en: 'Contact' },
  'menu.cta': { pl: 'Umów rozmowę', en: 'Book a call' },
  'theme.light': { pl: 'Włącz tryb jasny', en: 'Switch to light mode' },
  'theme.dark': { pl: 'Włącz tryb ciemny', en: 'Switch to dark mode' },
  'ocean.tagline': {
    pl: 'Mamy pomysł na software na każdą porę dnia.',
    en: 'We have a software idea for every time of the day.'
  },
  'ocean.mood.dawn': { pl: 'ŚWIT', en: 'DAWN' },
  'ocean.mood.morning': { pl: 'PORANEK', en: 'MORNING' },
  'ocean.mood.midday': { pl: 'POŁUDNIE', en: 'MIDDAY' },
  'ocean.mood.goldenHour': { pl: 'ZŁOTA GODZINA', en: 'GOLDEN HOUR' },
  'ocean.mood.sunset': { pl: 'ZACHÓD SŁOŃCA', en: 'SUNSET' },
  'ocean.mood.moonlit': { pl: 'NOC', en: 'NIGHT' },
  // ── HOME PAGE ──────────────────────────────────────────────────────────────
  // Hero
  'home.eyebrow':  { pl: 'Software House', en: 'Software House' },
  'home.title':    { pl: 'Tworzymy aplikacje webowe, które usprawniają procesy i wspierają rozwój Twojego biznesu.', en: 'We build web applications that improve processes and support your business growth.' },
  'home.subtitle': { pl: 'Projektujemy i rozwijamy dedykowane aplikacje B2B, platformy dla klientów oraz systemy wewnętrzne oparte na Django, Angular i nowoczesnych API. Dostarczamy rozwiązania, które automatyzują pracę, integrują dane i eliminują ograniczenia gotowych systemów.', en: 'We design and develop custom B2B applications, client platforms and internal systems built on Django, Angular and modern APIs — automating work, integrating data, and eliminating the limits of off-the-shelf software.' },
  'home.hero.cta': { pl: 'Porozmawiajmy o projekcie', en: 'Let\'s talk about your project' },

  // Problemy
  'home.problems.title':   { pl: 'Czy któryś z tych problemów brzmi znajomo?', en: 'Do any of these problems sound familiar?' },
  'home.problems.item1':   { pl: 'pracownicy wykonują te same czynności ręcznie każdego dnia', en: 'employees repeat the same manual tasks every day' },
  'home.problems.item2':   { pl: 'dane znajdują się w kilku różnych systemach', en: 'data is scattered across multiple systems' },
  'home.problems.item3':   { pl: 'Excel stał się najważniejszym narzędziem w firmie', en: 'Excel has become the most important tool in the company' },
  'home.problems.item4':   { pl: 'obecny system nie rozwija się razem z biznesem', en: 'the current system can\'t scale with the business' },
  'home.problems.item5':   { pl: 'klienci oczekują wygodniejszej obsługi online', en: 'customers expect a better online experience' },
  'home.problems.closing': { pl: 'Jeżeli choć jeden z tych punktów dotyczy Twojej firmy, prawdopodobnie warto zbudować dedykowaną aplikację zamiast dopasowywania biznesu do ograniczeń gotowego oprogramowania.', en: 'If even one of these applies to your company, it\'s probably worth building a custom application instead of fitting your business around off-the-shelf limitations.' },

  // Usługi
  'home.services.title':    { pl: 'Projektujemy oprogramowanie dopasowane do sposobu działania Twojej firmy', en: 'We design software tailored to the way your business works' },
  'home.services.lead':     { pl: 'Tworzymy rozwiązania, które wspierają codzienną pracę zespołów oraz obsługę klientów.', en: 'We create solutions that support daily team operations and customer service.' },
  'home.services.sublabel': { pl: 'Najczęściej realizujemy:', en: 'We most often build:' },
  'home.services.item1':    { pl: 'aplikacje webowe B2B i B2C / strony internetowe (landing page)', en: 'B2B and B2C web applications / websites (landing pages)' },
  'home.services.item2':    { pl: 'systemy do zarządzania procesami', en: 'process management systems' },
  'home.services.item3':    { pl: 'panele administracyjne', en: 'admin panels' },
  'home.services.item4':    { pl: 'portale klienta', en: 'client portals' },
  'home.services.item5':    { pl: 'platformy SaaS', en: 'SaaS platforms' },
  'home.services.item6':    { pl: 'modele AI i Machine Learning', en: 'AI models and Machine Learning' },
  'home.services.item7':    { pl: 'integracje z ERP, CRM i zewnętrznymi API', en: 'ERP, CRM and external API integrations' },
  'home.services.item8':    { pl: 'automatyzację procesów biznesowych', en: 'business process automation' },

  // Kiedy gotowe systemy przestają wystarczyć
  'home.why.title':   { pl: 'Kiedy gotowe systemy przestają wystarczyć', en: 'When off-the-shelf systems stop being enough' },
  'home.why.lead':    { pl: 'Standardowe rozwiązania dobrze sprawdzają się na początku. Wraz z rozwojem firmy pojawiają się jednak ograniczenia:', en: 'Standard solutions work well at the start. But as your company grows, limitations appear:' },
  'home.why.item1':   { pl: 'procesy trzeba dostosowywac do możliwości programu', en: 'processes must conform to software capabilities' },
  'home.why.item2':   { pl: 'kolejne integracje stają się kosztowne', en: 'additional integrations become expensive' },
  'home.why.item3':   { pl: 'pracownicy wykonują wiele czynności ręcznie', en: 'employees handle many tasks manually' },
  'home.why.item4':   { pl: 'rozwój nowych funkcji trwa zbyt długo', en: 'developing new features takes too long' },
  'home.why.closing': { pl: 'Dedykowana aplikacja pozwala zbudować system zgodny z rzeczywistym sposobem działania firmy — a nie odwrotnie.', en: 'A custom application lets you build a system that matches how your business actually works — not the other way around.' },

  // Technologie
  'home.tech.title':    { pl: 'Technologie, które wybieramy pod potrzeby projektu', en: 'Technologies we select based on project needs' },
  'home.tech.sublabel': { pl: 'Pracujemy głównie z:', en: 'We primarily work with:' },
  'home.tech.closing':  { pl: 'Technologia jest dla nas narzędziem. Najpierw projektujemy rozwiązanie biznesowe, dopiero później dobieramy odpowiedni stos technologiczny.', en: 'Technology is a tool for us. We design the business solution first, then choose the appropriate technology stack.' },

  // Jak pracujemy
  'home.process.title':       { pl: 'Przejrzysty proces. Jedna odpowiedzialność.', en: 'Clear process. Single point of accountability.' },
  'home.process.step1.title': { pl: 'Poznajemy biznes', en: 'We learn your business' },
  'home.process.step1.body':  { pl: 'Rozumiemy procesy, użytkowników i cele projektu. Dzięki temu budujemy rozwiązanie odpowiadające realnym potrzebom.', en: 'We understand processes, users and project goals. This way we build a solution that meets real needs.' },
  'home.process.step2.title': { pl: 'Projektujemy', en: 'We design' },
  'home.process.step2.body':  { pl: 'Tworzymy makiety, architekturę oraz plan wdrożenia. Widzisz produkt, zanim powstanie.', en: 'We create wireframes, architecture and a deployment plan. You see the product before it\'s built.' },
  'home.process.step3.title': { pl: 'Tworzymy i wdrażamy', en: 'We build and deploy' },
  'home.process.step3.body':  { pl: 'Realizujemy projekt iteracyjnie, regularnie prezentując postępy i dostarczając kolejne funkcje.', en: 'We deliver iteratively, regularly presenting progress and shipping new features.' },
  'home.process.step4.title': { pl: 'Rozwijamy', en: 'We evolve' },
  'home.process.step4.body':  { pl: 'Po wdrożeniu nadal rozwijamy aplikację, monitorujemy jej działanie i pomagamy w kolejnych etapach wzrostu biznesu.', en: 'After launch we continue developing the app, monitor its performance, and support the next stages of business growth.' },

  // Dlaczego WickyWave
  'home.whyus.title': { pl: 'Nie tylko piszemy kod', en: 'We do more than write code' },
  'home.whyus.lead':  { pl: 'Pomagamy firmom budować oprogramowanie, które realnie usprawnia działalność.', en: 'We help companies build software that genuinely improves operations.' },
  'home.whyus.item1': { pl: 'analiza procesów przed rozpoczęciem programowania', en: 'process analysis before programming begins' },
  'home.whyus.item2': { pl: 'projektowanie z myślą o użytkownikach', en: 'design focused on users' },
  'home.whyus.item3': { pl: 'nowoczesna architektura gotowa na rozwój', en: 'modern architecture ready for growth' },
  'home.whyus.item4': { pl: 'integracja z istniejącymi systemami', en: 'integration with existing systems' },
  'home.whyus.item5': { pl: 'długoterminowe wsparcie po wdrożeniu', en: 'long-term post-launch support' },

  // CTA
  'home.cta.title': { pl: 'Porozmawiajmy o Twoim projekcie', en: 'Let\'s talk about your project' },
  'home.cta.body':  { pl: 'Masz pomysł na nową aplikację albo obecny system ogranicza rozwój firmy? Przeanalizujemy potrzeby, zaproponujemy możliwe rozwiązania i przygotujemy plan realizacji.', en: 'Have an idea for a new application or is your current system limiting growth? We\'ll analyze your needs, propose solutions and prepare a roadmap.' },
  'home.cta.btn':   { pl: 'Umów bezpłatną konsultację', en: 'Schedule a free consultation' },
  'offer.title': { pl: 'Oferta', en: 'Offer' },
  'offer.lead': { pl: 'Budujemy produkty, które są szybkie, skalowalne i zrozumiałe dla zespołu.', en: 'We build products that are fast, scalable, and easy for your team to use.' },
  'offer.item1': { pl: 'Aplikacje webowe B2B i B2C / strony internetowe (landing page)', en: 'B2B and B2C web applications / websites (landing pages)' },
  'offer.item2': { pl: 'Panele administracyjne i dashboardy', en: 'Admin panels and dashboards' },
  'offer.item3': { pl: 'Automatyzacja procesów i integracje API', en: 'Process automation and API integrations' },
  'offer.item4': { pl: 'Opieka powdrożeniowa i rozwój', en: 'Post-launch support and evolution' },
  'about.title': { pl: 'O nas', en: 'About us' },
  'about.body': {
    pl: 'Jesteśmy software housem IT zorientowanym na rezultat. Łączymy technologię, design i analitykę, aby realnie poprawiać wyniki biznesowe klientów.',
    en: 'We are an IT software house focused on outcomes. We combine technology, design, and analytics to deliver measurable business improvements.'
  },
  'news.title': { pl: 'News', en: 'News' },
  'news.body': {
    pl: 'Publikujemy case studies, praktyczne poradniki i aktualności o trendach produktowych.',
    en: 'We publish case studies, practical guides, and updates on product trends.'
  },
  'news.card1': { pl: 'Jak skracamy czas obsługi zamówienia o 43%', en: 'How we reduced order processing time by 43%' },
  'news.card2': { pl: 'Checklist MVP dla startupu B2B', en: 'MVP checklist for B2B startups' },
  'news.card3': { pl: 'Kiedy warto zamienić Excel na aplikację', en: 'When to replace spreadsheets with an app' },
  'xoaila.title': { pl: 'Xoaila - aktywny SaaS pod nowoczesne pozycjonowanie AI', en: 'Xoaila - active SaaS for modern AI-first positioning' },
  'xoaila.body': {
    pl: 'Xoaila to aktywny produkt SaaS, który pomaga markom budować widoczność w nowym modelu wyszukiwania: od klasycznego SEO po odpowiedzi generowane przez AI.',
    en: 'Xoaila is an active SaaS product helping brands build visibility in a new search model: from classic SEO to AI-generated answer surfaces.'
  },
  'xoaila.point1': { pl: 'Monitoring obecności marki w wynikach AI i wyszukiwarkach.', en: 'Brand visibility monitoring across AI answers and search engines.' },
  'xoaila.point2': { pl: 'Rekomendacje treści pod indeksowanie semantyczne i LLM.', en: 'Content recommendations for semantic indexing and LLM relevance.' },
  'xoaila.point3': { pl: 'Dashboard wzrostu widoczności i tematów, które konwertują.', en: 'Growth dashboard for visibility and conversion-ready topic clusters.' },
  'xoaila.soon': { pl: 'Usługa będzie dostępna wkrótce.', en: 'The service will be available soon.' },
  'contact.title': { pl: 'Kontakt', en: 'Contact' },
  'contact.body': {
    pl: 'Opowiedz nam o swoim celu.',
    en: 'Tell us about your goal.'
  },
  'contact.prompt': {
    pl: 'Porozmawiajmy o Twoim projekcie.',
    en: 'Let’s talk about your project.'
  },
  'contact.companyDetails': { pl: 'Dane firmy', en: 'Company details' },
  'contact.taxId': { pl: 'NIP', en: 'Tax ID' },
  'contact.socialMedia': { pl: 'Social Media', en: 'Social Media' },
  'contact.linkedin': { pl: 'Wicky Wave na LinkedIn (otwiera się w nowej karcie)', en: 'Wicky Wave on LinkedIn (opens in a new tab)' },
  'notFound.title': { pl: 'Nie znaleziono strony', en: 'Page not found' },
  'notFound.body': { pl: 'Ta strona nie istnieje lub została usunięta.', en: 'This page does not exist or has been removed.' },
  'notFound.home': { pl: 'Wróć na stronę główną', en: 'Back to home' },
  'contact.loading': { pl: 'Ładowanie', en: 'Loading' },
  'contact.cta': { pl: 'Napisz: kontakt@wickywave.pl', en: 'Email us: kontakt@wickywave.pl' },
  'footer.copy': {
    pl: 'WickyWave Software. Nowoczesne produkty dla nowoczesnych firm.',
    en: 'WickyWave Software. Modern products for modern companies.'
  },
  'footer.brand': { pl: 'WickyWave Software.', en: 'WickyWave Software.' },
  'footer.tagline': { pl: 'Nowoczesne produkty dla nowoczesnych firm.', en: 'Modern products for modern companies.' },
  'footer.privacyLink': { pl: 'Polityka prywatności', en: 'Privacy policy' },
  'footer.cookieSettings': { pl: 'Ustawienia cookie', en: 'Cookie settings' },

  // ── COOKIE BANNER (zgodny z RODO/UE, zgody granularne) ──────────────────
  'cookie.text': {
    pl: 'Ta strona wykorzystuje pliki cookie niezbędne do jej działania. Google Analytics uruchamiamy wyłącznie po uzyskaniu Twojej zgody. Możesz zaakceptować analitykę, odrzucić ją lub dostosować swój wybór.',
    en: 'This site uses cookies required for it to function. We only load Google Analytics after you give consent. You can accept analytics, decline it, or customize your choice.'
  },
  'cookie.accept': { pl: 'Akceptuję wszystkie', en: 'Accept all' },
  'cookie.decline': { pl: 'Odrzuć opcjonalne', en: 'Decline optional' },
  'cookie.manage': { pl: 'Dostosuj', en: 'Customize' },
  'cookie.save': { pl: 'Zapisz preferencje', en: 'Save preferences' },
  'cookie.policyLink': { pl: 'Polityka prywatności', en: 'Privacy policy' },
  'cookie.prefsTitle': { pl: 'Ustawienia plików cookie', en: 'Cookie settings' },
  'cookie.prefsDesc': {
    pl: 'Wybierz, na jakie kategorie plików cookie wyrażasz zgodę. Swój wybór możesz zmienić w każdej chwili w stopce strony.',
    en: 'Choose which categories of cookies you consent to. You can change your choice at any time from the site footer.'
  },
  'cookie.necessary.title': { pl: 'Niezbędne', en: 'Necessary' },
  'cookie.necessary.desc': {
    pl: 'Zawsze aktywne. Wymagane do podstawowego działania strony (np. zapamiętanie Twojej zgody).',
    en: 'Always active. Required for the site\'s basic operation (e.g. remembering your consent choice).'
  },
  'cookie.analytics.title': { pl: 'Analityczne', en: 'Analytics' },
  'cookie.analytics.desc': {
    pl: 'Google Analytics pomaga nam zrozumieć, jak odwiedzający korzystają ze strony. Skrypt analityczny nie jest ładowany i żadne dane analityczne nie są wysyłane przed Twoją zgodą.',
    en: 'Google Analytics helps us understand how visitors use the site. The analytics script is not loaded and no analytics data is sent before you consent.'
  },

  // ── POLITYKA PRYWATNOŚCI ─────────────────────────────────────────────────
  'privacy.title': { pl: 'Polityka prywatności', en: 'Privacy policy' },
  'privacy.updated': { pl: 'Ostatnia aktualizacja: listopad 2026', en: 'Last updated: November 2026' },
  'privacy.intro': {
    pl: 'Szanujemy Twoją prywatność. Ta polityka wyjaśnia, jakie dane zbieramy, w jakim celu je przetwarzamy oraz jakie prawa przysługują Ci na mocy ogólnego rozporządzenia o ochronie danych (RODO/GDPR).',
    en: 'We respect your privacy. This policy explains what data we collect, why we process it, and what rights you have under the General Data Protection Regulation (GDPR).'
  },
  'privacy.section1.title': { pl: '1. Administrator danych', en: '1. Data controller' },
  'privacy.section1.body': {
    pl: 'Administratorem danych osobowych zbieranych za pośrednictwem tej strony jest WICKY WAVE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ, ul. Ezopa 57, 04-805 Warszawa, KRS 0001272202, NIP 9522290935, REGON 54598946300000. W sprawach dotyczących ochrony danych możesz skontaktować się z nami pod adresem kontakt@wickywave.pl.',
    en: 'The controller of personal data collected through this site is WICKY WAVE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ, ul. Ezopa 57, 04-805 Warsaw, Poland, KRS 0001272202, NIP 9522290935, REGON 54598946300000. For any data protection matters, you can contact us at kontakt@wickywave.pl.'
  },
  'privacy.section2.title': { pl: '2. Zakres danych i ich źródła', en: '2. Categories and sources of data' },
  'privacy.section2.body': {
    pl: 'Strona nie ma formularzy, kont użytkowników ani funkcji logowania. Możemy przetwarzać dane przekazane przez Ciebie podczas bezpośredniego kontaktu e-mailowego lub telefonicznego, w szczególności dane kontaktowe oraz treść korespondencji. W związku z wyświetleniem strony infrastruktura hostingowa otrzymuje standardowe dane techniczne połączenia, takie jak adres IP, data i czas żądania, żądany adres URL oraz informacje o przeglądarce i urządzeniu. Google Analytics jest uruchamiany dopiero po wyrażeniu zgody; do tego czasu jego skrypt nie jest ładowany i dane analityczne nie są wysyłane do Google.',
    en: 'The site has no forms, user accounts, or login features. We may process data you provide when contacting us directly by email or telephone, in particular your contact details and the contents of correspondence. When the site is displayed, the hosting infrastructure receives standard connection data such as the IP address, request date and time, requested URL, and browser and device information. Google Analytics is activated only after you give consent; until then, its script is not loaded and analytics data is not sent to Google.'
  },
  'privacy.section3.title': { pl: '3. Cele i podstawy prawne przetwarzania', en: '3. Purposes and legal bases for processing' },
  'privacy.section3.body': {
    pl: 'Dane z korespondencji przetwarzamy w celu udzielenia odpowiedzi i prowadzenia rozmów: na podstawie art. 6 ust. 1 lit. b RODO, gdy kontakt zmierza do zawarcia lub wykonania umowy, albo art. 6 ust. 1 lit. f RODO, gdy podstawą jest nasz prawnie uzasadniony interes polegający na obsłudze korespondencji i ochronie przed roszczeniami. Dane techniczne przetwarzamy na podstawie art. 6 ust. 1 lit. f RODO w celu bezpiecznego udostępniania, diagnostyki i ochrony strony. Dane analityczne przetwarzamy na podstawie Twojej zgody — art. 6 ust. 1 lit. a RODO. Google Analytics nie jest uruchamiany, a dane analityczne nie są wysyłane przed udzieleniem tej zgody.',
    en: 'We process correspondence data to reply and conduct discussions: under Article 6(1)(b) GDPR where the contact is intended to enter into or perform a contract, or under Article 6(1)(f) GDPR where our legitimate interest is handling correspondence and protecting against claims. We process technical data under Article 6(1)(f) GDPR to securely deliver, diagnose, and protect the site. We process analytics data on the basis of your consent under Article 6(1)(a) GDPR. Google Analytics is not activated and analytics data is not sent before you give that consent.'
  },
  'privacy.section4.title': { pl: '4. Pamięć lokalna, pliki cookie i zgoda', en: '4. Local storage, cookies, and consent' },
  'privacy.section4.body': {
    pl: 'W pamięci lokalnej przeglądarki zapisujemy niezbędny wpis „cookie-consent”, który przechowuje wybrane ustawienia, wersję zgody i datę decyzji. Google Analytics i Google Tag Manager nie są ładowane przed wyrażeniem zgody, dlatego przed zgodą nie są wysyłane do Google dane analityczne przez te usługi. Zgodę możesz zaakceptować, odrzucić lub dostosować w banerze, a później zmienić albo wycofać przez „Ustawienia cookie” w stopce. Wycofanie zgody nie wpływa na zgodność z prawem wcześniejszego przetwarzania. Jeśli wycofasz wcześniej udzieloną zgodę, sygnały zgody są ustawiane na odmowę, dalsze zbieranie danych analitycznych zostaje zatrzymane, a dostępne dla strony analityczne pliki cookie są usuwane.',
    en: 'We store an essential “cookie-consent” entry in the browser local storage containing the selected settings, consent version, and decision date. Google Analytics and Google Tag Manager are not loaded before consent, so these services do not send analytics data to Google before consent. You can accept, reject, or customize consent in the banner and later change or withdraw it through “Cookie settings” in the footer. Withdrawal does not affect the lawfulness of processing carried out before it. If you withdraw previously given consent, consent signals are set to denied, further analytics collection is stopped, and analytics cookies accessible to the site are removed.'
  },
  'privacy.section5.title': { pl: '5. Google Analytics i Google Tag Manager', en: '5. Google Analytics and Google Tag Manager' },
  'privacy.section5.body': {
    pl: 'Po wyrażeniu zgody korzystamy z Google Analytics 4 do tworzenia statystyk korzystania ze strony za pośrednictwem Google Tag Manager. Google Analytics i Google Tag Manager są ładowane dopiero po zgodzie na kategorię „Analityczne”; przed zgodą ich skrypty nie są pobierane i dane analityczne nie są wysyłane do Google. Po zgodzie usługi mogą przetwarzać informacje o odwiedzanych podstronach i zdarzeniach, sesji, typie urządzenia, systemie i przeglądarce, orientacyjnej lokalizacji oraz identyfikatorze klienta zapisanym w pliku cookie. Według Google adres IP służy do ustalenia orientacyjnej lokalizacji, po czym jest odrzucany przed zapisaniem danych. Pliki „_ga” i „_ga_<identyfikator>” mogą być przechowywane do 2 lat. Stosujemy Google Consent Mode v2 w trybie podstawowym. Po wyrażeniu zgody sygnał analytics_storage jest włączany, a sygnały dotyczące przechowywania danych reklamowych, danych użytkownika na potrzeby reklam i personalizacji reklam pozostają wyłączone. W przypadku odmowy Google Analytics nie jest ładowany. Jeśli wycofasz wcześniej udzieloną zgodę, sygnał analytics_storage jest ustawiany na odmowę, dalsze zbieranie danych analitycznych zostaje zatrzymane, a dostępne dla strony analityczne pliki cookie są usuwane. Nie korzystamy z Google Ads, remarketingu, personalizacji reklam ani Google Signals.',
    en: 'After you give consent, we use Google Analytics 4 to compile statistics on use of the site through Google Tag Manager. Google Analytics and Google Tag Manager are loaded only after consent to the “Analytics” category; before consent, their scripts are not downloaded and analytics data is not sent to Google. After consent, the services may process information about visited pages and events, the session, device type, operating system and browser, approximate location, and a client identifier stored in a cookie. According to Google, the IP address is used to determine approximate location and is then discarded before data is logged. The “_ga” and “_ga_<identifier>” cookies may be stored for up to 2 years. We use Google Consent Mode v2 in basic mode. After consent, analytics_storage is enabled, while signals relating to advertising storage, user data for advertising, and ad personalization remain denied. If consent is refused, Google Analytics is not loaded. If previously given consent is withdrawn, analytics_storage is set to denied, further analytics collection is stopped, and analytics cookies accessible to the site are removed. We do not use Google Ads, remarketing, ad personalization, or Google Signals.'
  },
  'privacy.section6.title': { pl: '6. Google Search Console', en: '6. Google Search Console' },
  'privacy.section6.body': {
    pl: 'Korzystamy z Google Search Console do weryfikacji własności strony oraz przeglądania zbiorczych danych o jej widoczności, kliknięciach i indeksowaniu w wyszukiwarce Google. Sama weryfikacja za pomocą rekordu DNS, pliku HTML albo znacznika meta nie jest skryptem śledzącym i nie zapisuje w przeglądarce odwiedzającego dodatkowych plików cookie. Dane raportowane w Search Console pochodzą z interakcji użytkowników z wyszukiwarką Google, a nie z dodatkowego śledzenia na tej stronie.',
    en: 'We use Google Search Console to verify ownership of the site and view aggregated information about its visibility, clicks, and indexing in Google Search. Verification using a DNS record, HTML file, or meta tag is not a tracking script and does not place additional cookies in a visitor’s browser. Data reported in Search Console comes from users’ interactions with Google Search, not from additional tracking on this site.'
  },
  'privacy.section7.title': { pl: '7. Odbiorcy danych i transfery poza EOG', en: '7. Data recipients and transfers outside the EEA' },
  'privacy.section7.body': {
    pl: 'Dane mogą być powierzane dostawcom hostingu, infrastruktury IT i poczty elektronicznej wyłącznie w zakresie niezbędnym do świadczenia usług. W przypadku Google Analytics odbiorcą danych jest Google Ireland Limited oraz podmioty z grupy Google i jej podwykonawcy. Dane mogą być przetwarzane także poza Europejskim Obszarem Gospodarczym. Google deklaruje stosowanie odpowiednich mechanizmów prawnych, w szczególności decyzji stwierdzającej odpowiedni stopień ochrony w ramach EU–US Data Privacy Framework wobec certyfikowanych podmiotów albo standardowych klauzul umownych Komisji Europejskiej.',
    en: 'Data may be entrusted to hosting, IT infrastructure, and email providers only to the extent necessary to provide their services. For Google Analytics, recipients include Google Ireland Limited, Google group companies, and its subprocessors. Data may also be processed outside the European Economic Area. Google states that it uses appropriate legal mechanisms, in particular the EU–US Data Privacy Framework adequacy decision for certified entities or the European Commission’s Standard Contractual Clauses.'
  },
  'privacy.section8.title': { pl: '8. Okres przechowywania danych', en: '8. Data retention' },
  'privacy.section8.body': {
    pl: 'Korespondencję przechowujemy przez czas potrzebny do udzielenia odpowiedzi i prowadzenia rozmów, a gdy jest związana z umową — przez okres jej realizacji oraz do upływu właściwych terminów przedawnienia roszczeń. Dane techniczne przechowujemy przez okres wynikający z ustawień i zasad bezpieczeństwa dostawcy hostingu, nie dłużej niż jest to niezbędne do zapewnienia bezpieczeństwa i diagnostyki strony. Dla danych użytkowników i zdarzeń Google Analytics przyjmujemy okres retencji 2 miesięcy; zagregowane raporty mogą być dostępne dłużej. Okres działania samych plików cookie Analytics wskazano w punkcie 5.',
    en: 'We retain correspondence for the time needed to reply and conduct discussions and, where it relates to a contract, for its performance and until the relevant limitation periods for claims expire. Technical data is retained according to the hosting provider’s settings and security rules, no longer than necessary for site security and diagnostics. We apply a 2-month retention period to Google Analytics user and event data; aggregated reports may remain available for longer. The lifetime of Analytics cookies themselves is stated in section 5.'
  },
  'privacy.section9.title': { pl: '9. Twoje prawa (RODO/GDPR)', en: '9. Your rights (GDPR)' },
  'privacy.section9.body': {
    pl: 'W zależności od podstawy i okoliczności przetwarzania masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu. Zgodę możesz wycofać w dowolnym momencie. Masz również prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl). W celu realizacji praw możemy poprosić o informacje pozwalające potwierdzić Twoją tożsamość.',
    en: 'Depending on the legal basis and circumstances of processing, you have the right to access, rectify, erase, restrict, and port your data, and to object to processing. You may withdraw consent at any time. You also have the right to lodge a complaint with the President of the Polish Personal Data Protection Office (uodo.gov.pl). To handle a rights request, we may ask for information necessary to verify your identity.'
  },
  'privacy.section10.title': { pl: '10. Dobrowolność danych i zautomatyzowane decyzje', en: '10. Voluntary provision and automated decisions' },
  'privacy.section10.body': {
    pl: 'Podanie danych podczas kontaktu e-mailowego lub telefonicznego jest dobrowolne, ale bez danych umożliwiających odpowiedź możemy nie być w stanie obsłużyć zapytania. Nie podejmujemy wobec osób odwiedzających stronę decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, nie prowadzimy ich profilowania ani nie wykorzystujemy Google Ads, remarketingu lub personalizacji reklam.',
    en: 'Providing data when contacting us by email or telephone is voluntary, but without details that enable a response we may be unable to handle the enquiry. We do not make decisions concerning site visitors based solely on automated processing, profile them, or use Google Ads, remarketing, or ad personalization.'
  },
  'privacy.section11.title': { pl: '11. Kontakt', en: '11. Contact' },
  'privacy.section11.body': {
    pl: 'W sprawie realizacji swoich praw lub pytań dotyczących niniejszej polityki napisz do nas: kontakt@wickywave.pl.',
    en: 'To exercise your rights or ask any questions about this policy, contact us at: kontakt@wickywave.pl.'
  }
};

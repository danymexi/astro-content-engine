export const languages = {
  en: 'English',
  it: 'Italiano',
} as const;

export type Lang = keyof typeof languages;

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Your Name',
    'hero.title': 'Digital Communications & Content Strategist',
    'hero.subtitle': 'Your Industry',
    'hero.location': 'Your City',
    'hero.description': 'A strategic leader with over 10 years of experience driving communications and product promotion for a global leader in the B2B semiconductor industry. I specialize in transforming complex technical content into compelling narratives, and I actively leverage advanced AI tools \u2014 Claude Code, Gemini, OpenAI, and more \u2014 to automate workflows, scale content, and build innovative digital solutions.',
    'meta.description': 'Your Name \u2014 Your Job Title. Guides on AI agents, Claude Code, MCP servers, Proxmox home labs, Home Assistant, and prompt engineering.',
    'hero.cta.linkedin': 'Connect on LinkedIn',
    'hero.cta.blog': 'Read the Blog',

    // About
    'about.title': 'About Me',
    'about.intro': 'A strategic leader specializing in digital communications, content strategy, and executive-level storytelling for the global semiconductor industry.',
    'about.bio.p1': 'I\'m a Your Job Title at Your Company in Geneva, where I lead corporate blog strategy, digital experiences, and executive communications. I bridge the gap between technical innovation and business growth, leading a team of professionals and managing external agencies to deliver results-oriented content initiatives aligned with the company\'s strategic roadmap.',
    'about.bio.p2': 'I\'m also a founder at heart \u2014 I built and scaled Spazio iTech, a prominent Italian technology media outlet, from the ground up over nearly 9 years, establishing it as a respected voice in the tech industry alongside major national publications. I managed a team of 9, cultivated partnerships with global tech brands, and was invited to international product launches as a key tech influencer.',
    'about.bio.p3': 'I\'m an advanced user of AI-powered tools: I build production automations with Claude Code, use Gemini and OpenAI APIs for content generation pipelines, and self-host infrastructure on Proxmox with Cloudflare. Passionate about pushing the boundaries of what AI can do for communications, SEO, and workflow automation. I hold a Master\'s degree in Advanced Marketing Management and a Master in Global Marketing, Communication & Made in Italy from Universit\u00e0 degli Studi di Milano-Bicocca.',
    'about.skills.title': 'What I Do',
    'about.skill.content': 'Content Strategy & Management',
    'about.skill.content.desc': 'From corporate blog creation to multichannel content strategies, with a focus on ROI, editorial planning, and establishing industry thought leadership in B2B semiconductors.',
    'about.skill.digital': 'Digital Experiences & Events',
    'about.skill.digital.desc': 'End-to-end ideation and execution of high-impact digital and hybrid events. Video production and live broadcast management for top management and executive communications.',
    'about.skill.tech': 'Tech & AI Innovation',
    'about.skill.tech.desc': 'Advanced user of Claude Code, Gemini, and OpenAI for production-grade automations: content pipelines, SEO optimization, automated publishing, and full-stack web development. Self-hosting on Proxmox with Cloudflare.',
    'about.skill.leadership': 'Leadership & Collaboration',
    'about.skill.leadership.desc': 'Leading teams (internal and external), managing vendor relationships, and collaborating with executive-level stakeholders to align communication strategies with business objectives.',

    // Experience
    'experience.title': 'Experience',
    'experience.role1': 'Your Job Title',
    'experience.role1.company': 'Your Company',
    'experience.role1.date': 'Jul 2023 \u2013 Present',
    'experience.role1.location': 'Your City',
    'experience.role1.desc': 'Strategic lead for ST\'s digital experiences and executive communications. Leading a team of professionals and managing external agencies. Orchestrated the 2025 blog.st.com rebrand, developed a Unified Calendar prototype for cross-platform editorial planning, and manage the Professional Video Room for CEO and Top Management broadcasts.',
    'experience.role2': 'Head of Blog Communications & Digital Media',
    'experience.role2.company': 'Your Company',
    'experience.role2.date': 'Dec 2021 \u2013 Jul 2023',
    'experience.role2.location': 'Your City',
    'experience.role2.desc': 'Elevated the ST Blog from a growing platform to a core strategic asset. Directed professional video room operations with NewTek TriCaster for live TV interviews. Managed live broadcasts for global executive announcements and integrated content strategy across social media channels.',
    'experience.role3': 'Corporate Blog Strategy & Content Manager',
    'experience.role3.company': 'Your Company',
    'experience.role3.date': 'Sep 2017 \u2013 Dec 2021',
    'experience.role3.location': 'Your City',
    'experience.role3.desc': 'Designed, launched, and scaled ST\'s official corporate blog from a greenfield project. Established the editorial planning system, managed technical writers, and grew the platform\'s impact to exceed the performance of established channels like the ST Newsroom.',
    'experience.role4': 'Marketing & Communications Specialist (APAC)',
    'experience.role4.company': 'Your Company',
    'experience.role4.date': 'Mar 2019 \u2013 Aug 2019',
    'experience.role4.location': 'Singapore',
    'experience.role4.desc': 'International rotation focused on the APAC semiconductor market. Conducted a comprehensive audit of ST\'s social media presence vs competitors, sourced technical articles from the region, and built a professional network across Singapore and Hong Kong.',
    'experience.founder': 'Founder & Editor-in-Chief',
    'experience.spazioitech': 'Spazio iTech',
    'experience.spazioitech.date': 'Apr 2014 \u2013 Present',
    'experience.spazioitech.location': 'Monza e Brianza, Italy',
    'experience.spazioitech.desc': 'Built and scaled a prominent Italian technology media outlet from the ground up. Managed a team of 9 including writers and an editor, cultivated partnerships with global tech brands, and was invited to international product launches. After years on hold, we relaunched the project in 2026 with the goal of becoming competitive again in the Italian tech news landscape.',

    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Platforms and websites I designed, built, and manage.',
    'projects.blogst': 'blog.st.com',
    'projects.blogst.desc': 'Designed, launched, and scaled the official Your Company corporate blog from a greenfield project into a high-performing communication channel with global reach.',
    'projects.blogst.url': 'https://blog.st.com',
    'projects.spazioitech': 'Spazio iTech',
    'projects.spazioitech.desc': 'Founded and led a prominent Italian technology media outlet for nearly 9 years, competing with major national publications. Relaunched in 2026 with renewed energy to keep delivering tech news, reviews, and insights to the Italian audience.',
    'projects.spazioitech.url': 'https://www.spazioitech.it',
    'projects.francescacolle': 'francescacolle-osteopata.it',
    'projects.francescacolle.desc': 'Full-stack website creation for an osteopath practice: WordPress, automated blog content, SEO monitoring, self-hosted on Proxmox with Cloudflare.',
    'projects.francescacolle.url': 'https://francescacolle-osteopata.it',

    // Education
    'education.title': 'Education',
    'education.master1': 'Master in Global Marketing, Communication & Made in Italy',
    'education.master1.school': 'Centro Studi Comunicare l\'Impresa',
    'education.master1.date': '2018 \u2013 2019',
    'education.master2': 'Master in Advanced Marketing Management',
    'education.master2.school': 'Universit\u00e0 degli Studi di Milano-Bicocca',
    'education.master2.date': '2015 \u2013 2017',
    'education.bachelor': 'BSc in Marketing, Communication and Global Markets',
    'education.bachelor.school': 'Universit\u00e0 degli Studi di Milano-Bicocca',
    'education.bachelor.date': '2012 \u2013 2015',

    // Awards
    'awards.title': 'Awards & Certifications',
    'awards.star2025': 'ST STAR Awards 2025 \u2013 Silver',
    'awards.star2018': 'ST STAR Awards 2018 \u2013 Gold',
    'awards.certified': 'Certified Professionist',

    // Languages
    'languages.title': 'Languages',
    'languages.it': 'Italian \u2013 Native',
    'languages.en': 'English \u2013 Professional Working',
    'languages.fr': 'French \u2013 Limited Working',
    'languages.es': 'Spanish \u2013 Elementary',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Guides, tutorials, and insights on AI tools, Claude Code, and tech innovation.',
    'blog.read_more': 'Read more',
    'blog.all_posts': 'All posts',
    'blog.latest': 'Latest Articles',
    'blog.min_read': 'min read',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.description': 'Want to collaborate, discuss tech, or just say hi? Find me on these platforms.',
    'contact.linkedin': 'LinkedIn',
    'contact.linkedin.desc': 'Connect with me professionally',
    'contact.spazioitech': 'Spazio iTech',
    'contact.spazioitech.desc': 'Read my Italian tech blog',
    'contact.github': 'GitHub',
    'contact.github.desc': 'Check out my projects',
    'contact.email': 'Email',
    'contact.email.desc': 'Drop me a line',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Built with',
  },
  it: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'Chi Sono',
    'nav.blog': 'Blog',
    'nav.contact': 'Contatti',

    // Hero
    'hero.greeting': 'Ciao, sono',
    'hero.name': 'Your Name',
    'hero.title': 'Digital Communications & Content Strategist',
    'hero.subtitle': 'B2B Tech & Semiconduttori',
    'hero.location': 'Ginevra, Svizzera',
    'hero.description': 'Un leader strategico con oltre 10 anni di esperienza nella comunicazione e promozione prodotto per un leader globale nell\'industria dei semiconduttori B2B. Specializzato nel trasformare contenuti tecnici complessi in narrazioni coinvolgenti, utilizzo attivamente strumenti AI avanzati \u2014 Claude Code, Gemini, OpenAI e altri \u2014 per automatizzare workflow, scalare contenuti e costruire soluzioni digitali innovative.',
    'meta.description': 'Your Name \u2014 Your Job Title. Guide su agenti AI, Claude Code, server MCP, home lab Proxmox, Home Assistant e prompt engineering.',
    'hero.cta.linkedin': 'Connettiti su LinkedIn',
    'hero.cta.blog': 'Leggi il Blog',

    // About
    'about.title': 'Chi Sono',
    'about.intro': 'Un leader strategico specializzato in comunicazione digitale, content strategy e storytelling executive per l\'industria globale dei semiconduttori.',
    'about.bio.p1': 'Sono Your Job Title presso Your Company a Ginevra, dove guido la strategia del blog aziendale, le esperienze digitali e le comunicazioni executive. Creo il ponte tra innovazione tecnica e crescita di business, guidando un team di professionisti e gestendo agenzie esterne per iniziative di contenuto orientate ai risultati e allineate alla roadmap strategica dell\'azienda.',
    'about.bio.p2': 'Sono anche un founder nel cuore \u2014 ho costruito e fatto crescere Spazio iTech, un importante media tech italiano, da zero per quasi 9 anni, affermandolo come voce rispettata nel settore tecnologico accanto alle principali testate nazionali. Ho gestito un team di 9 persone, coltivato partnership con brand tech globali e sono stato invitato a lanci internazionali come influencer tech di riferimento.',
    'about.bio.p3': 'Sono un utente avanzato di strumenti AI: costruisco automazioni production-ready con Claude Code, utilizzo le API di Gemini e OpenAI per pipeline di generazione contenuti e gestisco infrastruttura self-hosted su Proxmox con Cloudflare. Appassionato di spingere i limiti di ci\u00f2 che l\'AI pu\u00f2 fare per comunicazione, SEO e automazione dei workflow. Ho un Master in Advanced Marketing Management e un Master in Global Marketing, Communication & Made in Italy dall\'Universit\u00e0 degli Studi di Milano-Bicocca.',
    'about.skills.title': 'Cosa Faccio',
    'about.skill.content': 'Content Strategy & Management',
    'about.skill.content.desc': 'Dalla creazione di blog aziendali a strategie di contenuto multicanale, con focus su ROI, pianificazione editoriale e thought leadership nel B2B dei semiconduttori.',
    'about.skill.digital': 'Digital Experiences & Eventi',
    'about.skill.digital.desc': 'Ideazione ed esecuzione end-to-end di eventi digitali e ibridi ad alto impatto. Produzione video e gestione dirette live per il top management e comunicazioni executive.',
    'about.skill.tech': 'Tech & Innovazione AI',
    'about.skill.tech.desc': 'Utente avanzato di Claude Code, Gemini e OpenAI per automazioni production-grade: pipeline di contenuti, ottimizzazione SEO, pubblicazione automatizzata e sviluppo web full-stack. Self-hosting su Proxmox con Cloudflare.',
    'about.skill.leadership': 'Leadership & Collaborazione',
    'about.skill.leadership.desc': 'Guida di team interni ed esterni, gestione fornitori e collaborazione con stakeholder executive per allineare le strategie di comunicazione agli obiettivi di business.',

    // Experience
    'experience.title': 'Esperienza',
    'experience.role1': 'Your Job Title',
    'experience.role1.company': 'Your Company',
    'experience.role1.date': 'Lug 2023 \u2013 Presente',
    'experience.role1.location': 'Ginevra, Svizzera',
    'experience.role1.desc': 'Lead strategico per esperienze digitali e comunicazioni executive di ST. Guida di un team di professionisti e gestione agenzie esterne. Orchestrazione del rebrand 2025 di blog.st.com, sviluppo di un prototipo di Unified Calendar per la pianificazione editoriale cross-platform e gestione della Video Room professionale per le dirette del CEO e Top Management.',
    'experience.role2': 'Head of Blog Communications & Digital Media',
    'experience.role2.company': 'Your Company',
    'experience.role2.date': 'Dic 2021 \u2013 Lug 2023',
    'experience.role2.location': 'Ginevra, Svizzera',
    'experience.role2.desc': 'Trasformazione del Blog ST da piattaforma in crescita ad asset strategico core. Direzione della video room professionale con NewTek TriCaster per interviste TV live. Gestione delle dirette per annunci executive globali e integrazione della content strategy sui canali social media.',
    'experience.role3': 'Corporate Blog Strategy & Content Manager',
    'experience.role3.company': 'Your Company',
    'experience.role3.date': 'Set 2017 \u2013 Dic 2021',
    'experience.role3.location': 'Ginevra, Svizzera',
    'experience.role3.desc': 'Progettazione, lancio e scaling del blog aziendale ufficiale di ST da un progetto greenfield. Definizione del sistema di pianificazione editoriale, gestione dei technical writer e crescita dell\'impatto della piattaforma fino a superare le performance di canali consolidati come la ST Newsroom.',
    'experience.role4': 'Marketing & Communications Specialist (APAC)',
    'experience.role4.company': 'Your Company',
    'experience.role4.date': 'Mar 2019 \u2013 Ago 2019',
    'experience.role4.location': 'Singapore',
    'experience.role4.desc': 'Rotazione internazionale focalizzata sul mercato APAC dei semiconduttori. Audit completo della presenza social di ST vs competitor, sourcing di articoli tecnici dalla regione e costruzione di un network professionale tra Singapore e Hong Kong.',
    'experience.founder': 'Fondatore & Direttore Editoriale',
    'experience.spazioitech': 'Spazio iTech',
    'experience.spazioitech.date': 'Apr 2014 \u2013 Presente',
    'experience.spazioitech.location': 'Monza e Brianza, Italia',
    'experience.spazioitech.desc': 'Costruzione e scaling di un importante media tech italiano da zero. Gestione di un team di 9 persone tra redattori e writer, partnership con brand tech globali e inviti a lanci internazionali. Dopo anni di progetto in pausa, nel 2026 abbiamo rilanciato il progetto con l\'obiettivo di tornare ad essere competitivi nel panorama delle tech news italiane.',

    // Projects
    'projects.title': 'Progetti',
    'projects.subtitle': 'Piattaforme e siti web che ho progettato, costruito e gestisco.',
    'projects.blogst': 'blog.st.com',
    'projects.blogst.desc': 'Progettazione, lancio e scaling del blog aziendale ufficiale di Your Company, da progetto greenfield a canale di comunicazione ad alte performance con reach globale.',
    'projects.blogst.url': 'https://blog.st.com',
    'projects.spazioitech': 'Spazio iTech',
    'projects.spazioitech.desc': 'Fondazione e direzione di un importante media tech italiano per quasi 9 anni, in competizione con le principali testate nazionali. Rilanciato nel 2026 con nuova energia per continuare a portare news, recensioni e approfondimenti tech al pubblico italiano.',
    'projects.spazioitech.url': 'https://www.spazioitech.it',
    'projects.francescacolle': 'francescacolle-osteopata.it',
    'projects.francescacolle.desc': 'Creazione full-stack del sito web per uno studio di osteopatia: WordPress, contenuti blog automatizzati, monitoraggio SEO, self-hosted su Proxmox con Cloudflare.',
    'projects.francescacolle.url': 'https://francescacolle-osteopata.it',

    // Education
    'education.title': 'Formazione',
    'education.master1': 'Master in Global Marketing, Communication & Made in Italy',
    'education.master1.school': 'Centro Studi Comunicare l\'Impresa',
    'education.master1.date': '2018 \u2013 2019',
    'education.master2': 'Master in Advanced Marketing Management',
    'education.master2.school': 'Universit\u00e0 degli Studi di Milano-Bicocca',
    'education.master2.date': '2015 \u2013 2017',
    'education.bachelor': 'Laurea in Marketing, Comunicazione e Mercati Globali',
    'education.bachelor.school': 'Universit\u00e0 degli Studi di Milano-Bicocca',
    'education.bachelor.date': '2012 \u2013 2015',

    // Awards
    'awards.title': 'Premi & Certificazioni',
    'awards.star2025': 'ST STAR Awards 2025 \u2013 Silver',
    'awards.star2018': 'ST STAR Awards 2018 \u2013 Gold',
    'awards.certified': 'Certified Professionist',

    // Languages
    'languages.title': 'Lingue',
    'languages.it': 'Italiano \u2013 Madrelingua',
    'languages.en': 'Inglese \u2013 Professionale',
    'languages.fr': 'Francese \u2013 Base lavorativa',
    'languages.es': 'Spagnolo \u2013 Elementare',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Guide, tutorial e approfondimenti su strumenti AI, Claude Code e innovazione tech.',
    'blog.read_more': 'Leggi tutto',
    'blog.all_posts': 'Tutti gli articoli',
    'blog.latest': 'Ultimi Articoli',
    'blog.min_read': 'min di lettura',

    // Contact
    'contact.title': 'Contatti',
    'contact.description': 'Vuoi collaborare, parlare di tecnologia o semplicemente salutare? Trovami su queste piattaforme.',
    'contact.linkedin': 'LinkedIn',
    'contact.linkedin.desc': 'Connettiti professionalmente',
    'contact.spazioitech': 'Spazio iTech',
    'contact.spazioitech.desc': 'Leggi il mio blog tech italiano',
    'contact.github': 'GitHub',
    'contact.github.desc': 'Scopri i miei progetti',
    'contact.email': 'Email',
    'contact.email.desc': 'Scrivimi',

    // Footer
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.built': 'Realizzato con',
  },
};

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

export function getLocalePath(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}

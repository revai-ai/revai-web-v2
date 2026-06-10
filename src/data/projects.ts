export interface Project {
  id: string;
  category: string;
  title: string;
  cardDescription: string;
  problem: string;
  problemPoints?: string[];
  solution: string;
  solutionPoints: string[];
  result: string;
  resultPoints: string[];
}

export interface ProjectsData {
  cs: Project[];
  en: Project[];
}

export const projectsData: ProjectsData = {
  cs: [
    {
      id: 'ai-chatbot-pacienti',
      category: 'AI chatbot',
      title: 'Automatizace komunikace s pacienty pomocí AI chatbota',
      cardDescription: 'AI chatbot, který automaticky odpovídá pacientům, pracuje s aktuálními informacemi a výrazně odlehčuje recepci.',
      problem: 'Zdravotnická zařízení čelila velkému množství opakujících se dotazů od pacientů – telefonicky i online. Recepce byla přetížená a informace nebyly vždy aktuální.',
      solutionPoints: [
        'Odpovídá na dotazy pacientů 24/7',
        'Funguje nepřetržitě bez nutnosti obsluhy',
        'Pracuje s aktuálními daty a automatickými aktualizacemi',
      ],
      solution: 'Navrhli jsme AI chatbota speciálně pro potřeby zdravotnických zařízení, který zvládá celou škálu opakujících se dotazů a udržuje vždy aktuální informace.',
      result: 'Recepce se mohla soustředit na skutečně důležité úkoly, zatímco chatbot spolehlivě odbavoval rutinní komunikaci.',
      resultPoints: [
        'Až 60 % dotazů vyřešeno automaticky',
        'Snížení zatížení recepce',
        'Okamžité odpovědi pro pacienty',
        'Vždy aktuální informace',
      ],
    },
    {
      id: 'hlasovy-asistent-golf',
      category: 'Voice AI',
      title: 'Automatizace telefonické komunikace pro golfový resort pomocí hlasového AI asistenta',
      cardDescription: 'Hlasový AI asistent, který vyřizuje hovory, poskytuje informace a zpracovává rezervace napojené na systémy.',
      problem: 'Golfový resort se potýkal s velkým množstvím příchozích hovorů. Recepce nestíhala a část rezervací se ztrácela.',
      solutionPoints: [
        'Přijímá hovory místo recepce',
        'Odpovídá na dotazy o golfišti i hotelu',
        'Napojen na golfový i hotelový rezervační systém',
      ],
      solution: 'Implementovali jsme hlasového AI asistenta, který plynně komunikuje s hosty, poskytuje informace a rovnou zpracovává rezervace v napojených systémech.',
      result: 'Resort přestal přicházet o rezervace a recepce dostala prostor věnovat se přítomným hostům místo telefonu.',
      resultPoints: [
        'Méně zmeškaných hovorů',
        'Až 70 % dotazů odbaveno automaticky',
        'Rezervace řešené přímo během hovoru',
      ],
    },
    {
      id: 'hlasovy-asistent-psychiatrie',
      category: 'Voice AI',
      title: 'Hlasový AI asistent pro komunikaci s pacienty v psychiatrické léčebně',
      cardDescription: 'Voice AI asistent, který odbavuje hovory pacientů bez čekání a strukturuje jejich požadavky.',
      problem: 'Psychiatrická léčebna přijímala velké množství souběžných hovorů. Pacienti dlouho čekali na lince, což bylo v jejich situaci zvláště nevhodné.',
      solutionPoints: [
        'Odbavuje desítky hovorů současně',
        'Zaznamenává a kategorizuje požadavky pacientů',
        'Vytváří přehledné výstupy pro personál recepce',
      ],
      solution: 'Vytvořili jsme systém schopný souběžně odbavit libovolné množství hovorů, s citlivým přístupem k pacientům a strukturovanými výstupy pro personál.',
      result: 'Žádné čekání na lince, lepší organizace požadavků a výrazné odlehčení personálu.',
      resultPoints: [
        'Žádné čekání na lince',
        'Lepší organizace požadavků pacientů',
        'Odlehčení personálu recepce',
      ],
    },
    {
      id: 'automatizace-dokumentu',
      category: 'Automatizace',
      title: 'Automatizace zpracování a úpravy dokumentů pomocí AI',
      cardDescription: 'Automatizace, která hromadně upravuje dokumenty podle pravidel a šetří desítky hodin práce.',
      problem: 'Klient musel při každé změně pravidel ručně upravovat velké množství dokumentů. Šlo o zdlouhavou, opakující se práci náchylnou k chybám.',
      solutionPoints: [
        'Automatické hromadné úpravy dokumentů dle pravidel',
        'Eliminace manuálních zásahů',
        'Rychlé nasazení nových pravidel bez zásahu člověka',
      ],
      solution: 'Navrhli jsme automatizovaný pipeline, který na základě definovaných pravidel hromadně zpracovává a upravuje dokumenty bez nutnosti ručních zásahů.',
      result: 'Klient ušetřil desítky hodin měsíčně a eliminoval riziko lidských chyb v dokumentaci.',
      resultPoints: [
        'Úspora desítek hodin měsíčně',
        'Eliminace chyb při zpracování',
        'Rychlé zpracování i velkých objemů dokumentů',
      ],
    },
    {
      id: 'ai-web-tvorba',
      category: 'AI systém',
      title: 'Tvorba a automatizace webových stránek pomocí AI během několika hodin',
      cardDescription: 'Web vytvořený během hodin, napojený na systémy, připravený na prodej i marketing.',
      problem: 'Tradiční vývoj webových stránek byl pro klienta příliš pomalý a nákladný, bez napojení na rezervační a platební systémy.',
      solutionPoints: [
        'Tvorba webu pomocí AI během hodin místo týdnů',
        'Napojení na rezervace a platební brány',
        'SEO optimalizace a sběr kontaktních dat',
      ],
      solution: 'Využili jsme AI nástroje k rychlému vytvoření plně funkčního webu s integrací na klíčové systémy a nastavením pro organický růst.',
      result: 'Klient měl web spuštěný v řádu hodin s výrazně nižšími náklady oproti standardnímu vývoji.',
      resultPoints: [
        'Rychlé spuštění webu',
        'Výrazně nižší náklady',
        'Web jako nástroj pro aktivní růst',
      ],
    },
    {
      id: 'outbound-ecommerce',
      category: 'Automatizace',
      title: 'Automatizovaný outbound systém pro získávání schůzek v e-commerce segmentu',
      cardDescription: 'Systém, který vyhledává firmy, personalizuje oslovení a plní kalendář schůzkami.',
      problem: 'Ruční prospekting byl pomalý, neškálovatelný a výsledky závisely na individuálním výkonu obchodního zástupce.',
      solutionPoints: [
        'Automatický výběr a filtrování cílových firem',
        'Personalizace oslovení na základě dat o firmě',
        'A/B testování komunikace pro maximální efektivitu',
        'Automatické bookování schůzek do kalendáře',
      ],
      solution: 'Postavili jsme end-to-end outbound systém – od výběru firem přes personalizaci zpráv až po automatické obsazování schůzek v kalendáři.',
      result: 'Obchodní tým se mohl soustředit na samotné schůzky, zatímco systém neustále plnil kalendář.',
      resultPoints: [
        'Plně automatizovaný outreach',
        '10 % reply rate na oslovené firmy',
        'Naplněný kalendář obchodních schůzek',
      ],
    },
    {
      id: 'email-automatizace-m365',
      category: 'Automatizace',
      title: 'Automatizace emailové komunikace v Microsoft 365 pomocí AI',
      cardDescription: 'AI systém, který třídí emaily, navrhuje odpovědi a zpracovává přílohy.',
      problem: 'Tým trávil neúměrné množství času tříděním emailů, tvorbou odpovědí a zpracováním příloh – vše ručně.',
      solutionPoints: [
        'Automatické třídění a kategorizace emailů',
        'Návrhy odpovědí připravené k odeslání',
        'Automatické zpracování a extrakce dat z příloh',
      ],
      solution: 'Integrovali jsme AI vrstvu přímo do Microsoft 365, která automatizuje rutinní emailové úkony a nechává lidem prostor pro smysluplnou práci.',
      result: 'Rychlejší komunikace, méně administrativy a lépe organizovaná emailová schránka.',
      resultPoints: [
        'Rychlejší emailová komunikace',
        'Méně administrativní práce',
        'Lepší organizace emailové komunikace',
      ],
    },
    {
      id: 'interni-ai-asistent',
      category: 'AI systém',
      title: 'Interní AI asistent pro práci s firemními dokumenty a znalostmi',
      cardDescription: 'AI asistent, který zpřístupňuje firemní informace podle role uživatele.',
      problem: 'Zaměstnanci trávili příliš mnoho času hledáním informací v interních dokumentech, datových úložištích a systémech.',
      solutionPoints: [
        'Centralizace firemních dokumentů a znalostí',
        'Vyhledávání s ohledem na roli a oprávnění uživatele',
        'Odpovědi doplněné o citace ze zdrojových dokumentů',
      ],
      solution: 'Vytvořili jsme interního AI asistenta napojeného na firemní znalostní bázi, který poskytuje přesné odpovědi s odkazem na zdroje.',
      result: 'Zaměstnanci nacházejí informace v řádu sekund místo minut, produktivita roste a know-how firmy zůstává dostupné.',
      resultPoints: [
        'Rychlé vyhledávání interních informací',
        'Vyšší produktivita týmu',
        'Lepší práce s firemním know-how',
      ],
    },
  ],
  en: [
    {
      id: 'ai-chatbot-pacienti',
      category: 'AI chatbot',
      title: 'Automating Patient Communication with an AI Chatbot',
      cardDescription: 'An AI chatbot that automatically responds to patients, works with up-to-date information, and significantly reduces the workload at the reception.',
      problem: 'Healthcare facilities faced a large volume of repetitive patient inquiries — both by phone and online. Reception staff were overwhelmed, and information was not always current.',
      solutionPoints: [
        'Responds to patient inquiries 24/7',
        'Operates continuously without human supervision',
        'Works with live data and automatic updates',
      ],
      solution: 'We designed an AI chatbot specifically for healthcare settings, capable of handling the full range of repetitive inquiries while keeping information always up to date.',
      result: 'Reception staff could focus on tasks that truly mattered, while the chatbot reliably handled routine communication.',
      resultPoints: [
        'Up to 60% of inquiries resolved automatically',
        'Reduced workload at reception',
        'Instant responses for patients',
        'Always current information',
      ],
    },
    {
      id: 'hlasovy-asistent-golf',
      category: 'Voice AI',
      title: 'Automating Phone Communication for a Golf Resort with a Voice AI Assistant',
      cardDescription: 'A voice AI assistant that handles calls, provides information, and processes reservations connected to existing systems.',
      problem: 'The golf resort was struggling with a high volume of incoming calls. Reception could not keep up, and some reservations were being lost.',
      solutionPoints: [
        'Takes calls on behalf of reception',
        'Answers questions about the golf course and hotel',
        'Connected to both golf and hotel reservation systems',
      ],
      solution: 'We implemented a voice AI assistant that communicates naturally with guests, provides information, and processes reservations directly in the connected systems.',
      result: 'The resort stopped losing reservations, and reception staff were free to focus on guests present rather than being tied to the phone.',
      resultPoints: [
        'Fewer missed calls',
        'Up to 70% of inquiries handled automatically',
        'Reservations processed during the call',
      ],
    },
    {
      id: 'hlasovy-asistent-psychiatrie',
      category: 'Voice AI',
      title: 'Voice AI Assistant for Patient Communication at a Psychiatric Clinic',
      cardDescription: 'A voice AI assistant that answers patient calls without waiting and structures their requests for staff.',
      problem: 'The psychiatric clinic received a large volume of concurrent calls. Patients were left waiting on the line — particularly problematic given their situation.',
      solutionPoints: [
        'Handles dozens of simultaneous calls',
        'Records and categorizes patient requests',
        'Provides structured summaries for reception staff',
      ],
      solution: 'We built a system capable of handling any number of concurrent calls, with a sensitive approach to patients and clear structured outputs for the team.',
      result: 'No more waiting on hold, better organization of requests, and significant relief for the reception team.',
      resultPoints: [
        'No waiting on the line',
        'Better organization of patient requests',
        'Reduced workload for reception staff',
      ],
    },
    {
      id: 'automatizace-dokumentu',
      category: 'Automation',
      title: 'Automating Document Processing and Editing with AI',
      cardDescription: 'An automation system that bulk-edits documents according to defined rules, saving dozens of hours of manual work.',
      problem: 'Every time rules changed, the client had to manually update a large number of documents. It was tedious, repetitive work prone to human error.',
      solutionPoints: [
        'Automatic bulk document editing based on defined rules',
        'No manual intervention required',
        'New rules deployed instantly without human involvement',
      ],
      solution: 'We designed an automated pipeline that processes and updates documents in bulk based on defined rules — no human input needed.',
      result: 'The client saved dozens of hours per month and eliminated the risk of human errors in documentation.',
      resultPoints: [
        'Dozens of hours saved per month',
        'Errors in document processing eliminated',
        'Fast processing even for large document volumes',
      ],
    },
    {
      id: 'ai-web-tvorba',
      category: 'AI system',
      title: 'Building and Automating Websites with AI in a Matter of Hours',
      cardDescription: 'A website built in hours, connected to existing systems, ready for sales and marketing.',
      problem: 'Traditional web development was too slow and expensive for the client, with no integration to booking or payment systems.',
      solutionPoints: [
        'Website built using AI in hours instead of weeks',
        'Integrated with booking and payment systems',
        'SEO optimization and contact data collection',
      ],
      solution: 'We leveraged AI tools to rapidly build a fully functional website with key system integrations and a setup for organic growth.',
      result: 'The client launched their website within hours at a fraction of the cost of standard development.',
      resultPoints: [
        'Fast website launch',
        'Significantly lower costs',
        'Website as an active growth tool',
      ],
    },
    {
      id: 'outbound-ecommerce',
      category: 'Automation',
      title: 'Automated Outbound System for Booking Meetings in the E-commerce Segment',
      cardDescription: 'A system that finds target companies, personalizes outreach, and fills the sales calendar with meetings.',
      problem: 'Manual prospecting was slow, unscalable, and results depended heavily on the individual performance of sales reps.',
      solutionPoints: [
        'Automatic selection and filtering of target companies',
        'Personalized outreach based on company data',
        'A/B testing of messaging for maximum effectiveness',
        'Automatic meeting booking into the sales calendar',
      ],
      solution: 'We built an end-to-end outbound system — from company selection and message personalization to automatic calendar booking.',
      result: 'The sales team could focus entirely on the meetings themselves, while the system continuously filled the calendar.',
      resultPoints: [
        'Fully automated outreach',
        '10% reply rate from targeted companies',
        'Consistently full sales calendar',
      ],
    },
    {
      id: 'email-automatizace-m365',
      category: 'Automation',
      title: 'Automating Email Communication in Microsoft 365 with AI',
      cardDescription: 'An AI system that sorts emails, drafts replies, and processes attachments.',
      problem: 'The team was spending a disproportionate amount of time sorting emails, drafting responses, and processing attachments — all manually.',
      solutionPoints: [
        'Automatic email sorting and categorization',
        'Ready-to-send reply drafts',
        'Automatic processing and data extraction from attachments',
      ],
      solution: 'We integrated an AI layer directly into Microsoft 365 that automates routine email tasks and frees people up for meaningful work.',
      result: 'Faster communication, less admin work, and a better-organized inbox.',
      resultPoints: [
        'Faster email communication',
        'Less administrative work',
        'Better-organized inbox',
      ],
    },
    {
      id: 'interni-ai-asistent',
      category: 'AI system',
      title: 'Internal AI Assistant for Working with Company Documents and Knowledge',
      cardDescription: 'An AI assistant that gives employees access to company knowledge based on their role.',
      problem: 'Employees were spending too much time searching for information across internal documents, storage systems, and tools.',
      solutionPoints: [
        'Centralized company documents and knowledge',
        'Search results filtered by user role and permissions',
        'Answers backed by citations from source documents',
      ],
      solution: 'We built an internal AI assistant connected to the company knowledge base, delivering precise answers with references to source documents.',
      result: 'Employees find information in seconds instead of minutes, productivity increases, and company knowledge stays accessible.',
      resultPoints: [
        'Fast access to internal information',
        'Higher team productivity',
        'Better use of company knowledge',
      ],
    },
  ],
};

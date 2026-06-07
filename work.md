\documentclass[11pt,a4paper]{article}
\usepackage[margin=0.6in]{geometry}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[dvipsnames,svgnames,x11names]{xcolor}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage{fontawesome5}
\usepackage{tikz}
\usepackage{hyperref}
\usepackage{tabularx}
\usepackage{microtype}
\usepackage{array}
\usepackage{lmodern}

% ----- Colors -----
\definecolor{myblue}{HTML}{0066CC}
\definecolor{darkgray}{HTML}{404040}
\definecolor{lightgray}{HTML}{E6E6E6}
\definecolor{medgray}{HTML}{969696}

% ----- Section Formatting -----
\titleformat{\section}
  {\large\bfseries\color{black}\MakeUppercase}
  {}
  {0em}
  {}
  []
\titlespacing*{\section}{0pt}{14pt}{0pt}

\newcommand{\sectionrule}{%
  \par\nointerlineskip\vspace{2pt}%
  {\color{myblue}\hrule height 0.8pt}\vspace{6pt}%
}
\let\oldsection\section
\renewcommand{\section}[1]{\oldsection{#1}\sectionrule}

% ----- Skill line -----
\newcommand{\skillline}[1]{%
  \noindent{\color{myblue}\small #1}\\[3pt]%
}

% ----- Language dots -----
\newcommand{\langdots}[1]{%
  \begin{tikzpicture}[baseline=-2.5pt]
    \foreach \i in {1,...,5} {
      \ifnum\i>#1
        \fill[lightgray] (\i*0.32cm,0) circle (0.11cm);
      \else
        \fill[myblue] (\i*0.32cm,0) circle (0.11cm);
      \fi
    }
  \end{tikzpicture}%
}

% ----- Project entry commands -----
\newcommand{\projecttitle}[1]{%
  \textbf{#1}%
}
\newcommand{\projectdate}[1]{%
  \\[-1pt]\small\faCalendar\ #1\normalsize%
}

\hypersetup{colorlinks=true,urlcolor=myblue,linkcolor=myblue}
\pagestyle{empty}

\begin{document}

% ==================== HEADER ====================
\noindent
\begin{minipage}[t]{0.82\textwidth}
  {\Huge \textbf{NITHIN DEEPAK}}\\[5pt]
  {\Large \textcolor{myblue}{Mobile App Dev || Full Stack || Gen AI Engineer}}\\[8pt]
  \small
  \faPhone\ +91-88387-45128 \quad
  \faMapMarker*\ Madurai, India\quad
  \faEnvelope\ \href{mailto:nithindeepak2004@gmail.com}{nithindeepak2004@gmail.com} \quad
  \faLinkedin\ \href{https://www.linkedin.com/in/nithin-deepak-82231a301/}{linkedin/nithin}\\
\end{minipage}%
\hfill
\begin{minipage}[t]{0.15\textwidth}
  \begin{flushright}
  \begin{tikzpicture}
    \clip (0,0) circle (1.15cm);
    \node at (0,0) {\includegraphics[width=2.3cm,height=2.3cm,keepaspectratio]{nithin.png}};
  \end{tikzpicture}
  \end{flushright}
\end{minipage}

\vspace{4pt}

% ==================== PAGE 1 ====================
\noindent
\begin{minipage}[t]{0.62\textwidth}

\section{Summary}
\textbf{B.Tech (IT)} graduate with \textbf{2+ years} of experience building \textbf{cross-platform mobile applications} and \textbf{AI systems}. Delivered \textbf{7+ production applications} across international markets, including a \textbf{fleet-tracking platform} and multiple Play Store \& App Store titles. Proficient in \textbf{Flutter}, \textbf{Python}, and \textbf{GenAI frameworks}.

\section{Experience}

\textbf{Mobile App Developer (Freelance)}\\
\textcolor{myblue}{\textbf{Truxen}} \textbar\ Local Business\\
\small \faCalendar\ 12/2025 -- 01/2026 \quad \faMapMarker*\ Madurai, India\normalsize
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Built \textbf{Truxen}, a \textbf{Flutter-based cross-platform} fleet-tracking app providing traders and factory owners \textbf{live driver visibility} across multiple fleets; \textbf{10+ active pilot users}
  \item \small Integrated \textbf{real-time GPS} with Firebase Cloud Functions and \textbf{Hidden Markov Model map-matching} for accurate route snapping
  \item \small Architected a \textbf{PhonePe-powered subscription portal} with tiered access plans and complete webhook handling
  \item \small Developed fleet-management UI with live routes, QR trip-sharing, driver dashboards --- reducing check-in calls by \textbf{60\%}
  \item \small \textbf{Stack:} Flutter $\cdot$ Firebase $\cdot$ Google Maps API $\cdot$ PhonePe Gateway
\end{itemize}

\vspace{8pt}
\textbf{Freelance Mobile App Developer}\\
\textcolor{myblue}{\textbf{Freelancer.com}}\\
\small \faCalendar\ 11/2024 -- 03/2025 \quad \faMapMarker*\ Malaysia \& Ireland\normalsize
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Shipped \textbf{5 production apps} for \textbf{ZTOO Sdn Bhd} (Malaysia) and a client in Swords, Ireland, covering \textbf{e-commerce, POS booking, thermal printing}, and invoicing
  \item \small Produced 4 apps: Yimeiren, TaoText, TaoReception, CookPrinter; MyCube updates
  \item \small Collaborated daily with \textbf{Laravel backend engineers}
\end{itemize}

\vspace{8pt}
\textbf{GenAI Intern}\\
\textcolor{myblue}{\textbf{Crayon'D}}\\
\small \faCalendar\ 05/2025 -- 01/2026 \quad \faMapMarker*\ Madurai, India\normalsize
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Shipped a \textbf{voice-enabled multi-agent system} routing customer queries to specialized sub-agents using tool-calling and memory within a \textbf{4-week} cycle
  \item \small \textbf{Led a cross-functional team} for 4 months delivering Generative AI solutions across \textbf{healthcare and IT testing verticals}
\end{itemize}

\end{minipage}%
\hfill
\begin{minipage}[t]{0.35\textwidth}

\section{Key Achievements}
\faTrophy\ \textbf{IIT Madras InnoWAH 2024}\\[2pt]
\small \textbf{Finalist} --- national-level entrepreneurship \& technology competition among top student innovators

\section{Skills}

\skillline{Flutter $\cdot$ Dart $\cdot$ Android $\cdot$ iOS}
\skillline{React Native $\cdot$ Expo SDK}
\skillline{Node.js $\cdot$ Express $\cdot$ TypeScript}
\skillline{Python $\cdot$ FastAPI $\cdot$ LangChain}
\skillline{PostgreSQL $\cdot$ pgvector $\cdot$ Firebase}
\skillline{Docker $\cdot$ Kubernetes $\cdot$ Redis}
\skillline{Machine Learning $\cdot$ MinIO $\cdot$ Razorpay}
\skillline{RAG $\cdot$ Multi-Agent AI $\cdot$ Langgraph}
\skillline{React $\cdot$ Designing $\cdot$ GraphQL}
\skillline{Git $\cdot$ VPS Hosting $\cdot$ Microservices}

\section{Projects}

\projecttitle{Multi-Agent Swarm with Voice I/O}
\projectdate{06/2025}
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Built a \textbf{voice-enabled AI} bot for a spa: agents query \textbf{PostgreSQL}, confirm bookings, and handle FAQs via spoken conversation
  \item \small \textbf{Supervisor-agent routing} with tool-calling, persistent memory, and \textbf{Human-in-the-Loop} fallback across \textbf{5+ intent categories}
\end{itemize}

\vspace{8pt}
\projecttitle{Book.ai --- AI Ebook Reader}
\projectdate{07/2024}
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small \textbf{Context-aware AI assistant} answering questions without revealing plot points beyond the reader's current page
  \item \small \textbf{Dockerized} and \textbf{Kubernetes-orchestrated}; concurrent sessions without state conflicts
\end{itemize}

\end{minipage}

\newpage

% ==================== PAGE 2 ====================
\noindent
\begin{minipage}[t]{0.62\textwidth}

\section{Experience}
\textbf{Consulting Software Engineer}\\
\textcolor{myblue}{\textbf{Genik.io}}\\
\small \faCalendar\ 12/2024 -- 01/2025 \quad \faMapMarker*\ Chennai, India\normalsize
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Resolved \textbf{10+ UI/UX and functional bugs} in the React marketing site; improved page-load stability and compatibility across \textbf{4 major browsers}
  \item \small Refreshed product copy across \textbf{6 pages}, coordinating with the founding team for accuracy
\end{itemize}

\vspace{8pt}
\textbf{Technical Intern}\\
\textcolor{myblue}{\textbf{Orion Innovation}}\\
\small \faCalendar\ 06/2023 -- 07/2023 \quad \faMapMarker*\ Coimbatore, India\normalsize
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Engineered \textbf{3 FastAPI microservices} for an international football leagues platform, decoupling data-layer logic into dedicated endpoints
  \item \small Built a \textbf{RAG module} answering context-aware NL queries against match and league data, handling \textbf{50+ query types} in testing
\end{itemize}

\vspace{8pt}
\textbf{Software Development Student Engineer}\\
\textcolor{myblue}{\textbf{TCE Dept.\ of IT}}\\
\small \faCalendar\ 07/2023 -- 02/2026 \quad \faMapMarker*\ Madurai, India\normalsize
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Built a \textbf{POS Order Booking \& Bill Generation} app automating transactions, replacing a manual paper workflow
  \item \small Developed the \textbf{Seminar Hall Booking App and Document Approval System} for \textbf{TCE Chairman}; managing \textbf{10+ weekly reservations/30+ daily uploads} respectively with \textbf{zero double-bookings} since launch
  \item \small Shipped mobile solutions for \textbf{3+ external businesses} as college projects, each shipped within a single semester
\end{itemize}

\section{Education}

\textbf{B.Tech in Information Technology}\\
\textcolor{myblue}{\textbf{Thiagarajar College of Engineering}}\\
\small \faCalendar\ 08/2022 -- 05/2026 \quad \faMapMarker*\ Madurai, India\\
\normalsize\textbf{7.2/10}

\vspace{8pt}
\textbf{Class 12 -- ISC}\\
\textcolor{myblue}{\textbf{VMJ School}}\\
\small \faCalendar\ 01/2021 -- 04/2022 \quad \faMapMarker*\ Madurai, India\\
\normalsize\textbf{93.4/100}

\section{Languages}

\begin{tabular}{@{}lll@{}}
\textbf{Tamil}   & Native   & \langdots{5} \\[6pt]
\textbf{English} & Advanced & \langdots{4} \\
\end{tabular}

\section{Interests}
\small Enjoys \textbf{instrumental music} and \textbf{reading}

\end{minipage}%
\hfill
\begin{minipage}[t]{0.35\textwidth}

\section{Projects}

\projecttitle{Dropso Connect --- Services Marketplace} : Get any service wherever you want
\projectdate{5/2026}
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Architected a \textbf{double-sided services marketplace} : \textbf{Node.js/Express} backend, \textbf{React Native (Expo)} mobile app, and \textbf{React} admin dashboard
  \item \small Hybrid search via \textbf{\texttt{pgvector}} cosine similarity + PostgreSQL \textbf{Full-Text Search}, re-ranked with \textbf{Reciprocal Rank Fusion (RRF)} for semantic relevance
  \item \small Local \textbf{AI embeddings} using \texttt{all-MiniLM-L6-v2} via \texttt{@xenova/transformers} inside Node.js --- zero external API cost
  \item \small \textbf{Geospatial filtering} via {Haversine formula} comparing client/provider coordinates against a configurable service radius
  \item \small \textbf{Real-time chat} (Socket.io) with per-match rooms and WhatsApp-style delivery ticks synced to DB
  \item \small \textbf{State-machine chatbot} (PostgreSQL node graph),  \textbf{wallet engine} via razorpay, and full \textbf{Docker Compose} deployment - VPS.
\end{itemize}

\vspace{8pt}
\projecttitle{Mini Project Management System}
\projectdate{02/2026}
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Full-stack \textbf{multi-tenant} PM app with \textbf{Django + GraphQL} backend and \textbf{React/TypeScript} + Apollo Client frontend
  \item \small \textbf{Real-time WebSocket subscriptions} via Django Channels + \textbf{Redis}; drag-and-drop Kanban with JWT auth and org-level data isolation
\end{itemize}

\vspace{8pt}
\projecttitle{Yimeiren --- Cosmetics E-Commerce}
\projectdate{11/2024}
\begin{itemize}[leftmargin=*,nosep,topsep=3pt]
  \item \small Full-featured \textbf{cosmetics marketplace} with \textbf{microservices architecture}, integrated payments, \textbf{in-app credit wallets}, and a referral \& commission engine
\end{itemize}


\end{minipage}

\end{document}
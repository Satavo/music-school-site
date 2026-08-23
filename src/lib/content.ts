export const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#who", label: "About" },
  { href: "/#about", label: "Meet the Owner" },
  { href: "/#policies", label: "Lessons & Calendar" },
  { href: "/#gallery", label: "Gallery" },
] as const;

export const HOME_INTRO = [
  "As a local parent myself, I understand the importance of high-quality education for my child close to home. With more than 10 years of experience teaching in North Shore communities — both through music schools and as an independent teacher — I have developed a deep understanding of the goals and needs of families.",
  "At Family Music Academy, music education is about more than learning to play the piano. We help students develop strong musical skills while building confidence, discipline and creativity.",
] as const;

export const SCHOOL_NAME = "Family Music Academy";

export const SCHOOL_SLOGAN = "Music shapes the Mind";

export const SCHOOL_CONTACT = {
  email: "musicglenview@gmail.com",
  emailHref: "mailto:musicglenview@gmail.com",
  addressLines: ["1740 Waukegan Rd, Glenview", "IL 60025"],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=1740+Waukegan+Rd,+Glenview,+IL+60025",
  instagramHref: "https://www.instagram.com/family_music_academy/",
  instagramHandle: "@family_music_academy",
} as const;

export const HERO_VIDEO_CREDIT = "Student Eric Shpigelskiy, 16 years old";

export const HERO_BACKGROUND_VIDEO_SRC = "/videos/hero-bg.mp4";

export const HERO_STUDENT_VIDEO = {
  id: "hero-student-eric",
  type: "video" as const,
  src: "/videos/hero-student.mp4",
  alt: "Eric Shpigelskiy performing at the piano",
  caption: HERO_VIDEO_CREDIT,
  defaultVolume: 0.2,
};

export const WHY_CHOOSE_ITEMS = [
  "Individualized one-on-one instruction",
  "Lessons from professional Master Degree teachers",
  "Preparation for ABRSM exams and competitions",
  "Regular performance opportunity with summer and winter recitals",
  "A positive, encouraging, learning environment",
] as const;

export const DIRECTOR = {
  name: "Maria Alexeeva",
  sectionTitle: "Meet Maria Alexeeva",
  photos: [
    {
      src: "/images/about.png",
      alt: "Maria Alexeeva, owner of Family Music Academy",
      objectPosition: "object-[center_12%]",
    },
  ],
  paragraphs: [
    "Maria holds a Master's degree in Piano Performance from the St. Petersburg State Conservatory, Russia, with specialized training in chamber music, piano collaboration, and teaching. After graduating from the Conservatory, she continued her professional education in the United States at Ball State University in Indiana, where she earned an Artist Diploma and further expanded her experience as a performer and piano teacher.",
    "Music has always been a natural and essential part of Maria's life. She began playing the violin at the age of four and switched to the piano a year later. Growing up in a family of professional musicians, with both of her parents being pianists, she was surrounded by classical music from an early age. Watching her mother and father teach their students gave Maria an early understanding of the meaningful role a music teacher can play in a child's development and inspired her to continue her family's musical tradition.",
    "Today, Maria is proud to carry on her family's legacy as a third-generation professional musician. Throughout her career, she has performed as a soloist with symphony orchestras, collaborated with opera, ballet, and chamber ensembles, and worked alongside internationally acclaimed musicians in master classes and concerts. She has also received numerous awards in national and international piano competitions.",
    "As a teacher, Maria combines her extensive classical training and professional performance experience with a warm and encouraging approach to music education. She is passionate about helping children develop strong musical and technical skills while also building confidence, creativity, discipline, and a lifelong appreciation for music.",
  ],
} as const;

export const DIRECTOR_ACHIEVEMENT_SECTIONS = [
  {
    title: "Awards and Honors",
    items: [
      "Winner of the Ball State Graduate Concerto Competition, Muncie, IN (2012)",
      "Recipient of the Rose Meyer Scholarship, Ball State University, Muncie, IN (2012)",
      '1st prize — International Competition "St. Petersburg Spring", St. Petersburg, Russia (2010)',
      "2nd prize — Maria Yudina International Competition, St. Petersburg, Russia (2008)",
      "3rd prize — Syzran All-Russian Competition, Syzran, Russia (2003)",
      'Awarded the "Mayor\'s Prize" and the Ministerial grant, Krasnoyarsk, Russia (2000)',
      '1st prize — International Competition "Siberian Chamber Assembly", Krasnoyarsk, Russia (1998)',
      '3rd prize — All-Russian Competition "Hope", Krasnoyarsk, Russia (1996)',
    ],
  },
  {
    title: "Solo Performances with Orchestra",
    items: [
      "Ball State Symphony Orchestra — Sergei Rachmaninov Piano Concerto No. 1 in F-sharp minor, op. 1. Sursa Performance Hall, Muncie, IN, USA (2013)",
      "Krasnoyarsk State Symphony Orchestra — Camille Saint-Saëns Concerto No. 2 in G minor, op. 22. Krasnoyarsk Academic Philharmonic, Krasnoyarsk, Russia (2003)",
    ],
  },
  {
    title: "Master Classes with Acclaimed Artists",
    items: [
      "Berlin Philharmonic Wind Quintet — performed F. Poulenc Sextet. Ball State University, IN, USA (2013)",
      "Dr. Thomas (T.J.) Lymenstull — Instructor of Piano, Interlochen Arts Academy. Ball State University, IN, USA (2012)",
      "Dina Yoffe, solo pianist — Ball State University, IN, USA (2011)",
      "Accompanied for the master class with Sergey Nakaryakov (trumpet) (2011)",
      "American Piano Trio — St. Petersburg Conservatory, Russia (2008)",
      "Stéphane Silvester, Canada — St. Petersburg State Conservatory, Russia (2007)",
      "Lubov Timofeeva — Krasnoyarsk Academy, Russia (1998)",
    ],
  },
] as const;

/** YouTube performance videos on the Meet the Owner page. */
export const DIRECTOR_PERFORMANCES = [
  {
    id: "glinka-trio",
    title: "M. Glinka — Trio Pathétique",
    youtubeId: "mpZlMjmsSd8",
  },
  {
    id: "rachmaninoff",
    title: "S. Rachmaninov Concerto no. 1",
    youtubeId: "h2XlCNvkFt0",
  },
] as const;

export const POLICIES_INTRO =
  "Family Music Academy operates on an annual tuition model. Tuition includes 46 private lessons per academic year and reserves each student's weekly lesson time throughout the studio year. The annual schedule is designed around the local Glenview/Northbrook school calendar and includes planned breaks for major holidays and family vacations. Monthly tuition payments provide families with a convenient and predictable payment schedule while ensuring consistent weekly instruction.";

export const LESSON_OPTIONS = [
  "30-minute private lesson",
  "45-minute private lesson",
  "60-minute private lesson",
] as const;

export const STUDIO_HOLIDAYS = [
  { name: "Labor Day Weekend", dates: "September 5–7, 2026" },
  { name: "Thanksgiving Break", dates: "November 23–28, 2026" },
  { name: "Winter Break", dates: "December 21, 2026 – January 2, 2027" },
  { name: "Spring Break", dates: "March 22–27, 2027" },
  { name: "Memorial Day Weekend", dates: "May 29–31, 2027" },
  { name: "Summer Break", dates: "Two weeks in July 2027" },
] as const;

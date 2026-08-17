export const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#who", label: "About" },
  { href: "/#about", label: "Meet the Owner" },
  { href: "/#policies", label: "Policies & Tuition" },
  { href: "/#gallery", label: "Gallery" },
] as const;

export const HOME_INTRO = [
  "As a local parent myself, I understand the importance of high-quality education for their children close to home. With more than 10 years of experience teaching in North Shore communities—both through music schools and as an independent teacher—I have developed a deep understanding of the goals and needs of families.",
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

export const HERO_STUDENT_VIDEO = {
  id: "hero-student-eric",
  type: "video" as const,
  src: "/videos/hero-bg.mp4",
  poster: "/images/piano.jpg",
  alt: "Eric Shpigelskiy performing at the piano",
  caption: HERO_VIDEO_CREDIT,
  defaultVolume: 0.2,
};

export const WHY_CHOOSE_ITEMS = [
  "Individualized one-on-one instruction",
  "Lessons from professional Master Degree Teachers",
  "Preparation for ABRSM exams and competitions",
  "Regular performance opportunity: Summer and Winter Recitals",
  "A positive, encouraging learning environment",
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
    {
      src: "/images/maria_2.jpg",
      alt: "Maria Alexeeva before a performance",
      objectPosition: "object-[center_20%]",
    },
    {
      src: "/images/gallery/recital-students.png",
      alt: "Maria with students after a performance",
      objectPosition: "object-center",
    },
    {
      src: "/images/gallery/recital-performance.png",
      alt: "Maria with a young performer on stage",
      objectPosition: "object-center",
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

export const CURRICULUM_LEVELS = [
  {
    title: "Young Beginners",
    ages: "Ages 5–8",
    description:
      "A playful introduction to piano through rhythm, ear training, and foundational technique. Students build confidence while developing a genuine love for music.",
    highlights: [
      "Note reading & rhythm basics",
      "Proper hand position",
      "Creative musical games",
    ],
  },
  {
    title: "Intermediate Students",
    ages: "Ages 9–14",
    description:
      "Students deepen their technical skills and musical expression while exploring classical repertoire from Baroque through Romantic periods.",
    highlights: [
      "Scales, arpeggios & technique",
      "Classical repertoire study",
      "Music theory foundations",
    ],
  },
  {
    title: "Advanced & Adult Learners",
    ages: "Teens & Adults",
    description:
      "Tailored instruction for serious students preparing for exams, competitions, or adults pursuing a lifelong musical dream.",
    highlights: [
      "ABRSM exam preparation",
      "Competition coaching",
      "Advanced interpretation",
    ],
  },
] as const;

export const ADVANCED_TRACK = {
  eyebrow: "Advanced Track",
  title: "ABRSM & Competition Preparation",
  description:
    "Specialized coaching in repertoire selection, sight-reading, aural skills, and performance psychology — ensuring students feel confident on exam day.",
  highlights: [
    "Graded exam repertoire coaching",
    "Sight-reading & aural training",
    "Competition performance prep",
    "Studio recital opportunities",
  ],
} as const;

export const DIRECTOR_STATS = [
  { value: "15+", label: "Years Teaching" },
  { value: "St. Petersburg", label: "Conservatory" },
  { value: "ABRSM", label: "Exam Prep" },
] as const;

export const POLICIES_INTRO =
  "Family Music Academy operates on an annual tuition model. Tuition includes 46 private lessons per academic year and reserves each student's weekly lesson time throughout the studio year. The annual schedule is designed around the local Glenview/Northbrook school calendar and includes planned breaks for major holidays and family vacations. Monthly tuition payments provide families with a convenient and predictable payment schedule while ensuring consistent weekly instruction.";

export const LESSON_TUITION_OPTIONS = [
  { length: "30-minute private lesson", tuition: "$175/month" },
  { length: "45-minute private lesson", tuition: "$250/month" },
  { length: "60-minute private lesson", tuition: "$310/month" },
] as const;

export const STUDIO_HOLIDAYS = [
  { name: "Labor Day Weekend", dates: "September 5–7, 2026" },
  { name: "Thanksgiving Break", dates: "November 23–28, 2026" },
  { name: "Winter Break", dates: "December 21, 2026 – January 2, 2027" },
  { name: "Spring Break", dates: "March 22–27, 2027" },
  { name: "Memorial Day Weekend", dates: "May 29–31, 2027" },
  { name: "Summer Break", dates: "Two weeks in July 2027" },
] as const;

export const MAKEUP_RULES = [
  "Parents must provide at least 24 hours advance notice before the scheduled lesson time.",
  "Missed lessons without advance notice are not eligible for a makeup lesson.",
  "Makeup lessons must be completed within the same academic year.",
  "Unused makeup lessons do not carry over to the following year.",
] as const;

export const POLICY_SECTIONS = [
  {
    id: "teacher-absences",
    title: "Teacher Absences",
    body: "If a lesson is canceled due to teacher illness, emergency, or professional obligation, Family Music Academy will provide a rescheduled makeup lesson.",
  },
  {
    id: "attendance",
    title: "Lesson Attendance & Punctuality",
    body: "Students should arrive on time and prepared for each lesson with all required materials, including music books and assignments. Because each lesson time is reserved specifically for each student, late arrivals will not extend the scheduled lesson time.",
  },
  {
    id: "practice",
    title: "Practice & Student Progress",
    body: "Consistent practice between lessons is essential for progress. Students are expected to maintain a regular practice routine appropriate to their age and level. Parents of younger students are encouraged to support healthy practice habits at home.",
  },
  {
    id: "recitals",
    title: "Recitals & Performance Opportunities",
    body: "Students are encouraged to participate in studio recitals, competitions, examinations, and other performance opportunities. These experiences help students develop confidence, musical expression, and a deeper appreciation for music.",
  },
  {
    id: "communication",
    title: "Studio Communication",
    body: "Important announcements, schedule updates, and studio information will be communicated through email or by phone.",
  },
] as const;

export const POLICIES_CLOSING =
  "By enrolling at Family Music Academy, families agree to these policies and commit to creating a positive, respectful, and successful musical learning experience.";

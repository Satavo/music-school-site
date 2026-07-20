export const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/about", label: "Meet the Owner" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/policies", label: "Policies & Tuition" },
  { href: "/gallery", label: "Gallery" },
] as const;

export const SCHOOL_CONTACT = {
  email: "familymusicacademyglenview@gmail.com",
  emailHref: "mailto:familymusicacademyglenview@gmail.com",
  addressLines: ["1740 Waukegan Rd,", "Glenview, IL 60025"],
} as const;

export const HOME_INTRO =
  "At Family Music Academy, we believe every child deserves an education that builds not only strong musical skills but also confidence, discipline, creativity, and a love of learning. Teaching combines the rich traditions of the European piano school with modern American teaching methods.";

export const WHY_CHOOSE_ITEMS = [
  "Individualized one-on-one instruction",
  "Classical piano education",
  "Preparation for ABRSM exams and competitions",
  "Performance opportunities",
  "A positive, encouraging learning environment",
  "Lessons for children, teens, and adults",
] as const;

export const DIRECTOR = {
  name: "Maria Alexeeva",
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
  ],
  paragraphs: [
    "Music has always been a natural part of my life. I began playing the violin at the age of four before switching to the piano a year later. Growing up in a family of professional musicians, with both of my parents being pianists, I was surrounded by classical music from an early age. Watching my mother and father work with their students gave me an understanding of what it means to be a teacher and inspired me to continue our family's musical tradition. Today, I am proud to continue my family's legacy as a third-generation professional musician, and I am passionate about inspiring children to develop their musical abilities and confidence through music.",
    "I earned both my Bachelor's and Master's degrees in Piano Performance from the St. Petersburg State Conservatory, followed by an Artist Diploma from Ball State University in Indiana. Throughout my career, I have performed as a soloist with symphony orchestras, collaborated with opera, ballet, and chamber ensembles, and worked alongside internationally acclaimed musicians in master classes and concerts. I have also been honored with numerous national and international piano competition awards.",
    "For more than 15 years, I have taught students of all ages—from preschool beginners to advanced pianists. I also have extensive experience accompanying instrumentalists, singers, and orchestras, giving me a deep understanding of musical collaboration and performance.",
    "I believe music has the power to bring families together. Our academy welcomes students of all ages, from young beginners to advanced musicians, and many families enjoy learning together. Whether siblings, parents and children, or adults pursuing a lifelong dream, we strive to create a warm, supportive community where every student feels encouraged to grow.",
  ],
} as const;

/** YouTube performance videos on the Meet the Owner page. */
export const DIRECTOR_PERFORMANCES = [
  {
    id: "glinka-trio",
    title: "M. Glinka — Trio Pathétique",
    youtubeId: "mpZlMjmsSd8",
  },
  {
    id: "rachmaninoff",
    title: "Rachmaninoff",
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

export const DIRECTOR_STATS = [
  { value: "15+", label: "Years Teaching" },
  { value: "St. Petersburg", label: "Conservatory" },
  { value: "ABRSM", label: "Exam Prep" },
] as const;

export const POLICIES_INTRO =
  "Family Music Academy operates on an annual tuition model. Tuition includes 46 private lessons per academic year and reserves each student's weekly lesson time throughout the studio year. The annual schedule is designed around the local Glenview/Northbrook school calendar and includes planned breaks for major holidays and family vacations. Monthly tuition payments provide families with a convenient and predictable payment schedule while ensuring consistent weekly instruction.";

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

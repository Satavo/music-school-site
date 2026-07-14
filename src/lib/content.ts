export const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/about", label: "Meet the Owner" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/gallery", label: "Gallery" },
] as const;

export const SCHOOL_CONTACT = {
  phone: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  email: "info@familymusicacademy.com",
  emailHref: "mailto:info@familymusicacademy.com",
  addressLines: ["123 Harmony Lane", "Your City, ST 00000"],
} as const;

export const HOME_INTRO =
  "At Family Music Academy, we believe every child deserves an education that builds not only strong musical skills but also confidence, discipline, creativity, and a love of learning. Teaching combines the rich traditions of the European piano school with modern American teaching methods.";

export const WHY_CHOOSE_ITEMS = [
  "Individualized one-on-one instruction",
  "Professional classical piano education",
  "Preparation for ABRSM exams and competitions",
  "Performance opportunities",
  "A positive, encouraging learning environment",
  "Lessons for children, teens, and adults",
] as const;

export const DIRECTOR = {
  name: "Maria Alexeeva",
  paragraphs: [
    "Music has always been a natural part of my life. I began playing the violin at the age of four before switching to the piano a year later. Growing up in a family of professional musicians, with both of my parents being pianists, I was surrounded by classical music from an early age. Watching my mother and father work with their students gave me an understanding of what it means to be a teacher and inspired me to continue our family's musical tradition. Today, I am proud to continue my family's legacy as a third-generation professional musician, and I am passionate about inspiring children to develop their musical abilities and confidence through music.",
    "I earned both my Bachelor's and Master's degrees in Piano Performance from the St. Petersburg State Conservatory, followed by an Artist Diploma from Ball State University in Indiana. Throughout my career, I have performed as a soloist with symphony orchestras, collaborated with opera, ballet, and chamber ensembles, and worked alongside internationally acclaimed musicians in master classes and concerts. I have also been honored with numerous national and international piano competition awards.",
    "For more than 15 years, I have taught students of all ages—from preschool beginners to advanced pianists. I also have extensive experience accompanying instrumentalists, singers, and orchestras, giving me a deep understanding of musical collaboration and performance.",
    "I believe music has the power to bring families together. Our academy welcomes students of all ages, from young beginners to advanced musicians, and many families enjoy learning together. Whether siblings, parents and children, or adults pursuing a lifelong dream, we strive to create a warm, supportive community where every student feels encouraged to grow.",
  ],
} as const;

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

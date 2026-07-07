export const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/about", label: "About the Owner" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/gallery", label: "Gallery" },
] as const;

export const WHY_CHOOSE_ITEMS = [
  "Individualized one-on-one instruction",
  "Professional classical piano education",
  "Preparation for ABRSM exams and competitions",
  "Performance opportunities through studio recitals",
  "A positive, encouraging learning environment",
  "Lessons for children, teens, and adults",
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

export const GALLERY_IMAGES = [
  {
    id: "studio",
    src: "/images/gallery/studio.jpg",
    alt: "Grand piano in a warm studio",
    caption: "Our welcoming studio",
    size: "tall" as const,
  },
  {
    id: "practice",
    src: "/images/gallery/practice.jpg",
    alt: "Hands playing piano during practice",
    caption: "Focused practice",
    size: "square" as const,
  },
  {
    id: "sheet-music",
    src: "/images/gallery/sheet-music.jpg",
    alt: "Sheet music on piano",
    caption: "Classical repertoire",
    size: "wide" as const,
  },
  {
    id: "piano-keys",
    src: "/images/gallery/piano-keys.jpg",
    alt: "Piano keys close-up",
    caption: "The beauty of music",
    size: "tall" as const,
  },
  {
    id: "concert-hall",
    src: "/images/gallery/concert-hall.jpg",
    alt: "Concert hall stage",
    caption: "Recital performances",
    size: "square" as const,
  },
  {
    id: "performance",
    src: "/images/gallery/performance.jpg",
    alt: "Musical performance",
    caption: "Celebrating progress",
    size: "wide" as const,
  },
  {
    id: "hands-1",
    src: "/images/gallery/_test2/hands1.jpg",
    alt: "Student hands on piano keys",
    caption: "First notes at the keyboard",
    size: "square" as const,
  },
  {
    id: "hands-2",
    src: "/images/gallery/_test2/hands2.jpg",
    alt: "Close-up of piano practice",
    caption: "Building technique",
    size: "tall" as const,
  },
  {
    id: "hands-3",
    src: "/images/gallery/_test2/hands3.jpg",
    alt: "Piano lesson in progress",
    caption: "One-on-one guidance",
    size: "wide" as const,
  },
] as const;

export const GALLERY_PREVIEW_LIMIT = 10;

export function getGalleryPreviewImages() {
  return GALLERY_IMAGES.slice(-GALLERY_PREVIEW_LIMIT);
}

export const DIRECTOR_STATS = [
  { value: "20+", label: "Years Teaching" },
  { value: "100+", label: "Students Taught" },
  { value: "ABRSM", label: "Certified Examiner" },
] as const;

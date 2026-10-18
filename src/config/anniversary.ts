/**
 * ============================================================
 *  ANNIVERSARY CONFIG — THIS IS THE ONLY FILE YOU NEED TO EDIT
 * ============================================================
 * All names, texts, photos, music and the YouTube video live here.
 * Nothing personal is hard-coded inside components.
 */

export interface Photo {
  /** Path to the image, e.g. "/images/memory-01.jpg" */
  src: string;
  /** Short caption shown under the polaroid */
  caption: string;
  /** Optional date, e.g. "Feb 2024" */
  date?: string;
  /** Accessibility description of the photo */
  alt: string;
}

export const anniversaryConfig = {
  // ----- Names & date -----
  recipientName: "Ajel",
  senderName: "Ais",
  anniversaryDate: "Our Special Date",

  // ----- Opening envelope -----
  envelope: {
    label: "A LITTLE SOMETHING FOR YOU",
    title: "A letter for my favorite person.",
    intro:
      "I made you a little corner of the internet. Take your time, open it slowly.",
    button: "Open Your Letter",
    footer: "made with love, just for you",
  },

  // ----- The love letter -----
  letter: {
    title: "A Letter for You",
    date: "October 19, 2026", // e.g. "October 18, 2026" — leave empty to hide
    closingLine: "With all my heart,",
    body: [
      "Thank you for turning ordinary days into things I look forward to. Being with you feels easy, and I never take that for granted.",
      "I love the little things how you light up when you talk about something you love, and how you make everyone around you feel at home.",
      "I'm proud of how far we've come, and even more excited for everything ahead of us. I hope we keep collecting small moments: slow mornings, long talks, and quiet drives.",
      "Happy anniversary. Thank you for being you, and for being mine.",
    ],
  },

  // ----- Digital flowers -----
  flowers: {
    title: "Flowers for You",
    intro: "I couldn't hand you real flowers through a screen, so I grew these for you.",
    button: "Read the little note",
    hiddenMessage:
      "They won't wilt, just like everything I feel. Every petal here is a small thank-you for being in my life.",
  },

  // ----- Background music -----
  // Put your audio file at: public/audio/our-song.mp3
  // (Use a song you have the rights to — e.g. a recording you made or royalty-free music.)
  song: {
    title: "Our Song",
    artist: "Two of Us",
    src: "/audio/our-song.mp3",
    cover: "/images/album-cover.jpg",
  },

  // ----- YouTube finale -----
  youtube: {
    heading: "A SONG FOR YOU",
    intro: "Some feelings are easier to share through a song.",
    url: "https://www.youtube.com/watch?v=VIDEO_ID", // <-- replace VIDEO_ID
    caption: "So, this one is for you.",
  },

  // ----- Closing message -----
  closing: {
    message: "One more memory, one more reason to be grateful for you.",
    button: "Back to the Beginning",
  },

  // ----- Gallery photos -----
  // Replace the files in public/images/ with your own photos
  // (keep the same file names, or change the paths here).
  // To ADD photos: drop a new file in public/images/ and add an entry below.
  photos: [
    {
      src: "/images/memory-01.jpg",
      caption: "When When kita akan kayak gini",
      date: "",
      alt: "Replace with a description of this photo",
    },
    {
      src: "/images/memory-02.jpg",
      caption: "Kita belangkat cekola",
      date: "",
      alt: "Replace with a description of this photo",
    },
    {
      src: "/images/memory-03.jpg",
      caption: "Mwehehe Iseng",
      date: "",
      alt: "Replace with a description of this photo",
    },
    {
      src: "/images/memory-04.jpg",
      caption: "sama sama capek huhu",
      date: "",
      alt: "Replace with a description of this photo",
    },
    {
      src: "/images/memory-05.jpg",
      caption: "Lucunya Kucing KITAAAA",
      date: "",
      alt: "Replace with a description of this photo",
    },
    {
      src: "/images/memory-06.jpg",
      caption: "Our Childhood",
      date: "",
      alt: "Replace with a description of this photo",
    },
    {
      src: "/images/memory-07.jpg",
      caption: "Keseharian Kita Mwehehe",
      date: "",
      alt: "Replace with a description of this photo",
    },
    {
      src: "/images/memory-08.jpg",
      caption: "Kangen Masa ini",
      date: "",
      alt: "Replace with a description of this photo",
    },
  ] as Photo[],
};

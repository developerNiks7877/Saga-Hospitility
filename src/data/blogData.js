const BLOG_IMAGES = [
  "19-fDfzDJRLZisIJdXKZ4PS_HgfRByETA",
  "18y9R06ZKtSeNMGHF1rGkAwBhHwVA8OeL",
  "1SPcUcEHdb21ohazlwHGrr6rjpqD9kJv6",
  "1HL10Y09BfrJZH2PzPUlhUUDk9_lxUFmg",
  "14NMODJKBe_P4pjrYo0tbGZbfrieN0hMC",
  "1PV-k2PRhrOixUCZ23N4R-41yjlLa16Us",
  "1eli16x81gMY75WuwtwYY6yKy17tyIlos",
  "1fqwhBHoi0nFkrUJFqa8RMqys8L1EQkO5",
].map((id) => `https://lh3.googleusercontent.com/d/${id}=w1200`);

export const blogPosts = [
  {
    slug: "colours-of-everyday-life",
    title: "The Colours of Everyday Life",
    category: "LOCAL STORIES",
    image: BLOG_IMAGES[0],
    excerpt:
      "A vivid odhni brings colour to a simple gathering, while children share the space around her. Scenes like this reveal the family and community atmosphere of Jawai's villages, expressed through everyday interactions rather than grand occasions.",
    paragraphs: [
      "A vivid odhni brings colour to a simple gathering, while children share the space around her. Scenes like this reveal the family and community atmosphere of Jawai's villages, expressed through everyday interactions rather than grand occasions.",
      "These quiet, unposed moments carry more meaning than any curated display. The warmth between people, the ease of shared space and the vividness of everyday dress speak to a community life that continues on its own terms — welcoming to those who look and listen carefully.",
    ],
  },
  {
    slug: "every-detail-has-a-place",
    title: "Every Detail Has a Place",
    category: "LOCAL STORIES",
    image: BLOG_IMAGES[1],
    excerpt:
      "The bright folds of a traditional turban stand out against the warm tones of Jawai.",
    paragraphs: [
      "A quiet portrait that captures the character of rural Rajasthan.",
      "Sometimes, the smallest details leave the strongest impression.",
    ],
  },
  {
    slug: "why-rajasthan-is-unique",
    title: "A Smile Worth Remembering",
    category: "DESTINATION",
    image: BLOG_IMAGES[2],
    excerpt:
      "A brief expression, captured without ceremony. This portrait brings a personal warmth to the story of Jawai, reminding us that discovering a destination is also about noticing the people who inhabit it.",
    paragraphs: [],
  },
  {
    slug: "rajasthan-leopard-country",
    title: "Faces Worth Remembering",
    category: "WILDLIFE",
    image: BLOG_IMAGES[3],
    excerpt:
      "The striking red turban is a beautiful expression of Rajasthan’s traditional dress. Its carefully wrapped folds and rich colour bring attention to the distinctive details of local culture in Jawai.",
    paragraphs: [],
  },
  {
    slug: "rajasthan-heritage-and-culture",
    title: "Rooted in Generations",
    category: "CULTURE",
    image: BLOG_IMAGES[4],
    excerpt:
      "A wooden gate, traditional attire, and a life surrounded by familiar landscapes. The rural communities of Jawai carry a cultural identity reflected in their homes, clothing, and longstanding ways of living.",
    paragraphs: [],
  },
  {
    slug: "best-time-to-visit-rajasthan",
    title: "A Pause Along the Way",
    category: "TRAVEL NOTES",
    image: BLOG_IMAGES[5],
    excerpt: "Two journeys cross on a quiet village road.",
    paragraphs: [
      "Beyond the granite hills and leopard trails, Jawai is full of ordinary moments worth noticing.",
      "The kind that make a place feel lived in, not just visited.",
    ],
  },
  {
    slug: "luxury-escape-rajasthan",
    title: "Life Beneath the Granite Hills",
    category: "SLOW TRAVEL",
    image: BLOG_IMAGES[6],
    excerpt: "Jawai’s granite hills are more than a remarkable landscape.",
    paragraphs: [
      "Below them, grazing flocks and cultivated fields reveal a countryside shaped by everyday life.",
      "This is another side of Jawai, beyond its famous leopard safaris.",
    ],
  },
  {
    slug: "rabari-culture-rajasthan",
    title: "The Other Side of Rajasthan",
    category: "LOCAL STORIES",
    image: BLOG_IMAGES[7],
    excerpt:
      "Beyond Rajasthan’s familiar deserts lies the remarkable landscape of Jawai Bandh.",
    paragraphs: [
      "Rocky hills rise above seasonal greenery and peaceful waters.",
      "A quieter, greener side of Rajasthan, waiting to be explored.",
    ],
  },
];

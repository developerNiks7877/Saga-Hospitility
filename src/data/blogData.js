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

const posts = [
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

const editorial = {
  'colours-of-everyday-life': {
    sections: [
      { heading: 'Colour in an ordinary moment', paragraphs: ["A vivid odhni brings colour to a simple gathering, while children share the space around her. Scenes like this reveal the family and community atmosphere of Jawai's villages through everyday interactions rather than grand occasions."] },
      { heading: 'A portrait of local life', paragraphs: ['Clothing, gestures and familiar surroundings carry stories of identity and belonging. They are best understood with care: as living expressions of people and place, not as a performance for visitors.'] },
      { heading: 'Look, listen and leave room', paragraphs: ['The most meaningful way to encounter village life is to move at its pace, ask before taking photographs and let people decide what they wish to share. Small courtesies make a visit more thoughtful.'] },
    ],
    faqs: [{ question: 'What makes Jawai village life distinctive?', answer: 'Its character is found in everyday routines, close ties to the land and traditions that continue as part of contemporary life.' }, { question: 'How can visitors be respectful?', answer: 'Ask permission before photographing people, follow local guidance and approach each encounter with patience and curiosity.' }],
    keywords: ['Jawai village life', 'Rajasthan culture', 'local stories', 'responsible travel'],
  },
  'every-detail-has-a-place': {
    sections: [
      { heading: 'The detail that draws the eye', paragraphs: ['The bright folds of a traditional turban stand out against the warm tones of Jawai. Its carefully wrapped form and rich colour make a quiet portrait feel vivid without needing a grand setting.'] },
      { heading: 'More than an accessory', paragraphs: ['Traditional dress can carry personal meaning and regional identity. Each portrait belongs first to the person in it, and the small details invite us to notice with respect rather than assume a single story.'] },
      { heading: 'A memory made of moments', paragraphs: ['A glance, a gesture and the texture of cloth can stay with us long after a journey. Sometimes the smallest details leave the strongest impression because they bring us closer to the human scale of a place.'] },
    ],
    faqs: [{ question: 'What is the story behind the turban in this portrait?', answer: 'Turban styles and colours can reflect personal and regional traditions; their meaning varies, so it is best to learn from the wearer or local guides.' }, { question: 'Can I photograph local residents?', answer: 'Always ask first and respect a no. A considerate conversation matters more than getting a photograph.' }],
    keywords: ['Jawai portraits', 'Rajasthan turbans', 'traditional dress', 'local culture'],
  },
  'why-rajasthan-is-unique': {
    sections: [
      { heading: 'A smile, without ceremony', paragraphs: ['A brief expression, captured without ceremony, brings a personal warmth to the story of Jawai. It reminds us that discovering a destination is also about noticing the people who inhabit it.'] },
      { heading: 'People are part of the place', paragraphs: ['Landscapes often set the scene, but human encounters give travel its texture. A smile can hold a moment of welcome while still leaving room for the privacy and individuality of the person who shared it.'] },
      { heading: 'Travel with attention', paragraphs: ['Slow down, greet people with courtesy and let an encounter unfold naturally. These small choices create more thoughtful memories than a hurried checklist ever could.'] },
    ],
    faqs: [{ question: 'What should I keep in mind when meeting people in Jawai?', answer: 'Be polite, follow local customs and ask before photographing or entering private spaces.' }, { question: 'Why include local encounters in a travel story?', answer: 'They help show a destination as a lived-in place, alongside its scenery and wildlife.' }],
    keywords: ['Jawai travel', 'Rajasthan people', 'slow travel', 'responsible tourism'],
  },
  'rajasthan-leopard-country': {
    sections: [
      { heading: 'A vivid sign of identity', paragraphs: ['The striking red turban is a beautiful expression of Rajasthan’s traditional dress. Its carefully wrapped folds and rich colour bring attention to distinctive details of local culture in Jawai.'] },
      { heading: 'Culture is never a costume', paragraphs: ['Traditional clothing belongs to the people who wear it and the lives they lead. Approaching it with curiosity and respect lets visitors appreciate its craft without reducing a person to a photograph.'] },
      { heading: 'Notice with respect', paragraphs: ['Take time to learn from local voices, ask permission for portraits and remember that every individual has their own story. These choices make cultural discovery more meaningful.'] },
    ],
    faqs: [{ question: 'Is Jawai known only for wildlife?', answer: 'No. Its landscape, villages and living cultural traditions are also important parts of the region’s character.' }, { question: 'How do I photograph traditional attire respectfully?', answer: 'Ask clearly, accept the answer graciously and avoid interrupting someone’s daily routine.' }],
    keywords: ['Jawai culture', 'Rajasthan traditional attire', 'local heritage', 'Jawai stories'],
  },
  'rajasthan-heritage-and-culture': {
    sections: [
      { heading: 'A home tells its own story', paragraphs: ['A wooden gate, traditional attire and a life surrounded by familiar landscapes offer a glimpse of how home and identity meet in rural Jawai.'] },
      { heading: 'Tradition carried forward', paragraphs: ['The communities of Jawai carry cultural identity through homes, clothing, skills and longstanding ways of living. Heritage is not fixed in the past; it is shaped and renewed by the people who live it.'] },
      { heading: 'Discover beyond the landmark', paragraphs: ['Look beyond monuments and guidebook stops. With local context and permission, ordinary details can reveal the deep relationship between a community and its surroundings.'] },
    ],
    faqs: [{ question: 'Where can visitors experience Jawai heritage?', answer: 'Begin with local-led experiences and public places, and follow guidance about what is appropriate to visit.' }, { question: 'Is rural heritage only about old buildings?', answer: 'No. It also lives in customs, craft, clothing, knowledge and the everyday choices of local communities.' }],
    keywords: ['Jawai heritage', 'Rajasthan culture', 'rural Rajasthan', 'living traditions'],
  },
  'best-time-to-visit-rajasthan': {
    sections: [
      { heading: 'A meeting on the village road', paragraphs: ['Two journeys cross on a quiet village road. Beyond the granite hills and leopard trails, Jawai is full of ordinary moments worth noticing.'] },
      { heading: 'Let the journey breathe', paragraphs: ['A slower route makes room for changing terrain, familiar routines and small scenes unfolding along the way. The road becomes part of the experience rather than simply a link between destinations.'] },
      { heading: 'A place that feels lived in', paragraphs: ['Pause where it is safe and welcome, keep roads clear and let local life continue undisturbed. Those thoughtful pauses are often what make a place feel remembered, not merely visited.'] },
    ],
    faqs: [{ question: 'What is a good way to explore the roads around Jawai?', answer: 'Travel with a local driver or guide, allow time for stops and follow road and community guidance.' }, { question: 'Is Jawai only about safari drives?', answer: 'No. The village roads, countryside and everyday scenes offer another perspective on the region.' }],
    keywords: ['Jawai road trip', 'Jawai travel guide', 'slow travel Rajasthan', 'village life'],
  },
  'luxury-escape-rajasthan': {
    sections: [
      { heading: 'Granite, grassland and water', paragraphs: ['Jawai’s granite hills are more than a remarkable landscape. Their sculpted forms sit alongside open countryside and waters that change with the seasons.'] },
      { heading: 'The countryside below', paragraphs: ['Below the hills, grazing flocks and cultivated fields reveal a countryside shaped by everyday life. This is another side of Jawai, beyond its famous leopard safaris.'] },
      { heading: 'A richer sense of place', paragraphs: ['Take time to notice how natural terrain and working landscapes sit beside each other. Respect private land, wildlife and local routines as you explore.'] },
    ],
    faqs: [{ question: 'What landscapes can I see around Jawai?', answer: 'The region includes granite formations, open countryside, seasonal greenery and water landscapes; conditions vary through the year.' }, { question: 'How can I explore responsibly?', answer: 'Stay on permitted routes, follow your guide’s advice and avoid disturbing wildlife or entering private land.' }],
    keywords: ['Jawai landscape', 'granite hills Rajasthan', 'Jawai countryside', 'nature travel'],
  },
  'rabari-culture-rajasthan': {
    sections: [
      { heading: 'A greener side of Rajasthan', paragraphs: ['Beyond Rajasthan’s familiar deserts lies the remarkable landscape of Jawai Bandh. Rocky hills rise above seasonal greenery and peaceful waters.'] },
      { heading: 'A landscape shaped by seasons', paragraphs: ['Rainfall and the time of year influence the colour of the countryside and the character of the water. The view changes, inviting visitors to look beyond a single postcard image of Rajasthan.'] },
      { heading: 'Explore at the land’s pace', paragraphs: ['A quieter, greener side of Rajasthan is waiting to be explored. Move gently, keep the landscape clean and let changing light and weather set the rhythm of the day.'] },
    ],
    faqs: [{ question: 'Is Jawai Bandh a different landscape from the desert image of Rajasthan?', answer: 'Yes. Around Jawai, rocky hills, water and seasonal greenery create a distinctive landscape that changes through the year.' }, { question: 'When is the landscape at its greenest?', answer: 'Greenery depends on seasonal rainfall. Check local conditions close to your visit for the most current picture.' }],
    keywords: ['Jawai Bandh', 'Rajasthan landscapes', 'Jawai nature', 'seasonal travel'],
  },
};

export const blogPosts = posts.map((post) => ({ ...post, ...editorial[post.slug] }));

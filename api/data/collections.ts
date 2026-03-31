import type { CollectionItem } from '../../types/content';
import { getSpiderHeroes } from '../spiderApi';

const movies: CollectionItem[] = [
  {
    id: 'movie-sm-2002',
    title: 'Spider-Man',
    subtitle: 'Sam Raimi begins the movie era',
    description:
      'The 2002 film that brought Spider-Man to a new generation and turned comic-book movies into major event cinema.',
    meta: '2002 - Tobey Maguire Era',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Spider-Man_%282002_film%29_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man_(2002_film)',
    linkLabel: 'Open Movie Page',
    badge: 'Film',
  },
  {
    id: 'movie-sm2',
    title: 'Spider-Man 2',
    subtitle: 'One of the most loved superhero sequels',
    description:
      'A character-driven sequel with Doctor Octopus, emotional stakes, and some of the most iconic Spider-Man scenes on film.',
    meta: '2004 - Raimi Sequel',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4e/Spider-Man_2_USA_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man_2',
    linkLabel: 'Open Movie Page',
    badge: 'Film',
  },
  {
    id: 'movie-homecoming',
    title: 'Spider-Man: Homecoming',
    subtitle: 'A younger Peter enters the MCU',
    description:
      'Tom Holland\'s first solo MCU outing balances school-life chaos, Tony Stark pressure, and grounded Spider-Man action.',
    meta: '2017 - MCU',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Spider-Man_Homecoming_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man:_Homecoming',
    linkLabel: 'Open Movie Page',
    badge: 'MCU',
  },
  {
    id: 'movie-spiderverse',
    title: 'Into the Spider-Verse',
    subtitle: 'Miles Morales swings into animation history',
    description:
      'A visually explosive animated film that redefined what Spider-Man stories could look and feel like on screen.',
    meta: '2018 - Animated',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fa/Spider-Man_Into_the_Spider-Verse_poster.png',
    link: 'https://en.wikipedia.org/wiki/Spider-Man:_Into_the_Spider-Verse',
    linkLabel: 'Open Movie Page',
    badge: 'Animated',
  },
  {
    id: 'movie-sm3',
    title: 'Spider-Man 3',
    subtitle: 'The black suit era hits the Raimi trilogy',
    description:
      'A larger, more chaotic sequel that brought Venom, Sandman, and the symbiote suit into the spotlight.',
    meta: '2007 - Raimi Finale',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Spider-Man_3%2C_International_Poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man_3',
    linkLabel: 'Open Movie Page',
    badge: 'Film',
  },
  {
    id: 'movie-amazing-1',
    title: 'The Amazing Spider-Man',
    subtitle: 'Andrew Garfield reboots the wall-crawler',
    description:
      'A reboot with a sleeker suit, more grounded romance, and a new cinematic version of Peter Parker.',
    meta: '2012 - Reboot',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e0/The_Amazing_Spider-Man_%28film%29_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/The_Amazing_Spider-Man_(film)',
    linkLabel: 'Open Movie Page',
    badge: 'Film',
  },
  {
    id: 'movie-amazing-2',
    title: 'The Amazing Spider-Man 2',
    subtitle: 'Electro, Gwen, and a bigger emotional swing',
    description:
      'A visually energetic sequel with larger stakes, bigger set pieces, and one of Spider-Man film history\'s most emotional endings.',
    meta: '2014 - Garfield Era',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/24/The_Amazing_Spider-Man_2_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/The_Amazing_Spider-Man_2',
    linkLabel: 'Open Movie Page',
    badge: 'Film',
  },
  {
    id: 'movie-far-from-home',
    title: 'Spider-Man: Far From Home',
    subtitle: 'Peter leaves New York and faces Mysterio',
    description:
      'A global-school-trip Spider-Man story that mixes grief, illusion, and spectacle in a post-Endgame MCU world.',
    meta: '2019 - MCU',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man:_Far_From_Home',
    linkLabel: 'Open Movie Page',
    badge: 'MCU',
  },
  {
    id: 'movie-no-way-home',
    title: 'Spider-Man: No Way Home',
    subtitle: 'Multiverse collision at blockbuster scale',
    description:
      'A nostalgia-heavy, crowd-pleasing crossover that united multiple Spider-Man film eras into one event movie.',
    meta: '2021 - MCU',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man:_No_Way_Home',
    linkLabel: 'Open Movie Page',
    badge: 'MCU',
  },
  {
    id: 'movie-across-spiderverse',
    title: 'Across the Spider-Verse',
    subtitle: 'Miles steps into a much larger multiverse war',
    description:
      'A visually dense animated sequel with bigger emotional stakes, bolder style, and a far more expansive Spider society.',
    meta: '2023 - Animated',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man:_Across_the_Spider-Verse',
    linkLabel: 'Open Movie Page',
    badge: 'Animated',
  },
  {
    id: 'movie-venom',
    title: 'Venom',
    subtitle: 'The symbiote story spins into its own franchise',
    description:
      'A darker antihero spin-off focused on Eddie Brock and the alien symbiote dynamic that fans had wanted to see expanded.',
    meta: '2018 - Spin-off',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/10/Venom_%282018_film%29_poster.png',
    link: 'https://en.wikipedia.org/wiki/Venom_(2018_film)',
    linkLabel: 'Open Movie Page',
    badge: 'Spin-off',
  },
  {
    id: 'movie-venom-2',
    title: 'Venom: Let There Be Carnage',
    subtitle: 'Carnage brings chaos to the symbiote franchise',
    description: 'A faster, wilder follow-up centered on the clash between Venom and Carnage.',
    meta: '2021 - Spin-off',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Venom_Let_There_Be_Carnage_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Venom:_Let_There_Be_Carnage',
    linkLabel: 'Open Movie Page',
    badge: 'Spin-off',
  },
  {
    id: 'movie-morbius',
    title: 'Morbius',
    subtitle: 'A darker corner of Spider-adjacent cinema',
    description:
      'A vampire-leaning Marvel spin-off that expands the wider Spider-Man film orbit in a more gothic direction.',
    meta: '2022 - Spin-off',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Morbius_%28film%29_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Morbius_(film)',
    linkLabel: 'Open Movie Page',
    badge: 'Spin-off',
  },
  {
    id: 'movie-kraven',
    title: 'Kraven the Hunter',
    subtitle: 'A villain-focused Spider universe project',
    description: 'A hunter-driven action film built around one of Spider-Man\'s most iconic enemies.',
    meta: 'Villain Feature',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Kraven_the_Hunter_%28film%29_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Kraven_the_Hunter_(film)',
    linkLabel: 'Open Movie Page',
    badge: 'Villain',
  },
  {
    id: 'movie-madam-web',
    title: 'Madame Web',
    subtitle: 'Psychic threads enter the Spider world',
    description:
      'A Spider-related character film that leans into prophecy, psychic vision, and future Spider connections.',
    meta: '2024 - Spin-off',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f0/Madame_Web_%28film%29_poster.jpg',
    link: 'https://en.wikipedia.org/wiki/Madame_Web_(film)',
    linkLabel: 'Open Movie Page',
    badge: 'Spin-off',
  },
];

const comics: CollectionItem[] = [
  {
    id: 'comic-asm-001',
    title: 'Amazing Fantasy #15',
    subtitle: 'The first appearance of Spider-Man',
    description:
      'The origin issue that launched Peter Parker into Marvel history and set the tone for every Spider story after it.',
    meta: '1962 - Origin Story',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/56/Amazing_Adult_Fantasy_issue_7.jpg',
    link: 'https://en.wikipedia.org/wiki/Amazing_Fantasy#Issue_15_and_Spider-Man',
    linkLabel: 'Read About Issue',
    badge: 'Classic',
  },
  {
    id: 'comic-asm-129',
    title: 'Amazing Spider-Man #129',
    subtitle: 'The Punisher and Jackal debut',
    description:
      'A fan-favorite issue with a sharper edge that helped widen the Spider-Man world into darker territory.',
    meta: '1974 - Key Issue',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Amazing_Spider-Man_129.jpg',
    link: 'https://en.wikipedia.org/wiki/The_Amazing_Spider-Man',
    linkLabel: 'Series Page',
    badge: 'Key Run',
  },
  {
    id: 'comic-spider-verse',
    title: 'Spider-Verse',
    subtitle: 'Multiverse chaos across every webline',
    description:
      'The crossover event that brought together countless Spider variants and inspired the modern Spider-Verse craze.',
    meta: '2014 - Event Story',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Amazing_Spider-Man_vol.3_-9.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Verse',
    linkLabel: 'Open Story Info',
    badge: 'Event',
  },
  {
    id: 'comic-ultimate',
    title: 'Ultimate Spider-Man',
    subtitle: 'A modern reimagining of Peter Parker',
    description:
      'One of the most accessible Spider-Man runs, praised for character writing and long-form storytelling.',
    meta: '2000 - Modern Run',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/96/Ultimate_Spider-Man_%28October_2000%29_-1.jpg',
    link: 'https://en.wikipedia.org/wiki/Ultimate_Spider-Man',
    linkLabel: 'Open Run',
    badge: 'Modern',
  },
  {
    id: 'comic-kraven',
    title: 'Kraven\'s Last Hunt',
    subtitle: 'One of the darkest Spider-Man stories ever told',
    description:
      'A psychological and visually memorable storyline that pushed Spider-Man into one of his most intense comic arcs.',
    meta: '1987 - Classic Arc',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Kraven%27s_Last_Hunt.jpg',
    link: 'https://en.wikipedia.org/wiki/Kraven%27s_Last_Hunt',
    linkLabel: 'Open Arc',
    badge: 'Classic',
  },
  {
    id: 'comic-blue',
    title: 'Spider-Man: Blue',
    subtitle: 'A reflective and emotional Peter Parker story',
    description:
      'A deeply personal retelling focused on memory, love, and the emotional history of Peter and Gwen.',
    meta: '2002 - Emotional Story',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Spider-manbluecover.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man:_Blue',
    linkLabel: 'Open Story',
    badge: 'Drama',
  },
  {
    id: 'comic-clone-saga',
    title: 'Clone Saga',
    subtitle: 'Scarlet Spider and identity chaos',
    description:
      'A sprawling era packed with doubles, confusion, reinvention, and major status changes in Spider continuity.',
    meta: '1990s - Saga',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Spider-Man_Clone_Saga_Omnibus_cover.jpg',
    link: 'https://en.wikipedia.org/wiki/Clone_Saga',
    linkLabel: 'Open Saga',
    badge: 'Saga',
  },
  {
    id: 'comic-back-in-black',
    title: 'Back in Black',
    subtitle: 'Peter returns to a more ruthless edge',
    description:
      'A post-Civil War Spider-Man storyline that brought back the black suit aesthetic with heavier emotional stakes.',
    meta: '2007 - Modern Arc',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Spider-Man_Back_in_Black_cover.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man:_Back_in_Black',
    linkLabel: 'Open Arc',
    badge: 'Modern',
  },
  {
    id: 'comic-spider-gwen',
    title: 'Spider-Gwen',
    subtitle: 'Gwen Stacy leads her own webline',
    description:
      'A breakout alternate-universe title that gave Gwen a unique visual identity and strong standalone momentum.',
    meta: '2015 - Alternate Universe',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/82/Spider-Gwen_Vol_1_1.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Gwen',
    linkLabel: 'Open Series',
    badge: 'Multiverse',
  },
  {
    id: 'comic-miles',
    title: 'Miles Morales: Spider-Man',
    subtitle: 'A newer Spider voice takes center stage',
    description: 'Miles brings a different rhythm, energy, and emotional perspective to the Spider mantle.',
    meta: 'Modern - Miles Era',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/29/Miles_Morales_Spider-Man_Vol_1_1.jpg',
    link: 'https://en.wikipedia.org/wiki/Miles_Morales',
    linkLabel: 'Open Character',
    badge: 'Miles',
  },
  {
    id: 'comic-superior',
    title: 'Superior Spider-Man',
    subtitle: 'When Otto Octavius became Spider-Man',
    description:
      'A bold status-quo shakeup where Spider-Man looked familiar on the outside but felt radically different within.',
    meta: '2013 - Status Quo Shift',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Superior_Spider-Man_1.jpg',
    link: 'https://en.wikipedia.org/wiki/The_Superior_Spider-Man',
    linkLabel: 'Open Series',
    badge: 'Bold',
  },
  {
    id: 'comic-2099',
    title: 'Spider-Man 2099',
    subtitle: 'Miguel O\'Hara defines the future',
    description: 'A stylish futuristic reimagining of Spider-Man with a different city, tone, and edge.',
    meta: '1992 - Future Spider',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/63/Spider-Man_2099_%28vol._1%29_1.jpg',
    link: 'https://en.wikipedia.org/wiki/Spider-Man_2099',
    linkLabel: 'Open Series',
    badge: '2099',
  },
  {
    id: 'comic-maximum-carnage',
    title: 'Maximum Carnage',
    subtitle: 'Pure 90s symbiote chaos',
    description:
      'A loud, violent crossover event that became one of the defining Carnage-era Spider stories.',
    meta: '1993 - Carnage Event',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/17/Amazing_Spider-Man_378.jpg',
    link: 'https://en.wikipedia.org/wiki/Maximum_Carnage',
    linkLabel: 'Open Event',
    badge: 'Carnage',
  },
  {
    id: 'comic-silk',
    title: 'Silk',
    subtitle: 'A different spider origin enters the spotlight',
    description:
      'Silk expanded the Spider family with a fresh heroine, different dynamics, and a distinct visual tone.',
    meta: 'Modern - Spider Family',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Silk_1.jpg',
    link: 'https://en.wikipedia.org/wiki/Silk_(comics)',
    linkLabel: 'Open Character',
    badge: 'Silk',
  },
  {
    id: 'comic-renew-vows',
    title: 'Renew Your Vows',
    subtitle: 'A family-centered Spider-Man future',
    description:
      'A fan-favorite alternate Spider timeline where Peter, MJ, and Annie become a full superhero family.',
    meta: 'Alternate - Family Story',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/58/Amazing_Spider-Man_Renew_Your_Vows.jpg',
    link: 'https://en.wikipedia.org/wiki/The_Amazing_Spider-Man:_Renew_Your_Vows',
    linkLabel: 'Open Story',
    badge: 'Family',
  },
];

const costumes: CollectionItem[] = [
  {
    id: 'costume-classic',
    title: 'Classic Red and Blue',
    subtitle: 'The timeless Spider-Man silhouette',
    description:
      'Bright, athletic, and instantly recognizable. This is the suit language that defined Spider-Man for decades.',
    meta: 'Signature Suit',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg',
    badge: 'Iconic',
  },
  {
    id: 'costume-symbiote',
    title: 'Black Symbiote Suit',
    subtitle: 'Minimal, sleek, and dangerous',
    description:
      'A sharper, moodier suit direction that became one of the most requested Spider-Man looks across media.',
    meta: 'Fan Favorite',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/687-venom.jpg',
    badge: 'Dark',
  },
  {
    id: 'costume-iron-spider',
    title: 'Iron Spider',
    subtitle: 'High-tech armor energy',
    description:
      'A metallic upgrade with a more engineered presence, blending Spider agility with Stark design language.',
    meta: 'Tech Suit',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/577-scarlet-spider.jpg',
    badge: 'Tech',
  },
  {
    id: 'costume-2099',
    title: 'Spider-Man 2099',
    subtitle: 'Future-forward and razor sharp',
    description: 'A bold navy-and-red costume that brings a completely different energy to Spider-Man design.',
    meta: 'Future Variant',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/619-spider-gwen.jpg',
    badge: 'Future',
  },
  {
    id: 'costume-scarlet',
    title: 'Scarlet Spider',
    subtitle: 'Hoodie-era street-level energy',
    description:
      'A more stripped-back suit direction that feels rougher, more rebellious, and instantly recognizable.',
    meta: 'Street Variant',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/577-scarlet-spider.jpg',
    badge: 'Street',
  },
  {
    id: 'costume-scarlet-ii',
    title: 'Scarlet Spider II',
    subtitle: 'A sharper clone-era remix',
    description:
      'A later Scarlet take with a more refined silhouette and stronger high-tech suit energy.',
    meta: 'Clone Variant',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/578-scarlet-spider-ii.jpg',
    badge: 'Clone',
  },
  {
    id: 'costume-gwen',
    title: 'Spider-Gwen',
    subtitle: 'White, pink, and black visual identity',
    description:
      'One of the most distinct modern Spider looks, with a design language that feels stylish and unmistakable.',
    meta: 'Modern Variant',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/619-spider-gwen.jpg',
    badge: 'Gwen',
  },
  {
    id: 'costume-girl',
    title: 'Spider-Girl',
    subtitle: 'Legacy energy with a brighter silhouette',
    description:
      'A lighter and more legacy-driven costume direction that still keeps the Spider rhythm intact.',
    meta: 'Legacy Suit',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/618-spider-girl.jpg',
    badge: 'Legacy',
  },
  {
    id: 'costume-woman',
    title: 'Spider-Woman',
    subtitle: 'A bold red and yellow spin on the Spider look',
    description:
      'A different but iconic branch of Spider styling with stronger contrast and a distinct silhouette.',
    meta: 'Classic Variant',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/623-spider-woman.jpg',
    badge: 'Classic',
  },
  {
    id: 'costume-woman-iii',
    title: 'Spider-Woman III',
    subtitle: 'A rarer branch of the spider family style',
    description:
      'A more niche spider-family look that still adds variety to the visual costume archive.',
    meta: 'Rare Variant',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/625-spider-woman-iii.jpg',
    badge: 'Rare',
  },
  {
    id: 'costume-stealth',
    title: 'Stealth Spider Style',
    subtitle: 'Dark tactical Spider energy',
    description:
      'A stealth-inspired visual lane focused on darker tones, quieter presence, and mission-ready feel.',
    meta: 'Tactical Style',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/687-venom.jpg',
    badge: 'Stealth',
  },
  {
    id: 'costume-classic-alt',
    title: 'Classic Suit Variant',
    subtitle: 'The evergreen Spider-Man visual formula',
    description:
      'A celebration of the original red-and-blue design that still defines Spider-Man across comics, games, and film.',
    meta: 'Evergreen',
    imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg',
    badge: 'Essential',
  },
];

export const getMovies = async () => movies;

export const getComics = async () => comics;

export const getCostumes = async () => costumes;

export const getSpiderList = async (): Promise<CollectionItem[]> => {
  const heroes = await getSpiderHeroes();

  return heroes.map((hero) => ({
    id: hero.id,
    title: hero.name,
    subtitle: hero.fullName || 'Identity classified in the multiverse',
    description:
      hero.description || hero.occupation?.join(', ') || 'Spider-powered hero navigating the multiverse.',
    meta: `${hero.status || 'Unknown'} - ${hero.species || 'Unknown'}`,
    imageUrl: hero.imageUrl || 'https://placehold.co/900x1200/0B1020/F8FAFC?text=Spider',
    badge: hero.earth || hero.universe || 'Spider-Verse',
  }));
};

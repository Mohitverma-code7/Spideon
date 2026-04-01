import type { CollectionItem } from "../../types/content";
import { getSpiderHeroes } from "../spiderApi";

const movies: CollectionItem[] = [
  {
    id: "movie-sm-2002",
    title: "Spider-Man",
    subtitle: "Sam Raimi begins the movie era",
    description:
      "The 2002 film that brought Spider-Man to a new generation and turned comic-book movies into major event cinema.",
    meta: "2002 - Tobey Maguire Era",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpNo7b9GKEUiZua6y8YJEqvZSgeSt1xrw7EN7qtWq8R5I1QxtZ2lz5hiFoD1IbVRXBVGW0HKvaIzKs7WeYb4tHE4txay0yA2yt3XY26Q&s=10",
    link: "https://en.wikipedia.org/wiki/Spider-Man_(2002_film)",
    linkLabel: "Open Movie Page",
    badge: "Film",
  },
  {
    id: "movie-sm2",
    title: "Spider-Man 2",
    subtitle: "One of the most loved superhero sequels",
    description:
      "A character-driven sequel with Doctor Octopus, emotional stakes, and some of the most iconic Spider-Man scenes on film.",
    meta: "2004 - Raimi Sequel",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAiXPhchG3ath8M7kpi2cV92dMVICO8VoomOp3JMYCLt5npMSST4H1AJHXYwhGyTEXIMXIiA&s=10",
    link: "https://en.wikipedia.org/wiki/Spider-Man_2",
    linkLabel: "Open Movie Page",
    badge: "Film",
  },
  {
    id: "movie-homecoming",
    title: "Spider-Man: Homecoming",
    subtitle: "A younger Peter enters the MCU",
    description:
      "Tom Holland's first solo MCU outing balances school-life chaos, Tony Stark pressure, and grounded Spider-Man action.",
    meta: "2017 - MCU",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAui4j_CP5JitmzERck2NTzo3pgk7OWDttnMIAn3EQjAzLUqA",
    link: "https://en.wikipedia.org/wiki/Spider-Man:_Homecoming",
    linkLabel: "Open Movie Page",
    badge: "MCU",
  },
  {
    id: "movie-spiderverse",
    title: "Into the Spider-Verse",
    subtitle: "Miles Morales swings into animation history",
    description:
      "A visually explosive animated film that redefined what Spider-Man stories could look and feel like on screen.",
    meta: "2018 - Animated",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDvJ0zhGxVySz3RjLa35ukjpctxW41KzD3VQ56VzSEX2lB5WHZ0le10IjuI8ZJ9cd5CeZpA&s=10",
    link: "https://en.wikipedia.org/wiki/Spider-Man:_Into_the_Spider-Verse",
    linkLabel: "Open Movie Page",
    badge: "Animated",
  },
  {
    id: "movie-sm3",
    title: "Spider-Man 3",
    subtitle: "The black suit era hits the Raimi trilogy",
    description:
      "A larger, more chaotic sequel that brought Venom, Sandman, and the symbiote suit into the spotlight.",
    meta: "2007 - Raimi Finale",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BODE2NzNhMDctYjUzMC00Y2M5LWI2Y2EtODJkZTFjN2Y5ODlmXkEyXkFqcGc@._V1_.jpg",
    link: "https://en.wikipedia.org/wiki/Spider-Man_3",
    linkLabel: "Open Movie Page",
    badge: "Film",
  },
  {
    id: "movie-amazing-1",
    title: "The Amazing Spider-Man",
    subtitle: "Andrew Garfield reboots the wall-crawler",
    description:
      "A reboot with a sleeker suit, more grounded romance, and a new cinematic version of Peter Parker.",
    meta: "2012 - Reboot",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRqlZRtoH1B3Wj5_29Dr-BXIBL0_tNMULEA6ruBRQ4SYM4VCZbV",
    link: "https://en.wikipedia.org/wiki/The_Amazing_Spider-Man_(film)",
    linkLabel: "Open Movie Page",
    badge: "Film",
  },
  {
    id: "movie-amazing-2",
    title: "The Amazing Spider-Man 2",
    subtitle: "Electro, Gwen, and a bigger emotional swing",
    description:
      "A visually energetic sequel with larger stakes, bigger set pieces, and one of Spider-Man film history's most emotional endings.",
    meta: "2014 - Garfield Era",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5hz26jzp7FFdSsyjlYF5JJEtwywZZ91x9EoLfk9adkXQwOQY0tBnFJMf79ef9LpV18Z5R9DOOgninV9gZWxrITAaSLvySEjn3cGzNu-w&s=10",
    link: "https://en.wikipedia.org/wiki/The_Amazing_Spider-Man_2",
    linkLabel: "Open Movie Page",
    badge: "Film",
  },
  {
    id: "movie-far-from-home",
    title: "Spider-Man: Far From Home",
    subtitle: "Peter leaves New York and faces Mysterio",
    description:
      "A global-school-trip Spider-Man story that mixes grief, illusion, and spectacle in a post-Endgame MCU world.",
    meta: "2019 - MCU",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMzNhNTE0NWQtN2E1Ny00NjcwLTg1YTctMGY1NmMwODJmY2NmXkEyXkFqcGc@._V1_.jpg",
    link: "https://en.wikipedia.org/wiki/Spider-Man:_Far_From_Home",
    linkLabel: "Open Movie Page",
    badge: "MCU",
  },
  {
    id: "movie-no-way-home",
    title: "Spider-Man: No Way Home",
    subtitle: "Multiverse collision at blockbuster scale",
    description:
      "A nostalgia-heavy, crowd-pleasing crossover that united multiple Spider-Man film eras into one event movie.",
    meta: "2021 - MCU",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7iQ2s1EI_UIr7EJjI0cO0BmxrzVggyJdg8PbFmterQ50qnkFfNZROboVoSuHnn46-lZ6ZBXOtS2U7KIZQiYfLBPBmbfp7azyifrckoA&s=10",
    link: "https://en.wikipedia.org/wiki/Spider-Man:_No_Way_Home",
    linkLabel: "Open Movie Page",
    badge: "MCU",
  },
  {
    id: "movie-across-spiderverse",
    title: "Across the Spider-Verse",
    subtitle: "Miles steps into a much larger multiverse war",
    description:
      "A visually dense animated sequel with bigger emotional stakes, bolder style, and a far more expansive Spider society.",
    meta: "2023 - Animated",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAf_MyXPJnX5JpSrorysxmntevlyS1RAq-WSyD3rjIuQ8pTKDB06_B2gS_K_hbyuv515sHoNH5jhv39_dsetHTEnzRQfSOwXV7HRAuwxA&s=10",
    link: "https://en.wikipedia.org/wiki/Spider-Man:_Across_the_Spider-Verse",
    linkLabel: "Open Movie Page",
    badge: "Animated",
  },
  {
    id: "movie-madam-web",
    title: "Madame Web",
    subtitle: "Psychic threads enter the Spider world",
    description:
      "A Spider-related character film that leans into prophecy, psychic vision, and future Spider connections.",
    meta: "2024 - Spin-off",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZw_UEsuvgsYUhI1fCMRQTrTtk0eeZuRX2n9kG1cXwFCWhlRVZpWYGvl_vl1-OGbqJoLJ&s=10",
    link: "https://en.wikipedia.org/wiki/Madame_Web_(film)",
    linkLabel: "Open Movie Page",
    badge: "Spin-off",
  },
];

const comics: CollectionItem[] = [
  {
    id: "comic-asm-001",
    title: "Amazing Fantasy #15",
    subtitle: "The first appearance of Spider-Man",
    description:
      "The origin issue that launched Peter Parker into Marvel history and set the tone for every Spider story after it.",
    meta: "1962 - Origin Story",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd4s-KaBWYjv-j4OA6l47eLlU3qrjQessErg&s",
    link: "https://en.wikipedia.org/wiki/Amazing_Fantasy#Issue_15_and_Spider-Man",
    linkLabel: "Read About Issue",
    badge: "Classic",
  },
  {
    id: "comic-asm-129",
    title: "Amazing Spider-Man #129",
    subtitle: "The Punisher and Jackal debut",
    description:
      "A fan-favorite issue with a sharper edge that helped widen the Spider-Man world into darker territory.",
    meta: "1974 - Key Issue",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTshF3o3frhHT8rYkDiLsXwMYmRILVQZzL4eg&s",
    link: "https://en.wikipedia.org/wiki/The_Amazing_Spider-Man",
    linkLabel: "Series Page",
    badge: "Key Run",
  },
  {
    id: "comic-spider-verse",
    title: "Spider-Verse",
    subtitle: "Multiverse chaos across every webline",
    description:
      "The crossover event that brought together countless Spider variants and inspired the modern Spider-Verse craze.",
    meta: "2014 - Event Story",
    imageUrl: "https://m.media-amazon.com/images/I/81fdOe6LbdL.jpg",
    link: "https://en.wikipedia.org/wiki/Spider-Verse",
    linkLabel: "Open Story Info",
    badge: "Event",
  },
  {
    id: "comic-ultimate",
    title: "Ultimate Spider-Man",
    subtitle: "A modern reimagining of Peter Parker",
    description:
      "One of the most accessible Spider-Man runs, praised for character writing and long-form storytelling.",
    meta: "2000 - Modern Run",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjGOlz4vCHshLeKNOqjsdmt2ShoRe8lckog&s",
    link: "https://en.wikipedia.org/wiki/Ultimate_Spider-Man",
    linkLabel: "Open Run",
    badge: "Modern",
  },
  {
    id: "comic-kraven",
    title: "Kraven's Last Hunt",
    subtitle: "One of the darkest Spider-Man stories ever told",
    description:
      "A psychological and visually memorable storyline that pushed Spider-Man into one of his most intense comic arcs.",
    meta: "1987 - Classic Arc",
    imageUrl:
      "https://m.media-amazon.com/images/I/61x8236W+FL._UF1000,1000_QL80_.jpg",
    link: "https://en.wikipedia.org/wiki/Kraven%27s_Last_Hunt",
    linkLabel: "Open Arc",
    badge: "Classic",
  },
  {
    id: "comic-blue",
    title: "Spider-Man: Blue",
    subtitle: "A reflective and emotional Peter Parker story",
    description:
      "A deeply personal retelling focused on memory, love, and the emotional history of Peter and Gwen.",
    meta: "2002 - Emotional Story",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAlynJB8jerIB2ER3YG_Z3B_i3FAuN_yv8A&s",
    link: "https://en.wikipedia.org/wiki/Spider-Man:_Blue",
    linkLabel: "Open Story",
    badge: "Drama",
  },
  {
    id: "comic-clone-saga",
    title: "Clone Saga",
    subtitle: "Scarlet Spider and identity chaos",
    description:
      "A sprawling era packed with doubles, confusion, reinvention, and major status changes in Spider continuity.",
    meta: "1990s - Saga",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Fpmij9L0pNPw3Svdsk_YIDht-jAxwWT4XQ&s",
    link: "https://en.wikipedia.org/wiki/Clone_Saga",
    linkLabel: "Open Saga",
    badge: "Saga",
  },
  {
    id: "comic-back-in-black",
    title: "Back in Black",
    subtitle: "Peter returns to a more ruthless edge",
    description:
      "A post-Civil War Spider-Man storyline that brought back the black suit aesthetic with heavier emotional stakes.",
    meta: "2007 - Modern Arc",
    imageUrl:
      "https://m.media-amazon.com/images/I/71L8hiWLgAL._UF1000,1000_QL80_.jpg",
    link: "https://en.wikipedia.org/wiki/Spider-Man:_Back_in_Black",
    linkLabel: "Open Arc",
    badge: "Modern",
  },
  {
    id: "comic-spider-gwen",
    title: "Spider-Gwen",
    subtitle: "Gwen Stacy leads her own webline",
    description:
      "A breakout alternate-universe title that gave Gwen a unique visual identity and strong standalone momentum.",
    meta: "2015 - Alternate Universe",
    imageUrl:
      "https://i.pinimg.com/736x/f5/af/3d/f5af3d0576adc0d84b5b4ff58f0514e4.jpg",
    link: "https://en.wikipedia.org/wiki/Spider-Gwen",
    linkLabel: "Open Series",
    badge: "Multiverse",
  },
  {
    id: "comic-miles",
    title: "Miles Morales: Spider-Man",
    subtitle: "A newer Spider voice takes center stage",
    description:
      "Miles brings a different rhythm, energy, and emotional perspective to the Spider mantle.",
    meta: "Modern - Miles Era",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_tRZKkxqBCtjS7RsYNokVRH5wcrtaKnIh5g&s",
    link: "https://en.wikipedia.org/wiki/Miles_Morales",
    linkLabel: "Open Character",
    badge: "Miles",
  },
  {
    id: "comic-superior",
    title: "Superior Spider-Man",
    subtitle: "When Otto Octavius became Spider-Man",
    description:
      "A bold status-quo shakeup where Spider-Man looked familiar on the outside but felt radically different within.",
    meta: "2013 - Status Quo Shift",
    imageUrl:
      "https://m.media-amazon.com/images/I/812-2Ac1GiL._UF1000,1000_QL80_.jpg",
    link: "https://en.wikipedia.org/wiki/The_Superior_Spider-Man",
    linkLabel: "Open Series",
    badge: "Bold",
  },
  {
    id: "comic-2099",
    title: "Spider-Man 2099",
    subtitle: "Miguel O'Hara defines the future",
    description:
      "A stylish futuristic reimagining of Spider-Man with a different city, tone, and edge.",
    meta: "1992 - Future Spider",
    imageUrl:
      "https://m.media-amazon.com/images/I/61s7lbKAp0L._UF1000,1000_QL80_.jpg",
    link: "https://en.wikipedia.org/wiki/Spider-Man_2099",
    linkLabel: "Open Series",
    badge: "2099",
  },
  {
    id: "comic-maximum-carnage",
    title: "Maximum Carnage",
    subtitle: "Pure 90s symbiote chaos",
    description:
      "A loud, violent crossover event that became one of the defining Carnage-era Spider stories.",
    meta: "1993 - Carnage Event",
    imageUrl:
      "https://m.media-amazon.com/images/I/91RXIvqK6NL._UF1000,1000_QL80_.jpg",
    link: "https://en.wikipedia.org/wiki/Maximum_Carnage",
    linkLabel: "Open Event",
    badge: "Carnage",
  },
  {
    id: "comic-silk",
    title: "Silk",
    subtitle: "A different spider origin enters the spotlight",
    description:
      "Silk expanded the Spider family with a fresh heroine, different dynamics, and a distinct visual tone.",
    meta: "Modern - Spider Family",
    imageUrl:
      "https://m.media-amazon.com/images/I/91Pzix3i0gL._UF1000,1000_QL80_.jpg",
    link: "https://en.wikipedia.org/wiki/Silk_(comics)",
    linkLabel: "Open Character",
    badge: "Silk",
  },
  {
    id: "comic-renew-vows",
    title: "Renew Your Vows",
    subtitle: "A family-centered Spider-Man future",
    description:
      "A fan-favorite alternate Spider timeline where Peter, MJ, and Annie become a full superhero family.",
    meta: "Alternate - Family Story",
    imageUrl:
      "https://m.media-amazon.com/images/I/A1tQAPfllkL._UF1000,1000_QL80_.jpg",
    link: "https://en.wikipedia.org/wiki/The_Amazing_Spider-Man:_Renew_Your_Vows",
    linkLabel: "Open Story",
    badge: "Family",
  },
];

const costumes: CollectionItem[] = [
  {
    id: "costume-classic",
    title: "Classic Red and Blue",
    subtitle: "The timeless Spider-Man silhouette",
    description:
      "Bright, athletic, and instantly recognizable. This is the suit language that defined Spider-Man for decades.",
    meta: "Signature Suit",
    imageUrl:
      "https://i.pinimg.com/1200x/ac/19/1d/ac191d1d0a55afd4abe7540633d9651e.jpg",
    badge: "Iconic",
  },
  {
    id: "costume-symbiote",
    title: "Black Symbiote Suit",
    subtitle: "Minimal, sleek, and dangerous",
    description:
      "A sharper, moodier suit direction that became one of the most requested Spider-Man looks across media.",
    meta: "Fan Favorite",
    imageUrl:
      "https://i.pinimg.com/1200x/85/7d/83/857d834524ebe1e07e44424c85aaaebe.jpg",
    badge: "Dark",
  },
  {
    id: "costume-iron-spider",
    title: "Iron Spider",
    subtitle: "High-tech armor energy",
    description:
      "A metallic upgrade with a more engineered presence, blending Spider agility with Stark design language.",
    meta: "Tech Suit",
    imageUrl:
      "https://i.pinimg.com/736x/46/31/ce/4631ce05375d32bdbbe3be3710d36839.jpg",
    badge: "Tech",
  },
  {
    id: "costume-2099",
    title: "Spider-Man 2099",
    subtitle: "Future-forward and razor sharp",
    description:
      "A bold navy-and-red costume that brings a completely different energy to Spider-Man design.",
    meta: "Future Variant",
    imageUrl:
      "https://i.pinimg.com/1200x/67/74/4f/67744f589816273753a93ca5ef367c6c.jpg",
    badge: "Future",
  },
  {
    id: "costume-scarlet",
    title: "Scarlet Spider",
    subtitle: "Hoodie-era street-level energy",
    description:
      "A more stripped-back suit direction that feels rougher, more rebellious, and instantly recognizable.",
    meta: "Street Variant",
    imageUrl:
      "https://i.pinimg.com/1200x/2c/cd/67/2ccd679376b08f5ef19ab3922100298a.jpg",
    badge: "Street",
  },
  {
    id: "costume-scarlet-ii",
    title: "Scarlet Spider II",
    subtitle: "A sharper clone-era remix",
    description:
      "A later Scarlet take with a more refined silhouette and stronger high-tech suit energy.",
    meta: "Clone Variant",
    imageUrl:
      "https://i.pinimg.com/736x/32/66/94/3266948f55f38c2b83a3ed8c0d1c4171.jpg",
    badge: "Clone",
  },
  {
    id: "costume-gwen",
    title: "Spider-Gwen",
    subtitle: "White, pink, and black visual identity",
    description:
      "One of the most distinct modern Spider looks, with a design language that feels stylish and unmistakable.",
    meta: "Modern Variant",
    imageUrl:
      "https://i.pinimg.com/736x/f4/7d/1b/f47d1b34c2988f10a33f77c33e966d4c.jpg",
    badge: "Gwen",
  },
  {
    id: "costume-woman",
    title: "Spider-Woman",
    subtitle: "A bold red and yellow spin on the Spider look",
    description:
      "A different but iconic branch of Spider styling with stronger contrast and a distinct silhouette.",
    meta: "Classic Variant",
    imageUrl:
      "https://i.pinimg.com/1200x/06/a9/ae/06a9aee6e0d232d85ce7ecbe250cef14.jpg",
    badge: "Classic",
  },
  {
    id: "costume-woman-iii",
    title: "Spider-Woman III",
    subtitle: "A rarer branch of the spider family style",
    description:
      "A more niche spider-family look that still adds variety to the visual costume archive.",
    meta: "Rare Variant",
    imageUrl:
      "https://i.pinimg.com/736x/57/7a/44/577a4411423b9a37dcb70936c73e23cc.jpg",
    badge: "Rare",
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
    subtitle: hero.fullName || "Identity classified in the multiverse",
    description:
      hero.description ||
      hero.occupation?.join(", ") ||
      "Spider-powered hero navigating the multiverse.",
    meta: `${hero.status || "Unknown"} - ${hero.species || "Unknown"}`,
    imageUrl:
      hero.imageUrl ||
      "https://placehold.co/900x1200/0B1020/F8FAFC?text=Spider",
    badge: hero.earth || hero.universe || "Spider-Verse",
  }));
};

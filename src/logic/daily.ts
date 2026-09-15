/**
 * The daily five: which questions, whether an answer is right, and the streak.
 *
 * **On the content.** Every question here is restricted to long-settled,
 * uncontroversial material — chemical symbols, capital cities, the order of the
 * planets, who wrote what — and every one ships with an explanation that can be
 * checked independently. That restriction is deliberate: a wrong fact shipped as
 * a fact is a defect a user cannot detect and the store will not catch, so the
 * bank avoids anything where the "right" answer moves with time, jurisdiction or
 * interpretation. It is still worth a human accuracy pass before release.
 *
 * Pure and dependency-free: the day is always passed in.
 */

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

/** Questions in a day. The tagline says five. */
export const DAILY_COUNT = 5;

/** Past days a free player can open, counting back from today inclusive. */
export const FREE_ARCHIVE_DAYS = 3;

export const QUESTIONS: Question[] = [
  { id: 'q001', prompt: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Gd', 'Go'], answerIndex: 0, explanation: 'Au, from the Latin aurum. Ag is silver, also from Latin (argentum).' },
  { id: 'q002', prompt: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Mars', 'Earth'], answerIndex: 1, explanation: 'Mercury orbits closest, at about 58 million kilometres on average.' },
  { id: 'q003', prompt: 'How many sides does a hexagon have?', options: ['Five', 'Six', 'Seven', 'Eight'], answerIndex: 1, explanation: 'Six. The prefix hexa- is Greek for six.' },
  { id: 'q004', prompt: 'What is the capital of Japan?', options: ['Osaka', 'Kyoto', 'Tokyo', 'Nagoya'], answerIndex: 2, explanation: 'Tokyo. Kyoto was the imperial capital until 1869.' },
  { id: 'q005', prompt: 'Who wrote the play Hamlet?', options: ['Christopher Marlowe', 'William Shakespeare', 'Ben Jonson', 'John Webster'], answerIndex: 1, explanation: 'Shakespeare, around 1600.' },
  { id: 'q006', prompt: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answerIndex: 3, explanation: 'The Pacific covers more area than all land on Earth combined.' },
  { id: 'q007', prompt: 'What gas do plants absorb from the air for photosynthesis?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], answerIndex: 1, explanation: 'Carbon dioxide, which they combine with water to build sugars, releasing oxygen.' },
  { id: 'q008', prompt: 'How many minutes are in a full day?', options: ['1200', '1440', '1600', '2400'], answerIndex: 1, explanation: '24 hours multiplied by 60 minutes gives 1440.' },
  { id: 'q009', prompt: 'What is the chemical symbol for iron?', options: ['Ir', 'In', 'Fe', 'Fr'], answerIndex: 2, explanation: 'Fe, from the Latin ferrum. Ir is iridium and Fr is francium.' },
  { id: 'q010', prompt: 'Which is the longest river in Africa?', options: ['Congo', 'Niger', 'Zambezi', 'Nile'], answerIndex: 3, explanation: 'The Nile, running roughly 6,650 kilometres to the Mediterranean.' },
  { id: 'q011', prompt: 'What is the square root of 144?', options: ['11', '12', '13', '14'], answerIndex: 1, explanation: 'Twelve, because 12 multiplied by 12 gives 144.' },
  { id: 'q012', prompt: 'Which language has the most native speakers worldwide?', options: ['English', 'Spanish', 'Mandarin Chinese', 'Hindi'], answerIndex: 2, explanation: 'Mandarin Chinese, by native speakers. English leads on total speakers including second-language.' },
  { id: 'q013', prompt: 'What is the freezing point of water at sea level in Celsius?', options: ['0', '32', '-10', '10'], answerIndex: 0, explanation: 'Zero degrees Celsius, which is 32 degrees Fahrenheit.' },
  { id: 'q014', prompt: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Donatello'], answerIndex: 2, explanation: 'Leonardo da Vinci, begun around 1503. It hangs in the Louvre.' },
  { id: 'q015', prompt: 'How many continents are there by the common seven-continent model?', options: ['Five', 'Six', 'Seven', 'Eight'], answerIndex: 2, explanation: 'Africa, Antarctica, Asia, Australia, Europe, North America and South America.' },
  { id: 'q016', prompt: 'What is the largest planet in the Solar System?', options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'], answerIndex: 1, explanation: 'Jupiter, with more than twice the mass of all other planets combined.' },
  { id: 'q017', prompt: 'What is the chemical symbol for sodium?', options: ['So', 'Sd', 'Na', 'Nd'], answerIndex: 2, explanation: 'Na, from the Latin natrium.' },
  { id: 'q018', prompt: 'How many strings does a standard violin have?', options: ['Four', 'Five', 'Six', 'Seven'], answerIndex: 0, explanation: 'Four, tuned G, D, A and E.' },
  { id: 'q019', prompt: 'Which country is home to the kangaroo?', options: ['New Zealand', 'South Africa', 'Australia', 'Argentina'], answerIndex: 2, explanation: 'Australia, where kangaroos are native and found nowhere else in the wild.' },
  { id: 'q020', prompt: 'What is 15 percent of 200?', options: ['15', '20', '30', '35'], answerIndex: 2, explanation: '10 percent is 20, and half of that is 10, so 15 percent is 30.' },
  { id: 'q021', prompt: 'Which metal is liquid at room temperature?', options: ['Mercury', 'Lead', 'Zinc', 'Tin'], answerIndex: 0, explanation: 'Mercury melts at about -39 degrees Celsius, so it is liquid in a warm room.' },
  { id: 'q022', prompt: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'], answerIndex: 3, explanation: 'Ottawa. Toronto is the largest city but not the capital.' },
  { id: 'q023', prompt: 'How many bones does an adult human body have?', options: ['186', '206', '226', '246'], answerIndex: 1, explanation: '206 in a typical adult. A newborn has more, and some fuse with age.' },
  { id: 'q024', prompt: 'Which gas makes up most of Earth’s atmosphere?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], answerIndex: 2, explanation: 'Nitrogen, at roughly 78 percent. Oxygen is about 21 percent.' },
  { id: 'q025', prompt: 'Who wrote Pride and Prejudice?', options: ['Charlotte Brontë', 'Jane Austen', 'George Eliot', 'Emily Brontë'], answerIndex: 1, explanation: 'Jane Austen, published in 1813.' },
  { id: 'q026', prompt: 'What is the smallest prime number?', options: ['0', '1', '2', '3'], answerIndex: 2, explanation: 'Two. It is also the only even prime, since every other even number divides by two.' },
  { id: 'q027', prompt: 'Which ocean lies between Africa and Australia?', options: ['Atlantic', 'Pacific', 'Indian', 'Southern'], answerIndex: 2, explanation: 'The Indian Ocean, bounded by Africa, Asia, Australia and the Southern Ocean.' },
  { id: 'q028', prompt: 'What is the chemical symbol for potassium?', options: ['P', 'Po', 'Pt', 'K'], answerIndex: 3, explanation: 'K, from the Latin kalium. P is phosphorus.' },
  { id: 'q029', prompt: 'How many degrees are in a circle?', options: ['180', '270', '360', '400'], answerIndex: 2, explanation: '360 degrees, a convention inherited from Babylonian arithmetic.' },
  { id: 'q030', prompt: 'Which instrument measures atmospheric pressure?', options: ['Barometer', 'Thermometer', 'Hygrometer', 'Anemometer'], answerIndex: 0, explanation: 'A barometer. A hygrometer measures humidity and an anemometer wind speed.' },
  { id: 'q031', prompt: 'What is the chemical symbol for lead?', options: ['Ld', 'Pb', 'Le', 'Pl'], answerIndex: 1, explanation: 'Pb, from the Latin plumbum, which also gives us plumber.' },
  { id: 'q032', prompt: 'Which sea creature has three hearts?', options: ['Dolphin', 'Shark', 'Octopus', 'Seal'], answerIndex: 2, explanation: 'An octopus has two gill hearts and one systemic heart.' },
  { id: 'q033', prompt: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Perth', 'Canberra'], answerIndex: 3, explanation: 'Canberra, chosen as a compromise between Sydney and Melbourne.' },
  { id: 'q034', prompt: 'How many players are on a football (soccer) team on the pitch?', options: ['Nine', 'Ten', 'Eleven', 'Twelve'], answerIndex: 2, explanation: 'Eleven per side, including the goalkeeper.' },
  { id: 'q035', prompt: 'What is the hardest naturally occurring substance?', options: ['Quartz', 'Diamond', 'Topaz', 'Corundum'], answerIndex: 1, explanation: 'Diamond, which sits at 10 on the Mohs hardness scale.' },
  { id: 'q036', prompt: 'Which country gifted the Statue of Liberty to the United States?', options: ['Britain', 'Spain', 'France', 'Italy'], answerIndex: 2, explanation: 'France, dedicated in 1886 and designed by Bartholdi.' },
  { id: 'q037', prompt: 'What is 7 multiplied by 8?', options: ['48', '54', '56', '64'], answerIndex: 2, explanation: 'Fifty-six. Seven eights are 56.' },
  { id: 'q038', prompt: 'Which organ pumps blood around the body?', options: ['Liver', 'Heart', 'Lungs', 'Kidneys'], answerIndex: 1, explanation: 'The heart, a muscular pump with four chambers.' },
  { id: 'q039', prompt: 'What is the largest mammal on Earth?', options: ['African elephant', 'Blue whale', 'Sperm whale', 'Giraffe'], answerIndex: 1, explanation: 'The blue whale, reaching about 30 metres and 150 tonnes.' },
  { id: 'q040', prompt: 'Which shape has no sides at all?', options: ['Triangle', 'Circle', 'Square', 'Pentagon'], answerIndex: 1, explanation: 'A circle is a single curve with no straight sides or corners.' },
  { id: 'q041', prompt: 'What is the capital of Egypt?', options: ['Alexandria', 'Luxor', 'Cairo', 'Giza'], answerIndex: 2, explanation: 'Cairo, on the Nile and the largest city in the Arab world.' },
  { id: 'q042', prompt: 'How many colours are in a rainbow as traditionally listed?', options: ['Five', 'Six', 'Seven', 'Eight'], answerIndex: 2, explanation: 'Seven: red, orange, yellow, green, blue, indigo and violet.' },
  { id: 'q043', prompt: 'What is the chemical symbol for water?', options: ['HO', 'H2O', 'OH2', 'WA'], answerIndex: 1, explanation: 'H2O: two hydrogen atoms bonded to one oxygen atom.' },
  { id: 'q044', prompt: 'Which bird is known for being unable to fly and living in Antarctica?', options: ['Penguin', 'Albatross', 'Puffin', 'Tern'], answerIndex: 0, explanation: 'Penguins are flightless and several species live in Antarctica.' },
  { id: 'q045', prompt: 'What is one third expressed as a percentage, to one decimal place?', options: ['30.0', '33.3', '35.0', '3.3'], answerIndex: 1, explanation: 'One divided by three is 0.333..., so 33.3 percent to one decimal.' },
  { id: 'q046', prompt: 'Who developed the theory of general relativity?', options: ['Isaac Newton', 'Niels Bohr', 'Albert Einstein', 'Max Planck'], answerIndex: 2, explanation: 'Albert Einstein, published in 1915.' },
  { id: 'q047', prompt: 'What is the capital of Brazil?', options: ['Rio de Janeiro', 'S\u00e3o Paulo', 'Salvador', 'Bras\u00edlia'], answerIndex: 3, explanation: 'Bras\u00edlia, purpose-built and made capital in 1960.' },
  { id: 'q048', prompt: 'How many legs does a spider have?', options: ['Six', 'Eight', 'Ten', 'Twelve'], answerIndex: 1, explanation: 'Eight. Insects have six, which is one way to tell them apart.' },
  { id: 'q049', prompt: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Mercury', 'Jupiter'], answerIndex: 1, explanation: 'Mars, whose surface iron oxide gives it a reddish colour.' },
  { id: 'q050', prompt: 'What is the boiling point of water at sea level in Celsius?', options: ['90', '100', '110', '120'], answerIndex: 1, explanation: '100 degrees Celsius at standard atmospheric pressure.' },
  { id: 'q051', prompt: 'Which country has the largest land area?', options: ['China', 'Canada', 'Russia', 'United States'], answerIndex: 2, explanation: 'Russia, at about 17 million square kilometres.' },
  { id: 'q052', prompt: 'What is the chemical symbol for helium?', options: ['H', 'He', 'Hl', 'Hm'], answerIndex: 1, explanation: 'He. H on its own is hydrogen.' },
  { id: 'q053', prompt: 'How many sides does a triangle have?', options: ['Two', 'Three', 'Four', 'Five'], answerIndex: 1, explanation: 'Three, and its interior angles always sum to 180 degrees.' },
  { id: 'q054', prompt: 'Who wrote the novel 1984?', options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'H. G. Wells'], answerIndex: 1, explanation: 'George Orwell, published in 1949.' },
  { id: 'q055', prompt: 'Which vitamin does the body make from sunlight?', options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'], answerIndex: 3, explanation: 'Vitamin D, synthesised in skin exposed to ultraviolet B light.' },
  { id: 'q056', prompt: 'What is the capital of Italy?', options: ['Milan', 'Rome', 'Naples', 'Turin'], answerIndex: 1, explanation: 'Rome, which also surrounds the independent Vatican City.' },
  { id: 'q057', prompt: 'How many zeros are in one million?', options: ['Five', 'Six', 'Seven', 'Nine'], answerIndex: 1, explanation: 'Six zeros, written 1,000,000 in the short scale.' },
  { id: 'q058', prompt: 'Which force keeps planets in orbit around the Sun?', options: ['Magnetism', 'Gravity', 'Friction', 'Tension'], answerIndex: 1, explanation: 'Gravity, the mutual attraction between masses.' },
  { id: 'q059', prompt: 'What is the longest bone in the human body?', options: ['Tibia', 'Humerus', 'Femur', 'Fibula'], answerIndex: 2, explanation: 'The femur, or thigh bone.' },
  { id: 'q060', prompt: 'Which continent is the Sahara Desert in?', options: ['Asia', 'Africa', 'Australia', 'South America'], answerIndex: 1, explanation: 'Africa. The Sahara spans much of the north of the continent.' },
  { id: 'q061', prompt: 'What is the chemical symbol for calcium?', options: ['C', 'Ca', 'Cl', 'Cm'], answerIndex: 1, explanation: 'Ca. C on its own is carbon and Cl is chlorine.' },
  { id: 'q062', prompt: 'How many weeks are in a standard year?', options: ['48', '50', '52', '54'], answerIndex: 2, explanation: '52 weeks, with one or two days left over.' },
  { id: 'q063', prompt: 'Which sense does the cochlea serve?', options: ['Sight', 'Hearing', 'Smell', 'Taste'], answerIndex: 1, explanation: 'Hearing. The cochlea is the spiral structure of the inner ear.' },
  { id: 'q064', prompt: 'What is the capital of Spain?', options: ['Barcelona', 'Seville', 'Madrid', 'Valencia'], answerIndex: 2, explanation: 'Madrid, near the geographic centre of the country.' },
  { id: 'q065', prompt: 'Which number is neither prime nor composite?', options: ['0', '1', '2', '9'], answerIndex: 1, explanation: 'One, because it has exactly one divisor rather than two.' },
  { id: 'q066', prompt: 'What do bees collect to make honey?', options: ['Pollen', 'Nectar', 'Sap', 'Dew'], answerIndex: 1, explanation: 'Nectar, which they concentrate into honey. Pollen is collected separately as protein.' },
  { id: 'q067', prompt: 'Which planet has the most prominent ring system?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], answerIndex: 1, explanation: 'Saturn, whose rings are mostly water ice and visible in a small telescope.' },
  { id: 'q068', prompt: 'What is the capital of Germany?', options: ['Munich', 'Hamburg', 'Frankfurt', 'Berlin'], answerIndex: 3, explanation: 'Berlin, restored as the capital after reunification.' },
  { id: 'q069', prompt: 'How many millimetres are in a metre?', options: ['10', '100', '1000', '10000'], answerIndex: 2, explanation: 'One thousand millimetres make a metre.' },
  { id: 'q070', prompt: 'Which blood cells carry oxygen?', options: ['White blood cells', 'Red blood cells', 'Platelets', 'Plasma'], answerIndex: 1, explanation: 'Red blood cells, using the protein haemoglobin.' },
  { id: 'q071', prompt: 'Who composed the Ninth Symphony that includes the Ode to Joy?', options: ['Mozart', 'Beethoven', 'Bach', 'Brahms'], answerIndex: 1, explanation: 'Ludwig van Beethoven, completed in 1824.' },
  { id: 'q072', prompt: 'What is the capital of Kenya?', options: ['Mombasa', 'Nairobi', 'Kisumu', 'Nakuru'], answerIndex: 1, explanation: 'Nairobi, which is also the largest city in the country.' },
  { id: 'q073', prompt: 'Which state of matter has a fixed volume but no fixed shape?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answerIndex: 1, explanation: 'A liquid keeps its volume but takes the shape of its container.' },
  { id: 'q074', prompt: 'How many sides does an octagon have?', options: ['Six', 'Seven', 'Eight', 'Nine'], answerIndex: 2, explanation: 'Eight. The prefix octa- is Greek for eight.' },
  { id: 'q075', prompt: 'What is the chemical symbol for silver?', options: ['Si', 'Sv', 'Ag', 'Au'], answerIndex: 2, explanation: 'Ag, from the Latin argentum. Au is gold and Si is silicon.' },
  { id: 'q076', prompt: 'Which animal is the fastest land animal over a short distance?', options: ['Lion', 'Cheetah', 'Pronghorn', 'Horse'], answerIndex: 1, explanation: 'The cheetah, which can reach roughly 100 kilometres per hour in short bursts.' },
  { id: 'q077', prompt: 'What is the capital of Argentina?', options: ['C\u00f3rdoba', 'Rosario', 'Buenos Aires', 'Mendoza'], answerIndex: 2, explanation: 'Buenos Aires, on the estuary of the R\u00edo de la Plata.' },
  { id: 'q078', prompt: 'How many hours are in a week?', options: ['148', '156', '168', '172'], answerIndex: 2, explanation: '24 hours multiplied by 7 days gives 168.' },
  { id: 'q079', prompt: 'Which gas do humans breathe out in greater quantity than they breathe in?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Helium'], answerIndex: 2, explanation: 'Carbon dioxide, a product of respiration in our cells.' },
  { id: 'q080', prompt: 'What is the largest island in the world?', options: ['Borneo', 'Madagascar', 'New Guinea', 'Greenland'], answerIndex: 3, explanation: 'Greenland. Australia is larger but is classified as a continent.' },
  { id: 'q081', prompt: 'Which Shakespeare play features the characters Romeo and Juliet?', options: ['Othello', 'Macbeth', 'Romeo and Juliet', 'King Lear'], answerIndex: 2, explanation: 'Romeo and Juliet, first printed in 1597.' },
  { id: 'q082', prompt: 'What is 100 divided by 4?', options: ['20', '25', '30', '40'], answerIndex: 1, explanation: 'Twenty-five, because 4 multiplied by 25 gives 100.' },
  { id: 'q083', prompt: 'Which organ filters waste from the blood to make urine?', options: ['Liver', 'Kidneys', 'Spleen', 'Pancreas'], answerIndex: 1, explanation: 'The kidneys, a pair of organs at the back of the abdomen.' },
  { id: 'q084', prompt: 'What is the capital of Portugal?', options: ['Porto', 'Lisbon', 'Faro', 'Coimbra'], answerIndex: 1, explanation: 'Lisbon, on the Tagus estuary.' },
  { id: 'q085', prompt: 'Which metal is the best conductor of electricity?', options: ['Copper', 'Gold', 'Silver', 'Aluminium'], answerIndex: 2, explanation: 'Silver conducts best, though copper is used more widely because it costs less.' },
  { id: 'q086', prompt: 'How many players are on a basketball team on the court?', options: ['Four', 'Five', 'Six', 'Seven'], answerIndex: 1, explanation: 'Five per side on court at any one time.' },
  { id: 'q087', prompt: 'What is the study of earthquakes called?', options: ['Seismology', 'Geology', 'Meteorology', 'Volcanology'], answerIndex: 0, explanation: 'Seismology, from the Greek seismos, meaning shaking.' },
  { id: 'q088', prompt: 'Which country is known as the Land of the Rising Sun?', options: ['China', 'Thailand', 'Japan', 'Korea'], answerIndex: 2, explanation: 'Japan. Its name in Japanese, Nihon, means sun origin.' },
  { id: 'q089', prompt: 'What is the chemical symbol for oxygen?', options: ['O', 'Ox', 'Og', 'On'], answerIndex: 0, explanation: 'O. Og is oganesson, a synthetic element.' },
  { id: 'q090', prompt: 'How many teeth does a typical adult human have?', options: ['28', '30', '32', '36'], answerIndex: 2, explanation: '32 including the wisdom teeth, which not everyone develops.' },
  { id: 'q091', prompt: 'Which planet is furthest from the Sun?', options: ['Saturn', 'Uranus', 'Neptune', 'Pluto'], answerIndex: 2, explanation: 'Neptune. Pluto was reclassified as a dwarf planet in 2006.' },
  { id: 'q092', prompt: 'What is the capital of Mexico?', options: ['Guadalajara', 'Monterrey', 'Mexico City', 'Puebla'], answerIndex: 2, explanation: 'Mexico City, built on the site of the Aztec capital Tenochtitlan.' },
  { id: 'q093', prompt: 'Which part of a plant conducts photosynthesis most?', options: ['Roots', 'Stem', 'Leaves', 'Flowers'], answerIndex: 2, explanation: 'The leaves, which hold most of the plant\u2019s chlorophyll.' },
  { id: 'q094', prompt: 'How many squares are on a standard chessboard?', options: ['36', '49', '64', '81'], answerIndex: 2, explanation: 'Sixty-four, an eight by eight grid.' },
  { id: 'q095', prompt: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], answerIndex: 2, explanation: 'The newton. A joule is energy and a watt is power.' },
  { id: 'q096', prompt: 'Which sea is the saltiest of these?', options: ['Mediterranean', 'Dead Sea', 'Baltic Sea', 'North Sea'], answerIndex: 1, explanation: 'The Dead Sea, salty enough that bathers float easily.' },
  { id: 'q097', prompt: 'What is the capital of India?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], answerIndex: 2, explanation: 'New Delhi. Mumbai is the largest city but not the capital.' },
  { id: 'q098', prompt: 'Which mathematical constant is roughly 3.14159?', options: ['e', 'pi', 'phi', 'i'], answerIndex: 1, explanation: 'Pi, the ratio of a circle\u2019s circumference to its diameter.' },
  { id: 'q099', prompt: 'How many lungs does a human have?', options: ['One', 'Two', 'Three', 'Four'], answerIndex: 1, explanation: 'Two, though the left is slightly smaller to make room for the heart.' },
  { id: 'q100', prompt: 'Which ancient civilisation built the pyramids at Giza?', options: ['Roman', 'Greek', 'Egyptian', 'Persian'], answerIndex: 2, explanation: 'The ancient Egyptians, around 2600 to 2500 BCE.' },
  { id: 'q101', prompt: 'What is the chemical symbol for nitrogen?', options: ['N', 'Ni', 'Na', 'Nb'], answerIndex: 0, explanation: 'N. Ni is nickel, Na is sodium and Nb is niobium.' },
  { id: 'q102', prompt: 'How many strings does a standard guitar have?', options: ['Four', 'Five', 'Six', 'Seven'], answerIndex: 2, explanation: 'Six on a standard guitar, tuned E A D G B E.' },
  { id: 'q103', prompt: 'Which layer of Earth are we standing on?', options: ['Crust', 'Mantle', 'Outer core', 'Inner core'], answerIndex: 0, explanation: 'The crust, the thin outermost layer.' },
  { id: 'q104', prompt: 'What is the capital of South Korea?', options: ['Busan', 'Incheon', 'Seoul', 'Daegu'], answerIndex: 2, explanation: 'Seoul, on the Han River in the north-west of the country.' },
  { id: 'q105', prompt: 'Which unit measures electrical resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Coulomb'], answerIndex: 2, explanation: 'The ohm. Volts measure potential difference and amperes current.' },
  { id: 'q106', prompt: 'What is a group of lions called?', options: ['Pack', 'Herd', 'Pride', 'Flock'], answerIndex: 2, explanation: 'A pride. Packs are wolves and herds are grazing animals.' },
  { id: 'q107', prompt: 'How many faces does a cube have?', options: ['Four', 'Six', 'Eight', 'Twelve'], answerIndex: 1, explanation: 'Six square faces, twelve edges and eight vertices.' },
  { id: 'q108', prompt: 'Which planet is closest in size to Earth?', options: ['Mars', 'Venus', 'Mercury', 'Neptune'], answerIndex: 1, explanation: 'Venus, at about 95 percent of Earth\u2019s diameter.' },
  { id: 'q109', prompt: 'What is the capital of Norway?', options: ['Bergen', 'Oslo', 'Trondheim', 'Stavanger'], answerIndex: 1, explanation: 'Oslo, at the head of the Oslofjord.' },
  { id: 'q110', prompt: 'Which nutrient group do bread and rice mainly provide?', options: ['Protein', 'Carbohydrate', 'Fat', 'Vitamin C'], answerIndex: 1, explanation: 'Carbohydrate, the body\u2019s most readily used energy source.' },
  { id: 'q111', prompt: 'How many degrees are in a right angle?', options: ['45', '60', '90', '180'], answerIndex: 2, explanation: 'Ninety degrees, a quarter of a full turn.' },
  { id: 'q112', prompt: 'Which scientist proposed the three laws of motion?', options: ['Galileo', 'Isaac Newton', 'Kepler', 'Copernicus'], answerIndex: 1, explanation: 'Isaac Newton, published in the Principia in 1687.' },
  { id: 'q113', prompt: 'What is the capital of Turkey?', options: ['Istanbul', 'Izmir', 'Ankara', 'Bursa'], answerIndex: 2, explanation: 'Ankara. Istanbul is larger but the capital moved in 1923.' },
  { id: 'q114', prompt: 'Which process turns liquid water into vapour?', options: ['Condensation', 'Evaporation', 'Sublimation', 'Precipitation'], answerIndex: 1, explanation: 'Evaporation. Condensation is the reverse.' },
  { id: 'q115', prompt: 'How many minutes are in three hours?', options: ['150', '180', '210', '240'], answerIndex: 1, explanation: 'Three multiplied by 60 minutes gives 180.' },
  { id: 'q116', prompt: 'Which bird is a traditional symbol of peace?', options: ['Eagle', 'Dove', 'Owl', 'Swan'], answerIndex: 1, explanation: 'The dove, an association that long predates modern usage.' },
  { id: 'q117', prompt: 'What is the chemical symbol for carbon?', options: ['Ca', 'Co', 'C', 'Cb'], answerIndex: 2, explanation: 'C. Ca is calcium and Co is cobalt.' },
  { id: 'q118', prompt: 'Which country has the most people?', options: ['United States', 'Indonesia', 'India', 'Brazil'], answerIndex: 2, explanation: 'India, which passed China as the most populous country in 2023.' },
  { id: 'q119', prompt: 'How many sides does a pentagon have?', options: ['Four', 'Five', 'Six', 'Seven'], answerIndex: 1, explanation: 'Five. The prefix penta- is Greek for five.' },
  { id: 'q120', prompt: 'Which organ produces insulin?', options: ['Liver', 'Pancreas', 'Thyroid', 'Stomach'], answerIndex: 1, explanation: 'The pancreas, in clusters of cells called the islets of Langerhans.' },
  { id: 'q121', prompt: 'What is the capital of Greece?', options: ['Thessaloniki', 'Patras', 'Athens', 'Heraklion'], answerIndex: 2, explanation: 'Athens, named for the goddess Athena.' },
  { id: 'q122', prompt: 'Which of these is a noble gas?', options: ['Neon', 'Nitrogen', 'Oxygen', 'Chlorine'], answerIndex: 0, explanation: 'Neon. Noble gases have a full outer electron shell and rarely react.' },
  { id: 'q123', prompt: 'How many seconds are in an hour?', options: ['1800', '2400', '3600', '4800'], answerIndex: 2, explanation: '60 seconds multiplied by 60 minutes gives 3600.' },
  { id: 'q124', prompt: 'Which ocean is the smallest?', options: ['Indian', 'Southern', 'Arctic', 'Atlantic'], answerIndex: 2, explanation: 'The Arctic Ocean, much of which is covered by sea ice.' },
  { id: 'q125', prompt: 'What is the capital of Poland?', options: ['Krak\u00f3w', 'Gda\u0144sk', 'Warsaw', 'Wroc\u0142aw'], answerIndex: 2, explanation: 'Warsaw, on the Vistula River.' },
  { id: 'q126', prompt: 'Which sense is most closely linked to the olfactory system?', options: ['Taste', 'Smell', 'Touch', 'Balance'], answerIndex: 1, explanation: 'Smell. Olfaction is the technical term for it.' },
  { id: 'q127', prompt: 'How many players start on each side in a game of chess?', options: ['Twelve', 'Fourteen', 'Sixteen', 'Eighteen'], answerIndex: 2, explanation: 'Sixteen pieces: eight pawns and eight others.' },
  { id: 'q128', prompt: 'Which material is glass mainly made from?', options: ['Sand', 'Clay', 'Limestone', 'Chalk'], answerIndex: 0, explanation: 'Silica sand, melted at high temperature with other ingredients.' },
  { id: 'q129', prompt: 'What is the capital of Peru?', options: ['Cusco', 'Arequipa', 'Lima', 'Trujillo'], answerIndex: 2, explanation: 'Lima, on the Pacific coast.' },
  { id: 'q130', prompt: 'Which number system uses only 0 and 1?', options: ['Decimal', 'Binary', 'Octal', 'Hexadecimal'], answerIndex: 1, explanation: 'Binary, base two, which is how computers represent data.' },
  { id: 'q131', prompt: 'How many chambers does the human heart have?', options: ['Two', 'Three', 'Four', 'Five'], answerIndex: 2, explanation: 'Four: two atria and two ventricles.' },
  { id: 'q132', prompt: 'Which mountain is the highest above sea level?', options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'], answerIndex: 2, explanation: 'Mount Everest, at about 8,849 metres.' },
  { id: 'q133', prompt: 'What is the chemical symbol for zinc?', options: ['Zc', 'Zn', 'Zi', 'Z'], answerIndex: 1, explanation: 'Zn, atomic number 30.' },
  { id: 'q134', prompt: 'Which festival is associated with lighting a menorah?', options: ['Diwali', 'Hanukkah', 'Eid', 'Lunar New Year'], answerIndex: 1, explanation: 'Hanukkah, over eight nights.' },
  { id: 'q135', prompt: 'How many millilitres are in a litre?', options: ['10', '100', '1000', '10000'], answerIndex: 2, explanation: 'One thousand millilitres make a litre.' },
  { id: 'q136', prompt: 'Which animal group do frogs belong to?', options: ['Reptiles', 'Amphibians', 'Fish', 'Mammals'], answerIndex: 1, explanation: 'Amphibians, which typically begin life in water with gills.' },
  { id: 'q137', prompt: 'What is the capital of Vietnam?', options: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hue'], answerIndex: 1, explanation: 'Hanoi, in the north of the country.' },
  { id: 'q138', prompt: 'Which planet has the shortest day?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answerIndex: 2, explanation: 'Jupiter rotates once in just under ten hours despite its size.' },
  { id: 'q139', prompt: 'What is 9 squared?', options: ['18', '72', '81', '99'], answerIndex: 2, explanation: 'Eighty-one, because 9 multiplied by 9 gives 81.' },
  { id: 'q140', prompt: 'Which vitamin is found in high amounts in citrus fruit?', options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'], answerIndex: 1, explanation: 'Vitamin C, also called ascorbic acid.' },
  { id: 'q141', prompt: 'What is the capital of Sweden?', options: ['Gothenburg', 'Malm\u00f6', 'Stockholm', 'Uppsala'], answerIndex: 2, explanation: 'Stockholm, built across fourteen islands.' },
  { id: 'q142', prompt: 'Which instrument has black and white keys and hammers striking strings?', options: ['Organ', 'Piano', 'Harpsichord', 'Accordion'], answerIndex: 1, explanation: 'The piano. A harpsichord plucks its strings rather than striking them.' },
  { id: 'q143', prompt: 'How many sides does a quadrilateral have?', options: ['Three', 'Four', 'Five', 'Six'], answerIndex: 1, explanation: 'Four, which is what the prefix quad- means.' },
  { id: 'q144', prompt: 'Which process do bees perform that helps plants reproduce?', options: ['Germination', 'Pollination', 'Photosynthesis', 'Respiration'], answerIndex: 1, explanation: 'Pollination, carrying pollen between flowers as they forage.' },
  { id: 'q145', prompt: 'What is the chemical symbol for copper?', options: ['Co', 'Cp', 'Cu', 'Cr'], answerIndex: 2, explanation: 'Cu, from the Latin cuprum. Co is cobalt and Cr is chromium.' },
  { id: 'q146', prompt: 'Which desert is the largest hot desert in the world?', options: ['Gobi', 'Kalahari', 'Sahara', 'Arabian'], answerIndex: 2, explanation: 'The Sahara. Antarctica is a larger desert but a cold one.' },
  { id: 'q147', prompt: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], answerIndex: 2, explanation: '366, with the extra day added to February.' },
  { id: 'q148', prompt: 'Which gas is most responsible for the greenhouse effect by volume in the atmosphere?', options: ['Water vapour', 'Neon', 'Argon', 'Hydrogen'], answerIndex: 0, explanation: 'Water vapour is the most abundant greenhouse gas by volume.' },
  { id: 'q149', prompt: 'What is the capital of Switzerland?', options: ['Zurich', 'Geneva', 'Bern', 'Basel'], answerIndex: 2, explanation: 'Bern. Zurich is larger but Bern is the seat of government.' },
  { id: 'q150', prompt: 'Which shape is a standard stop sign in most countries?', options: ['Hexagon', 'Octagon', 'Pentagon', 'Square'], answerIndex: 1, explanation: 'An octagon, chosen so it is recognisable even from behind.' },
  { id: 'q151', prompt: 'How many players are in a standard volleyball team on court?', options: ['Five', 'Six', 'Seven', 'Eight'], answerIndex: 1, explanation: 'Six per side on court in indoor volleyball.' },
  { id: 'q152', prompt: 'Which element has the atomic number 1?', options: ['Helium', 'Hydrogen', 'Lithium', 'Oxygen'], answerIndex: 1, explanation: 'Hydrogen, with a single proton, and the most abundant element in the universe.' },
  { id: 'q153', prompt: 'What is the capital of Ireland?', options: ['Cork', 'Galway', 'Dublin', 'Limerick'], answerIndex: 2, explanation: 'Dublin, on the River Liffey.' },
  { id: 'q154', prompt: 'Which unit is used to measure the energy in food?', options: ['Newton', 'Calorie', 'Watt', 'Ohm'], answerIndex: 1, explanation: 'The calorie, or more formally the kilocalorie on most labels.' },
  { id: 'q155', prompt: 'How many wings does a typical butterfly have?', options: ['Two', 'Four', 'Six', 'Eight'], answerIndex: 1, explanation: 'Four: two forewings and two hindwings.' }
];

/** Whole days since the epoch. */
export function dayNumber(ms: number): number {
  return Math.floor(ms / 86_400_000);
}

function hash(seed: number, salt: number): number {
  let h = (seed ^ (salt + 0x9e3779b9)) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
}

/**
 * The five questions for a day, the same for everyone.
 *
 * Drawn without replacement from a shuffled copy, so a day can never ask the
 * same question twice — which a naive "pick five at random" does surprisingly
 * often.
 */
export function questionsFor(day: number): Question[] {
  const pool = [...QUESTIONS];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = hash(day, i) % (i + 1);
    const a = pool[i]!;
    const b = pool[j]!;
    pool[i] = b;
    pool[j] = a;
  }
  return pool.slice(0, DAILY_COUNT);
}

export function isCorrect(question: Question, choice: number): boolean {
  return choice === question.answerIndex;
}

export function scoreDay(answers: readonly boolean[]): number {
  return answers.filter(Boolean).length;
}

/** Consecutive days played, counting back from today. */
export function streakFrom(playedDays: readonly number[], today: number): number {
  const days = new Set(playedDays);
  let streak = 0;
  for (let day = today; days.has(day); day -= 1) streak += 1;
  return streak;
}

export function canOpenArchive(day: number, today: number, isPremium: boolean): boolean {
  if (day > today) return false;
  return isPremium || day > today - FREE_ARCHIVE_DAYS;
}

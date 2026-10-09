// One-off ingestion script for teyvat_core_lore_research_pack.md.
// Writes/updates content/**/*.json. Safe to delete after running once.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const write = (rel, obj) => {
  const dest = path.join(root, 'content', rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, JSON.stringify(obj, null, 2) + '\n');
};
const L = (en, ru) => ({ en, ru });
const upgrade = (relPath, patch) => {
  const dest = path.join(root, 'content', relPath);
  const data = JSON.parse(fs.readFileSync(dest, 'utf8'));
  fs.writeFileSync(dest, JSON.stringify({ ...data, ...patch }, null, 2) + '\n');
};

const base = (id, kind, name, description, extra = {}) => ({
  id,
  kind,
  name,
  description,
  alternativeNames: [],
  sources: [],
  demo: false,
  citationNeeded: false,
  evidenceStatus: 'confirmed',
  relatedEntities: [],
  createdInVersion: 'v-research-pack-1',
  lastModifiedInVersion: 'v-research-pack-1',
  lastReviewedInVersion: 'v-research-pack-1',
  reviewStatus: 'needs-review',
  ...extra,
});

// ---------------------------------------------------------------------------
// Ingestion GameVersion — tracks this batch itself as a reviewable patch.
// ---------------------------------------------------------------------------
write('versions/v-research-pack-1.json', base(
  'v-research-pack-1', 'version',
  L('Core lore research pack — first ingestion', 'Пакет базового исследования лора — первая загрузка'),
  L('Administrative version marking the first structured ingestion of the core cosmology/ancient-history research pack (24 September 2026). Not a game patch.',
    'Служебная версия, отмечающая первую структурированную загрузку исследовательского пакета по космологии и древней истории (24 сентября 2026). Не является игровым патчем.'),
  { citationNeeded: false, evidenceStatus: 'approximate', reviewStatus: 'incomplete', version: 'research-pack-1', order: 5, status: 'released' }
));

// Coarse real-game version buckets. Exact minor patch numbers are intentionally
// not asserted where this pass could not verify them against primary text.
const versions = [
  ['v-mondstadt-liyue', '1.x', 'Mondstadt & Liyue (launch era)', 'Мондштадт и Ли Юэ (запуск игры)', 10],
  ['v-inazuma', '2.x', 'Inazuma', 'Инадзума', 20],
  ['v-sumeru', '3.x', 'Sumeru', 'Сумеру', 30],
  ['v-fontaine', '4.x', 'Fontaine', 'Фонтейн', 40],
  ['v-natlan', '5.x', 'Natlan', 'Натлан', 50],
];
for (const [id, version, en, ru, order] of versions) {
  write(`versions/${id}.json`, base(id, 'version',
    L(`${en} (${version})`, `${ru} (${version})`),
    L(`Coarse version bucket for the ${en} region-arc, used because this ingestion pass could not verify exact minor patch numbers against primary text for every cited source.`,
      `Укрупнённая версия для сюжетной арки региона «${ru}»; точные номера второстепенных патчей не утверждаются там, где это не было проверено по первоисточникам.`),
    { citationNeeded: true, evidenceStatus: 'approximate', reviewStatus: 'incomplete', version, order, status: 'released' }
  ));
}
write('versions/v-nod-krai.json', base('v-nod-krai', 'version',
  L('Nod-Krai / lunar era (version pending confirmation)', 'Нод-Край / лунная эпоха (номер версии уточняется)'),
  L('Placeholder version for the recent Nod-Krai / Three Moons lunar revelations. The exact patch number was not confirmed during this research pass; update once verified.',
    'Заглушка версии для недавних откровений о Трёх Лунах и Нод-Крае. Точный номер патча не подтверждён в этом исследовательском проходе; обновите после проверки.'),
  { citationNeeded: true, evidenceStatus: 'approximate', reviewStatus: 'incomplete', version: 'nod-krai-pending', order: 60, status: 'planned' }
));

console.log('versions written');

// ---------------------------------------------------------------------------
// PASS 1 — Sources. Primary in-game/official sources named by the research pack.
// No URLs are asserted; sourceUrl is intentionally omitted throughout.
// ---------------------------------------------------------------------------
const ref = (type, id) => ({ type, id });
const src = (id, name, ru, sourceType, gameVersion, notesEn, notesRu, mentions, extra = {}) =>
  write(`sources/${id}.json`, base(id, 'source', L(name, ru), L(notesEn, notesRu), {
    citationNeeded: false,
    sourceType,
    gameVersion,
    introducedInVersion: gameVersion,
    notes: L(notesEn, notesRu),
    processingStatus: 'partially-processed',
    mentions,
    ...extra,
  }));

src('src-before-sun-and-moon', 'Before Sun and Moon', 'До солнца и луны', 'Book', 'v-inazuma',
  'Enkanomiyan book preserving an in-universe account of the Primordial One, the Four Shades, the war against the Seven Sovereigns, and the remaking of the world for humanity. Presents the "Phanes" identification of the Primordial One with explicit textual uncertainty ("may have been Phanes").',
  'Энкануомийская книга, сохраняющая внутримировой рассказ об Изначальном, Четырёх Тенях, войне против Семи Владык и переустройстве мира для людей. Отождествление Изначального с Фанес представлено самим текстом как неопределённое.',
  [ref('character', 'primordial-one'), ref('term', 'four-shades'), ref('term', 'seven-sovereigns'), ref('term', 'heavenly-principles')]);

src('src-enkanomiya-world-quests', 'Enkanomiya World Quest series', 'Цикл заданий Энканомии', 'World Quest', 'v-inazuma',
  'World Quest series providing context for the forbidden books, Orobashi, Enkanomiya\u2019s isolation beneath the sea, and the Vishaps/Dragonheirs.',
  'Цикл мировых заданий, раскрывающий контекст запретных книг, Оробаси, изоляции Энканомии под морем и вишапов/драконьих родичей.',
  [ref('location', 'enkanomiya')]);

src('src-sumeru-aq-ch3-act4', 'Archon Quest Chapter III, Act IV', 'Архонтский квест, Глава III, Акт IV', 'Archon Quest', 'v-sumeru',
  'King Deshret and the Three Magi. Introduces King Deshret\u2019s ancient forbidden-knowledge crisis in the desert.',
  '«Царь Дешрет и три мага». Знакомит с древним кризисом запретного знания, вызванным царём Дешретом в пустыне.',
  [ref('character', 'king-deshret'), ref('term', 'forbidden-knowledge')]);

src('src-sumeru-aq-ch3-act5', 'Archon Quest Chapter III, Act V \u2014 Akasha Pulses, the Kalpa Flame Rises', 'Архонтский квест, Глава III, Акт V — «Пульс Акаши, восстание Пламени кальпы»', 'Archon Quest', 'v-sumeru',
  'Resolves King Deshret\u2019s crisis and Greater Lord Rukkhadevata\u2019s intervention.',
  'Развязка кризиса царя Дешрета и вмешательства Великого Владыки Рукхадеваты.',
  [ref('character', 'king-deshret'), ref('character', 'greater-lord-rukkhadevata')]);

src('src-where-boat-of-consciousness-lies', 'Where the Boat of Consciousness Lies', '«Там, где лежит ладья сознания»', 'Book', 'v-sumeru',
  'Explicit definition of Forbidden Knowledge; covers the Deshret/Rukkhadevata crisis and the second, Cataclysm-era pollution of Irminsul.',
  'Явное определение Запретного знания; освещает кризис Дешрета/Рукхадеваты и второе, вызванное Катаклизмом, заражение Ирминсуля.',
  [ref('term', 'forbidden-knowledge'), ref('term', 'irminsul')]);

src('src-nahida-story-quest-act2', 'Nahida Story Quest, Sapientia Oromasdis Chapter: Act II', 'Сюжетный квест Нахиды, глава Sapientia Oromasdis, акт II', 'Character Story Quest', 'v-sumeru',
  'Covers Apep and ancient-dragon/Nibelung-related history, plus aftermath of the forbidden-knowledge crisis.',
  'Освещает Апеп и историю, связанную с древними драконами и Нибелунгом, а также последствия кризиса запретного знания.',
  [ref('character', 'apep'), ref('character', 'nibelung')]);

src('src-lay-of-al-ahmar', 'The Lay of Al-Ahmar', '«Песнь Аль-Ахмара»', 'Book', 'v-sumeru',
  'Book/item referenced in the King Deshret material.',
  'Книга/предмет, упоминаемый в материалах о царе Дешрете.',
  [ref('character', 'king-deshret')]);

src('src-staff-of-scarlet-sands', 'Staff of the Scarlet Sands', 'Посох Алых песков', 'Weapon', 'v-sumeru',
  'Weapon flavor text tied to the King Deshret storyline.',
  'Текст описания оружия, связанный с сюжетом о царе Дешрете.',
  [ref('character', 'king-deshret')]);

src('src-flower-of-paradise-lost', 'Flower of Paradise Lost', 'Цветок утраченного рая', 'Artifact Description', 'v-sumeru',
  'Artifact set flavor text tied to the King Deshret / Eleazar material.',
  'Текст набора артефактов, связанный с царём Дешретом и материалом об Элеазаре.',
  [ref('character', 'king-deshret')]);

src('src-fontaine-aq-masquerade', 'Archon Quest Chapter IV, Act V \u2014 Masquerade of the Guilty', 'Архонтский квест, Глава IV, Акт V — «Маскарад виновных»', 'Archon Quest', 'v-fontaine',
  'Covers Khaenri\u2019ah-related revelations during the Fontaine Archon Quest.',
  'Освещает откровения, связанные с Каэнри’ах, в ходе архонтского квеста Фонтейна.',
  [ref('character', 'dainsleif')]);

src('src-fontaine-aq-finale', 'Archon Quest \u2014 Finale', 'Архонтский квест — Финал', 'Archon Quest', 'v-fontaine',
  'Reveals that the Gnoses were made from the remains of the Third Descender; features Skirk and Neuvillette.',
  'Раскрывает, что Гнозисы были созданы из останков Третьего Сошедшего; участвуют Скирк и Невилет.',
  [ref('term', 'gnosis'), ref('character', 'neuvillette')]);

src('src-neuvillette-character-story-vision', 'Neuvillette Character Story: Vision', 'Рассказ о персонаже Невилет: «Виженс»', 'Character Story', 'v-fontaine',
  'Dragon Authority / world-order information; the creation of the Gnoses involving the Heavenly Principles and "one who came after."',
  'Сведения о драконьей Прерогативе и миропорядке; создание Гнозисов с участием Небесных Принципов и «того, кто пришёл после».',
  [ref('character', 'neuvillette'), ref('term', 'gnosis')]);

src('src-fontaine-aq-focalors-climax', 'Fontaine Archon Quest \u2014 Focalors climax', 'Архонтский квест Фонтейна — кульминация с Фокалорс', 'Archon Quest', 'v-fontaine',
  'Destruction of the Hydro Archon\u2019s Divine Throne and restoration of Hydro Authority to Neuvillette.',
  'Разрушение Божественного Престола Архонта Гидро и возвращение Прерогативы Гидро Невилету.',
  [ref('character', 'focalors'), ref('character', 'neuvillette'), ref('term', 'divine-throne')]);

src('src-narzissenkreuz-world-quest', 'Narzissenkreuz World Quest material', 'Материалы мирового задания Narzissenkreuz', 'World Quest', 'v-fontaine',
  'Descender research describing "will that can rival an entire world."',
  'Исследования о Сошедших, описывающие «волю, способную соперничать с целым миром».',
  [ref('term', 'descender')]);

src('src-caribert', 'Caribert', '«Карибер»', 'Book', 'v-mondstadt-liyue',
  'Book naming the Five Sinners of Khaenri\u2019ah, including Rhinedottir ("Gold").',
  'Книга, называющая Пятерых Грешников Каэнри’ах, включая Ринхедоттир («Голд»).',
  [ref('character', 'rhinedottir')]);

src('src-bedtime-story', 'Bedtime Story', '«Сказка на ночь»', 'Book', 'v-mondstadt-liyue',
  'Early Khaenri\u2019ah-adjacent narrative fragment.',
  'Ранний повествовательный фрагмент, связанный с Каэнри’ах.',
  [ref('region', 'khaenriah')]);

src('src-dainsleif-archon-quests', 'Dainsleif Archon Quest appearances (ongoing series)', 'Появления Дайнслейфа в архонтских квестах (продолжающийся цикл)', 'Archon Quest', 'v-mondstadt-liyue',
  'Dainsleif\u2019s recurring appearances across multiple versions\u2019 Archon Quests, covering the Five Sinners, the Traveler\u2019s sibling, Khaenri\u2019ah, curses, and the Abyss Order. Listed under its earliest known appearance version; later appearances are not individually dated here.',
  'Повторяющиеся появления Дайнслейфа в архонтских квестах разных версий, раскрывающие тему Пятерых Грешников, сиблинга Путника, Каэнри’ах, проклятий и Ордена Бездны. Указана версия первого известного появления; последующие отдельно не датированы.',
  [ref('character', 'dainsleif'), ref('region', 'khaenriah')]);

src('src-perinheri', 'Perinheri', '«Перинхери»', 'Book', 'v-fontaine',
  'Khaenri\u2019ahn ideas about outlanders and transcending the gods.',
  'Каэнри’ахские представления о чужеземцах и превосхождении богов.',
  [ref('region', 'khaenriah')]);

src('src-breeze-amidst-the-forest', 'Breeze Amidst the Forest', '«Ветерок среди леса»', 'Book', 'v-mondstadt-liyue',
  'Mondstadt-adjacent narrative material.',
  'Повествовательный материал, связанный с Мондштадтом.',
  [ref('region', 'mondstadt')]);

src('src-durin-dragonspine-material', 'Durin / Dragonspine weapon, artifact and quest material', 'Материалы оружия, артефактов и заданий о Дурине и Драконьем Хребте', 'Weapon', 'v-mondstadt-liyue',
  'Combined flavor-text material describing Durin\u2019s attack on Mondstadt and Dragonspine\u2019s corrupted aftermath. Some very early flavor text uses an obsolete "100 years ago" phrasing that is superseded by the established ~500-year Cataclysm chronology; do not use it as a competing date.',
  'Сводный материал описаний оружия/артефактов о нападении Дурина на Мондштадт и заражённом состоянии Драконьего Хребта после него. В части ранних текстов встречается устаревшая формулировка «100 лет назад», не соответствующая принятой хронологии Катаклизма (~500 лет); не использовать как конкурирующую дату.',
  [ref('character', 'durin'), ref('location', 'dragonspine')]);

src('src-dvalin-venti-story-material', 'Dvalin / Venti character story material', 'Материалы рассказов о персонажах Двалин и Венти', 'Character Story', 'v-mondstadt-liyue',
  'Character story material describing Dvalin, Barbatos, and the defense of Mondstadt.',
  'Материалы рассказов о персонажах, описывающие Двалина, Барбатоса и защиту Мондштадта.',
  [ref('character', 'dvalin'), ref('character', 'venti')]);

src('src-raiden-shogun-story-quest-act2', 'Raiden Shogun Story Quest, Imperatrix Umbrosa Chapter: Act II', 'Сюжетный квест Райден Сёгун, глава Imperatrix Umbrosa, акт II', 'Character Story Quest', 'v-inazuma',
  'Covers Makoto, the Sacred Sakura, and Istaroth.',
  'Освещает Макото, Сакральную сакуру и Истарот.',
  [ref('character', 'makoto'), ref('character', 'ei'), ref('character', 'istaroth')]);

src('src-hakushin-kitsune-saiguu-texts', 'Hakushin / Kitsune Saiguu-related texts', 'Тексты, связанные с Хакусин / Лисьей Сайгу', 'Item Description', 'v-inazuma',
  'Item/quest text material describing the loss of the Kitsune Saiguu during the Cataclysm.',
  'Текстовые материалы предметов/заданий, описывающие утрату Лисьей Сайгу во время Катаклизма.',
  [ref('region', 'inazuma')]);

src('src-chiyo-texts', 'Chiyo-related weapon/artifact texts', 'Тексты оружия/артефактов, связанные с Тиё', 'Weapon', 'v-inazuma',
  'Weapon/artifact flavor text describing Chiyo\u2019s corruption during the Cataclysm.',
  'Текст описаний оружия/артефактов, описывающий заражение Тиё во время Катаклизма.',
  [ref('region', 'inazuma')]);

src('src-khvarena-of-good-and-evil', 'Khvarena of Good and Evil', '«Хварена добра и зла»', 'Book', 'v-fontaine',
  'Covers Egeria, the Amrita, the Harvisptokhm, the Simurgh, Tunigi Hollow, and Abyssal defilement at the Fontaine/Sumeru border.',
  'Освещает Эгерию, Амриту, Харвисптокхм, Симург, Тюниги Холлоу и заражение Бездной на границе Фонтейна и Сумеру.',
  [ref('character', 'egeria'), ref('character', 'greater-lord-rukkhadevata')]);

src('src-vourukashas-glow', "Vourukasha's Glow artifact set", 'Набор артефактов «Сияние Вурукаши»', 'Artifact Description', 'v-sumeru',
  'Artifact set flavor text tied to the Fontaine/Sumeru border Cataclysm material.',
  'Текст набора артефактов, связанный с материалом Катаклизма на границе Фонтейна и Сумеру.',
  [ref('character', 'egeria')]);

src('src-natlan-archon-quests', 'Natlan Archon Quests', 'Архонтские квесты Натлана', 'Archon Quest', 'v-natlan',
  'Primary Natlan lore, including the Night Kingdom and the Abyss invasion during the Cataclysm.',
  'Основной лор Натлана, включая Ночное царство и вторжение Бездны во время Катаклизма.',
  [ref('location', 'night-kingdom')]);

src('src-night-kingdom-dialogue', 'Night Kingdom / Lord of the Night / Ronova primary dialogue', 'Основные диалоги о Ночном царстве, Владыке Ночи и Рононе', 'Character Story', 'v-natlan',
  'Primary dialogue establishing Ronova\u2019s guidance in reconstructing Natlan\u2019s Ley Line network as the Night Kingdom.',
  'Основные диалоги, описывающие роль Роны в восстановлении сети артерий земли Натлана в виде Ночного царства.',
  [ref('character', 'ronova'), ref('location', 'night-kingdom')]);

src('src-natlan-dragon-history', 'Natlan dragon-history sources', 'Источники по истории драконов Натлана', 'World Quest', 'v-natlan',
  'Sources covering the ancient Ley Line destruction during the War of Funerary Flame and the reconstruction of the Night Kingdom.',
  'Источники, освещающие древнее разрушение артерий земли во время Войны погребального пламени и восстановление Ночного царства.',
  [ref('event', 'natlan-ley-line-destruction')]);

src('src-hymns-of-far-north', 'Hymns of the Far North, Vol. 1\u20132', 'Гимны Крайнего Севера, тома 1–2', 'Book', 'v-nod-krai',
  'Northern myth-history naming Saarelainen and supplying the Third Descender identification chain.',
  'Северная мифоистория, называющая Саарелайнена и содержащая цепочку отождествления с Третьим Сошедшим.',
  [ref('character', 'saarelainen')]);

src('src-song-of-welkin-moon', 'Song of the Welkin Moon / Nod-Krai Archon Quest material', 'Материалы «Песни небесной луны» / архонтского квеста Нод-Края', 'Archon Quest', 'v-nod-krai',
  'Covers the Three Moons, lunar Authorities, and reinterpretation of the ancient war.',
  'Освещает Трёх Лун, лунные Прерогативы и переосмысление древней войны.',
  [ref('term', 'three-moons')]);

console.log('sources written');

// ---------------------------------------------------------------------------
// PASS 2 — Core terminology.
// ---------------------------------------------------------------------------
const term = (id, name, ru, category, defEn, defRu, descEn, descRu, sources, relatedEntities = [], extra = {}) =>
  write(`terms/${id}.json`, base(id, 'term', L(name, ru), L(descEn, descRu), {
    category,
    definition: L(defEn, defRu),
    alternativeTranslations: [],
    sources,
    relatedEntities,
    ...extra,
  }));

term('teyvat', 'Teyvat', 'Тейват', 'world',
  'The world in which the main story takes place.', 'Мир, в котором происходит основной сюжет.',
  'Teyvat\u2019s present order is not its original order: the setting preserves traces of the ancient dragon world, the order imposed by the Heavenly Principles, later divine and human civilizations, the Seven-Archon system, and incursions of powers from outside the world. Avoid treating "Teyvat" as synonymous with only the current seven nations \u2014 earlier civilizations, territories outside the Seven\u2019s jurisdiction, subterranean realms, the Dark Sea, and the Abyss are all part of its history.',
  'Нынешний порядок Тейвата не является изначальным: мир хранит следы древнего мира драконов, порядка, установленного Небесными Принципами, позднейших божественных и человеческих цивилизаций, системы Семи Архонтов и вторжений сил извне мира. Не стоит отождествлять «Тейват» только с нынешними семью нациями — древние цивилизации, земли вне юрисдикции Семи, подземные царства, Тёмное море и Бездна — тоже часть его истории.',
  ['src-before-sun-and-moon'],
  [ref('term', 'seven-sovereigns'), ref('term', 'heavenly-principles'), ref('term', 'abyss'), ref('term', 'irminsul')]);

term('light-realm', 'Light Realm', 'Царство Света', 'cosmology',
  'A realm/world-system associated with elemental beings and dragonkind.', 'Царство/миросистема, связанная с элементальными существами и родом драконов.',
  'Part of a high-level model distinguishing powers native to different world systems. Confirmed at a broad level; specific details should remain source-specific and should not be over-generalized beyond what a given source states.',
  'Часть общей модели, различающей силы, присущие разным миросистемам. Подтверждено на общем уровне; детали должны оставаться привязанными к конкретным источникам и не обобщаться сверх сказанного в них.',
  ['src-enkanomiya-world-quests']);

term('human-realm', 'Human Realm', 'Царство Людей', 'cosmology',
  'The world order in which humanity and the gods of the current system exist.', 'Миропорядок, в котором существуют человечество и боги нынешней системы.',
  'Part of the Light/Human/Void high-level cosmological model. See "Light Realm" for handling notes.',
  'Часть общей космологической модели «Царство Света / Царство Людей / Царство Пустоты». См. примечания в статье «Царство Света».',
  ['src-enkanomiya-world-quests']);

term('void-realm', 'Void Realm', 'Царство Пустоты', 'cosmology',
  'A realm/world-system associated with the Abyss and powers fundamentally incompatible with Teyvat\u2019s ordinary world order.', 'Царство/миросистема, связанная с Бездной и силами, в корне несовместимыми с обычным миропорядком Тейвата.',
  'Part of the Light/Human/Void high-level cosmological model. Do not flatten every unusual power into this category unless the relevant primary source does so itself.',
  'Часть общей космологической модели. Не следует относить любую необычную силу к этой категории, если это прямо не делает сам первоисточник.',
  ['src-enkanomiya-world-quests'],
  [ref('term', 'abyss')]);

term('abyss', 'Abyss', 'Бездна', 'cosmology',
  'An otherworldly/void-associated power fundamentally hostile or incompatible with Teyvat\u2019s ordinary order.', 'Потусторонняя, связанная с Пустотой сила, в корне враждебная или несовместимая с обычным порядком Тейвата.',
  'Predates the modern Abyss Order by an enormous span of time \u2014 Nibelung\u2019s ancient war already involved Abyss-associated power thousands of years before Khaenri\u2019ah\u2019s fall. Do not conflate the Abyss (a power/domain) with the Abyss Order (an organization), Abyssal monsters, Forbidden Knowledge, or Khaenri\u2019ah itself: these overlap historically but are not synonyms.',
  'Опережает современный Орден Бездны на огромный промежуток времени — древняя война Нибелунга уже была связана с силой Бездны за тысячи лет до падения Каэнри’ах. Не следует отождествлять Бездну (силу/область) с Орденом Бездны (организацией), бездненскими монстрами, Запретным знанием или самим Каэнри’ах: они исторически пересекаются, но не являются синонимами.',
  ['src-where-boat-of-consciousness-lies'],
  [ref('term', 'forbidden-knowledge')]);

term('forbidden-knowledge', 'Forbidden Knowledge', 'Запретное знание', 'cosmology',
  'Knowledge/power fundamentally incompatible with Teyvat\u2019s ordinary world order.', 'Знание/сила, в корне несовместимые с обычным миропорядком Тейвата.',
  'Per Greater Lord Rukkhadevata, knowledge that does not belong to this world, originating from the depths of the Abyss and rejected by the world itself. Effects include corruption of minds and bodies, environmental devastation, corruption of Irminsul, and large-scale systemic instability. Major known outbreaks: Nibelung\u2019s return during the War of Funerary Flame, King Deshret\u2019s desert catastrophe, and the second pollution of Irminsul during the Cataclysm \u2014 these are three separate HistoricalEvents connected by this one Term.',
  'По словам Великого Владыки Рукхадеваты, знание, не принадлежащее этому миру, происходящее из глубин Бездны и отвергнутое самим миром. Последствия включают порчу разума и тела, разрушение окружающей среды, заражение Ирминсуля и масштабную системную нестабильность. Известные вспышки: возвращение Нибелунга во время Войны погребального пламени, катастрофа царя Дешрета в пустыне и повторное заражение Ирминсуля во время Катаклизма — это три отдельных исторических события, связанных одним термином.',
  ['src-where-boat-of-consciousness-lies', 'src-sumeru-aq-ch3-act5'],
  [ref('term', 'abyss'), ref('term', 'irminsul')]);

term('irminsul', 'Irminsul', 'Ирминсуль', 'cosmology',
  'Teyvat\u2019s information, memory, and world-record structure.', 'Структура информации, памяти и мировых записей Тейвата.',
  'Information stored in Irminsul affects the memories and records of beings belonging to Teyvat; removing a person/information from Irminsul can rewrite how history is remembered and documented, but the physical events themselves are not simply undone \u2014 the world\u2019s accessible record and causal explanations reorganize around the missing information. Descender-related exceptions are crucial: the Traveler is not recorded in the ordinary way and retains knowledge that in-world memory otherwise loses. The Greater Lord Rukkhadevata crisis (see the "rukkhadevata-irminsul-erasure" event) demonstrates that corruption within Irminsul can affect Teyvat on a vast scale. Do not write "Ley Lines = Irminsul roots" as a simple identity; model them as strongly related but distinct systems.',
  'Информация, хранящаяся в Ирминсуле, влияет на память и записи существ, принадлежащих Тейвату; удаление персоны/сведений из Ирминсуля может переписать то, как история помнится и документируется, но сами физические события при этом не отменяются — реорганизуются доступная миру запись и причинные объяснения вокруг утраченной информации. Исключения, связанные с Сошедшими, принципиальны: Путник не записывается обычным образом и сохраняет знания, которые внутримировая память иначе теряет. Кризис Великого Владыки Рукхадеваты (см. событие «rukkhadevata-irminsul-erasure») показывает, что заражение внутри Ирминсуля может влиять на Тейват в огромном масштабе. Не следует писать «артерии земли = корни Ирминсуля» как простое тождество; их стоит моделировать как тесно связанные, но разные системы.',
  ['src-where-boat-of-consciousness-lies'],
  [ref('term', 'ley-lines')]);

term('ley-lines', 'Ley Lines', 'Артерии земли', 'cosmology',
  'A world-spanning network closely associated with elemental energy, memories, and the world\u2019s informational/ecological systems.', 'Общемировая сеть, тесно связанная с элементальной энергией, памятью и информационно-экологическими системами мира.',
  'Ley Lines can retain memories and historical impressions; damage to them can have enormous regional consequences. Natlan is especially important because its ancient Ley Lines were catastrophically damaged during the War of Funerary Flame, requiring the reconstructed Night Kingdom as a substitute system.',
  'Артерии земли способны сохранять память и исторические впечатления; их повреждение может иметь огромные региональные последствия. Натлан особенно важен, поскольку его древние артерии земли были катастрофически разрушены во время Войны погребального пламени, что потребовало создания замещающей системы — Ночного царства.',
  ['src-natlan-dragon-history'],
  [ref('event', 'natlan-ley-line-destruction'), ref('location', 'night-kingdom')]);

term('primordial-sea', 'Primordial Sea', 'Изначальное море', 'cosmology',
  'A sea/ocean framework central to early life in Fontaine-related cosmology.', 'Морская/океаническая концепция, центральная для ранней жизни в космологии, связанной с Фонтейном.',
  'Referenced only briefly by this research pass as part of the Old Dragon World era; not independently detailed here.',
  'В этом исследовательском проходе упоминается лишь кратко как часть эпохи Древнего мира драконов; подробно не раскрывается.',
  [], [], { evidenceStatus: 'approximate', citationNeeded: true, reviewStatus: 'incomplete' });

term('celestial-nail', 'Celestial Nail', 'Небесный гвоздь', 'object-class',
  'Heavenly objects associated with major ancient catastrophes and with the suppression/purification/stabilization of corrupted regions.', 'Небесные предметы, связанные с крупными древними катастрофами и с подавлением/очищением/стабилизацией заражённых регионов.',
  'Known sites include Dragonspine/Sal Vindagnyr, The Chasm, and Sumeru desert-related devastation. A Nail\u2019s presence should not automatically be read as "Celestia destroyed a civilization because it learned too much" \u2014 that is an older community simplification. Current lore gives a stronger role to world stabilization and Abyssal contamination; each case still requires its own evidence. Create each Nail-related incident as a separate HistoricalEvent.',
  'Известные места включают Драконий Хребет/Саль Виндагнюр, Разлом и разрушения, связанные с пустыней Сумеру. Наличие гвоздя не стоит автоматически трактовать как «Селестия уничтожила цивилизацию за то, что та узнала слишком много» — это устаревшее упрощение сообщества. Актуальный лор отводит большую роль стабилизации мира и заражению Бездной; каждый случай требует отдельных доказательств. Каждый инцидент, связанный с гвоздём, оформляется как отдельное историческое событие.',
  ['src-durin-dragonspine-material'],
  [ref('location', 'dragonspine'), ref('location', 'the-chasm')]);

term('descender', 'Descender', 'Сошедший', 'cosmology',
  'Not simply "anyone from outside Teyvat" \u2014 a being of extraordinary will capable of rivaling an entire world.', 'Не просто «любой, кто прибыл извне Тейвата» — существо с исключительной волей, способное соперничать с целым миром.',
  'This distinction explains why an outlander may exist without qualifying as a numbered Descender. The Traveler is identified as the Fourth Descender. Criteria and numbering remain partly unresolved: Nibelung\u2019s relationship to Descender status complicates a simple arrival-order model, and the identity/role of "one who came after" in the creation of the Gnoses is unresolved.',
  'Это различие объясняет, почему чужеземец может существовать, не будучи пронумерованным Сошедшим. Путник определён как Четвёртый Сошедший. Критерии и нумерация остаются частично нерешёнными: отношение Нибелунга к статусу Сошедшего усложняет простую модель по порядку прибытия, а личность и роль «того, кто пришёл после» в создании Гнозисов не выяснены.',
  ['src-narzissenkreuz-world-quest', 'src-fontaine-aq-finale'],
  [ref('character', 'traveler'), ref('character', 'nibelung'), ref('character', 'saarelainen')]);

term('elemental-authority', 'Elemental Authority', 'Элементальная Прерогатива', 'cosmology',
  'Power originating in the ancient dragon order, later seized by the Heavenly Principles and incorporated into the later world system.', 'Сила, восходящая к древнему порядку драконов, позднее захваченная Небесными Принципами и включённая в позднейшую мировую систему.',
  'Fontaine gives the clearest demonstration: the Hydro Sovereign\u2019s Authority had been incorporated into the Hydro Archon\u2019s divine system; Focalors destroyed the Hydro Archon\u2019s Divine Throne; full Hydro Authority returned to Neuvillette. This is distinct from possession of the Hydro Gnosis. Keep Sovereign, Elemental Authority, Archon, Divine Throne and Gnosis as separate concepts.',
  'Фонтейн даёт наиболее наглядный пример: Прерогатива Владыки Гидро была включена в божественную систему Архонта Гидро; Фокалорс разрушила Божественный Престол Архонта Гидро; полная Прерогатива Гидро вернулась Невилету. Это отличается от обладания Гнозисом Гидро. Владыку, Элементальную Прерогативу, Архонта, Божественный Престол и Гнозис следует различать как отдельные понятия.',
  ['src-fontaine-aq-focalors-climax'],
  [ref('character', 'neuvillette'), ref('character', 'focalors'), ref('term', 'divine-throne'), ref('term', 'gnosis')]);

term('divine-throne', 'Divine Throne', 'Божественный Престол', 'object-class',
  'The seat of an Archon\u2019s divine system, distinct from a Gnosis and from an elemental Sovereign\u2019s Authority.', 'Престол, вместилище божественной системы Архонта, отличное от Гнозиса и Прерогативы элементального Владыки.',
  'The Fontaine Archon Quest climax is the clearest proof that Gnosis \u2260 Divine Throne \u2260 Sovereign Authority: Focalors destroyed the Hydro Archon\u2019s Divine Throne, and the stolen Hydro Authority (not the Gnosis) returned to Neuvillette.',
  'Кульминация архонтского квеста Фонтейна — наиболее наглядное доказательство того, что Гнозис ≠ Божественный Престол ≠ Прерогатива Владыки: Фокалорс разрушила Божественный Престол Архонта Гидро, и похищенная Прерогатива Гидро (а не Гнозис) вернулась Невилету.',
  ['src-fontaine-aq-focalors-climax'],
  [ref('term', 'gnosis'), ref('term', 'elemental-authority')]);

term('gnosis', 'Gnosis', 'Гнозис', 'object-class',
  'Seven objects associated with the Seven, made from the remains of the Third Descender.', 'Семь предметов, связанных с Семью, созданных из останков Третьего Сошедшего.',
  'Fontaine-era lore establishes that the Gnoses were made from the remains of the Third Descender; later lore ties this to Saarelainen. A Gnosis has strong elemental compatibility and can enhance elemental abilities, but is not identical to a Sovereign\u2019s Authority or an Archon\u2019s Divine Throne \u2014 keep these concepts separate.',
  'Лор эпохи Фонтейна устанавливает, что Гнозисы были созданы из останков Третьего Сошедшего; позднейший лор связывает это с Саарелайненом. Гнозис обладает сильной элементальной совместимостью и способен усиливать элементальные способности, но не тождественен ни Прерогативе Владыки, ни Божественному Престолу Архонта — эти понятия следует различать.',
  ['src-fontaine-aq-finale', 'src-neuvillette-character-story-vision'],
  [ref('character', 'saarelainen'), ref('term', 'divine-throne'), ref('term', 'elemental-authority')]);

term('archons', 'Archon', 'Архонт', 'title',
  'A member of the Seven, the divine-political order that emerged from the Archon War.', 'Представитель Семи — божественно-политического порядка, возникшего по итогам Войны Архонтов.',
  '"Archon," "god," "Gnosis holder," and "Sovereign" are not interchangeable categories. At the end of the Archon War, the Seven-seat order was established; only Barbatos (Venti) and Morax (Zhongli) remained from the original Seven into the modern era, other seats having changed holders over time.',
  '«Архонт», «бог», «носитель Гнозиса» и «Владыка» — не взаимозаменяемые категории. По итогам Войны Архонтов установился порядок Семи престолов; из изначальной Семёрки до современности сохранились только Барбатос (Венти) и Моракс (Чжун Ли), остальные престолы со временем сменили обладателей.',
  ['src-fontaine-aq-focalors-climax'],
  [ref('character', 'venti'), ref('character', 'zhongli'), ref('term', 'the-seven'), ref('term', 'gnosis')]);

term('the-seven', 'The Seven', 'Семеро', 'organization',
  'The Archons associated with the seven major nations and seven elements.', 'Архонты, связанные с семью основными нациями и семью элементами.',
  'The dominant divine-political order established at the end of the Archon War, roughly 2000 years before the present.',
  'Господствующий божественно-политический порядок, установившийся по итогам Войны Архонтов примерно 2000 лет назад.',
  [], [ref('term', 'archons')], { evidenceStatus: 'approximate' });

term('sovereign', 'Sovereign', 'Владыка', 'title',
  'One of the ancient elemental dragon rulers of Teyvat, predating the current heavenly order.', 'Один из древних элементальных драконьих правителей Тейвата, предшествующих нынешнему небесному порядку.',
  'Do not state that every named powerful dragon is automatically one of the Seven Sovereigns. Known/important Sovereign-related figures include Nibelung (Dragon King), Apep (Dendro dragon survivor), and Neuvillette (the reborn Hydro Dragon Sovereign in the present era).',
  'Не стоит утверждать, что любой названный могущественный дракон автоматически является одним из Семи Владык. Известные/важные фигуры, связанные с Владыками: Нибелунг (Король-дракон), Апеп (уцелевший дракон Дендро) и Невилет (возрождённый в нынешнюю эпоху Владыка-дракон Гидро).',
  ['src-before-sun-and-moon'],
  [ref('term', 'seven-sovereigns'), ref('character', 'nibelung'), ref('character', 'apep'), ref('character', 'neuvillette')]);

term('seven-sovereigns', 'Seven Sovereigns', 'Семь Владык', 'collective',
  'The seven ancient elemental dragon rulers who governed Teyvat before the current heavenly order.', 'Семеро древних элементальных драконьих правителей, управлявших Тейватом до нынешнего небесного порядка.',
  'The dragon order is repeatedly framed as the world\u2019s original or pre-usurpation order; the later divine order did not simply emerge naturally \u2014 the old rulers were defeated and elemental Authorities were taken from them. Known members with dedicated records: Nibelung, Apep, and (in the present era) Neuvillette. Other elemental Sovereigns should only be represented individually once the game supplies enough evidence.',
  'Драконий порядок неоднократно описывается как изначальный, доузурпационный порядок мира; позднейший божественный порядок не возник естественным путём — прежние правители были повержены, а их элементальные Прерогативы отняты. Известные представители с отдельными записями: Нибелунг, Апеп и (в нынешнюю эпоху) Невилет. Прочих элементальных Владык следует описывать отдельно только при достаточных подтверждениях в игре.',
  ['src-before-sun-and-moon'],
  [ref('character', 'nibelung'), ref('character', 'apep'), ref('character', 'neuvillette'), ref('term', 'heavenly-principles')]);

term('four-shades', 'Four Shades', 'Четыре Тени', 'collective',
  'Four shining shades created by the Primordial One.', 'Четыре сияющие тени, созданные Изначальным.',
  'Later lore associates major world Authorities with this framework. Established/strongly-supported members: Istaroth (associated with Time) and Ronova (associated with Death). The Fontaine-linked "Ruler of Life" (associated with the creation of Egeria) and the remaining Shade/Authority should be entered according to explicit source material as it becomes available, not filled in from theory.',
  'Позднейший лор связывает основные мировые Прерогативы с этой структурой. Установленные/убедительно подтверждённые представители: Истарот (связана со Временем) и Ронова (связан со Смертью). Связанный с Фонтейном «Владыка Жизни» (связан с созданием Эгерии) и оставшаяся Тень/Прерогатива должны вноситься по мере появления явных источников, а не по теоретическим предположениям.',
  ['src-before-sun-and-moon'],
  [ref('character', 'istaroth'), ref('character', 'ronova'), ref('character', 'primordial-one')]);

term('heavenly-principles', 'Heavenly Principles', 'Небесные Принципы', 'cosmology',
  'The power that imposed a new order on Teyvat, defeated the ancient dragon rulers, and became the foundation of the later celestial system.', 'Сила, установившая новый порядок в Тейвате, победившая древних драконьих правителей и ставшая основой позднейшей небесной системы.',
  'Must not automatically be treated as perfectly interchangeable with Primordial One, First Descender, Celestia, Sustainer of Heavenly Principles, "the heavens," or "the throne of the heavens." Some sources strongly connect these ideas, but they can refer to different persons, institutions, manifestations, or perspectives \u2014 keep them as separate entities connected by evidence-bearing claims rather than collapsed into one.',
  'Не следует автоматически считать полностью взаимозаменяемыми с Изначальным, Первым Сошедшим, Селестией, Хранителем Небесных Принципов, «небесами» или «престолом небес». Некоторые источники тесно связывают эти понятия, но они могут относиться к разным личностям, институтам, проявлениям или точкам зрения — их стоит хранить как отдельные сущности, связанные подкреплёнными доказательствами утверждениями, а не сливать в одно.',
  ['src-before-sun-and-moon'],
  [ref('term', 'seven-sovereigns'), ref('term', 'celestia')], { evidenceStatus: 'disputed' });

term('celestia', 'Celestia', 'Селестия', 'cosmology',
  'Institution/place associated with the ruling celestial order.', 'Институт/место, связанное с правящим небесным порядком.',
  'Kept deliberately separate from Heavenly Principles, Primordial One, and Sustainer of Heavenly Principles unless a specific sourced Claim establishes an identity relationship. Its exact ontology versus the Heavenly Principles is an explicitly unresolved research question in this pack.',
  'Намеренно хранится отдельно от Небесных Принципов, Изначального и Хранителя Небесных Принципов, если конкретное подтверждённое утверждение не устанавливает тождество. Точная онтология Селестии в сравнении с Небесными Принципами — явно нерешённый исследовательский вопрос этого пакета.',
  ['src-where-boat-of-consciousness-lies'],
  [ref('term', 'heavenly-principles')], { evidenceStatus: 'disputed', citationNeeded: true });

term('three-moons', 'Three Moons', 'Три Луны', 'collective',
  'Three ancient moon goddesses connected to the ancient dragon world, possessing major Authorities: Aria, Sonnet, and Canon.', 'Три древние лунные богини, связанные с древним миром драконов и обладающие важными Прерогативами: Ария, Сонет и Канон.',
  'Newer material identifies the lunar system as predating the current heavenly order and links the sisters to powers corresponding to fundamental world laws. During the War of Funerary Flame, two moons were destroyed and the Frost Moon was cast beyond the false sky. Because this lore is recent and patch-sensitive, every Moon-related claim should carry version metadata; do not merge older poetic myths with the newer revealed history without indicating which details come from which source.',
  'Новейшие материалы указывают, что лунная система предшествовала нынешнему небесному порядку, и связывают сестёр с силами, соответствующими фундаментальным законам мира. Во время Войны погребального пламени две луны были уничтожены, а Ледяная луна заброшена за ложное небо. Поскольку этот лор недавний и чувствителен к патчам, каждое утверждение о Лунах должно нести версийные метаданные; не стоит смешивать старые поэтичные мифы с новейшей раскрытой историей без указания источника каждой детали.',
  ['src-song-of-welkin-moon'],
  [ref('event', 'ancient-lunar-catastrophe')], { evidenceStatus: 'approximate', citationNeeded: true, reviewStatus: 'incomplete' });

term('khemia', 'Khemia', 'Кхемия', 'craft',
  'Khaenri\u2019ahn art/science of transmutation and artificial life, associated with Rhinedottir.', 'Каэнри’ахское искусство/наука трансмутации и искусственной жизни, связанное с Ринхедоттир.',
  'Referenced briefly as Rhinedottir\u2019s discipline; not independently detailed beyond this research pass.',
  'Кратко упоминается как дисциплина Ринхедоттир; подробно за пределами этого исследовательского прохода не раскрывается.',
  ['src-caribert'], [ref('character', 'rhinedottir')], { evidenceStatus: 'approximate', citationNeeded: true, reviewStatus: 'incomplete' });

term('five-sinners', 'Five Sinners of Khaenri\u2019ah', 'Пятеро Грешников Каэнри’ах', 'collective',
  'Five extraordinary Khaenri\u2019ahn figures who obtained/transcended through immense power associated with the Abyss: Hroptatyr, Vedrfolnir, Rhinedottir ("Gold"), Surtalogi, and Rerir.', 'Пятеро выдающихся жителей Каэнри’ах, обретших/превзошедших благодаря огромной силе, связанной с Бездной: Хроптатюр, Ведрфёльнир, Ринхедоттир («Голд»), Сурталоги и Рерир.',
  'Central to the events surrounding Khaenri\u2019ah and later Abyss-related lore. Do not automatically attribute every action of the Five to the Khaenri\u2019ahn state as a whole. Only Rhinedottir currently has a dedicated Character record in this archive; the other four are tracked here pending individually sourced material.',
  'Играют центральную роль в событиях, связанных с Каэнри’ах, и позднейшем лоре о Бездне. Не стоит автоматически приписывать все их действия государству Каэнри’ах в целом. Собственную запись персонажа в архиве пока имеет только Ринхедоттир; остальные четверо отслеживаются здесь до появления отдельных источников.',
  ['src-caribert'],
  [ref('character', 'rhinedottir'), ref('region', 'khaenriah')], { evidenceStatus: 'approximate' });

term('abyss-order', 'Abyss Order', 'Орден Бездны', 'organization',
  'A modern organization associated with the Abyss and with survivors/descendants of Khaenri\u2019ah.', 'Современная организация, связанная с Бездной и с уцелевшими/потомками Каэнри’ах.',
  'Distinct from the Abyss itself (a much older power/domain) and from Khaenri\u2019ah (the civilization). The Traveler\u2019s sibling later became associated with this organization.',
  'Отличается от самой Бездны (гораздо более древней силы/области) и от Каэнри’ах (цивилизации). Сиблинг Путника позднее оказался связан с этой организацией.',
  ['src-fontaine-aq-masquerade'],
  [ref('term', 'abyss'), ref('region', 'khaenriah'), ref('character', 'traveler-sibling')], { evidenceStatus: 'approximate', citationNeeded: true });

term('fatui', 'Fatui', 'Фатуи', 'organization',
  'A political/espionage organization operating under the Tsaritsa and Pierro, prominent from the post-Cataclysm era onward.', 'Политико-шпионская организация, действующая под руководством Царицы и Пьеро, заметная с эпохи после Катаклизма.',
  'Referenced briefly for its role in the post-Cataclysm world order; not independently detailed beyond this research pass.',
  'Кратко упоминается в контексте роли в миропорядке после Катаклизма; подробно за пределами этого исследовательского прохода не раскрывается.',
  [], [ref('character', 'pierro')], { evidenceStatus: 'approximate', citationNeeded: true, reviewStatus: 'incomplete' });

// irminsul/ley-lines/celestia/archons already existed as demo scaffolds; keep
// their original createdInVersion/lastReviewedInVersion (demo-1) intact so
// existing patch-review history stays valid — only content and demo:false change.
for (const id of ['irminsul', 'ley-lines', 'celestia', 'archons']) {
  upgrade(`terms/${id}.json`, { createdInVersion: 'demo-1', lastReviewedInVersion: 'demo-1', lastModifiedInVersion: 'v-research-pack-1', reviewStatus: 'needs-review' });
}

console.log('terms written');

// ---------------------------------------------------------------------------
// PASS 2b — Locations (no invented coordinates; conservative, real, sourced).
// ---------------------------------------------------------------------------
const loc = (id, name, ru, region, locationType, historicalStatus, descEn, descRu, sources, extra = {}) =>
  write(`locations/${id}.json`, base(id, 'location', L(name, ru), L(descEn, descRu), {
    region, locationType, historicalStatus, sources,
    ...extra,
  }));

loc('enkanomiya', 'Enkanomiya', 'Энканомия', 'inazuma', 'sunken realm', 'sealed',
  'A land that fell into the depths during the War of Funerary Flame and was cut off from the surface. Its people called to the ruling heavenly powers; Before Sun and Moon says Istaroth did not abandon them, while the others did not answer.',
  'Земля, провалившаяся в глубины во время Войны погребального пламени и отрезанная от поверхности. Её жители воззвали к правящим небесным силам; «До солнца и луны» гласит, что Истарот не покинула их, тогда как прочие не ответили.',
  ['src-before-sun-and-moon', 'src-enkanomiya-world-quests'],
  { evidenceStatus: 'confirmed' });

loc('dragonspine', 'Dragonspine', 'Драконий Хребет', 'mondstadt', 'mountain / ancient dragon burial ground', 'exists',
  'A frozen peak near Mondstadt tied to Sal Vindagnyr and to Durin\u2019s attack during the Cataclysm; Durin was defeated here, and its corrupted blood remains part of the mountain\u2019s ongoing environmental/lore state.',
  'Заснеженный пик близ Мондштадта, связанный с Саль Виндагнюр и нападением Дурина во время Катаклизма; здесь Дурин был повержен, и его заражённая кровь до сих пор остаётся частью экологического и лорного состояния горы.',
  ['src-durin-dragonspine-material']);

loc('sal-vindagnyr', 'Sal Vindagnyr', 'Саль Виндагнюр', 'mondstadt', 'ancient dragon settlement', 'destroyed',
  'An ancient dragon settlement on Dragonspine, associated with the old dragon order predating the current heavenly system.',
  'Древнее поселение драконов на Драконьем Хребте, связанное с прежним драконьим порядком, предшествовавшим нынешней небесной системе.',
  ['src-durin-dragonspine-material'],
  { evidenceStatus: 'approximate', citationNeeded: true });

loc('the-chasm', 'The Chasm', 'Разлом', 'liyue', 'mine / sealed site', 'sealed',
  'A sealed mining site in Liyue associated with a Celestial Nail and with historical containment/stabilization efforts.',
  'Закрытая рудничная территория в Ли Юэ, связанная с Небесным гвоздём и историческими усилиями по сдерживанию/стабилизации.',
  [], { evidenceStatus: 'approximate', citationNeeded: true });

loc('tunigi-hollow', 'Tunigi Hollow (Vourukasha border area)', 'Тюниги Холлоу (приграничье Вурукаши)', 'sumeru', 'ruins / Fontaine-Sumeru border site', 'destroyed',
  'A Fontaine/Sumeru border site associated with Egeria\u2019s death during the Cataclysm, the Amrita, and the Harvisptokhm. Crosses region categories and should not be forced into only "Fontaine" or only "Sumeru."',
  'Приграничная территория Фонтейна и Сумеру, связанная со смертью Эгерии во время Катаклизма, Амритой и Харвисптокхмом. Пересекает границы регионов и не должна относиться только к «Фонтейну» или только к «Сумеру».',
  ['src-khvarena-of-good-and-evil']);

loc('great-red-sand-desert', 'The Great Red Sand', 'Великие Красные пески', 'sumeru', 'desert', 'exists',
  'A desert region transformed by an ancient catastrophe connected to a Celestial Nail and the War of Funerary Flame, and later the site of King Deshret\u2019s forbidden-knowledge disaster \u2014 two separate events that should not be conflated.',
  'Пустынный регион, преобразованный древней катастрофой, связанной с Небесным гвоздём и Войной погребального пламени, а позднее — местом катастрофы запретного знания царя Дешрета — двух отдельных событий, которые не следует путать.',
  ['src-sumeru-aq-ch3-act4']);

loc('night-kingdom', 'Night Kingdom', 'Ночное царство', 'natlan', 'reconstructed Ley Line network / realm', 'exists',
  'A Ley Line network reconstructed under the guidance of Ronova and the Lord of the Night after Natlan\u2019s original Ley Lines were devastated in the War of Funerary Flame. Invaded by the Abyss during the Cataclysm; resisted continued Abyssal erosion for centuries afterward.',
  'Сеть артерий земли, восстановленная под руководством Роны и Владыки Ночи после того, как изначальные артерии земли Натлана были уничтожены в Войне погребального пламени. Подверглась вторжению Бездны во время Катаклизма; веками сопротивлялась продолжающейся эрозии Бездны.',
  ['src-night-kingdom-dialogue', 'src-natlan-archon-quests']);

console.log('locations written');

// ---------------------------------------------------------------------------
// PASS 3 — Ancient entities & historical/divine figures (Character kind).
// region is intentionally omitted for entities not bound to one modern nation.
// ---------------------------------------------------------------------------
const chr = (id, name, ru, category, sources, bioEn, bioRu, extra = {}) =>
  write(`characters/${id}.json`, base(id, 'character', L(name, ru), L(bioEn.split('. ')[0] + '.', bioRu.split('. ')[0] + '.'), {
    titles: [], affiliations: [], species: L('Unknown / not classified by primary sources', 'Неизвестно / не классифицировано первоисточниками'),
    status: L('See biography', 'См. биографию'), category, eras: [], biography: L(bioEn, bioRu),
    relatedLocations: [], relatedTerms: [], sources,
    ...extra,
  }));

chr('nibelung', 'Nibelung', 'Нибелунг', 'historical-figure', ['src-before-sun-and-moon', 'src-nahida-story-quest-act2'],
  'Nibelung is the ancient Dragon King and one of the most important figures in the pre-human history of Teyvat. He belonged to the original dragon order, departed or was absent from Teyvat when the Heavenly Principles arrived and established a new order, and later returned bearing power associated with the Abyss and forbidden knowledge. He waged the War of Funerary Flame against the Heavenly Principles, catastrophically damaging the world before being defeated by a Heavenly Principles severely weakened by the conflict. His Descender classification is disputed: he is discussed in relation to Descender-like status, but the numbering and exact criteria are not simple, and he should not be forced into a numbered slot. Older lore framed him through the "Second Who Came" language of Before Sun and Moon; preserve that older source as an in-universe historical account rather than silently replacing its wording with a modern interpretation.',
  'Нибелунг — древний Король-дракон и одна из важнейших фигур дочеловеческой истории Тейвата. Он принадлежал к изначальному драконьему порядку, покинул Тейват или отсутствовал в нём, когда прибыли Небесные Принципы и установили новый порядок, а позднее вернулся, неся силу, связанную с Бездной и запретным знанием. Он развязал Войну погребального пламени против Небесных Принципов, катастрофически повредив мир, прежде чем был побеждён серьёзно ослабленными в этом конфликте Небесными Принципами. Его отнесение к Сошедшим спорно: он обсуждается в связи со статусом, подобным Сошедшему, но нумерация и точные критерии неоднозначны, и его не следует принудительно относить к определённому номеру. Устаревший лор описывал его через формулировку «Второй Пришедший» из «До солнца и луны»; этот более старый источник стоит сохранять как внутримировое историческое свидетельство, а не молча заменять его формулировку современной трактовкой.',
  { evidenceStatus: 'strongly-implied', eras: ['era-old-dragon-world', 'era-war-of-funerary-flame'], relatedTerms: ['descender', 'forbidden-knowledge', 'abyss'] });

chr('primordial-one', 'Primordial One', 'Изначальный', 'deity', ['src-before-sun-and-moon'],
  'The Enkanomiyan book Before Sun and Moon preserves a foundational account: an "eternal throne of the heavens" arrived, the Primordial One fought the seven dragon Sovereigns for forty years (an internal-chronology figure, not a BP date), created Four Shining Shades, and after victory remade the world for humanity, entering a covenant-like relationship with it. The text says the Primordial One "may have been Phanes" \u2014 presented as an uncertain identification, not an unqualified canonical name. Its exact relationship to the Heavenly Principles, Celestia, and the "First Descender" is a deliberately unresolved research question; do not collapse these into one entity without a specific sourced Claim.',
  'Энкануомийская книга «До солнца и луны» сохраняет основополагающий рассказ: явился «вечный престол небес», Изначальный сражался с семью драконьими Владыками сорок лет (внутренняя хронология текста, а не дата BP), создал Четыре Сияющие Тени и после победы переустроил мир для людей, вступив с ним в подобие завета. Текст говорит, что Изначальный «возможно, был Фанес» — это представлено как неопределённое отождествление, а не безусловное каноническое имя. Его точное отношение к Небесным Принципам, Селестии и «Первому Сошедшему» — намеренно нерешённый исследовательский вопрос; не стоит сливать их в одну сущность без конкретного подтверждённого утверждения.',
  { evidenceStatus: 'disputed', alternativeNames: ['Phanes (uncertain identification)', 'Фанес (неподтверждённое отождествление)'], eras: ['era-heavenly-principles-arrival'], relatedTerms: ['heavenly-principles', 'descender'] });

chr('istaroth', 'Istaroth', 'Истарот', 'deity', ['src-before-sun-and-moon', 'src-raiden-shogun-story-quest-act2'],
  'One of the Four Shades, associated with Time. Before Sun and Moon records that when Enkanomiya fell during the War of Funerary Flame and its people called to the ruling heavenly powers, Istaroth did not abandon them, while the others did not answer. Later tied to the Sacred Sakura\u2019s time-anomaly history alongside Makoto and Ei.',
  'Одна из Четырёх Теней, связанная со Временем. «До солнца и луны» сообщает, что, когда Энканомия пала во время Войны погребального пламени и её жители воззвали к правящим небесным силам, Истарот не покинула их, тогда как прочие не ответили. Позднее связана с временн\u00f3й аномалией Сакральной сакуры вместе с Макото и Эи.',
  { region: 'inazuma', evidenceStatus: 'confirmed', eras: ['era-war-of-funerary-flame'], relatedLocations: ['enkanomiya'], relatedTerms: [] });

chr('ronova', 'Ronova', 'Ронова', 'deity', ['src-night-kingdom-dialogue'],
  'One of the Four Shades, associated with Death. Guided the reconstruction of Natlan\u2019s Ley Line network as the Night Kingdom after the original network was devastated in the War of Funerary Flame.',
  'Одна из Четырёх Теней, связанная со Смертью. Направлял восстановление сети артерий земли Натлана в виде Ночного царства после того, как изначальная сеть была уничтожена в Войне погребального пламени.',
  { region: 'natlan', evidenceStatus: 'confirmed', relatedLocations: ['night-kingdom'] });

chr('apep', 'Apep', 'Апеп', 'historical-figure', ['src-nahida-story-quest-act2', 'src-sumeru-aq-ch3-act4'],
  'A Dendro dragon and survivor of the ancient wars connected to the old dragon order. Later affected through her connection to King Deshret and the forbidden knowledge he obtained during his desert catastrophe.',
  'Дракон Дендро, уцелевшая в древних войнах, связанных со старым драконьим порядком. Позднее пострадала из-за своей связи с царём Дешретом и запретным знанием, которое он обрёл во время своей пустынной катастрофы.',
  { region: 'sumeru', evidenceStatus: 'confirmed', eras: ['era-war-of-funerary-flame', 'era-age-of-the-seven'], relatedLocations: ['great-red-sand-desert'], relatedTerms: ['forbidden-knowledge'] });

chr('saarelainen', 'Saarelainen', 'Саарелайнен', 'historical-figure', ['src-hymns-of-far-north', 'src-fontaine-aq-finale'],
  'Known as the "Stranger of Winter\u2019s Day." Lived after the War of Funerary Flame and before the Archon War, became involved with Pohjola, and was killed by the Heavenly Principles after breaking a prohibition. His remains were divided and used in the creation of the seven Gnoses, alongside another figure described only as "one who came after." Newer northern/Nod-Krai material strongly connects him with the Third Descender, whose remains Fontaine\u2019s Archon Quest had already established as the Gnoses\u2019 origin \u2014 preserve both the original Fontaine revelation ("Third Descender\u2019s remains") and this later identification, since they were revealed years apart.',
  'Известен как «Странник зимнего дня». Жил после Войны погребального пламени и до Войны Архонтов, был связан с Похьолой и был убит Небесными Принципами после нарушения запрета. Его останки были разделены и использованы для создания семи Гнозисов вместе с ещё одной фигурой, описанной лишь как «тот, кто пришёл после». Новейшие северные материалы, связанные с Нод-Краем, тесно связывают его с Третьим Сошедшим, чьи останки архонтский квест Фонтейна уже определил как источник Гнозисов — стоит сохранять и первоначальное откровение Фонтейна («останки Третьего Сошедшего»), и это позднейшее отождествление, поскольку они были раскрыты с разницей в годы.',
  { evidenceStatus: 'strongly-implied', createdInVersion: 'v-nod-krai', lastModifiedInVersion: 'v-nod-krai', eras: ['era-post-war-restructuring'], relatedTerms: ['descender', 'gnosis'] });

chr('king-deshret', 'King Deshret', 'Царь Дешрет', 'historical-figure', ['src-sumeru-aq-ch3-act4', 'src-sumeru-aq-ch3-act5', 'src-lay-of-al-ahmar'],
  'An ancient desert king whose pursuit of knowledge beyond the ordinary world order caused a catastrophic outbreak of forbidden knowledge in the desert, thousands of years before the Cataclysm. Consequences included the collapse of his civilization, madness and disease among his people, and phenomena associated with the Withering and Eleazar. Greater Lord Rukkhadevata intervened and nearly exhausted her power containing the disaster; Deshret ultimately sacrificed himself, ending that outbreak.',
  'Древний царь пустыни, чьё стремление к знанию за пределами обычного миропорядка вызвало катастрофическую вспышку запретного знания в пустыне за тысячи лет до Катаклизма. Последствия включали крах его цивилизации, безумие и болезни среди его народа, а также явления, связанные с Иссушением и Элеазаром. Великий Владыка Рукхадевата вмешалась и почти исчерпала свою силу, сдерживая катастрофу; Дешрет в итоге пожертвовал собой, положив конец этой вспышке.',
  { region: 'sumeru', evidenceStatus: 'confirmed', eras: ['era-age-of-the-seven'], relatedLocations: ['great-red-sand-desert'], relatedTerms: ['forbidden-knowledge'] });

chr('greater-lord-rukkhadevata', 'Greater Lord Rukkhadevata', 'Великий Владыка Рукхадевата', 'deity', ['src-sumeru-aq-ch3-act5', 'src-where-boat-of-consciousness-lies', 'src-khvarena-of-good-and-evil'],
  'The predecessor Dendro Archon of Sumeru. Resisted King Deshret\u2019s ancient forbidden-knowledge crisis, nearly exhausting her power. During the Cataclysm, forbidden knowledge again polluted Irminsul; because she herself became contaminated fighting it, she created/used a successor incarnation, Nahida (Lesser Lord Kusanali), as part of the eventual solution. In the present-day Sumeru Archon Quest, her remaining polluted existence was erased from Irminsul to eliminate the contamination \u2014 after which inhabitants of Teyvat remember the historical role differently (see the "rukkhadevata-irminsul-erasure" event for the preserved objective/remembered distinction). She also helped grow the Harvisptokhm to anchor Egeria\u2019s consciousness after Egeria\u2019s death during the Cataclysm.',
  'Предшествующий Архонт Дендро Сумеру. Сопротивлялась древнему кризису запретного знания царя Дешрета, почти исчерпав свою силу. Во время Катаклизма запретное знание вновь заразило Ирминсуль; поскольку, борясь с ним, она сама оказалась заражена, она создала/использовала преемное воплощение — Нахиду (Малый Владыка Кусанали) — как часть итогового решения. В нынешнем архонтском квесте Сумеру её оставшееся заражённое существование было стёрто из Ирминсуля для устранения заражения — после чего жители Тейвата иначе помнят её историческую роль (см. событие «rukkhadevata-irminsul-erasure» о сохранённом различии между объективной и памятной версиями). Она также помогла вырастить Харвисптокхм для закрепления сознания Эгерии после её смерти во время Катаклизма.',
  { region: 'sumeru', evidenceStatus: 'confirmed', eras: ['era-age-of-the-seven', 'era-cataclysm'], relatedTerms: ['forbidden-knowledge', 'irminsul'] });

chr('egeria', 'Egeria', 'Эгерия', 'deity', ['src-khvarena-of-good-and-evil'],
  'A previous Hydro Archon (not the Sovereign) who died during the Cataclysm in the region now associated with Tunigi Hollow / Vourukasha Oasis. Her remains became the Amrita; Greater Lord Rukkhadevata used this state to grow the Harvisptokhm, anchoring her consciousness and helping seal/contain Abyssal defilement. Succeeded by Focalors.',
  'Предшествующий Архонт Гидро (не Владыка), погибшая во время Катаклизма в области, ныне связанной с Тюниги Холлоу / Оазисом Вурукаши. Её останки стали Амритой; Великий Владыка Рукхадевата использовала это состояние для выращивания Харвисптокхма, закрепившего её сознание и помогшего сдержать/запечатать заражение Бездной. Преемницей стала Фокалорс.',
  { region: 'fontaine', evidenceStatus: 'confirmed', eras: ['era-cataclysm'], relatedLocations: ['tunigi-hollow'] });

chr('focalors', 'Focalors', 'Фокалорс', 'deity', ['src-fontaine-aq-focalors-climax'],
  'Successor to Egeria as Hydro Archon. Her long plan culminated in the destruction of the Hydro Archon\u2019s Divine Throne; her divine self died in the process, and the stolen Hydro Authority returned to Neuvillette, the Hydro Dragon Sovereign. The Hydro Gnosis remained a separate object and was subsequently transferred away.',
  'Преемница Эгерии на посту Архонта Гидро. Её долгий план завершился разрушением Божественного Престола Архонта Гидро; в процессе её божественная сущность погибла, а похищенная Прерогатива Гидро вернулась Невилету, Владыке-дракону Гидро. Гнозис Гидро остался отдельным предметом и впоследствии был передан дальше.',
  { region: 'fontaine', evidenceStatus: 'confirmed', eras: ['era-travelers-journey'], relatedTerms: ['divine-throne', 'elemental-authority', 'gnosis'] });

chr('neuvillette', 'Neuvillette', 'Невилет', 'historical-figure', ['src-neuvillette-character-story-vision', 'src-fontaine-aq-focalors-climax'],
  'The reborn Hydro Dragon Sovereign in the present era. After Focalors destroyed the Hydro Archon\u2019s Divine Throne, full Hydro Authority \u2014 previously incorporated into the Hydro Archon\u2019s divine system \u2014 returned to him. With restored Authority, he transformed the nature/status of Fontainians so they would no longer dissolve when the prophecy\u2019s flood arrived. This is distinct from the Hydro Gnosis, which he later gave away.',
  'Возрождённый в нынешнюю эпоху Владыка-дракон Гидро. После того как Фокалорс разрушила Божественный Престол Архонта Гидро, полная Прерогатива Гидро, ранее включённая в божественную систему Архонта Гидро, вернулась к нему. С восстановленной Прерогативой он изменил природу/статус фонтейнцев, чтобы те больше не растворялись с приходом пророческого потопа. Это отличается от Гнозиса Гидро, который он позднее отдал.',
  { region: 'fontaine', evidenceStatus: 'confirmed', eras: ['era-travelers-journey'], relatedTerms: ['elemental-authority', 'divine-throne', 'gnosis'] });

chr('makoto', 'Makoto', 'Макото', 'deity', ['src-raiden-shogun-story-quest-act2'],
  'The original Electro Archon, twin of Ei. Went to Khaenri\u2019ah during the Cataclysm while Ei remained behind initially; Ei later reached her and found her dying. Her death led to Ei becoming the sole Electro Archon. Her history is tied to the Sacred Sakura\u2019s unusual temporal anomaly alongside Ei and Istaroth.',
  'Изначальный Архонт Электро, близнец Эи. Отправилась в Каэнри’ах во время Катаклизма, тогда как Эи изначально осталась; позднее Эи достигла её и нашла умирающей. Её смерть привела к тому, что Эи стала единственным Архонтом Электро. Её история связана с необычной временн\u00f3й аномалией Сакральной сакуры вместе с Эи и Истарот.',
  { region: 'inazuma', evidenceStatus: 'confirmed', eras: ['era-cataclysm'] });

chr('ei', 'Ei (Raiden Shogun)', 'Эи (Сёгун Райдэн)', 'deity', ['src-raiden-shogun-story-quest-act2'],
  'Twin of Makoto and, since Makoto\u2019s death during the Cataclysm, the sole Electro Archon. Her history is tied to the Sacred Sakura\u2019s unusual temporal anomaly, which should not be forced into ordinary linear causality without notes.',
  'Близнец Макото и, после гибели Макото во время Катаклизма, единственный Архонт Электро. Её история связана с необычной временн\u00f3й аномалией Сакральной сакуры, которую не следует принудительно втискивать в обычную линейную причинность без пояснений.',
  { region: 'inazuma', evidenceStatus: 'confirmed', eras: ['era-cataclysm', 'era-post-cataclysm'] });

chr('nahida', 'Nahida (Lesser Lord Kusanali)', 'Нахида (Малый Владыка Кусанали)', 'deity', ['src-sumeru-aq-ch3-act5', 'src-nahida-story-quest-act2'],
  'Successor incarnation created/used by Greater Lord Rukkhadevata as part of the response to the Cataclysm-era pollution of Irminsul. After Rukkhadevata\u2019s remaining polluted existence was erased from Irminsul, Teyvat-native memories and records reorganized so that Nahida is remembered as the Dendro Archon who had always occupied the relevant historical role but had lost power/memory \u2014 the Traveler retained knowledge of the original history because of Descender status.',
  'Преемное воплощение, созданное/использованное Великим Владыкой Рукхадеватой как часть ответа на заражение Ирминсуля во время Катаклизма. После того как оставшееся заражённое существование Рукхадеваты было стёрто из Ирминсуля, память и записи, доступные уроженцам Тейвата, реорганизовались так, что Нахида помнится как Архонт Дендро, всегда занимавший эту историческую роль, но утративший силу/память — Путник же сохранил знание об изначальной истории благодаря статусу Сошедшего.',
  { region: 'sumeru', evidenceStatus: 'confirmed', eras: ['era-travelers-journey'], relatedTerms: ['irminsul'] });

chr('rhinedottir', 'Rhinedottir ("Gold")', 'Ринхедоттир («Голд»)', 'historical-figure', ['src-caribert'],
  'A master of Khemia, one of the Five Sinners of Khaenri\u2019ah, and creator of multiple artificial lifeforms, including Durin. Her research is deeply entangled with the Cataclysm, but the exact causal chain of Khaenri\u2019ah\u2019s fall, the Abyssal eruption, Celestia\u2019s intervention, and the Sinners\u2019 actions remains more complex than any single-cause account; avoid reducing her to "the person who caused the Cataclysm."',
  'Мастер Кхемии, одна из Пятерых Грешников Каэнри’ах и создательница нескольких искусственных форм жизни, включая Дурина. Её исследования тесно переплетены с Катаклизмом, но точная причинная цепочка падения Каэнри’ах, извержения Бездны, вмешательства Селестии и действий Грешников сложнее любого объяснения с одной причиной; не стоит сводить её к «той, кто вызвал Катаклизм».',
  { region: 'khaenriah', evidenceStatus: 'confirmed', eras: ['era-cataclysm'], relatedTerms: ['khemia', 'five-sinners'] });

chr('dainsleif', 'Dainsleif', 'Дайнслейф', 'historical-figure', ['src-fontaine-aq-masquerade', 'src-dainsleif-archon-quests'],
  'A survivor of Khaenri\u2019ah who recurs across many versions\u2019 Archon Quests, offering his own perspective on the Five Sinners, the Traveler\u2019s sibling, the curses placed on survivors, and the Cataclysm. The game deliberately withholds a clean single-cause explanation for Khaenri\u2019ah\u2019s fall; his testimony is one perspective among several (including Pierro\u2019s), not a settled final account.',
  'Уцелевший из Каэнри’ах, регулярно появляющийся в архонтских квестах многих версий, предлагающий собственный взгляд на Пятерых Грешников, сиблинга Путника, проклятия, наложенные на уцелевших, и Катаклизм. Игра намеренно избегает единого простого объяснения падения Каэнри’ах; его свидетельство — лишь одна точка зрения среди нескольких (включая точку зрения Пьеро), а не окончательная версия.',
  { region: 'khaenriah', evidenceStatus: 'strongly-implied', eras: ['era-cataclysm', 'era-post-cataclysm'] });

chr('pierro', 'Pierro', 'Пьеро', 'historical-figure', ['src-fontaine-aq-masquerade'],
  'A survivor of Khaenri\u2019ah and leader of the Fatui under the Tsaritsa. Offers his own perspective on Khaenri\u2019ah\u2019s fall, distinct from Dainsleif\u2019s.',
  'Уцелевший из Каэнри’ах и предводитель Фатуи под началом Царицы. Предлагает собственный взгляд на падение Каэнри’ах, отличный от точки зрения Дайнслейфа.',
  { region: 'khaenriah', evidenceStatus: 'approximate', citationNeeded: true, eras: ['era-post-cataclysm'], relatedTerms: ['fatui'] });

chr('durin', 'Durin', 'Дурин', 'other', ['src-durin-dragonspine-material'],
  'A creation of Rhinedottir. Attacked Mondstadt during the Cataclysm; Dvalin fought Durin, with Barbatos (Venti) involved in the city\u2019s defense, and Durin was defeated over Dragonspine. Durin\u2019s corrupted blood later became part of Dragonspine\u2019s ongoing environmental/lore state and affected Dvalin.',
  'Создание Ринхедоттир. Напал на Мондштадт во время Катаклизма; Двалин сражался с Дурином, при участии Барбатоса (Венти) в защите города, и Дурин был повержен над Драконьим Хребтом. Заражённая кровь Дурина позднее стала частью продолжающегося экологического/лорного состояния Драконьего Хребта и повлияла на Двалина.',
  { region: 'mondstadt', evidenceStatus: 'confirmed', eras: ['era-cataclysm'], relatedLocations: ['dragonspine'], relatedTerms: [] });

chr('traveler', 'Traveler', 'Путник', 'playable',
  ['src-narzissenkreuz-world-quest', 'src-fontaine-aq-finale'],
  'The playable protagonist, identified as the Fourth Descender \u2014 a being of extraordinary will capable of rivaling an entire world, not merely "someone from outside Teyvat." This status explains resistance to Irminsul\u2019s ordinary memory-rewriting: the Traveler retained knowledge of Greater Lord Rukkhadevata\u2019s original history even after Irminsul reorganized in-world memory around her removal.',
  'Играбельный протагонист, определённый как Четвёртый Сошедший — существо с исключительной волей, способное соперничать с целым миром, а не просто «кто-то извне Тейвата». Этот статус объясняет устойчивость к обычному переписыванию памяти Ирминсулем: Путник сохранил знание об изначальной истории Великого Владыки Рукхадеваты даже после того, как Ирминсуль реорганизовал внутримировую память вокруг её устранения.',
  { evidenceStatus: 'confirmed', relatedTerms: ['descender', 'irminsul'] });

chr('traveler-sibling', "The Traveler's sibling", 'Сиблинг Путника', 'other',
  ['src-fontaine-aq-masquerade'],
  'Arrived in Teyvat alongside the Traveler and became deeply connected to Khaenri\u2019ah, witnessing its destruction during the Cataclysm. Unlike the Traveler, the sibling is recorded by Irminsul as belonging to Teyvat \u2014 the reason for this difference remains an unresolved mystery and should not be given an unconfirmed origin explanation. Later became associated with the Abyss Order.',
  'Прибыл(а) в Тейват вместе с Путником и оказался(ась) тесно связан(а) с Каэнри’ах, став свидетелем его уничтожения во время Катаклизма. В отличие от Путника, сиблинг записан(а) Ирминсулем как принадлежащий(ая) Тейвату — причина этого различия остаётся нерешённой загадкой, и ей не следует приписывать неподтверждённое объяснение происхождения. Позднее оказался(ась) связан(а) с Орденом Бездны.',
  { evidenceStatus: 'disputed', reviewStatus: 'needs-review', eras: ['era-cataclysm'], relatedTerms: ['irminsul', 'abyss-order'] });

console.log('characters written');

// ---------------------------------------------------------------------------
// PASS — Eras (the macro-timeline skeleton). Dates avoid fabricated BP numbers:
// spans without a stated figure use 'unknown' or 'relative' (after/before an event).
// ---------------------------------------------------------------------------
const era = (id, name, ru, start, end, descEn, descRu, extra = {}) =>
  write(`eras/${id}.json`, base(id, 'era', L(name, ru), L(descEn, descRu), { start, end, evidenceStatus: 'approximate', ...extra }));

const unknown = { type: 'unknown' };
const rel = (after, before) => ({ type: 'relative', ...(after ? { after } : {}), ...(before ? { before } : {}) });

era('era-old-dragon-world', 'Old Dragon World', 'Древний мир драконов', unknown, rel(undefined, 'arrival-of-heavenly-principles'),
  'The Seven Sovereigns rule the elemental world; Nibelung is Dragon King; the ancient lunar order exists; the Primordial Sea is central to early life in Fontaine-related cosmology. Date unknown; ordering is relative to the arrival of the Heavenly Principles.',
  'Семь Владык правят элементальным миром; Нибелунг — Король-дракон; существует древний лунный порядок; Изначальное море центрально для ранней жизни в космологии, связанной с Фонтейном. Дата неизвестна; порядок определяется относительно прибытия Небесных Принципов.');

era('era-heavenly-principles-arrival', 'Arrival of the Heavenly Principles', 'Прибытие Небесных Принципов', unknown, rel(undefined, 'war-against-seven-sovereigns'),
  'A new heavenly power arrives, world laws are altered, and conflict with the Seven Sovereigns begins; the Four Shades operate with the new ruler and the dragons are defeated, establishing a human-oriented world order.',
  'Прибывает новая небесная сила, изменяются законы мира, начинается конфликт с Семью Владыками; Четыре Тени действуют заодно с новым правителем, драконы повержены, устанавливается человекоориентированный миропорядок.');

era('era-early-human-order', 'Early Human Order', 'Ранний людской порядок', rel('creation-of-human-order'), rel(undefined, 'war-of-funerary-flame'),
  'Humanity flourishes under the new order according to Before Sun and Moon; multiple ancient cultures develop. Date relative/ancient.',
  'Согласно «До солнца и луны», человечество процветает при новом порядке; развиваются несколько древних культур. Дата относительная/древняя.');

era('era-war-of-funerary-flame', 'War of Funerary Flame', 'Война погребального пламени', rel('creation-of-human-order'), rel(undefined, 'saarelainen-death'),
  'Nibelung returns with Abyss-associated power and wages a world-scale war against the Heavenly Principles; regional consequences (lunar catastrophe, the fall of Enkanomiya, Celestial Nails, Natlan\u2019s Ley Line devastation, Sumeru\u2019s environmental transformation) are often indexed to roughly ~6000 years before the present in community chronology compilations, though no primary source assigns the war itself one exact year.',
  'Нибелунг возвращается с силой, связанной с Бездной, и развязывает общемировую войну против Небесных Принципов; региональные последствия (лунная катастрофа, падение Энканомии, Небесные гвозди, разрушение артерий земли Натлана, экологическое преобразование Сумеру) в сводных хронологиях сообщества часто относят примерно к ~6000 годам до настоящего времени, хотя ни один первоисточник не называет для самой войны точный год.');

era('era-post-war-restructuring', 'Post-War Restructuring', 'Послевоенное переустройство', rel('war-of-funerary-flame'), rel(undefined, 'archon-war-end'),
  'The world stabilizes unevenly; Egeria and other later divine systems emerge; the Saarelainen / Third Descender episode occurs and the Gnoses are created from his remains, laying foundations for the later Seven-seat order.',
  'Мир нестабильно стабилизируется; возникают Эгерия и другие позднейшие божественные системы; происходит эпизод с Саарелайненом / Третьим Сошедшим, и из его останков создаются Гнозисы, закладывая основы позднейшего порядка Семи престолов.');

era('era-archon-war', 'Archon War', 'Война Архонтов', rel('creation-of-gnoses'), { type: 'approximate', yearsBeforePresent: 2000, uncertainty: 100 },
  'An umbrella term for many regional conflicts involving gods and the emergence of the Seven; not one synchronized battlefield. Different regions resolved their conflicts differently and at different times. The final divine seat was claimed approximately 2000 years before the present.',
  'Собирательное обозначение множества региональных конфликтов, связанных с богами и становлением Семи; это не единое синхронное сражение. Разные регионы разрешали свои конфликты по-разному и в разное время. Последний божественный престол был занят примерно 2000 лет назад.');

era('era-age-of-the-seven', 'Age of the Seven', 'Эпоха Семерых', rel('archon-war-end'), rel(undefined, 'cataclysm'),
  'The seven nations develop under Archons; several original Archons are replaced over time; Khaenri\u2019ah develops independently outside the Seven\u2019s order; King Deshret\u2019s forbidden-knowledge crisis belongs to this broad period, exact placement pending Sumeru-specific chronology.',
  'Семь наций развиваются под властью Архонтов; со временем несколько изначальных Архонтов сменяются; Каэнри’ах развивается независимо, вне порядка Семи; кризис запретного знания царя Дешрета относится к этому широкому периоду, точное место в хронологии Сумеру уточняется.');

era('era-cataclysm', 'Cataclysm', 'Катаклизм', { type: 'approximate', yearsBeforePresent: 500, uncertainty: 20 }, { type: 'approximate', yearsBeforePresent: 500, uncertainty: 20 },
  'Khaenri\u2019ah falls; Abyssal disaster spreads across Teyvat; Rukkhadevata fights Irminsul pollution; Makoto and Egeria die; Durin attacks Mondstadt; Natlan\u2019s Night Kingdom is invaded \u2014 multiple regional disasters occur simultaneously, though the exact order of many Cataclysm events remains unresolved. Survivor curses and new anti-Celestia movements reshape the world afterward.',
  'Каэнри’ах падает; бездненская катастрофа распространяется по Тейвату; Рукхадевата борется с заражением Ирминсуля; погибают Макото и Эгерия; Дурин нападает на Мондштадт; Ночное царство Натлана подвергается вторжению — несколько региональных катастроф происходят одновременно, хотя точный порядок многих событий Катаклизма остаётся неясным. Проклятия уцелевших и новые движения против Селестии впоследствии меняют мир.',
  { evidenceStatus: 'confirmed' });

era('era-post-cataclysm', 'Post-Cataclysm', 'После Катаклизма', rel('cataclysm'), unknown,
  'Ei becomes sole Electro Archon; Kusanali/Nahida occupies the Dendro seat; Focalors succeeds Egeria; the Fatui develop under the Tsaritsa/Pierro; the Abyss Order becomes a major force; consequences of the Cataclysm remain active.',
  'Эи становится единственным Архонтом Электро; Кусанали/Нахида занимает престол Дендро; Фокалорс сменяет Эгерию; Фатуи развиваются под началом Царицы/Пьеро; Орден Бездны становится значительной силой; последствия Катаклизма остаются активными.');

era('era-travelers-journey', "Traveler's Journey", 'Путешествие Путника', rel('cataclysm'), unknown,
  'The Traveler awakens and travels the nations; the Irminsul rewrite occurs in Sumeru; the Fontaine prophecy resolves and the Hydro Divine Throne is destroyed with Authority returning to Neuvillette; the Natlan crisis reveals more ancient dragon/Abyss history; Nod-Krai/lunar material reveals additional information about the Three Moons, Descenders, and Saarelainen.',
  'Путник пробуждается и странствует по нациям; в Сумеру происходит переписывание Ирминсуля; разрешается пророчество Фонтейна, разрушается Божественный Престол Гидро, и Прерогатива возвращается Невилету; кризис Натлана раскрывает больше древней истории драконов и Бездны; материалы Нод-Края/лунной темы раскрывают больше сведений о Трёх Лунах, Сошедших и Саарелайнене.');

console.log('eras written');

// ---------------------------------------------------------------------------
// PASS — HistoricalEvents. Dates never fabricate a BP number beyond what the
// pack itself asserts as an (explicitly approximate) figure.
// ---------------------------------------------------------------------------
const evt = (id, name, ru, date, eraId, regions, locations, participants, relatedTerms, eventType, sources, summaryEn, summaryRu, descEn, descRu, extra = {}) =>
  write(`events/${id}.json`, base(id, 'event', L(name, ru), L(descEn, descRu), {
    date, era: eraId, regions, locations, participants, relatedTerms, eventType, sources,
    summary: L(summaryEn, summaryRu),
    ...extra,
  }));

evt('arrival-of-heavenly-principles', 'Arrival of the Heavenly Principles', 'Прибытие Небесных Принципов',
  unknown, 'era-heavenly-principles-arrival', [], [], ['primordial-one'], ['heavenly-principles'], 'cosmological',
  ['src-before-sun-and-moon'],
  'An "eternal throne of the heavens" arrives in Teyvat, beginning the conflict with the Seven Sovereigns.', 'В Тейват прибывает «вечный престол небес», что начинает конфликт с Семью Владыками.',
  'Recorded in Before Sun and Moon as the arrival of a new ruling power that would go on to fight and defeat the ancient dragon Sovereigns. Date unknown; ordering is relative only.',
  'Записано в «До солнца и луны» как прибытие новой правящей силы, которая впоследствии сразится с древними драконьими Владыками и победит их. Дата неизвестна; порядок событий только относительный.');

evt('war-against-seven-sovereigns', 'Defeat of the Sovereigns', 'Поражение Владык',
  rel('arrival-of-heavenly-principles', 'creation-of-human-order'), 'era-heavenly-principles-arrival', [], [], ['primordial-one'], ['seven-sovereigns'], 'war',
  ['src-before-sun-and-moon'],
  'The Primordial One and the Four Shades fight the Seven Sovereigns for forty years (internal chronology) before victory.', 'Изначальный и Четыре Тени сражаются с Семью Владыками сорок лет (внутренняя хронология) до победы.',
  'According to Before Sun and Moon, the Primordial One and its Four Shades fought the Seven Sovereigns for forty years before the Sovereigns were defeated and the new ruler began reshaping the world. The "forty years" belongs to the ancient text\u2019s internal chronology and is not converted to a BP figure here.',
  'Согласно «До солнца и луны», Изначальный и его Четыре Тени сражались с Семью Владыками сорок лет, прежде чем Владыки были повержены и новый правитель начал переустраивать мир. «Сорок лет» относится к внутренней хронологии древнего текста и здесь не переводится в дату BP.');

evt('creation-of-human-order', 'Creation/remaking of the human world', 'Создание/переустройство людского мира',
  rel('war-against-seven-sovereigns'), 'era-early-human-order', [], [], ['primordial-one'], [], 'world-transition',
  ['src-before-sun-and-moon'],
  'After the dragons\u2019 defeat, the world is reshaped for humanity, which enters a covenant-like relationship with the Primordial One.', 'После поражения драконов мир переустраивается для людей, которые вступают в подобие завета с Изначальным.',
  'Before Sun and Moon describes mountains, rivers, seas, plants, animals, and eventually humanity appearing in the narrative of the new order. Treated here as an in-universe historical account from a particular ancient human tradition, not an unqualified objective record.',
  '«До солнца и луны» описывает появление гор, рек, морей, растений, животных и в итоге людей в повествовании о новом порядке. Рассматривается здесь как внутримировое историческое свидетельство конкретной древней человеческой традиции, а не безусловная объективная запись.');

evt('war-of-funerary-flame', 'War of Funerary Flame', 'Война погребального пламени',
  { type: 'approximate', yearsBeforePresent: 6000, uncertainty: 2500 }, 'era-war-of-funerary-flame', ['inazuma', 'sumeru', 'natlan'], ['enkanomiya'],
  ['nibelung'], ['heavenly-principles', 'forbidden-knowledge', 'abyss', 'celestial-nail'], 'war',
  ['src-before-sun-and-moon', 'src-nahida-story-quest-act2'],
  'Nibelung returns bearing Abyss-associated power and wages a devastating war against the Heavenly Principles.', 'Нибелунг возвращается, неся силу, связанную с Бездной, и развязывает разрушительную войну против Небесных Принципов.',
  'Nibelung returned to Teyvat after obtaining/bringing power associated with the Abyss and forbidden knowledge, and launched a war of vengeance against the Heavenly Principles. The conflict devastated heaven and earth; Abyssal contamination threatened the stability of the world; Celestial Nails were cast down in attempts to stabilize/purify damaged regions. The Heavenly Principles ultimately defeated Nibelung but were themselves gravely weakened, contributing to the later establishment of a new divine order. This top-level event has linked regional child events (Enkanomiya\u2019s fall, the ancient Sumeru catastrophe, Natlan\u2019s Ley Line destruction, and the ancient lunar catastrophe) rather than one giant prose entry. The date is a soft, explicitly uncertain community-index approximation; no primary source assigns the war a single exact year.',
  'Нибелунг вернулся в Тейват, обретя/принеся силу, связанную с Бездной и запретным знанием, и начал войну мести против Небесных Принципов. Конфликт опустошил небо и землю; заражение Бездной поставило под угрозу стабильность мира; были низвергнуты Небесные гвозди в попытках стабилизировать/очистить пострадавшие регионы. Небесные Принципы в итоге победили Нибелунга, но сами были тяжело ослаблены, что способствовало последующему установлению нового божественного порядка. У этого события верхнего уровня есть связанные региональные дочерние события (падение Энканомии, древняя катастрофа Сумеру, разрушение артерий земли Натлана и древняя лунная катастрофа) вместо одной большой прозаической статьи. Дата — мягкое, явно неопределённое приближение по сводным хронологиям сообщества; ни один первоисточник не называет для войны единый точный год.',
  { evidenceStatus: 'confirmed' });

evt('fall-of-enkanomiya', 'Enkanomiya falls', 'Падение Энканомии',
  rel('war-against-seven-sovereigns'), 'era-war-of-funerary-flame', ['inazuma'], ['enkanomiya'], [], [], 'catastrophe',
  ['src-before-sun-and-moon', 'src-enkanomiya-world-quests'],
  'During the ancient catastrophe, the land that became Enkanomiya falls into the depths and is cut off from the surface.', 'Во время древней катастрофы земля, ставшая Энканомией, проваливается в глубины и отрезается от поверхности.',
  'Its people called to the ruling heavenly powers; Before Sun and Moon says Istaroth did not abandon them, while the others did not answer. Linked to the War of Funerary Flame as one of its regional consequences.',
  'Его жители воззвали к правящим небесным силам; «До солнца и луны» гласит, что Истарот не покинула их, тогда как прочие не ответили. Связано с Войной погребального пламени как одно из её региональных последствий.',
  { relatedEntities: [ref('event', 'war-of-funerary-flame')], participants: ['istaroth'] });

evt('ancient-sumeru-celestial-nail', "Sumeru's Great Red Sand transformation", 'Преобразование Великих Красных песков Сумеру',
  { type: 'approximate', yearsBeforePresent: 6000, uncertainty: 2500 }, 'era-war-of-funerary-flame', ['sumeru'], ['great-red-sand-desert'],
  ['apep'], ['celestial-nail'], 'catastrophe',
  ['src-sumeru-aq-ch3-act4'],
  'A Celestial Nail and the ancient war are connected to a catastrophic environmental transformation in Sumeru.', 'Небесный гвоздь и древняя война связаны с катастрофическим экологическим преобразованием Сумеру.',
  'Apep\u2019s history and later Sumeru sources frame this period as a major rupture between the old dragon world and the new order. Do not conflate this ancient catastrophe with the much later forbidden-knowledge disaster caused by King Deshret \u2014 they are separate events.',
  'История Апеп и позднейшие источники Сумеру описывают этот период как крупный разрыв между старым миром драконов и новым порядком. Не следует путать эту древнюю катастрофу с гораздо более поздней катастрофой запретного знания, вызванной царём Дешретом, — это отдельные события.',
  { relatedEntities: [ref('event', 'war-of-funerary-flame')] });

evt('natlan-ley-line-destruction', "Natlan's Ley Lines are devastated", 'Разрушение артерий земли Натлана',
  rel('war-against-seven-sovereigns'), 'era-war-of-funerary-flame', ['natlan'], [], [], ['ley-lines'], 'catastrophe',
  ['src-natlan-dragon-history'],
  'The ancient war severely damages Natlan\u2019s original Ley Lines.', 'Древняя война серьёзно повреждает изначальные артерии земли Натлана.',
  'The later Night Kingdom functions as a reconstructed/substitute network associated with the Lord of the Night and guidance from Ronova. A crucial example of why the map and timeline need historical state: ancient Natlan before damage, the post-war damaged Ley Line state, the reconstructed Night Kingdom, and later strengthening under human/Archon systems.',
  'Позднейшее Ночное царство выступает как восстановленная/замещающая сеть, связанная с Владыкой Ночи и наставлениями Роны. Важный пример того, почему карте и хронологии нужно историческое состояние: древний Натлан до повреждения, послевоенное повреждённое состояние артерий земли, восстановленное Ночное царство и позднейшее укрепление под властью людской/архонтской систем.',
  { relatedEntities: [ref('event', 'war-of-funerary-flame')] });

evt('creation-of-night-kingdom', 'Creation of the Night Kingdom', 'Создание Ночного царства',
  rel('natlan-ley-line-destruction'), 'era-war-of-funerary-flame', ['natlan'], ['night-kingdom'], ['ronova'], ['ley-lines'], 'reconstruction',
  ['src-night-kingdom-dialogue'],
  'A reconstructed Ley Line network is created under the guidance of Ronova and the Lord of the Night.', 'Под руководством Роны и Владыки Ночи создаётся восстановленная сеть артерий земли.',
  'Substitutes for Natlan\u2019s original, war-devastated Ley Lines and later strengthens under Natlan\u2019s human/Archon system.',
  'Замещает изначальные, уничтоженные войной артерии земли Натлана и впоследствии укрепляется под людской/архонтской системой Натлана.');

evt('ancient-lunar-catastrophe', 'Ancient lunar catastrophe', 'Древняя лунная катастрофа',
  rel('war-against-seven-sovereigns'), 'era-war-of-funerary-flame', [], [], ['nibelung'], ['three-moons'], 'catastrophe',
  ['src-song-of-welkin-moon'],
  'The lunar order is violently transformed during the war: two moons are destroyed and the Frost Moon is cast beyond the false sky.', 'Лунный порядок насильственно преобразуется во время войны: две луны уничтожены, а Ледяная луна заброшена за ложное небо.',
  'Current lore links Nibelung, the Moon Goddesses, and the weaponization/destruction of moons to the later false-sky lunar state. This material is recent; primary sources and version metadata should be preserved rather than back-projecting later explanations into older books without annotation.',
  'Актуальный лор связывает Нибелунга, лунных богинь и использование/уничтожение лун с позднейшим состоянием ложного неба. Материал недавний; стоит сохранять первоисточники и версийные метаданные, а не переносить позднейшие объяснения в более старые книги без пометок.',
  { evidenceStatus: 'approximate', citationNeeded: true, createdInVersion: 'v-nod-krai', lastModifiedInVersion: 'v-nod-krai' });

evt('saarelainen-death', 'Death of Saarelainen', 'Смерть Саарелайнена',
  rel('war-of-funerary-flame', 'creation-of-gnoses'), 'era-post-war-restructuring', [], [], ['saarelainen'], ['descender'], 'death',
  ['src-hymns-of-far-north'],
  'Saarelainen, involved with Pohjola, is killed by the Heavenly Principles after breaking a prohibition.', 'Саарелайнен, связанный с Похьолой, убит Небесными Принципами после нарушения запрета.',
  'Occurred after the War of Funerary Flame and before the Archon War. His remains were subsequently divided and used, alongside those of another figure described as "one who came after," in the creation of the seven Gnoses.',
  'Произошло после Войны погребального пламени и до Войны Архонтов. Его останки были впоследствии разделены и использованы вместе с останками ещё одной фигуры, описанной как «тот, кто пришёл после», для создания семи Гнозисов.',
  { evidenceStatus: 'strongly-implied', createdInVersion: 'v-nod-krai', lastModifiedInVersion: 'v-nod-krai' });

evt('creation-of-gnoses', 'Creation of the Gnoses', 'Создание Гнозисов',
  rel('saarelainen-death'), 'era-post-war-restructuring', [], [], ['saarelainen'], ['gnosis'], 'creation',
  ['src-fontaine-aq-finale', 'src-neuvillette-character-story-vision'],
  'The seven Gnoses are made from the remains of the Third Descender.', 'Семь Гнозисов создаются из останков Третьего Сошедшего.',
  'Fontaine\u2019s Archon Quest established this as "the Third Descender\u2019s remains"; newer material identifies Saarelainen as the Third Descender. The creation also involved another figure described only as "one who came after," whose identity and role remain unresolved.',
  'Архонтский квест Фонтейна установил это как «останки Третьего Сошедшего»; новейшие материалы отождествляют Саарелайнена с Третьим Сошедшим. В создании также участвовала ещё одна фигура, описанная лишь как «тот, кто пришёл после», чья личность и роль остаются невыясненными.',
  { evidenceStatus: 'strongly-implied' });

evt('archon-war-end', 'End of the Archon War', 'Конец Войны Архонтов',
  { type: 'approximate', yearsBeforePresent: 2000, uncertainty: 100 }, 'era-archon-war', [], [], ['venti', 'zhongli'], ['archons'], 'war-conclusion',
  ['src-before-sun-and-moon'],
  'The final divine seat is claimed, establishing the Seven as the dominant divine-political order.', 'Занимается последний божественный престол, устанавливая Семерых как господствующий божественно-политический порядок.',
  'Only Barbatos (Venti) and Morax (Zhongli) remained from the original Seven into the modern era; other seats changed holders over time. Current lore links the Seven-seat system to the post-War-of-Funerary-Flame restructuring of the world, but exact causal steps remain claims with sources rather than one simplified sentence.',
  'Из изначальной Семёрки до современности сохранились только Барбатос (Венти) и Моракс (Чжун Ли); прочие престолы со временем сменили обладателей. Актуальный лор связывает систему Семи престолов с послевоенным переустройством мира после Войны погребального пламени, но точные причинные шаги остаются утверждениями с источниками, а не одной упрощённой фразой.');

evt('deshret-forbidden-knowledge-crisis', "King Deshret's forbidden-knowledge crisis", 'Кризис запретного знания царя Дешрета',
  rel('archon-war-end', 'cataclysm'), 'era-age-of-the-seven', ['sumeru'], ['great-red-sand-desert'], ['king-deshret', 'greater-lord-rukkhadevata', 'apep'], ['forbidden-knowledge'], 'catastrophe',
  ['src-sumeru-aq-ch3-act4', 'src-sumeru-aq-ch3-act5', 'src-lay-of-al-ahmar', 'src-staff-of-scarlet-sands'],
  'King Deshret\u2019s pursuit of forbidden knowledge causes a catastrophic outbreak in the desert; he ultimately sacrifices himself to end it.', 'Стремление царя Дешрета к запретному знанию вызывает катастрофическую вспышку в пустыне; в итоге он жертвует собой, чтобы положить ей конец.',
  'Consequences included collapse/devastation of his civilization, madness and disease among his people, and phenomena associated with the Withering and Eleazar. Greater Lord Rukkhadevata intervened and nearly exhausted her power. Apep was later affected through her connection to Deshret and the forbidden knowledge he had obtained. Several thousand years before the Cataclysm; exact date approximate.',
  'Последствия включали крах/опустошение его цивилизации, безумие и болезни среди его народа, а также явления, связанные с Иссушением и Элеазаром. Великий Владыка Рукхадевата вмешалась и почти исчерпала свою силу. Апеп впоследствии пострадала из-за связи с Дешретом и обретённым им запретным знанием. Произошло за несколько тысяч лет до Катаклизма; точная дата приблизительна.');

const cataclysmDate = { type: 'approximate', yearsBeforePresent: 500, uncertainty: 20 };

evt('cataclysm', 'The Cataclysm', 'Катаклизм',
  cataclysmDate, 'era-cataclysm', ['khaenriah', 'mondstadt', 'inazuma', 'sumeru', 'fontaine', 'natlan'], [], [], ['forbidden-knowledge', 'abyss'], 'catastrophe',
  ['src-where-boat-of-consciousness-lies'],
  'Khaenri\u2019ah falls, Abyssal corruption spreads across Teyvat, and multiple nations experience simultaneous disaster.', 'Каэнри’ах падает, заражение Бездной распространяется по Тейвату, и несколько наций одновременно переживают катастрофу.',
  'One of the most important synchronized events in the entire timeline: Khaenri\u2019ah fell; Abyssal monsters and corruption spread; several major gods/Archons died or disappeared; Irminsul was polluted by forbidden knowledge; the Traveler\u2019s sibling witnessed Khaenri\u2019ah\u2019s destruction; the consequences produced political and religious transformations still active in the present. The exact order of many Cataclysm events remains unresolved; it functions here as a parent event, connected to (not merged with) its regional child events via relatedEntities.',
  'Одно из важнейших синхронизированных событий всей хронологии: Каэнри’ах пал; распространились бездненские монстры и заражение; погибли или исчезли несколько крупных богов/Архонтов; Ирминсуль был заражён запретным знанием; сиблинг Путника стал свидетелем уничтожения Каэнри’ах; последствия вызвали политические и религиозные перемены, действующие и поныне. Точный порядок многих событий Катаклизма остаётся неясным; здесь оно выступает как родительское событие, связанное (а не слитое) со своими региональными дочерними событиями через relatedEntities.',
  { evidenceStatus: 'confirmed' });

const cataclysmChild = (id, name, ru, regions, locations, participants, relatedTerms, summaryEn, summaryRu, descEn, descRu, sources, extra = {}) =>
  evt(id, name, ru, cataclysmDate, 'era-cataclysm', regions, locations, participants, relatedTerms, 'catastrophe', sources, summaryEn, summaryRu, descEn, descRu,
    { relatedEntities: [ref('event', 'cataclysm')], evidenceStatus: 'confirmed', ...extra });

cataclysmChild('fall-of-khaenriah', "Fall of Khaenri'ah", 'Падение Каэнри’ах',
  ['khaenriah'], [], ['rhinedottir', 'dainsleif'], ['abyss', 'forbidden-knowledge'],
  "Khaenri'ah is destroyed; the Heavenly Principles, gods, and Abyssal power are all involved, without a single clean cause.", 'Каэнри’ах уничтожен; в этом участвуют Небесные Принципы, боги и сила Бездны — без единой ясной причины.',
  'The game deliberately withholds a clean single-cause explanation. Separate claims/considerations should be maintained for: Khaenri\u2019ah\u2019s use/research of Abyssal power; actions of the Five Sinners; Rhinedottir\u2019s creations; intervention of the Heavenly Principles; curses placed on survivors; the Traveler\u2019s sibling\u2019s role; and the differing perspectives of Dainsleif and Pierro. Survivors were subjected to curses; important distinctions exist between pure-blooded Khaenri\u2019ahns and others, and hilichurl populations existed earlier than the Cataclysm even though it transformed/created a major population of them.',
  'Игра намеренно избегает единого простого объяснения. Следует сохранять отдельные утверждения/соображения по: использованию/исследованию силы Бездны Каэнри’ах; действиям Пятерых Грешников; созданиям Ринхедоттир; вмешательству Небесных Принципов; проклятиям, наложенным на уцелевших; роли сиблинга Путника; и различающимся точкам зрения Дайнслейфа и Пьеро. Уцелевшие подверглись проклятиям; существуют важные различия между чистокровными жителями Каэнри’ах и прочими, а популяции хиличурлов существовали раньше Катаклизма, даже если он преобразовал/создал значительную их часть.',
  ['src-fontaine-aq-masquerade', 'src-perinheri'],
  { evidenceStatus: 'disputed', participants: ['rhinedottir', 'dainsleif', 'pierro', 'traveler-sibling'] });

cataclysmChild('irminsul-cataclysm-corruption', 'Irminsul polluted during the Cataclysm', 'Заражение Ирминсуля во время Катаклизма',
  ['sumeru'], [], ['greater-lord-rukkhadevata', 'nahida'], ['forbidden-knowledge', 'irminsul'],
  'Forbidden knowledge again pollutes Irminsul; Rukkhadevata fights the contamination and creates/uses Nahida as part of the solution.', 'Запретное знание вновь заражает Ирминсуль; Рукхадевата борется с заражением и создаёт/использует Нахиду как часть решения.',
  'Because Rukkhadevata herself became contaminated, simply removing the external pollution was insufficient. See also the later, present-day "rukkhadevata-irminsul-erasure" event.',
  'Поскольку сама Рукхадевата оказалась заражена, простое устранение внешнего заражения оказалось недостаточным. См. также позднейшее, современное событие «rukkhadevata-irminsul-erasure».',
  ['src-where-boat-of-consciousness-lies']);

cataclysmChild('death-of-makoto', 'Death of Makoto', 'Смерть Макото',
  ['inazuma'], [], ['makoto', 'ei'], [],
  "Makoto dies in Khaenri'ah after going there while Ei remained behind; her death leads to Ei becoming the sole Electro Archon.", 'Макото гибнет в Каэнри’ах, куда отправилась, пока Эи оставалась позади; её смерть приводит к тому, что Эи становится единственным Архонтом Электро.',
  'Kitsune Saiguu was lost and Chiyo was corrupted during the same broad conflict; these are tracked as separate, individually-sourced Inazuman losses rather than folded into this record.',
  'Лисья Сайгу была утрачена, а Тиё заражена в ходе того же общего конфликта; они отслеживаются как отдельные, индивидуально подкреплённые источниками утраты Инадзумы, а не сливаются с этой записью.',
  ['src-raiden-shogun-story-quest-act2']);

cataclysmChild('sacred-sakura-temporal-event', "The Sacred Sakura's temporal anomaly", 'Временная аномалия Сакральной сакуры',
  ['inazuma'], [], ['makoto', 'ei', 'istaroth'], [],
  'The Sacred Sakura\u2019s history contains an unusual temporal anomaly tied to Makoto, Ei, and Istaroth.', 'История Сакральной сакуры содержит необычную временн\u00f3ю аномалию, связанную с Макото, Эи и Истарот.',
  'A particularly important time-anomaly event that should not be forced into ordinary linear causality without notes; marked disputed pending fuller primary-source reconciliation.',
  'Особенно важное событие с временн\u00f3й аномалией, которое не следует принудительно втискивать в обычную линейную причинность без пояснений; помечено как спорное до более полного согласования с первоисточниками.',
  ['src-raiden-shogun-story-quest-act2'],
  { date: { type: 'approximate', yearsBeforePresent: 500, uncertainty: 50 }, evidenceStatus: 'disputed' });

cataclysmChild('durin-attack-on-mondstadt', "Durin's attack on Mondstadt", 'Нападение Дурина на Мондштадт',
  ['mondstadt'], ['dragonspine'], ['venti', 'dvalin', 'durin'], [],
  "Rhinedottir's creation Durin attacks Mondstadt; Dvalin fights Durin, with Barbatos (Venti) involved in the defense, and Durin is defeated over Dragonspine.", 'Создание Ринхедоттир Дурин нападает на Мондштадт; Двалин сражается с Дурином при участии Барбатоса (Венти) в защите, и Дурин повержен над Драконьим Хребтом.',
  "Durin's corrupted blood later becomes part of Dragonspine's ongoing environmental/lore state and affects Dvalin.",
  'Заражённая кровь Дурина позднее становится частью продолжающегося экологического/лорного состояния Драконьего Хребта и влияет на Двалина.',
  ['src-durin-dragonspine-material', 'src-dvalin-venti-story-material'],
  { relatedEntities: [ref('event', 'cataclysm'), ref('character', 'rhinedottir')] });

cataclysmChild('death-of-egeria', 'Death of Egeria', 'Смерть Эгерии',
  ['fontaine'], ['tunigi-hollow'], ['egeria'], [],
  'The previous Hydro Archon Egeria dies during the Cataclysm; her remains become the Amrita.', 'Предшествующий Архонт Гидро Эгерия погибает во время Катаклизма; её останки становятся Амритой.',
  'A divine bird, the Simurgh \u2014 created from Khvarena associated with Nabu Malikata\u2019s preparations for the disaster \u2014 later sacrifices herself and disperses into Khvarena/Pari-related forms to resist the corruption. This event crosses region categories and should not be forced into only Fontaine or only Sumeru.',
  'Божественная птица Симург — созданная из Хварены, связанной с подготовкой Набу Маликаты к катастрофе, — впоследствии жертвует собой и рассеивается на формы, связанные с Хвареной/Пари, чтобы противостоять заражению. Это событие пересекает границы регионов и не должно относиться только к Фонтейну или только к Сумеру.',
  ['src-khvarena-of-good-and-evil']);

evt('creation-of-harvisptokhm', 'Creation of the Harvisptokhm', 'Создание Харвисптокхма',
  rel('death-of-egeria'), 'era-cataclysm', ['fontaine'], ['tunigi-hollow'], ['greater-lord-rukkhadevata', 'egeria'], [], 'creation',
  ['src-khvarena-of-good-and-evil'],
  'Greater Lord Rukkhadevata grows the Harvisptokhm to anchor Egeria\u2019s consciousness and help seal/contain Abyssal defilement.', 'Великий Владыка Рукхадевата выращивает Харвисптокхм, чтобы закрепить сознание Эгерии и помочь запечатать/сдержать заражение Бездной.',
  'Uses Egeria\u2019s post-mortem state (the Amrita) as a growth medium; directly follows her death during the Cataclysm.',
  'Использует посмертное состояние Эгерии (Амриту) как питательную среду; напрямую следует за её смертью во время Катаклизма.',
  { relatedEntities: [ref('event', 'cataclysm'), ref('event', 'death-of-egeria')] });

cataclysmChild('natlan-cataclysm-invasion', 'Cataclysm-era invasion of the Night Kingdom', 'Вторжение эпохи Катаклизма в Ночное царство',
  ['natlan'], ['night-kingdom'], [], ['ley-lines'],
  'The Abyss invades Natlan and threatens the already-reconstructed Night Kingdom.', 'Бездна вторгается в Натлан и угрожает уже восстановленному Ночному царству.',
  'Connects to the ancient War of Funerary Flame \u2192 destruction of Natlan\u2019s original Ley Lines \u2192 creation/reconstruction of the Night Kingdom \u2192 later development of Natlan\u2019s human/Archon system \u2192 this Cataclysm invasion \u2192 centuries of continued resistance against Abyssal erosion. Individual Natlan events from specific Archon Quests and tribal histories remain to be populated in a future pass.',
  'Связано с цепочкой: древняя Война погребального пламени → уничтожение изначальных артерий земли Натлана → создание/восстановление Ночного царства → позднейшее развитие людской/архонтской системы Натлана → это вторжение эпохи Катаклизма → последующие века сопротивления эрозии Бездны. Отдельные события Натлана из конкретных архонтских квестов и племенных историй предстоит внести в будущем проходе.',
  ['src-natlan-archon-quests'],
  { relatedEntities: [ref('event', 'cataclysm'), ref('event', 'natlan-ley-line-destruction'), ref('event', 'creation-of-night-kingdom')] });

// -- Present-day / Traveler's Journey revelations -----------------------------

evt('rukkhadevata-irminsul-erasure', "Rukkhadevata's Irminsul erasure", 'Стирание Рукхадеваты из Ирминсуля',
  rel('cataclysm'), 'era-travelers-journey', ['sumeru'], [], ['greater-lord-rukkhadevata', 'nahida'], ['irminsul', 'forbidden-knowledge'], 'information-state',
  ['src-sumeru-aq-ch3-act5', 'src-where-boat-of-consciousness-lies'],
  "Rukkhadevata's remaining polluted existence is removed from Irminsul, eliminating the forbidden-knowledge contamination still active within it.", 'Оставшееся заражённое существование Рукхадеваты удаляется из Ирминсуля, устраняя всё ещё активное в нём заражение запретным знанием.',
  'Present-day Sumeru Archon Quest event. This is the clearest in-game example of why the encyclopedia distinguishes objective research knowledge from current in-world memory: see the memoryNote field on this record.',
  'Событие нынешнего архонтского квеста Сумеру. Это самый наглядный пример того, зачем энциклопедия различает объективное исследовательское знание и нынешнюю внутримировую память: см. поле memoryNote в этой записи.',
  {
    evidenceStatus: 'confirmed',
    memoryNote: {
      objective: L(
        'Greater Lord Rukkhadevata was a distinct predecessor Dendro Archon who fought Deshret\u2019s ancient crisis and the Cataclysm-era Irminsul pollution, became contaminated herself, and created/used a successor incarnation (Nahida) before her remaining polluted existence was erased from Irminsul.',
        'Великий Владыка Рукхадевата была отдельным предшествующим Архонтом Дендро, сражавшимся с древним кризисом Дешрета и заражением Ирминсуля эпохи Катаклизма, сама оказалась заражена и создала/использовала преемное воплощение (Нахиду), прежде чем её оставшееся заражённое существование было стёрто из Ирминсуля.'),
      currentMemory: L(
        'After the erasure, Teyvat-native memories and records reorganized: Nahida is remembered as the Dendro Archon who had always occupied the relevant historical role but had lost power/memory, without a separate predecessor. The Traveler alone retains the original history, as a Descender exception to Irminsul\u2019s ordinary memory system.',
        'После стирания память и записи, доступные уроженцам Тейвата, реорганизовались: Нахида помнится как Архонт Дендро, всегда занимавший эту историческую роль, но утративший силу/память, без отдельного предшественника. Только Путник сохраняет изначальную историю — как исключение статуса Сошедшего из обычной системы памяти Ирминсуля.'),
    },
  });

evt('destruction-of-hydro-divine-throne', "Destruction of the Hydro Archon's Divine Throne", 'Разрушение Божественного Престола Архонта Гидро',
  rel('cataclysm'), 'era-travelers-journey', ['fontaine'], [], ['focalors', 'neuvillette'], ['divine-throne'], 'destruction',
  ['src-fontaine-aq-focalors-climax'],
  "Focalors' long plan culminates in the destruction of the Hydro Archon's Divine Throne; her divine self dies.", 'Долгий план Фокалорс завершается разрушением Божественного Престола Архонта Гидро; её божественная сущность гибнет.',
  'Present-day Fontaine Archon Quest event, immediately followed by the restoration of Hydro Authority to Neuvillette.',
  'Событие нынешнего архонтского квеста Фонтейна, сразу за которым следует возвращение Прерогативы Гидро Невилету.',
  { evidenceStatus: 'confirmed' });

evt('restoration-of-hydro-authority', 'Restoration of Hydro Authority to Neuvillette', 'Возвращение Прерогативы Гидро Невилету',
  rel('destruction-of-hydro-divine-throne'), 'era-travelers-journey', ['fontaine'], [], ['neuvillette', 'focalors'], ['elemental-authority', 'gnosis', 'divine-throne'], 'restoration',
  ['src-fontaine-aq-focalors-climax', 'src-neuvillette-character-story-vision'],
  'The stolen Hydro Authority returns to Neuvillette, the Hydro Dragon Sovereign, after the Divine Throne\u2019s destruction.', 'Похищенная Прерогатива Гидро возвращается Невилету, Владыке-дракону Гидро, после разрушения Божественного Престола.',
  'With restored Authority, Neuvillette transforms the nature/status of Fontainians so they no longer dissolve when the prophecy\u2019s flood arrives. The Hydro Gnosis remained a separate object and was subsequently transferred away \u2014 the clearest proof that Gnosis \u2260 Divine Throne \u2260 Sovereign Authority.',
  'С восстановленной Прерогативой Невилет изменяет природу/статус фонтейнцев, чтобы те больше не растворялись с приходом пророческого потопа. Гнозис Гидро остался отдельным предметом и впоследствии был передан дальше — самое наглядное доказательство того, что Гнозис ≠ Божественный Престол ≠ Прерогатива Владыки.',
  { evidenceStatus: 'confirmed' });

console.log('events written');

// ---------------------------------------------------------------------------
// PASS — Relationships. Schema note: Relationship is intentionally
// character<->character only (it renders on both character pages). Links
// between a character and a Term/Event concept (e.g. "Nibelung -> Heavenly
// Principles", "Third Descender -> Gnoses") are expressed via relatedEntities
// on the relevant records instead of forcing a schema change here.
// ---------------------------------------------------------------------------
const relationship = (id, sourceCharacter, targetCharacter, typeEn, typeRu, introducedInVersion, sources, extra = {}) =>
  write(`relationships/${id}.json`, base(id, 'relationship', L(typeEn, typeRu), L(typeEn, typeRu), {
    sourceCharacter, targetCharacter, relationshipType: L(typeEn, typeRu), introducedInVersion, sources,
    ...extra,
  }));

relationship('makoto-ei', 'makoto', 'ei', 'Twin / original Electro Archon and successor', 'Близнец / изначальный и преемный Архонт Электро',
  'v-inazuma', ['src-raiden-shogun-story-quest-act2'], { evidenceStatus: 'confirmed' });

relationship('focalors-egeria', 'focalors', 'egeria', 'Successor as Hydro Archon', 'Преемница на посту Архонта Гидро',
  'v-fontaine', ['src-khvarena-of-good-and-evil'], { evidenceStatus: 'confirmed' });

relationship('focalors-neuvillette', 'focalors', 'neuvillette', 'Returned Hydro Authority through destruction of the Divine Throne', 'Вернула Прерогативу Гидро, разрушив Божественный Престол',
  'v-fontaine', ['src-fontaine-aq-focalors-climax'], { evidenceStatus: 'confirmed' });

relationship('rhinedottir-durin', 'rhinedottir', 'durin', 'Creator', 'Создательница',
  'v-mondstadt-liyue', ['src-caribert', 'src-durin-dragonspine-material'], { evidenceStatus: 'confirmed' });

relationship('venti-dvalin-defense-of-mondstadt', 'venti', 'dvalin', "Allies in Mondstadt's defense against Durin", 'Союзники в защите Мондштадта от Дурина',
  'v-mondstadt-liyue', ['src-dvalin-venti-story-material', 'src-durin-dragonspine-material'], { evidenceStatus: 'confirmed' });

console.log('relationships written');

// ---------------------------------------------------------------------------
// PASS — Claims. Meaningful, evidence-bearing research units (not one per sentence).
// ---------------------------------------------------------------------------
const claim = (id, subject, statementEn, statementRu, introducedInVersion, status, evidenceStatus, sources, extra = {}) =>
  write(`claims/${id}.json`, base(id, 'claim', L(statementEn.slice(0, 60) + (statementEn.length > 60 ? '\u2026' : ''), statementRu.slice(0, 60) + (statementRu.length > 60 ? '\u2026' : '')), L(statementEn, statementRu), {
    subject, statement: L(statementEn, statementRu), introducedInVersion, status, evidenceStatus, sources,
    ...extra,
  }));

claim('claim-traveler-fourth-descender', ref('character', 'traveler'),
  'The Traveler is identified in-game as the Fourth Descender, a being of extraordinary will capable of rivaling an entire world.',
  'В игре Путник определён как Четвёртый Сошедший — существо с исключительной волей, способное соперничать с целым миром.',
  'v-fontaine', 'current', 'confirmed', ['src-narzissenkreuz-world-quest', 'src-fontaine-aq-finale']);

claim('claim-gnoses-from-third-descender', ref('term', 'gnosis'),
  "The seven Gnoses were created from the remains of the Third Descender, later identified by northern/Nod-Krai material as Saarelainen; the direct identity chain was revealed across sources released years apart and both stages should be preserved.",
  'Семь Гнозисов были созданы из останков Третьего Сошедшего, позднее отождествлённого северными материалами Нод-Края с Саарелайненом; прямая цепочка отождествления была раскрыта источниками с разницей в годы, и обе стадии стоит сохранять.',
  'v-nod-krai', 'current', 'strongly-implied', ['src-fontaine-aq-finale', 'src-hymns-of-far-north']);

claim('claim-forbidden-knowledge-outside-world', ref('term', 'forbidden-knowledge'),
  "Forbidden Knowledge does not belong to Teyvat's ordinary world; per Greater Lord Rukkhadevata, it originates from the depths of the Abyss and is rejected by the world itself.",
  'Запретное знание не принадлежит обычному миру Тейвата; по словам Великого Владыки Рукхадеваты, оно происходит из глубин Бездны и отвергнуто самим миром.',
  'v-sumeru', 'current', 'confirmed', ['src-where-boat-of-consciousness-lies']);

claim('claim-natlan-ley-lines-damaged-ancient-war', ref('event', 'natlan-ley-line-destruction'),
  "Natlan's original Ley Lines were damaged in the ancient War of Funerary Flame, requiring the reconstructed Night Kingdom as a substitute network.",
  'Изначальные артерии земли Натлана были повреждены в древней Войне погребального пламени, что потребовало восстановленного Ночного царства как замещающей сети.',
  'v-natlan', 'current', 'confirmed', ['src-natlan-dragon-history']);

claim('claim-hydro-authority-returned-to-neuvillette', ref('character', 'neuvillette'),
  "Hydro Authority, previously incorporated into the Hydro Archon's divine system, returned in full to Neuvillette after Focalors destroyed the Hydro Archon's Divine Throne \u2014 distinct from possession of the Hydro Gnosis.",
  'Прерогатива Гидро, ранее включённая в божественную систему Архонта Гидро, полностью вернулась к Невилету после того, как Фокалорс разрушила Божественный Престол Архонта Гидро, — это отличается от обладания Гнозисом Гидро.',
  'v-fontaine', 'current', 'confirmed', ['src-fontaine-aq-focalors-climax']);

claim('claim-irminsul-rewrite-not-physical-undo', ref('term', 'irminsul'),
  "Irminsul rewriting changes memories and accessible records, not the underlying physical past: removing information from Irminsul does not undo the events themselves, only how they are remembered and documented.",
  'Переписывание Ирминсуля меняет память и доступные записи, но не изменяет само физическое прошлое: удаление сведений из Ирминсуля не отменяет сами события, а лишь то, как они помнятся и документируются.',
  'v-sumeru', 'current', 'confirmed', ['src-where-boat-of-consciousness-lies', 'src-sumeru-aq-ch3-act5']);

claim('claim-saarelainen-is-third-descender', ref('character', 'saarelainen'),
  'Saarelainen, the "Stranger of Winter\u2019s Day," is strongly implied by northern/Nod-Krai material to be the Third Descender whose remains Fontaine\u2019s Archon Quest had already identified as the Gnoses\u2019 origin; treat as a strong identification, not yet an unqualified confirmed fact.',
  'Саарелайнен, «Странник зимнего дня», согласно северным материалам Нод-Края, косвенно, но убедительно отождествляется с Третьим Сошедшим, чьи останки архонтский квест Фонтейна уже определил как источник Гнозисов; следует считать это убедительным, но пока не безусловно подтверждённым отождествлением.',
  'v-nod-krai', 'current', 'strongly-implied', ['src-hymns-of-far-north', 'src-fontaine-aq-finale']);

claim('claim-sibling-recorded-by-irminsul', ref('character', 'traveler-sibling'),
  "Unlike the Traveler, the Traveler's sibling is recorded by Irminsul as belonging to Teyvat; the reason for this difference is an unresolved mystery and should not be given an unconfirmed origin explanation.",
  'В отличие от Путника, сиблинг Путника записан Ирминсулем как принадлежащий Тейвату; причина этого различия — нерешённая загадка, которой не следует приписывать неподтверждённое объяснение происхождения.',
  'v-fontaine', 'disputed', 'disputed', ['src-fontaine-aq-masquerade']);

console.log('claims written');

// ---------------------------------------------------------------------------
// PASS — Upgrade pre-existing demo records that now have researched replacements.
// IDs, and fields the automated test suite depends on (venti's Barbatos alias,
// demo-event-mondstadt's own date/participants), are deliberately left intact.
// ---------------------------------------------------------------------------
upgrade('characters/venti.json', {
  description: L('Bard of Mondstadt and, as Barbatos, the Anemo Archon \u2014 one of only two original Seven to remain in the modern era.', 'Бард Мондштадта и, как Барбатос, Архонт Анемо — один из двух представителей изначальной Семёрки, сохранившихся до современности.'),
  demo: false, citationNeeded: false, evidenceStatus: 'confirmed', reviewStatus: 'needs-review',
  createdInVersion: 'demo-1', lastModifiedInVersion: 'v-mondstadt-liyue', lastReviewedInVersion: 'demo-1',
  sources: ['src-dvalin-venti-story-material', 'src-before-sun-and-moon'],
  titles: [L('Barbatos', 'Барбатос'), L('Anemo Archon', 'Архонт Анемо')],
  affiliations: [L('The Seven', 'Семеро')],
  species: L('God (Archon) / former wind spirit', 'Бог (Архонт) / бывший дух ветра'),
  status: L('Active, present era', 'Действующий, современная эпоха'),
  category: 'playable',
  eras: ['era-archon-war', 'era-cataclysm', 'era-post-cataclysm'],
  biography: L(
    'One of the original Seven who claimed a divine seat at the end of the Archon War, alongside Morax (Zhongli); of the original Seven, only these two remained by the present era. During the Cataclysm, when Rhinedottir\u2019s creation Durin attacked Mondstadt, Venti was involved in the city\u2019s defense while Dvalin fought Durin directly over Dragonspine.',
    'Один из изначальной Семёрки, занявший божественный престол по итогам Войны Архонтов, вместе с Мораксом (Чжун Ли); из изначальной Семёрки до современности сохранились только они двое. Во время Катаклизма, когда создание Ринхедоттир Дурин напал на Мондштадт, Венти участвовал в защите города, пока Двалин сражался с Дурином напрямую над Драконьим Хребтом.'),
  relatedLocations: ['dragonspine'],
  relatedTerms: ['irminsul', 'archons', 'the-seven'],
});

upgrade('characters/zhongli.json', {
  description: L('Consultant of the Wangsheng Funeral Parlor and, as Morax, the Geo Archon \u2014 one of only two original Seven to remain in the modern era.', 'Консультант похоронного бюро «Ваншэн» и, как Моракс, Архонт Гео — один из двух представителей изначальной Семёрки, сохранившихся до современности.'),
  demo: false, citationNeeded: false, evidenceStatus: 'confirmed', reviewStatus: 'needs-review',
  createdInVersion: 'demo-1', lastModifiedInVersion: 'v-mondstadt-liyue', lastReviewedInVersion: 'demo-1',
  sources: ['src-before-sun-and-moon'],
  titles: [L('Morax', 'Моракс'), L('Geo Archon', 'Архонт Гео')],
  affiliations: [L('The Seven', 'Семеро')],
  species: L('God (Archon) / former dragon-adjacent power', 'Бог (Архонт) / бывшая сила, близкая к драконьей'),
  status: L('Active, present era', 'Действующий, современная эпоха'),
  category: 'playable',
  eras: ['era-archon-war', 'era-age-of-the-seven'],
  biography: L(
    'One of the original Seven who claimed a divine seat at the end of the Archon War, alongside Barbatos (Venti); of the original Seven, only these two remained by the present era. His deeper pre-Archon-War history (dragon-adjacent status, exact role in the old order) is not detailed by this research pass and remains open for a future, more focused Liyue-history ingestion.',
    'Один из изначальной Семёрки, занявший божественный престол по итогам Войны Архонтов, вместе с Барбатосом (Венти); из изначальной Семёрки до современности сохранились только они двое. Его более глубокая история до Войны Архонтов (близость к драконьему статусу, точная роль в старом порядке) не раскрыта в этом исследовательском проходе и остаётся открытой для будущей, более сфокусированной загрузки истории Ли Юэ.'),
  relatedLocations: [],
  relatedTerms: ['archons', 'the-seven', 'seven-sovereigns'],
});

upgrade('characters/dvalin.json', {
  description: L('An ancient dragon bound to Mondstadt, ally of Barbatos (Venti), who fought Durin during the Cataclysm.', 'Древний дракон, связанный с Мондштадтом, союзник Барбатоса (Венти), сражавшийся с Дурином во время Катаклизма.'),
  demo: false, citationNeeded: false, evidenceStatus: 'confirmed', reviewStatus: 'needs-review',
  createdInVersion: 'demo-1', lastModifiedInVersion: 'v-mondstadt-liyue', lastReviewedInVersion: 'demo-1',
  sources: ['src-durin-dragonspine-material', 'src-dvalin-venti-story-material'],
  titles: [L('Stormterror', 'Ужас бури')],
  affiliations: [L('Mondstadt', 'Мондштадт')],
  species: L('Dragon', 'Дракон'),
  status: L('Active, present era', 'Действующий, современная эпоха'),
  category: 'historical-figure',
  eras: ['era-cataclysm'],
  biography: L(
    "During the Cataclysm, Rhinedottir's creation Durin attacked Mondstadt; Dvalin fought Durin directly, with Barbatos (Venti) involved in the wider defense of the city, and Durin was defeated over Dragonspine. Durin's corrupted blood subsequently affected Dvalin and remains part of Dragonspine's ongoing environmental/lore state.",
    'Во время Катаклизма создание Ринхедоттир Дурин напал на Мондштадт; Двалин сражался с Дурином напрямую, при участии Барбатоса (Венти) в более широкой защите города, и Дурин был повержен над Драконьим Хребтом. Заражённая кровь Дурина впоследствии повлияла на Двалина и остаётся частью продолжающегося экологического/лорного состояния Драконьего Хребта.'),
  relatedLocations: ['dragonspine'],
  relatedTerms: [],
});

upgrade('regions/khaenriah.json', {
  description: L('A human civilization that existed outside the ordinary rule of the gods and the Seven, destroyed in the Cataclysm approximately 500 years ago.', 'Людская цивилизация, существовавшая вне обычной власти богов и Семи, уничтоженная в Катаклизме примерно 500 лет назад.'),
  demo: false, citationNeeded: true, evidenceStatus: 'confirmed', reviewStatus: 'needs-review',
  createdInVersion: 'demo-1', lastModifiedInVersion: 'v-fontaine', lastReviewedInVersion: 'demo-1',
  sources: ['src-caribert', 'src-fontaine-aq-masquerade', 'src-perinheri'],
  civilizations: [L('Eclipse Dynasty (ruled by King Irmin)', 'Династия Затмения (под правлением царя Ирмина)')],
  organizations: [L('Five Sinners', 'Пятеро Грешников')],
});

console.log('demo-record upgrades applied');
console.log('DONE');

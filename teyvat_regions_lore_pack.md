# Teyvat Regional Lore Research Pack

**Research snapshot:** 24 September 2026\
**Purpose:** second structured ingestion pack for the bilingual EN/RU
Teyvat lore encyclopedia.\
**Companion file:** `teyvat_core_lore_research_pack.md`\
**Scope:** regional history, civilizations, gods, historical figures,
locations, regional event chains, and cross-region chronology.

> This file is a structured research layer, not finished encyclopedia
> prose. Preserve uncertainty, narrator bias, localization differences,
> and contradictory accounts. Community-maintained timelines may be used
> as indexes to primary material, but final Source records should point
> to named in-game/official sources wherever possible.

------------------------------------------------------------------------

# 0. Import rules

## Evidence statuses

-   **CONFIRMED** --- directly stated or strongly corroborated by
    primary material.
-   **STRONGLY IMPLIED** --- conclusion strongly follows from the
    sources but is not stated in exactly that form.
-   **APPROXIMATE** --- broad placement is reliable, exact date/order is
    not.
-   **DISPUTED / UNRESOLVED** --- sources conflict or the story
    intentionally withholds the answer.
-   **THEORY --- DO NOT IMPORT AS FACT** --- useful research lead only.

## Historical dates

Use `exact`, `approximate`, `range`, `relative`, or `unknown`.

Never assign a convenient BP value solely to position an event on the
visual timeline.

## Geography

A location can be: - confirmed; - approximate; - speculative.

A historical territory must never receive precise borders unless primary
material justifies them.

## Cross-region synchronization

Only place two events on the same chronological line when the evidence
actually supports comparable dating. Otherwise represent them as
belonging to a broad era, not as simultaneous events.

------------------------------------------------------------------------

# 1. MONDSTADT

## 1.1 Regional identity

**Region:** Mondstadt\
**Elemental/Archon tradition:** Anemo / Barbatos\
**Central historical themes:** freedom, rebellion against enclosed rule,
wind, migration, aristocratic tyranny, dragons, Cataclysm.

Mondstadt's modern political identity is rooted in repeated rejection of
concentrated rule. Its history is not simply "Barbatos created a free
nation": the region passed through multiple political orders and several
rebellions.

High-priority historical layers:

1.  ancient Mondstadt before the current city;
2.  Decarabian and Old Mondstadt;
3.  Andrius and the frozen/wind-swept environment;
4.  rebellion against Decarabian;
5.  Barbatos' rise;
6.  establishment of the modern city and Four Winds tradition;
7.  aristocratic era;
8.  Vanessa's rebellion;
9.  Cataclysm / Durin;
10. present-day Dvalin crisis and aftermath.

------------------------------------------------------------------------

## 1.2 Decarabian and Old Mondstadt

**Entity:** Decarabian\
**Type:** God / historical ruler\
**Status:** CONFIRMED

Decarabian, the God of Storms, ruled a city enclosed by a great storm
barrier in the area now known as Stormterror's Lair / Old Mondstadt.

His barrier protected inhabitants from the hostile conditions outside,
especially the freezing winds associated with Andrius. However, his rule
became oppressive from the perspective of his people.

Important nuance: Decarabian did not necessarily understand himself as a
tyrant. Sources frame him as unable to understand why his subjects
rejected his protection and control.

Create: - `decarabian` - `old-mondstadt` - `stormterror-lair` -
`decarabian-rule` - `old-mondstadt-rebellion`

------------------------------------------------------------------------

## 1.3 Andrius

**Entity:** Andrius / Lupus Boreas\
**Type:** God / wolf deity\
**Status:** CONFIRMED

Andrius was one of the major divine powers active during Mondstadt's
Archon War period. His blizzards and freezing winds contributed to the
hostile climate outside Decarabian's city.

Andrius ultimately did not become the Anemo Archon. He concluded that he
was unsuited to human life and relinquished his physical form/power
rather than rule humanity.

His spiritual legacy persisted as Lupus Boreas and later as one of the
Four Winds.

Do not reduce the Decarabian--Andrius situation to a simple personal
duel unless the source for a particular claim supports it.

------------------------------------------------------------------------

## 1.4 Rebellion against Decarabian

**HistoricalEvent:** `old-mondstadt-rebellion`\
**Date:** \~2600 BP is the standard broad anchor; retain approximate
status.\
**Status:** CONFIRMED broad event.

Participants include: - nameless bard; - wind spirit who later became
Barbatos/Venti; - Amos; - Gunnhildr-related resistance tradition; -
other inhabitants of Old Mondstadt.

The rebellion overthrew Decarabian.

The nameless bard died during the conflict. The wind spirit later took
on a human appearance resembling him.

Barbatos then became the Anemo Archon.

This event should connect: Decarabian → Nameless Bard → Barbatos → Amos
→ Gunnhildr clan → Old Mondstadt.

------------------------------------------------------------------------

## 1.5 Foundation of modern Mondstadt

**HistoricalEvent:** `foundation-modern-mondstadt`\
**Date:** after Decarabian's fall; approximate.

After becoming Archon, Barbatos reshaped the land and helped establish a
more habitable Mondstadt.

He did not remain an active monarch. His withdrawal became foundational
to Mondstadt's political theology of freedom.

The current city of Mondstadt and its institutions developed over a long
period rather than appearing fully formed immediately after the
rebellion.

------------------------------------------------------------------------

## 1.6 Four Winds

**Type:** institution/title system\
**Status:** CONFIRMED

The Four Winds represent protectors of Mondstadt rather than a fixed set
of four immortal individuals.

Important associated traditions include: - Wolf of the North ---
Andrius; - Dragon of the East --- Dvalin; - Lion of the South --- title
associated with the Grand Master / historical protectors; - Falcon of
the West --- associated with the Knights of Favonius / Vanessa tradition
depending on historical context.

Model titles separately from individuals because holders/interpretations
vary across time.

------------------------------------------------------------------------

## 1.7 Aristocratic period

**Era:** `mondstadt-aristocratic-era`\
**Date:** after Barbatos' withdrawal; centuries before present.\
**Status:** CONFIRMED.

Mondstadt eventually fell under aristocratic domination.

The Lawrence Clan became the clearest symbol of the oppressive
aristocratic system.

Slavery, inequality, and institutional corruption became major features
of this period.

This is important thematically because Mondstadt repeated the pattern of
oppressive rule despite its founding myth of freedom.

------------------------------------------------------------------------

## 1.8 Vanessa's rebellion

**HistoricalEvent:** `vanessa-rebellion`\
**Date:** approximately 1000 BP.\
**Status:** CONFIRMED broad chronology.

Vanessa, a warrior enslaved under the aristocracy, became central to the
overthrow of the ruling nobles.

Barbatos returned and assisted the rebellion.

After victory: - aristocratic rule collapsed; - the Knights of Favonius
were established; - Vanessa became an important foundational figure in
the modern political order.

Later tradition associates her with ascension to Celestia and the Falcon
of the West.

Separate confirmed historical actions from later legendary/religious
interpretation.

------------------------------------------------------------------------

## 1.9 Durin and the Cataclysm

**HistoricalEvent:** `durin-attack-on-mondstadt`\
**Date:** \~500 BP\
**Parent:** Cataclysm\
**Status:** CONFIRMED

Durin, an artificial dragon created by Rhinedottir, attacked Mondstadt
during the Cataclysm.

Dvalin fought Durin with Barbatos' involvement.

Durin was defeated over Dragonspine.

Durin's remains and corrupted blood continued affecting the region and
later contributed to Dvalin's corruption.

Relationships: Rhinedottir → creator → Durin\
Durin → conflict → Dvalin\
Barbatos → ally → Dvalin\
Durin → death/location → Dragonspine

------------------------------------------------------------------------

## 1.10 Dvalin crisis

**HistoricalEvent:** `dvalin-stormterror-crisis`\
**Date:** present / Traveler era\
**Status:** CONFIRMED

Dvalin's old wounds, Abyss Order manipulation, and resentment toward
Mondstadt contributed to the Stormterror crisis.

Traveler, Venti, Jean, and Diluc participated in resolving it.

The event is useful as a modern continuation of Cataclysm consequences
rather than an isolated monster attack.

------------------------------------------------------------------------

## 1.11 Mondstadt high-priority sources

Create Source records for: - Venti Character Stories / Voice-Overs where
relevant - Amos' Bow - The Stringless / relevant weapon lore - Ballads
of the Squire / historical books where applicable - Gunnhildr
Biography - Decarabian/Old Mondstadt artifact and weapon descriptions -
Wolf's Gravestone / Andrius material - Prologue Archon Quest - Venti
Story Quest - manga/official comic only where needed and clearly marked
as official publication - Breeze Amidst the Forest - Skyward weapon
series - Dragonspine quest/item/weapon material - Elegy for the End
where relevant - Knights/Vanessa historical texts

------------------------------------------------------------------------

# 2. LIYUE

## 2.1 Regional identity

**Region:** Liyue\
**Archon tradition:** Geo / Morax\
**Central themes:** contracts, divine-human cooperation, adepti,
migration, war against gods and monsters, commercial civilization,
transition from divine to human governance.

Liyue's regional history is unusually deep and contains several
overlapping civilizations and divine alliances.

High-priority layers: 1. Morax's early activity; 2. Guizhong and Guili
Assembly; 3. adepti and Marchosius; 4. destruction of Guili Assembly; 5.
migration to Liyue Harbor; 6. Archon War conflicts; 7. Yakshas and
karmic debt; 8. Chenyu Vale's distinct divine history; 9. Chasm history;
10. Cataclysm; 11. modern transition after Rex Lapis' staged death.

------------------------------------------------------------------------

## 2.2 Morax

**Entity:** Morax / Rex Lapis / Zhongli\
**Type:** God / Geo Archon\
**Status:** CONFIRMED

Morax is among the oldest surviving gods and became the Geo Archon.

His regional history predates the final formation of the Seven.

Do not treat every legendary feat attributed to Rex Lapis as equally
historical; Liyue deliberately contains folk traditions, ritual
retellings, and contradictory stories.

------------------------------------------------------------------------

## 2.3 Guizhong

**Entity:** Guizhong\
**Type:** God of Dust\
**Status:** CONFIRMED

Guizhong was a major ally of Morax and a ruler associated with the Guili
Assembly.

She is associated with: - wisdom; - mechanical knowledge; -
agriculture/civilization; - the Memory of Dust; - four guiding
commandments/traditions; - alliance with Morax.

Avoid turning their relationship into a confirmed romance. That is a
common fandom interpretation, not an established canonical fact.

------------------------------------------------------------------------

## 2.4 Guili Assembly

**Civilization:** `guili-assembly`\
**Date:** before and during early Archon War; destroyed \~3700 BP.\
**Status:** CONFIRMED broad history.

The Guili Assembly was a prosperous civilization associated primarily
with Guizhong and Morax, with Marchosius and adepti also connected to
the society.

It occupied the broad Guili Plains / area north of Mt. Tianheng.

Primary-source accounts contain a chronology discrepancy over whether
Morax or Guizhong arrived first.

Preserve this discrepancy.

Do not choose one version silently.

------------------------------------------------------------------------

## 2.5 Fall of Guili Assembly

**HistoricalEvent:** `fall-of-guili-assembly`\
**Date:** \~3700 BP\
**Status:** CONFIRMED date broadly; cause UNRESOLVED.

A major battle devastated the Guili region.

Guizhong died.

The landscape changed dramatically and the surviving population migrated
south under Morax and allied divine/adeptal protection.

The exact enemy/cause of Guizhong's death is not established.

Do not invent the attacker.

------------------------------------------------------------------------

## 2.6 Foundation of Liyue Harbor

**HistoricalEvent:** `foundation-liyue-harbor`\
**Date:** \~3700 BP, shortly after fall of Guili Assembly.\
**Status:** CONFIRMED broad chronology.

Morax, Marchosius, adepti, and surviving people relocated south of Mt.
Tianheng.

Liyue Harbor developed from this migration and became the long-term
political/economic center.

This should be linked as a consequence of `fall-of-guili-assembly`.

------------------------------------------------------------------------

## 2.7 Marchosius / Guoba

**Entity:** Marchosius\
**Modern identity:** Guoba\
**Status:** CONFIRMED.

Marchosius, God of the Stove, was an important deity of early Liyue and
associated with food, warmth, and human welfare.

After disasters and environmental problems, he expended much of his
power to help restore the land, diminished in size/intellect, and
eventually became known as Guoba.

This history is important because it demonstrates a god surviving
through radical loss of power rather than death.

**Primary source anchor:** Moonchase Festival / *The Stove God and the
Adepti* material.

------------------------------------------------------------------------

## 2.8 Adepti

**Type:** collective / cultural-divine category\
**Status:** CONFIRMED but terminology requires nuance.

"Adepti" is a Liyue-specific category encompassing illuminated beings
and divine/nonhuman protectors bound to Morax through contracts.

Do not treat "adeptus" as a biological species.

Important figures: - Cloud Retainer / Xianyun - Mountain Shaper - Moon
Carver - Xiao - Ganyu (mixed heritage) - other historical adepti

------------------------------------------------------------------------

## 2.9 Yakshas

**Type:** group\
**Status:** CONFIRMED.

After the Archon War, the lingering hatred and remains of defeated gods
produced dangerous corruption and karmic consequences.

Morax summoned Yakshas to fight these manifestations.

Five foremost Yakshas: - Bosacius - Indarias - Bonanus - Menogias -
Alatus / Xiao

Most met tragic fates due to accumulated karmic debt and conflict.

Xiao remains the principal surviving active Yaksha in the present.

------------------------------------------------------------------------

## 2.10 Osial

**Entity:** Osial\
**Type:** ancient god / sea deity\
**Status:** CONFIRMED.

Osial fought Morax during the Archon War and was sealed beneath Guyun
Stone Forest.

The stone formations themselves are associated with Morax's giant stone
spears.

Osial later re-emerged during the Liyue Archon Quest due to Fatui/Childe
actions.

Separate: - ancient sealing; - present-day release attempt.

------------------------------------------------------------------------

## 2.11 Havria

**Entity:** Havria\
**Type:** God of Salt\
**Status:** CONFIRMED.

Havria pursued a relatively peaceful approach during the Archon War.

Her followers retreated repeatedly to avoid conflict.

She was eventually killed by one of her own people, who believed death
preferable to continued weakness/humiliation.

Her death released divine power and transformed nearby followers into
salt.

Zhongli's Story Quest is the main primary source.

This event is important for showing that gods were not neatly divided
into conquerors and villains.

------------------------------------------------------------------------

## 2.12 Chenyu Vale

**Region subdivision:** Chenyu Vale\
**Status:** CONFIRMED; has a partially distinct divine history.

Important historical entities: - Fujin - Lingyuan - Herblord - local
adeptal traditions - ancient ritual relationship with water/tea/land -
Chiwang Terrace

Do not force Chenyu Vale's local divine system into a simplified "Morax
always directly ruled everything" narrative.

Its incorporation into the broader Liyue order should be represented
historically.

------------------------------------------------------------------------

## 2.13 The Chasm

**Location:** The Chasm\
**Status:** CONFIRMED.

The Chasm contains evidence from multiple historical layers.

Important events: - ancient celestial/otherworldly impact phenomena; -
mining history; - Cataclysm battle; - Bosacius and Millelith
sacrifice; - later sealing and reopening.

During the Cataclysm, Liyue forces fought Abyssal monsters in the Chasm.

Bosacius participated and died/disappeared in the conflict.

The Perilous Trail material should be a major Source cluster.

------------------------------------------------------------------------

## 2.14 Modern Liyue transition

**HistoricalEvent:** `rex-lapis-retirement-crisis`\
**Date:** present\
**Status:** CONFIRMED.

Morax staged his death as Rex Lapis to test whether Liyue could continue
without direct divine rule.

The Qixing and human institutions assumed greater responsibility.

This is a political transition, not the literal death of Morax.

------------------------------------------------------------------------

## 2.15 Liyue high-priority sources

-   Stone Tablet Compilations
-   Treasure Lost, Treasure Found
-   Memory of Dust
-   Guizhong-related quest/material
-   Liyue Archon Quest
-   Zhongli Story Quest I --- Havria
-   Zhongli Story Quest II --- Azhdaha
-   Yaksha: The Guardian Adepti
-   Xiao Character Stories
-   Perilous Trail
-   Bosacius inscriptions
-   Moonchase / Stove God material
-   Chenyu Vale World Quests
-   Chiwang Terrace/Fujin material
-   weapon/artifact sets associated with Guili, adepti and Chasm

------------------------------------------------------------------------

# 3. INAZUMA

## 3.1 Regional identity

**Region:** Inazuma\
**Archon tradition:** Electro\
**Central themes:** eternity, transience, memory, islands with separate
histories, divine twins, sea migration, temporal anomaly, Cataclysm
trauma.

Inazuma should not be represented as one homogeneous historical
civilization. Narukami, Watatsumi, Tsurumi, Seirai, Enkanomiya, and
other islands have distinct histories.

------------------------------------------------------------------------

## 3.2 Enkanomiya

**Civilization/location:** Enkanomiya / Byakuyakoku\
**Status:** CONFIRMED.

Enkanomiya originated from a population that fell into the depths during
the ancient world catastrophe.

Key history: - fall into depths; - conflict with Bathysmal Vishaps /
Dragonheirs; - creation of the Dainichi Mikoshi by Aberaku; - oppressive
Sunchildren system; - arrival of Orobashi; - discovery of forbidden
historical knowledge; - migration to the surface; - creation of
Watatsumi.

Enkanomiya should be connected to both: - ancient global history; -
Inazuma regional history.

------------------------------------------------------------------------

## 3.3 Orobashi

**Entity:** Orobashi no Mikoto\
**Type:** God\
**Status:** CONFIRMED.

Orobashi encountered the people of Enkanomiya after fleeing/withdrawing
from conflicts of the Archon War era.

He became their deity and led them toward the surface.

Orobashi created/raised Watatsumi Island for his people.

He later invaded Yashiori Island and was killed by Raiden Ei using the
Musou no Hitotachi.

The reasons behind this invasion are complicated by Enkanomiya's
forbidden knowledge and Orobashi's sentence/fate.

Do not simplify it into "Orobashi randomly attacked Inazuma."

------------------------------------------------------------------------

## 3.4 Watatsumi foundation

**HistoricalEvent:** `foundation-watatsumi`\
**Date:** late Archon War / \>2000 BP, approximate.\
**Status:** CONFIRMED broad sequence.

Orobashi brought the people of Enkanomiya to the surface and created
Watatsumi as their homeland.

Watatsumi therefore has: - Enkanomiyan ancestry; - distinct religious
traditions; - historical tension with Narukami rule.

------------------------------------------------------------------------

## 3.5 Orobashi's death

**HistoricalEvent:** `death-of-orobashi`\
**Date:** after Watatsumi foundation; pre-Cataclysm.\
**Status:** CONFIRMED.

Orobashi crossed into Yashiori territory.

Ei killed him with a strike that created the Musoujin Gorge.

His remains continued to emit Tatarigami, demonstrating the dangerous
persistence of divine remains.

The event remains foundational to Watatsumi--Shogunate historical
memory.

------------------------------------------------------------------------

## 3.6 Raiden Makoto and Ei

**Entities:** Raiden Makoto / Raiden Ei\
**Status:** CONFIRMED.

The twin gods jointly survived the Archon War era.

Makoto became the public Electro Archon while Ei acted as her kagemusha
and military counterpart.

Makoto's ideal emphasized transience and the beauty of moments, while Ei
later pursued a rigid conception of eternity after accumulated losses.

Avoid presenting their political/philosophical roles as identical.

------------------------------------------------------------------------

## 3.7 Kitsune Saiguu

**Entity:** Kitsune Saiguu\
**Status:** CONFIRMED.

Kitsune Saiguu was a major figure of Narukami's religious and cultural
history and a close associate of the Raiden circle.

She was lost during the Cataclysm while confronting Abyssal darkness.

Her memory/essence influenced later phenomena including the Sacred
Sakura Cleansing Ritual tradition.

------------------------------------------------------------------------

## 3.8 Chiyo

**Entity:** Mikoshi Chiyo\
**Status:** CONFIRMED.

Chiyo fought during the Cataclysm and was swallowed by an Abyssal
creature.

She escaped but became corrupted and later attacked Ei.

Her ultimate fate remains uncertain.

Do not mark her as definitively dead unless a source explicitly resolves
it.

------------------------------------------------------------------------

## 3.9 Tsurumi Island

**Location/civilization:** Tsurumi\
**Status:** CONFIRMED broad history; ancient layers partly uncertain.

Tsurumi contains at least two important historical layers: - a very
ancient civilization associated with celestial-fall phenomena and the
island's unusual environment; - later Thunderbird-worshipping
inhabitants.

The Thunderbird, Kanna Kapatcir, eventually formed a bond with the child
Ruu.

The inhabitants sacrificed Ruu in a ritual.

Enraged, Kapatcir destroyed the civilization.

Later, Kapatcir was killed on Seirai Island by Raiden.

The repeating ghostly cycle encountered by the Traveler is connected to
these events.

Do not conflate the ancient pre-Thunderbird civilization with Ruu's
later people.

------------------------------------------------------------------------

## 3.10 Seirai Island

Important: - Kapatcir's death; - lingering Electro power; - Asase
Hibiki; - Ako Domeki; - later sealing/unsealing phenomena.

This history occurs significantly later than the ancient Tsurumi
civilization.

------------------------------------------------------------------------

## 3.11 Sacred Sakura temporal event

**HistoricalEvent:** `sacred-sakura-temporal-event`\
**Date:** origin linked to \~500 BP, but experienced through non-linear
temporal causality.\
**Status:** CONFIRMED.

Makoto used a realm connected to consciousness/time and Istaroth's
power/assistance to create the Sacred Sakura in a way that caused it to
be remembered as having always existed.

Ei planted the seed from her own perspective centuries later.

This event must use the encyclopedia's temporal-anomaly mechanism/notes.

Do not force it into an ordinary "seed planted at X, tree grew
afterward" chronology.

------------------------------------------------------------------------

## 3.12 Inazuma high-priority sources

-   Before Sun and Moon
-   Enkanomiya World Quest series
-   The Byakuyakoku Collection
-   Orobashi/Watatsumi quest and item material
-   Sangonomiya Chronicles
-   Raiden Shogun Character Stories
-   Raiden Shogun Story Quest Acts I--II
-   Hakushin Ring
-   Mask of Memories
-   weapon/artifact lore concerning Chiyo, Saiguu, Asase Hibiki
-   Through the Mists
-   Tsurumi quest chain
-   Seirai Stormchasers
-   present Inazuma Archon Quest

------------------------------------------------------------------------

# 4. SUMERU

## 4.1 Regional identity

**Region:** Sumeru\
**Archon tradition:** Dendro\
**Central themes:** knowledge, memory, civilization, desert/rainforest
divergence, gods and human successors, forbidden knowledge, Irminsul.

Sumeru contains several overlapping civilizational systems. Do not
narrate its history solely from the Akademiya/rainforest perspective.

------------------------------------------------------------------------

## 4.2 Apep and ancient dragon layer

**Entity:** Apep\
**Type:** ancient Dendro dragon\
**Status:** CONFIRMED.

Apep predates the current divine order and preserves memory/resentment
from the dragon age.

She is essential to connecting Sumeru to: - Nibelung; - War of Funerary
Flame; - forbidden knowledge; - King Deshret.

Apep later absorbed/was contaminated by forbidden knowledge connected to
Deshret's actions.

------------------------------------------------------------------------

## 4.3 Three God-Kings

**Collective:** Greater Lord Rukkhadevata, King Deshret, Nabu Malikata\
**Status:** CONFIRMED alliance/friendship.

These three major gods were associated with a period of cooperation
before their paths diverged.

They should not be reduced to later rainforest-vs-desert political
narratives.

Create structured relationships among all three.

------------------------------------------------------------------------

## 4.4 Nabu Malikata / Goddess of Flowers

**Entity:** Nabu Malikata\
**Status:** CONFIRMED core; deeper Seelie/Heavenly history should retain
source-specific uncertainty.

Nabu Malikata was the Goddess of Flowers and a close associate of
Deshret and Rukkhadevata.

She is deeply connected to: - Jinn; - Ay-Khanoum; - ancient heavenly
punishment traditions; - Deshret's later pursuit of
forbidden/transcendent knowledge; - Khvarena preparations for a future
Cataclysm.

Her death profoundly affected Deshret.

Do not simplify her role into merely Deshret's love interest.

------------------------------------------------------------------------

## 4.5 Ay-Khanoum

**Civilization/location:** Ay-Khanoum\
**Status:** CONFIRMED.

The city was associated with the three God-Kings and especially Nabu
Malikata/Jinn traditions.

After Nabu Malikata's death, the alliance fragmented and the historical
trajectory of desert civilization changed.

Exact details vary across poetic and historical sources; preserve
narrator distinctions.

------------------------------------------------------------------------

## 4.6 King Deshret

**Entity:** King Deshret / Al-Ahmar\
**Status:** CONFIRMED.

Deshret was one of Sumeru's most powerful gods and ruler of a vast
desert civilization.

He rejected or pursued alternatives to the ordinary divine order and
became involved with forbidden knowledge.

His ambitions produced extraordinary civilization but eventually
catastrophic consequences.

Avoid portraying him simply as an evil king. His motives, ideals, grief,
ambition, and transgression are all relevant.

------------------------------------------------------------------------

## 4.7 Forbidden Knowledge disaster

**HistoricalEvent:** `deshret-forbidden-knowledge-crisis`\
**Status:** CONFIRMED\
**Date:** several thousand years ago; exact placement approximate.

Deshret's pursuit of forbidden knowledge caused: - mental and bodily
corruption; - disease; - civilizational collapse; - environmental
damage; - threat to Irminsul/world stability.

Rukkhadevata helped contain the disaster.

Deshret ultimately sacrificed himself.

This event must remain distinct from the Cataclysm's later
forbidden-knowledge outbreak.

------------------------------------------------------------------------

## 4.8 Post-Deshret city-states

After Deshret's civilization fragmented, multiple human-led states
emerged.

Important entities: - Gurabad - Ormazd Shah - Liloupar - Kisra -
Tulaytullah - Saleh - other desert states as supported by primary
records

This period deserves its own `desert-vassal-states-era`.

------------------------------------------------------------------------

## 4.9 Gurabad

**Civilization:** Gurabad\
**Status:** CONFIRMED.

Gurabad became one of the most important successor city-states.

Its history is intertwined with: - Ormazd Shah; - Jinni Liloupar; -
political ambition; - dynastic violence; - Kisra; - eventual
catastrophic fall.

Because much of this history is told through Jinn-associated and poetic
sources, preserve narrator bias.

------------------------------------------------------------------------

## 4.10 Rukkhadevata and rainforest civilization

**Entity:** Greater Lord Rukkhadevata\
**Status:** CONFIRMED.

Rukkhadevata became the Dendro Archon and central divine figure of
rainforest Sumeru.

She is deeply linked to Irminsul.

Her historical actions include: - cooperation with Deshret/Nabu
Malikata; - response to forbidden knowledge; - establishment/support of
knowledge systems; - Cataclysm defense of Irminsul; -
creation/relationship to Nahida.

------------------------------------------------------------------------

## 4.11 Akademiya

**Organization:** Sumeru Akademiya\
**Status:** CONFIRMED.

The Akademiya became the dominant intellectual institution of modern
Sumeru.

Its history should be separated from Rukkhadevata herself: an
institution can evolve beyond or against the values attributed to its
deity.

Important modern events: - confinement/marginalization of Nahida; -
Akasha governance; - sages' artificial-god project; - political
restructuring after the Sumeru Archon Quest.

------------------------------------------------------------------------

## 4.12 Cataclysm in Sumeru

**HistoricalEvent:** `irminsul-cataclysm-corruption`\
**Date:** \~500 BP\
**Parent:** Cataclysm\
**Status:** CONFIRMED.

Forbidden knowledge again polluted Irminsul.

Rukkhadevata fought the corruption.

Her remaining contaminated existence eventually required removal from
Irminsul in the present era.

This event links ancient forbidden knowledge, Cataclysm, Nahida, and
present-day Irminsul rewrite.

------------------------------------------------------------------------

## 4.13 Sumeru high-priority sources

-   Sumeru Archon Quest Acts III--V
-   Where the Boat of Consciousness Lies
-   Nahida Story Quest Acts I--II
-   Apep dialogue
-   The Lay of Al-Ahmar
-   Staff of the Scarlet Sands
-   Flower of Paradise Lost
-   Gilded Dreams
-   Desert Pavilion Chronicle where relevant
-   Dirge of Bilqis
-   Apocalypse Lost
-   Liloupar/Jinn quest material
-   Khvarena of Good and Evil
-   Vourukasha's Glow
-   Gurabad-related books/items
-   Akademiya historical texts

------------------------------------------------------------------------

# 5. FONTAINE

## 5.1 Regional identity

**Region:** Fontaine\
**Archon tradition:** Hydro\
**Central themes:** life, law, judgment, prophecy, artificial humanity,
primordial water, civilization cycles, dragon Authority.

Fontaine's history has at least four major layers: 1. primordial/dragon
world; 2. Egeria/Oceanid-human origin; 3. Remuria; 4. Egeria's Archon
Fontaine; 5. Focalors/Furina and prophecy; 6. post-Hydro-Throne Fontaine
under Neuvillette's restored Authority.

------------------------------------------------------------------------

## 5.2 Primordial Sea

**Term/location-system:** Primordial Sea\
**Status:** CONFIRMED.

The Primordial Sea is foundational to Fontaine's life cosmology.

Ancient life originated from it.

The original Hydro Sovereign was deeply associated with it.

Later Fontainian humans were created through Egeria's use of Primordial
Sea material/power on Oceanids.

------------------------------------------------------------------------

## 5.3 Egeria

**Entity:** Egeria\
**Type:** Hydro-associated deity / later Hydro Archon\
**Status:** CONFIRMED.

Egeria was created as a new heart for the Primordial Sea after the old
Hydro-dragon order had been disrupted.

She created humanoid Fontainians from Oceanids using Primordial Sea
power.

This act was judged a sin by Celestia/the heavenly order and became tied
to Fontaine's prophecy.

Egeria was later released/raised into the position of Hydro Archon after
Remuria's fall.

------------------------------------------------------------------------

## 5.4 Oceanids and Fontainian humans

**Status:** CONFIRMED.

Oceanids were water-based beings associated with Egeria.

Some desired human existence.

Egeria gave them humanoid forms through Primordial Sea water.

Before Neuvillette's intervention in the present era, Fontainians
therefore possessed a special constitution that made them vulnerable to
dissolution in Primordial Sea water.

------------------------------------------------------------------------

## 5.5 Remus and Remuria

**Entity:** Remus\
**Civilization:** Remuria\
**Status:** CONFIRMED.

Remus came to the High Seas and founded the empire of Remuria.

His civilization was associated with: - music; - order/harmony; -
Fortuna; - golden Ichor; - golems; - conquest/assimilation; - Scylla; -
Sybilla; - Phobos.

Remus sought to escape the predicted destruction of his civilization.

His solution increasingly transformed society and contributed to its
dehumanization.

------------------------------------------------------------------------

## 5.6 Fall of Remuria

**HistoricalEvent:** `fall-of-remuria`\
**Date:** during Archon War era, before Egeria becomes one of Seven.\
**Status:** CONFIRMED broad event.

Remuria collapsed and sank.

Remus died during the final crisis.

Scylla was sealed.

Afterward, Egeria emerged to rule the surviving peoples and eventually
became the Hydro Archon.

Avoid treating Remuria as simply "ancient Fontaine." It was a distinct
imperial civilization preceding Egeria's later order.

------------------------------------------------------------------------

## 5.7 Egeria's Fontaine

Egeria established an order centered on law and reconciliation after
Remuria.

She became one of the original Seven.

The prophecy concerning Fontaine's "sin" remained unresolved.

------------------------------------------------------------------------

## 5.8 Egeria's death

**HistoricalEvent:** `death-of-egeria`\
**Date:** \~500 BP\
**Parent:** Cataclysm\
**Status:** CONFIRMED.

Egeria died during the Cataclysm in the area associated with Tunigi
Hollow/Vourukasha Oasis.

Her remains became the Amrita.

Rukkhadevata and Simurgh-related systems helped contain the Abyssal
breach.

This event geographically connects Fontaine and Sumeru.

------------------------------------------------------------------------

## 5.9 Focalors and Furina

**Entities:** Focalors; Furina\
**Status:** CONFIRMED.

Focalors succeeded Egeria as Hydro Archon.

To defeat the prophecy/judgment mechanism, she separated her divinity
from her human self.

Furina lived as the public "Hydro Archon" for centuries while lacking
the divine knowledge necessary to understand the plan.

Focalors accumulated Indemnitium through Fontaine's justice system and
eventually used it to destroy the Hydro Divine Throne.

Do not describe Furina as knowingly deceiving Fontaine for personal
power.

------------------------------------------------------------------------

## 5.10 Neuvillette

**Entity:** Neuvillette\
**Type:** reborn Hydro Dragon Sovereign\
**Status:** CONFIRMED.

Neuvillette gradually became integrated into Fontaine's judicial order.

After Focalors destroyed the Hydro Divine Throne, full Hydro Authority
returned to him.

He used that Authority to transform/legitimize Fontainians as true
humans in a way that prevented dissolution during the prophecy.

The Hydro Gnosis remained distinct and was later given to Arlecchino.

------------------------------------------------------------------------

## 5.11 Fontaine prophecy resolution

**HistoricalEvent:** `fontaine-prophecy-resolution`\
**Date:** present\
**Status:** CONFIRMED.

The flood occurred, but the expected dissolution of Fontainians did not.

Focalors died.

The Hydro Divine Throne ceased to exist.

Neuvillette regained full Hydro Authority.

Furina became free of her centuries-long role.

This event changes the political/cosmological structure of the Seven and
should be visible on the global timeline.

------------------------------------------------------------------------

## 5.12 Fontaine high-priority sources

-   Fontaine Archon Quest Acts I--V
-   Masquerade of the Guilty
-   Neuvillette Character Stories
-   Furina Character Stories
-   Fontaine prophecy texts
-   The History of the Decline and Fall of Remuria
-   Canticles of Harmony
-   Remuria World Quest material
-   Narzissenkreuz quest chain
-   Ancient Colors / Melusine material
-   Khvarena of Good and Evil for Egeria's death
-   Fontaine weapon/artifact lore concerning Remus, Sybilla, Scylla,
    Golden Troupe

------------------------------------------------------------------------

# 6. NATLAN

## 6.1 Regional identity

**Region:** Natlan\
**Archon tradition:** Pyro\
**Central themes:** dragons and humans, war, inherited memory,
resurrection, damaged Ley Lines, Night Kingdom, mortal Archons, Abyss
resistance.

Natlan has one of the most important histories for understanding the old
dragon world.

Its regional chronology must begin before the human Archon system.

------------------------------------------------------------------------

## 6.2 Xiuhcoatl

**Entity:** Xiuhcoatl\
**Type:** Pyro Dragon Sovereign\
**Status:** CONFIRMED in current Natlan lore.

Xiuhcoatl belonged to the old dragon order and was associated with
Natlan's ancient dragon civilization.

His Pyro Authority was taken during the establishment of the Heavenly
Principles' order.

Later Natlan history returns repeatedly to his legacy.

------------------------------------------------------------------------

## 6.3 Ancient dragon civilization / Natlantea

**Civilization:** Natlantea\
**Status:** CONFIRMED current lore.

Ancient Natlan supported an advanced dragon civilization.

Important associated entities/systems include: - Xiuhcoatl; -
Kukulkan; - Thirteen Sovereign Lords; - Sacred City of Tollan; -
advanced dragon technology; - attempts to reach beyond Teyvat's skies.

This material should be version-tagged because it substantially expands
older Natlan lore.

------------------------------------------------------------------------

## 6.4 War of Funerary Flame in Natlan

**HistoricalEvent:** `natlan-ley-line-destruction`\
**Parent:** War of Funerary Flame\
**Status:** CONFIRMED.

The ancient war devastated Natlan's Ley Lines.

This damage became one of the defining constraints on all later Natlan
history.

------------------------------------------------------------------------

## 6.5 Night Kingdom

**Entity/system:** Night Kingdom\
**Status:** CONFIRMED.

Around the aftermath of the ancient war, Yohualtecuhtin / Lord of the
Night reconstructed or substituted for Natlan's damaged Ley Line system
under guidance associated with Ronova.

The Night Kingdom preserves memory and enables mechanisms central to
Natlan's culture and warfare.

Do not treat it as merely an afterlife realm; it has systemic functions
replacing damaged world infrastructure.

------------------------------------------------------------------------

## 6.6 Human revival and Phlogiston

Ancient dragon-era politics eventually intersected with human
civilization.

Kukulkan transmitted/gave access to Phlogiston to humans, helping human
civilization rise.

The relationship among humans, dragons, and saurian descendants was
politically contested.

------------------------------------------------------------------------

## 6.7 Xbalanque

**Entity:** Xbalanque\
**Type:** human hero / first Pyro Archon\
**Status:** CONFIRMED.

Around 2000 BP, Xbalanque led human forces against the old dragon
regime.

He killed Xiuhcoatl and became the first Pyro Archon.

This is a major exception to simplistic assumptions about the Archon
War: Natlan's path to an Archon seat was shaped primarily by its own
human--dragon conflict.

Xbalanque established rules enabling mortal humans to inherit the Pyro
Archon position.

He also established the Ode of Resurrection system through power
associated with Ronova.

------------------------------------------------------------------------

## 6.8 Mortal Pyro Archon succession

**System:** Natlan Pyro Archon succession\
**Status:** CONFIRMED.

Unlike many other nations, Natlan's Archon system allows mortal humans
to rise to the Pyro Archon position under established rules.

This creates a sequence of Archons rather than one immortal divine
lineage.

Represent `Pyro Archon` as a title/seat separate from individual
holders.

------------------------------------------------------------------------

## 6.9 Och-Kan and Ochkanatlan

**Entity:** Och-Kan\
**Civilization:** Ochkanatlan\
**Status:** CONFIRMED.

Och-Kan was created/engineered as a human-dragon hybrid in an attempt to
bridge the two peoples.

He later ruled an empire and became tyrannical, persecuting
dragons/saurians and betraying parts of Xbalanque's intended settlement.

Ochkanatlan eventually collapsed.

This history is important because human victory did not produce
uncomplicated liberation.

------------------------------------------------------------------------

## 6.10 Seven tribes

Natlan's modern social order developed around tribal groups connected to
Wayob and the Night Kingdom.

Treat tribe histories independently; do not assume they all originated
simultaneously or share identical traditions.

Create individual tribe entities only as primary material is ingested.

------------------------------------------------------------------------

## 6.11 Cataclysm in Natlan

**HistoricalEvent:** `natlan-cataclysm-invasion`\
**Date:** \~500 BP\
**Parent:** Cataclysm\
**Status:** CONFIRMED.

Abyssal forces invaded Natlan and attacked the Night Kingdom/system.

The region's pre-existing Ley Line damage made the conflict especially
existential.

The struggle against Abyssal erosion continued for centuries and forms
the background to the Traveler-era Natlan crisis.

------------------------------------------------------------------------

## 6.12 Mavuika / present crisis

**Entity:** Mavuika\
**Type:** Pyro Archon / human\
**Status:** CONFIRMED.

Mavuika belongs to Natlan's mortal Archon tradition.

Her plans bridge the Cataclysm era and the present through Natlan's
memory/resurrection systems.

The modern Natlan storyline reveals substantial information about: -
Abyss; - Night Kingdom; - Ronova; - ancient dragons; - human--dragon
history; - rules of Pyro Archon succession.

Use exact quest-level Source records rather than one generic "Natlan
Archon Quest" citation when ingesting detailed claims.

------------------------------------------------------------------------

## 6.13 Natlan high-priority sources

-   Natlan Archon Quest, all acts relevant to history
-   Mavuika Character Stories
-   Xbalanque historical dialogue/texts
-   Night Kingdom / Lord of the Night dialogue
-   Ochkanatlan World Quest material
-   dragon civilization records
-   Xiuhcoatl/Kukulkan records
-   tribal chronicles
-   artifact and weapon sets tied to ancient Natlan
-   current Natlan post-Archon-Quest material

------------------------------------------------------------------------

# 7. SNEZHNAYA AND NOD-KRAI

## 7.1 Scope warning

As of this research snapshot, northern lore is actively expanding.

Every substantial claim in this section should carry: -
`introducedInVersion`; - exact Source; - review status for future
patches.

Do not rely on pre-Nod-Krai summaries that describe Snezhnaya as almost
completely unknown.

------------------------------------------------------------------------

## 7.2 Snezhnaya

**Region:** Snezhnaya\
**Archon:** Tsaritsa\
**Status:** CONFIRMED broad framework.

Snezhnaya is the nation associated with the Cryo Archon and Fatui.

Its modern history is strongly shaped by the Cataclysm and the
Tsaritsa's later project against the current heavenly order.

Important institutions: - Tsaritsa's court; - Fatui; - Eleven Fatui
Harbingers; - House of the Hearth; - northern regional organizations; -
Nod-Krai's autonomous/local institutions.

Do not equate all Snezhnayan citizens or institutions with Fatui policy.

------------------------------------------------------------------------

## 7.3 Tsaritsa

**Entity:** Tsaritsa\
**Status:** CONFIRMED as Cryo Archon; many personal details remain
intentionally withheld.

She was not the original Cryo Archon.

The Cataclysm profoundly changed her outlook.

The Fatui's collection of Gnoses operates under her larger plan.

Avoid filling her motives from fandom assumptions. Use only explicit
statements and carefully marked implications.

------------------------------------------------------------------------

## 7.4 Pierro

**Entity:** Pierro / The Jester\
**Type:** Khaenri'ahn historical figure / Fatui founder-leader figure\
**Status:** CONFIRMED.

Pierro was connected to Khaenri'ah before its fall and later became
central to the Fatui.

His history makes him a major bridge: Khaenri'ah → Cataclysm → Snezhnaya
→ Fatui → present anti-Celestia project.

------------------------------------------------------------------------

## 7.5 Nod-Krai

**Region/subregion:** Nod-Krai\
**Status:** CONFIRMED current content.

Nod-Krai is a northern borderland with a distinct identity and history
rather than merely "another Snezhnayan city."

Its lore intersects: - moons; - Abyss; - Cataclysm; - Frostmoon
traditions; - Lightkeepers; - autonomous/local governance; -
Fatui/Snezhnayan authority; - ancient northern history.

------------------------------------------------------------------------

## 7.6 Cataclysm in Nod-Krai

**HistoricalEvent:** `nod-krai-cataclysm`\
**Date:** \~500 BP\
**Parent:** Cataclysm\
**Status:** CONFIRMED current lore.

Nod-Krai was among the first northern areas heavily corrupted by Abyssal
forces during the Cataclysm.

The Wild Hunt is associated with this corruption.

Local defenders rather than immediate central intervention became
crucial.

------------------------------------------------------------------------

## 7.7 Lightkeepers

**Organization:** Lightkeepers\
**Status:** CONFIRMED current lore.

Solovei the Torchforger and allies established the Lightkeepers in
response to the Abyssal disaster.

They became defenders of Nod-Krai.

Later political relationship with the Tsaritsa/Snezhnaya should be
represented separately from their origin.

------------------------------------------------------------------------

## 7.8 Frostmoon Scions

**Organization/culture:** Frostmoon Scions\
**Status:** CONFIRMED current lore.

The Frostmoon Scions preserve lunar religious traditions.

Important figures include: - Aila; - Kuutar; - moon-related
spirits/entities; - later lunar revelations.

Their beliefs are not automatically objective cosmological truth.
Separate: - religious account; - historical event; - modern revealed
cosmology.

------------------------------------------------------------------------

## 7.9 Kuutar

**Entity:** Kuutar\
**Status:** CONFIRMED current lore; exact ontology should follow current
primary sources.

Kuutar became the focus of Frostmoon Scion worship after the
Cataclysm-era transformations.

Her relationship with worshippers was complicated by expectations placed
upon her.

This should be a Character/HistoricalEntity record rather than merely a
Term.

------------------------------------------------------------------------

## 7.10 Saarelainen and northern history

Saarelainen belongs chronologically much earlier than the Cataclysm but
becomes newly relevant through northern lore.

Keep his primary global entry in the Core pack.

Regional northern pages should reference rather than duplicate it.

------------------------------------------------------------------------

## 7.11 Snezhnaya/Nod-Krai high-priority sources

Because this material is current, create exact records from: - Song of
the Welkin Moon / current northern Archon Quest chapters - Hymns of the
Far North - Nod-Krai World Quests - Lightkeeper records - Frostmoon
Scion texts - local weapon/artifact lore - current Fatui/Snezhnaya
official story content - Harbinger Character Stories where historically
relevant

Mark all with exact game version.

------------------------------------------------------------------------

# 8. KHAENRI'AH

## 8.1 Regional identity

**Civilization/region:** Khaenri'ah\
**Status:** CONFIRMED.

Khaenri'ah existed outside the normal Seven-Archon political order.

Its civilization emphasized human achievement and developed advanced
technology/alchemy.

Its history is essential to understanding: - Cataclysm; - Abyss; -
Traveler sibling; - Dainsleif; - Pierro; - Rhinedottir; - Five
Sinners; - Ruin machines; - curses; - Abyss Order.

Do not make Khaenri'ah synonymous with Abyss.

------------------------------------------------------------------------

## 8.2 Eclipse Dynasty

**Dynasty:** Eclipse Dynasty\
**Status:** CONFIRMED.

The Eclipse Dynasty ruled Khaenri'ah in its final era.

King Irmin is associated with this dynasty.

Earlier dynastic/civilizational layers should remain separate if/when
primary material establishes them.

------------------------------------------------------------------------

## 8.3 King Irmin

**Entity:** King Irmin\
**Status:** CONFIRMED as Khaenri'ahn king; much remains unresolved.

Do not import speculative connections to unrelated mythological names as
lore.

------------------------------------------------------------------------

## 8.4 Khemia

**Term/system:** Khemia\
**Status:** CONFIRMED.

Khemia is an advanced alchemical art associated with Khaenri'ah and
creation of life.

Rhinedottir is its most important known practitioner.

Albedo is a major surviving product/heir of this tradition.

------------------------------------------------------------------------

## 8.5 Ruin machines

**Technology category:** Ruin machines / field tillers\
**Status:** CONFIRMED.

Khaenri'ah developed autonomous war machines.

Dainsleif explains that "Field Tiller" reflects the Khaenri'ahn idea
that land should be won by steel and blood rather than granted by gods.

Create technology categories separately from individual machine models.

------------------------------------------------------------------------

## 8.6 Five Sinners

**Group:** Five Sinners\
Members: - Hroptatyr - Vedrfolnir - Rhinedottir - Surtalogi - Rerir

**Status:** CONFIRMED.

These figures acquired extraordinary power and are implicated in the
catastrophe surrounding Khaenri'ah.

Their individual motives and exact actions remain incompletely known.

Do not attribute collective guilt beyond what sources establish.

------------------------------------------------------------------------

## 8.7 Dainsleif

**Entity:** Dainsleif\
**Status:** CONFIRMED.

Dainsleif served Khaenri'ah and later became an immortal wanderer
affected by the curse.

He opposes the Abyss Order despite sharing Khaenri'ahn origins.

His narration is invaluable but should still be represented as the
testimony/perspective of a participant rather than omniscient objective
narration.

------------------------------------------------------------------------

## 8.8 Traveler's sibling

The sibling became associated with Khaenri'ah before/during the
Cataclysm and later with the Abyss Order.

Their journey through Teyvat occurred in a different sequence from the
playable Traveler's journey.

Irminsul records the sibling as belonging to Teyvat, unlike the
Traveler.

This anomaly remains unresolved.

------------------------------------------------------------------------

## 8.9 Fall of Khaenri'ah

**HistoricalEvent:** `fall-of-khaenriah`\
**Date:** \~500 BP\
**Parent:** Cataclysm\
**Status:** CONFIRMED; causes UNRESOLVED.

Khaenri'ah was destroyed during the Cataclysm.

Relevant but not simplifiable into one causal statement: - Abyssal
power; - Five Sinners; - Rhinedottir's creations; - Khaenri'ahn
political choices; - Heavenly Principles/Celestial intervention; -
curses; - Traveler sibling; - Dainsleif; - Pierro.

The encyclopedia should display competing evidence and partial
perspectives.

------------------------------------------------------------------------

## 8.10 Curses

**Term cluster:** Khaenri'ahn curses\
**Status:** CONFIRMED broad phenomenon.

Different survivors experienced different curse effects.

Pure-blooded Khaenri'ahns and people of other ancestry are treated
differently in relevant sources.

Do not claim all hilichurls originated in the Cataclysm; hilichurls
existed earlier.

------------------------------------------------------------------------

## 8.11 Abyss Order

**Organization:** Abyss Order\
**Status:** CONFIRMED.

The Abyss Order emerged after the fall of Khaenri'ah and includes
transformed former people of Khaenri'ah among its members.

It is distinct from: - Khaenri'ah itself; - the Abyss as a cosmic
power/domain; - the Five Sinners; - all Cataclysm survivors.

The Traveler's sibling became its Prince/Princess.

------------------------------------------------------------------------

## 8.12 Khaenri'ah high-priority sources

-   We Will Be Reunited
-   Requiem of the Echoing Depths
-   Caribert
-   Bedtime Story
-   later Dainsleif Archon Quests
-   Perinheri
-   Dainsleif dialogue
-   Kaeya Character Stories where relevant
-   Albedo/Rhinedottir material
-   Durin/Elynas material
-   Ruin machine quest/dialogue
-   current Five Sinners material
-   Pierro/Fatui historical material

------------------------------------------------------------------------

# 9. DARK SEA AND GODS OUTSIDE THE SEVEN

## 9.1 Dark Sea

**Term/geographic concept:** Dark Sea\
**Status:** CONFIRMED.

The Dark Sea broadly refers to regions beyond the direct dominion of the
Seven.

After the Archon War, some defeated gods fled rather than live under the
Seven's order.

Do not model the Dark Sea as one literal ocean with precise borders.

It is a cosmogeographic/political concept whose exact extent is
uncertain.

------------------------------------------------------------------------

## 9.2 Defeated and migrating gods

The Archon War produced: - dead gods; - sealed gods; - gods who
submitted; - gods who fled; - gods who migrated; - gods incorporated
into later regional orders.

Examples: - Orobashi's migration; - Remus leaving Sumeru-related lands
for Fontaine; - gods associated with the Dark Sea.

This should support a future `migration/path` historical feature.

------------------------------------------------------------------------

# 10. CROSS-REGION CHRONOLOGY

The following is a synchronization framework, not a claim that every
event inside a row occurred in the same year.

## PERIOD A --- Old World

### GLOBAL

-   Seven Sovereigns / dragon order.
-   ancient elemental world.
-   lunar systems.

### NATLAN

-   Xiuhcoatl and advanced dragon civilization.
-   ancient Natlantea/Tollan.

### SUMERU

-   Apep belongs to old dragon order.

### FONTAINE

-   original Hydro Sovereign and Primordial Sea.

### OTHER REGIONS

-   only add old-world events when primary sources support them.

------------------------------------------------------------------------

## PERIOD B --- Heavenly Principles establish new order

### GLOBAL

-   Sovereign Authorities seized/restructured.
-   Four Shades/new heavenly order.
-   human-oriented world develops.

### FONTAINE

-   Hydro Authority removed from original Sovereign.
-   Egeria eventually created in post-dragon context.

### NATLAN

-   Xiuhcoatl loses Pyro Authority.

### ENKANOMIYA

-   ancient human civilization exists before later fall.

------------------------------------------------------------------------

## PERIOD C --- War of Funerary Flame / ancient catastrophe

### GLOBAL

-   Nibelung returns.
-   world-scale dragon/heaven war.
-   Abyss/forbidden knowledge.
-   lunar catastrophe.
-   Celestial Nails.

### INAZUMA / ENKANOMIYA

-   Enkanomiya falls into depths.

### NATLAN

-   Ley Lines devastated.
-   Night Kingdom reconstruction follows.

### SUMERU

-   ancient environmental catastrophe / Nail-related transformation.
-   Apep participates in broader dragon history.

### FONTAINE

-   post-Sovereign order continues; Egeria-related sequence belongs
    around/after these transformations.

------------------------------------------------------------------------

## PERIOD D --- Post-ancient-war / pre-Archon-War

### GLOBAL

-   weakened/restructured heavenly order.
-   Saarelainen/Third Descender episode.
-   Gnoses created.

### SUMERU

-   divine powers and civilizations develop toward later God-King era.

### FONTAINE

-   Oceanid/Egeria history develops.

### NATLAN

-   long dragon-dominated era continues.

------------------------------------------------------------------------

## PERIOD E --- Early/Mid Archon War

### MONDSTADT

-   Decarabian rules Old Mondstadt.
-   Andrius' frozen winds.
-   rebellion develops.

### LIYUE

-   Morax, Guizhong, Marchosius, adepti.
-   Guili Assembly.

### SUMERU

-   Rukkhadevata, Deshret, Nabu Malikata alliance.
-   competing gods.

### FONTAINE

-   Remus/Remuria develops during broad Archon-War era.

### INAZUMA

-   Makoto/Ei divine history.
-   Orobashi eventually arrives in Enkanomiya.

### NATLAN

-   does not follow the same god-vs-god Archon War pattern; dragon
    conflicts dominate.

------------------------------------------------------------------------

## PERIOD F --- \~3700 BP anchor

### LIYUE

-   Guili Assembly destroyed.
-   Guizhong dies.
-   migration south.
-   Liyue Harbor founded.

### OTHER REGIONS

Do not force events to this exact date without evidence.

This should appear as a Liyue-specific anchor inside the broader
Archon-War era.

------------------------------------------------------------------------

## PERIOD G --- \~2600 BP anchor

### MONDSTADT

-   rebellion against Decarabian.
-   nameless bard dies.
-   Barbatos rises as Anemo Archon.
-   modern Mondstadt trajectory begins.

### OTHER REGIONS

Archon War continues in various forms.

Do not falsely synchronize exact regional battles.

------------------------------------------------------------------------

## PERIOD H --- Late Archon War / \~2000 BP

### GLOBAL

-   Seven-seat system reaches final form.

### LIYUE

-   Morax is Geo Archon.
-   post-war karmic cleanup/Yaksha era follows.

### MONDSTADT

-   Barbatos already holds Anemo seat.

### INAZUMA

-   Makoto becomes public Electro Archon; Ei acts alongside/as
    kagemusha.
-   Watatsumi/Orobashi sequence belongs around late-war/post-war
    transition.

### SUMERU

-   Rukkhadevata becomes Dendro Archon.
-   desert civilizations continue their own trajectory.

### FONTAINE

-   Remuria falls.
-   Egeria emerges and becomes Hydro Archon.

### NATLAN

-   Xbalanque defeats Xiuhcoatl around 2000 BP.
-   first Pyro Archon system begins.
-   Ochkanatlan follows.

------------------------------------------------------------------------

## PERIOD I --- Post-Archon War, 2000--1000 BP

### MONDSTADT

-   Barbatos absent for long periods.
-   aristocratic institutions eventually grow.

### LIYUE

-   Yakshas fight lingering divine corruption.
-   adeptal/human order stabilizes.

### INAZUMA

-   Orobashi/Watatsumi conflict and death occur within pre-Cataclysm
    history.
-   island-specific histories continue.

### SUMERU

-   Deshret civilization, forbidden-knowledge crisis, successor
    city-states.
-   Gurabad and desert dynasties.

### FONTAINE

-   Egeria's Fontaine develops.

### NATLAN

-   mortal Archon succession and post-Xbalanque civilizations.

------------------------------------------------------------------------

## PERIOD J --- \~1000 BP

### MONDSTADT

-   aristocratic tyranny.
-   Vanessa rebellion.
-   Knights of Favonius founded.

### OTHER REGIONS

Do not manufacture matching events merely to fill lanes.

Empty lanes are valid historical information.

------------------------------------------------------------------------

## PERIOD K --- \~500 BP CATACLYSM

### GLOBAL

-   Khaenri'ah falls.
-   Abyssal catastrophe spreads.
-   heavenly/divine intervention.
-   massive political and ecological consequences.

### KHAENRI'AH

-   destruction of kingdom.
-   curses.
-   Dainsleif survives.
-   sibling witnesses/participates in aftermath.
-   Pierro survives.
-   Five Sinners implicated.

### MONDSTADT

-   Durin attacks.
-   Dvalin/Barbatos fight him.
-   Dragonspine becomes key Cataclysm site.

### LIYUE

-   Chasm battle.
-   Millelith/Yaksha sacrifice.
-   Bosacius' final known conflict.

### INAZUMA

-   Makoto dies.
-   Kitsune Saiguu lost.
-   Chiyo corrupted.
-   Sacred Sakura causal loop originates.

### SUMERU

-   Irminsul polluted by forbidden knowledge.
-   Rukkhadevata responds.

### FONTAINE / SUMERU BORDER

-   Egeria dies.
-   Amrita/Harvisptokhm/Simurgh system.

### NATLAN

-   Abyss invades Night Kingdom.
-   long defensive struggle.

### NOD-KRAI

-   severe early Abyss corruption.
-   Wild Hunt.
-   Lightkeepers emerge.
-   Frostmoon history changes.

------------------------------------------------------------------------

## PERIOD L --- 500 BP to present

### MONDSTADT

-   Dvalin's Cataclysm wounds persist.
-   modern Knights order.

### LIYUE

-   Rex Lapis continues annual governance until Traveler era.

### INAZUMA

-   Ei rules after Makoto.
-   increasing withdrawal leads eventually to Shogun puppet system and
    Vision Hunt crisis.

### SUMERU

-   Nahida marginalized/confined by sages.
-   Akademiya dominates political knowledge system.

### FONTAINE

-   Focalors/Furina maintain centuries-long prophecy plan.

### NATLAN

-   Abyss conflict persists through generations of mortal Pyro Archons.

### SNEZHNAYA

-   Tsaritsa's post-Cataclysm transformation.
-   Fatui develops into transnational power.

### KHAENRI'AH DIASPORA

-   Abyss Order and individual survivors pursue divergent paths.

------------------------------------------------------------------------

## PERIOD M --- Traveler era

### MONDSTADT

-   Stormterror crisis resolved.

### LIYUE

-   Rex Lapis stages death.
-   human political institutions take greater control.

### INAZUMA

-   Vision Hunt/Sakoku crises resolved.
-   Ei re-evaluates eternity.
-   Sacred Sakura temporal history clarified.

### SUMERU

-   sages overthrown.
-   Nahida freed.
-   Rukkhadevata erased from Irminsul.
-   Apep crisis reveals dragon history.

### FONTAINE

-   prophecy resolved.
-   Focalors dies.
-   Hydro Divine Throne destroyed.
-   Neuvillette regains Authority.

### NATLAN

-   modern Abyss war reaches crisis.
-   ancient dragon/Night Kingdom history revealed.

### SNEZHNAYA / NOD-KRAI

-   current lunar/northern revelations expand global cosmology.

------------------------------------------------------------------------

# 11. Regional entity registry

Recommended initial IDs.

## Mondstadt

-   mondstadt
-   old-mondstadt
-   decarabian
-   andrius
-   nameless-bard
-   amos
-   barbatos
-   gunnhildr-clan
-   vanessa
-   lawrence-clan
-   knights-of-favonius
-   dvalin
-   durin
-   dragonspine

## Liyue

-   liyue
-   morax
-   guizhong
-   guili-assembly
-   marchosius
-   adepti
-   yakshas
-   xiao
-   bosacius
-   osial
-   havria
-   liyue-harbor
-   chenyu-vale
-   fujin
-   lingyuan
-   chasm

## Inazuma

-   inazuma
-   enkanomiya
-   byakuyakoku
-   orobashi
-   watatsumi
-   raiden-makoto
-   raiden-ei
-   kitsune-saiguu
-   mikoshi-chiyo
-   tsurumi
-   kanna-kapatcir
-   ruu
-   seirai
-   asase-hibiki
-   sacred-sakura

## Sumeru

-   sumeru
-   apep
-   king-deshret
-   nabu-malikata
-   greater-lord-rukkhadevata
-   ay-khanoum
-   gurabad
-   liloupar
-   akademiya
-   irminsul
-   aaru-village
-   tunigi-hollow
-   vourukasha-oasis

## Fontaine

-   fontaine
-   primordial-sea
-   egeria
-   oceanids
-   remus
-   remuria
-   sybilla
-   scylla
-   phobos
-   focalors
-   furina
-   neuvillette
-   fortress-of-meropide

## Natlan

-   natlan
-   xiuhcoatl
-   kukulkan
-   natlantea
-   tollan
-   thirteen-sovereign-lords
-   night-kingdom
-   lord-of-the-night
-   xbalanque
-   och-kan
-   ochkanatlan
-   mavuika

## Snezhnaya / Nod-Krai

-   snezhnaya
-   tsaritsa
-   fatui
-   pierro
-   nod-krai
-   lightkeepers
-   solovei
-   frostmoon-scions
-   aila
-   kuutar

## Khaenri'ah

-   khaenriah
-   eclipse-dynasty
-   king-irmin
-   khemia
-   five-sinners
-   hroptatyr
-   vedrfolnir
-   rhinedottir
-   surtalogi
-   rerir
-   dainsleif
-   abyss-order

------------------------------------------------------------------------

# 12. HistoricalEvent registry

Recommended stable IDs:

## Mondstadt

-   `decarabian-rule`
-   `old-mondstadt-rebellion`
-   `foundation-modern-mondstadt`
-   `mondstadt-aristocratic-era`
-   `vanessa-rebellion`
-   `durin-attack-on-mondstadt`
-   `dvalin-stormterror-crisis`

## Liyue

-   `foundation-guili-assembly`
-   `fall-of-guili-assembly`
-   `foundation-liyue-harbor`
-   `yaksha-campaigns`
-   `sealing-of-osial`
-   `death-of-havria`
-   `chasm-cataclysm-battle`
-   `rex-lapis-retirement-crisis`

## Inazuma

-   `fall-of-enkanomiya`
-   `arrival-of-orobashi-enkanomiya`
-   `foundation-watatsumi`
-   `death-of-orobashi`
-   `ruu-sacrifice`
-   `destruction-tsurumi-civilization`
-   `death-of-kapatcir`
-   `death-of-makoto`
-   `loss-of-kitsune-saiguu`
-   `corruption-of-chiyo`
-   `sacred-sakura-temporal-event`

## Sumeru

-   `three-god-kings-alliance`
-   `foundation-ay-khanoum`
-   `death-of-nabu-malikata`
-   `deshret-forbidden-knowledge-crisis`
-   `death-of-king-deshret`
-   `rise-of-gurabad`
-   `fall-of-gurabad`
-   `irminsul-cataclysm-corruption`
-   `rukkhadevata-irminsul-erasure`

## Fontaine

-   `creation-of-egeria`
-   `creation-of-fontainian-humans`
-   `foundation-remuria`
-   `fall-of-remuria`
-   `egeria-becomes-hydro-archon`
-   `death-of-egeria`
-   `focalors-furina-separation`
-   `destruction-of-hydro-divine-throne`
-   `restoration-of-hydro-authority`
-   `fontaine-prophecy-resolution`

## Natlan

-   `natlan-ley-line-destruction`
-   `creation-of-night-kingdom`
-   `human-phlogiston-transmission`
-   `xbalanque-conquest-of-tollan`
-   `death-of-xiuhcoatl`
-   `first-pyro-archon`
-   `foundation-ochkanatlan`
-   `fall-of-ochkanatlan`
-   `natlan-cataclysm-invasion`
-   `modern-natlan-abyss-crisis`

## Snezhnaya / Nod-Krai

-   `nod-krai-cataclysm`
-   `foundation-lightkeepers`
-   `rise-of-frostmoon-scion-order`
-   `fatui-formation` --- only create when sources support adequate
    chronology.

## Khaenri'ah

-   `eclipse-dynasty-era`
-   `five-sinners-transcendence`
-   `fall-of-khaenriah`
-   `khaenriahn-curses`
-   `formation-of-abyss-order`

------------------------------------------------------------------------

# 13. Major cross-region relationship registry

-   Barbatos → Decarabian: successor after rebellion / opposing
    historical power.

-   Barbatos → Andrius: fellow Archon-War-era power; later Andrius
    becomes Mondstadt protector.

-   Barbatos → Dvalin: ally / Four Winds relationship.

-   Rhinedottir → Durin: creator.

-   Durin → Dvalin: Cataclysm opponents.

-   Morax → Guizhong: allied gods / co-rulers of Guili Assembly.

-   Morax → Marchosius: allied gods.

-   Morax → adepti: contractual ruler/protector relationship.

-   Morax → Xiao: rescuer/master-contract relationship.

-   Morax → Osial: Archon War enemies.

-   Orobashi → Enkanomiya people: adopted deity/protector.

-   Orobashi → Watatsumi: founder/creator deity.

-   Orobashi → Ei: killed by.

-   Makoto → Ei: twin / Archon-kagemusha relationship.

-   Makoto → Istaroth: Sacred Sakura event connection.

-   Kitsune Saiguu → Ei/Makoto: close divine retainer/friend circle.

-   Deshret → Rukkhadevata: ally/friend, later crisis cooperation.

-   Deshret → Nabu Malikata: ally/friend.

-   Nabu Malikata → Jinn: divine/cultural relationship.

-   Deshret → Apep: forbidden-knowledge consequence relationship.

-   Rukkhadevata → Irminsul: systemic/avatar relationship.

-   Egeria → Oceanids: creator/mother-ruler relationship.

-   Egeria → Fontainians: creator.

-   Remus → Remuria: founder/ruler.

-   Focalors → Egeria: successor.

-   Focalors → Furina: separated divine/human self relationship.

-   Focalors → Neuvillette: plan restores Authority.

-   Neuvillette → Hydro Authority: original Sovereign Authority
    restored.

-   Xiuhcoatl → Natlantea: Sovereign/ruler.

-   Kukulkan → humans: transmitter of Phlogiston / political bridge.

-   Xbalanque → Xiuhcoatl: victor/killer.

-   Xbalanque → Pyro Archon seat: first mortal holder.

-   Xbalanque → Ronova: death/resurrection-rule connection.

-   Och-Kan → humans/dragons: intended bridge, later tyrant.

-   Pierro → Khaenri'ah: former citizen/court-associated historical
    figure.

-   Pierro → Fatui: founder/leader relationship.

-   Tsaritsa → Fatui: sovereign/patron.

-   Tsaritsa → Gnoses: collection project.

-   Rhinedottir → Five Sinners: member.

-   Dainsleif → Khaenri'ah: former knight/guardian.

-   Dainsleif → Abyss Order: enemy despite common origin.

-   Traveler sibling → Abyss Order: Prince/Princess.

-   Khaenri'ah → Abyss: historically entangled, NOT identity.

------------------------------------------------------------------------

# 14. Contradictions and caution flags

Create explicit research notes for these instead of silently resolving
them.

### Liyue: Guili chronology

Primary sources disagree about whether Morax or Guizhong first
occupied/arrived in the Guili area.

### Mondstadt: exact Archon-War dating

\~2600 BP is useful for the Decarabian rebellion, but not every
Mondstadt divine conflict can be pinned to the same date.

### Inazuma: Orobashi

His "crime," knowledge of *Before Sun and Moon*, sentence, invasion of
Yashiori, and concern for his people form a complex chain. Do not reduce
to one motive without source-specific evidence.

### Tsurumi

At least two civilizations/layers exist. Do not merge the
Celestial-object ancient destruction with the later Thunderbird/Ruu
catastrophe.

### Sumeru: poetic desert texts

Many desert sources are mythic, poetic, partisan, or written from Jinn
perspectives. Preserve source voice.

### Fontaine: Egeria chronology

Her creation, imprisonment, Remuria period, release, and Archon
ascension span multiple historical systems. Avoid exact dates where none
exist.

### Natlan

Current lore has greatly expanded/revised the region's ancient history.
Version metadata is mandatory.

### Snezhnaya/Nod-Krai

Current story is still expanding. Treat this region as
high-staleness-risk content.

### Khaenri'ah

Do not choose a single cause for the Cataclysm. The narrative still
withholds essential information.

------------------------------------------------------------------------

# 15. Recommended Source ingestion batches

## Batch A --- Mondstadt

Old Mondstadt/Decarabian sources → Vanessa/aristocracy →
Durin/Cataclysm.

## Batch B --- Liyue

Guili primary texts → Zhongli quests → Yaksha/Chasm → Chenyu Vale.

## Batch C --- Inazuma

Enkanomiya → Orobashi/Watatsumi → Raiden twins → Cataclysm →
Tsurumi/Seirai.

## Batch D --- Sumeru

Three God-Kings → desert civilization → forbidden knowledge → Akademiya
→ Irminsul.

## Batch E --- Fontaine

Primordial Sea/Egeria → Remuria → prophecy →
Focalors/Furina/Neuvillette.

## Batch F --- Natlan

Dragon civilization → Night Kingdom → Xbalanque → Archon succession →
Cataclysm → modern crisis.

## Batch G --- North

Nod-Krai current primary texts → Lightkeepers → Frostmoon →
Fatui/Snezhnaya connections.

## Batch H --- Khaenri'ah

Dainsleif quest chain → Five Sinners → curses → Abyss Order →
Pierro/Rhinedottir links.

------------------------------------------------------------------------

# 16. Editorial model for regional pages

Every Region page should eventually be generated from structured records
but read approximately like:

## Overview

What distinguishes the region historically.

## Historical Layers

Ancient / Archon War / Post-War / Cataclysm / Modern.

## Civilizations

Separate political/cultural systems.

## Gods and Rulers

Not merely current Archon.

## Major Locations

With existence periods/status where relevant.

## Historical Events

Canonical event references.

## Cross-Region Connections

Events or people linking the region to other nations.

## Current Political Order

Only after historical context.

## Sources

Primary Source IDs.

Do not repeat entire event narratives from HistoricalEvent pages.

------------------------------------------------------------------------

# 17. What this pack deliberately does NOT cover deeply

These deserve later dedicated research packs:

-   every playable character biography;
-   every NPC;
-   every local legend;
-   detailed Fatui Harbinger biographies;
-   full Seelie history;
-   full artifact-set textual exegesis;
-   all world quests;
-   every ancient minor civilization;
-   all Natlan tribes in detail;
-   full Nod-Krai current storyline;
-   detailed Abyss Order operations;
-   every Ruin-machine model;
-   full Khaenri'ahn dynastic history;
-   detailed timeline of the Traveler's journey.

This pack establishes the regional historical backbone.

------------------------------------------------------------------------

# 18. Suggested next research packs

After this file is ingested, the most useful next datasets are:

1.  `teyvat_key_characters_lore_pack.md`
    -   Archons
    -   Sovereigns
    -   Shades
    -   major gods
    -   Five Sinners
    -   Harbingers
    -   historically central mortals
2.  `khaenriah_abyss_deep_lore_pack.md`
    -   dynasties
    -   Sinners
    -   curses
    -   Loom of Fate
    -   Abyss Order
    -   Dainsleif
    -   sibling
    -   Rhinedottir
    -   Pierro
3.  `teyvat_cosmology_deep_pack.md`
    -   false sky
    -   moons
    -   Shades
    -   Descenders
    -   Irminsul
    -   Abyss
    -   world boundaries
    -   Celestia
    -   latest Luna revelations
4.  Region-specific deep packs if the encyclopedia needs substantially
    denser history.

------------------------------------------------------------------------

# 19. Final ingestion checklist

Before marking this regional pack processed:

-   [ ] Every real entity has stable ID.
-   [ ] EN/RU localized names are present or explicitly pending
    verification.
-   [ ] No community-wiki URL is used as the final lore citation when a
    primary source is identifiable.
-   [ ] HistoricalEvents are shared records, not copied into Region
    pages.
-   [ ] Approximate dates remain approximate.
-   [ ] Unknown dates remain unknown.
-   [ ] Contradictions have notes/claims.
-   [ ] Cataclysm child events point to the Cataclysm parent.
-   [ ] War of Funerary Flame regional events point to the global
    parent.
-   [ ] Region lanes do not imply false simultaneity.
-   [ ] No historical borders were invented.
-   [ ] Natlan and Nod-Krai claims carry version metadata.
-   [ ] Khaenri'ah is not equated with the Abyss.
-   [ ] Gnosis/Authority/Divine Throne distinctions survive regional
    pages.
-   [ ] Irminsul-modified history is not overwritten.
-   [ ] Demo records are removed only when genuinely replaced.
-   [ ] `validate-content` passes structural checks.
-   [ ] missing-citation warnings are reviewed.
-   [ ] cross-region chronology remains readable with empty lanes where
    evidence is absent.

------------------------------------------------------------------------

# 20. Research provenance

This pack synthesizes the regional historical backbone from named
in-game materials and cross-referenced lore indexes. During ingestion,
the following primary-source clusters should be treated as the
authoritative targets:

**Mondstadt:** Old Mondstadt weapon/artifact texts, Venti material,
Gunnhildr traditions, Vanessa/aristocracy records, Prologue,
Dragonspine/Durin sources.

**Liyue:** Stone Tablet Compilations, Guili quest material, Zhongli
Story Quests, Yaksha texts, Perilous Trail, Moonchase/Stove God
material, Chenyu Vale quests.

**Inazuma:** Enkanomiya books/quests, Watatsumi/Orobashi material,
Raiden Story Quest II, Hakushin/Saiguu sources, Tsurumi and Seirai quest
chains.

**Sumeru:** Archon Quest III, Nahida Story Quest II, desert
books/weapons/artifacts, Jinn/Gurabad quests, Khvarena material.

**Fontaine:** Archon Quest IV, Neuvillette/Furina character material,
Remuria histories and quests, Narzissenkreuz material, Egeria/Khvarena
cross-region sources.

**Natlan:** current Natlan Archon Quests, dragon-civilization records,
Night Kingdom dialogue, Ochkanatlan material, tribal histories.

**Snezhnaya/Nod-Krai:** current northern/Luna story material, Hymns of
the Far North, Lightkeeper/Frostmoon records, Fatui primary material.

**Khaenri'ah:** Dainsleif Archon Quest chain, Caribert, Bedtime Story
and successors, Perinheri, Rhinedottir/Albedo/Durin sources, Five
Sinners revelations.

This file should be imported as the **regional historical backbone**. It
is intentionally more structured than literary: once normalized into the
site's entities, the same records should power Region pages, Character
relations, Chronology, Map, Search, and patch-impact analysis.

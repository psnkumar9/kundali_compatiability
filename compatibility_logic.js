// Auto-generated Compatibility Logic

const NAKSHATRA_NAMES = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
const RASHI_SHORT = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

const _VARNA = {"1": "Kshatriya", "2": "Vaishya", "3": "Shudra", "4": "Brahmin", "5": "Kshatriya", "6": "Vaishya", "7": "Shudra", "8": "Brahmin", "9": "Kshatriya", "10": "Vaishya", "11": "Shudra", "12": "Brahmin"};
const _VARNA_RANK = {"Brahmin": 4, "Kshatriya": 3, "Vaishya": 2, "Shudra": 1};

const _VASHYA_PAIRS = {};
_VASHYA_PAIRS[1] = new Set([8, 5]);
_VASHYA_PAIRS[2] = new Set([4, 7]);
_VASHYA_PAIRS[3] = new Set([11, 6]);
_VASHYA_PAIRS[4] = new Set([8, 9]);
_VASHYA_PAIRS[5] = new Set([7]);
_VASHYA_PAIRS[6] = new Set([3, 12]);
_VASHYA_PAIRS[7] = new Set([10, 6]);
_VASHYA_PAIRS[8] = new Set([4, 5]);
_VASHYA_PAIRS[9] = new Set([]);
_VASHYA_PAIRS[10] = new Set([1, 11]);
_VASHYA_PAIRS[11] = new Set([1, 12]);
_VASHYA_PAIRS[12] = new Set([9, 10, 3]);

function _calc_vashya(boy_rashi, girl_rashi) {
    const boy_list = _VASHYA_PAIRS[boy_rashi] || new Set();
    const girl_list = _VASHYA_PAIRS[girl_rashi] || new Set();
    if (boy_list.has(girl_rashi)) return [2, "Girl's sign falls in boy's Vashya list — full attraction (2/2)"];
    if (girl_list.has(boy_rashi)) return [1, "Boy's sign falls in girl's Vashya list — partial attraction (1/2)"];
    return [0, "Neither sign in the other's Vashya list — no attraction (0/2)"];
}

const _GANA = {"1": "Deva", "2": "Manushya", "3": "Rakshasa", "4": "Manushya", "5": "Deva", "6": "Manushya", "7": "Deva", "8": "Deva", "9": "Rakshasa", "10": "Rakshasa", "11": "Manushya", "12": "Manushya", "13": "Deva", "14": "Rakshasa", "15": "Deva", "16": "Rakshasa", "17": "Deva", "18": "Rakshasa", "19": "Rakshasa", "20": "Manushya", "21": "Manushya", "22": "Deva", "23": "Rakshasa", "24": "Rakshasa", "25": "Manushya", "26": "Manushya", "27": "Deva"};
const _GANA_SCORE = {"Deva": {"Deva": 6, "Manushya": 2, "Rakshasa": 0}, "Manushya": {"Deva": 2, "Manushya": 6, "Rakshasa": 2}, "Rakshasa": {"Deva": 0, "Manushya": 2, "Rakshasa": 6}};

const _TARA_CAT = {"0": "Atimitra (Great Friend) \u2014 Excellent", "1": "Janma (Birth) \u2014 Neutral", "2": "Sampat (Wealth) \u2014 Good", "3": "Vipat (Danger) \u2014 Inauspicious", "4": "Kshema (Wellbeing) \u2014 Good", "5": "Pratyari (Enemy) \u2014 Inauspicious", "6": "Sadhak (Achiever) \u2014 Good", "7": "Vadha (Death) \u2014 Inauspicious", "8": "Mitra (Friend) \u2014 Good"};

const _YONI = {"1": "Horse", "2": "Elephant", "3": "Goat", "4": "Serpent", "5": "Serpent", "6": "Dog", "7": "Cat", "8": "Goat", "9": "Cat", "10": "Rat", "11": "Rat", "12": "Cow", "13": "Buffalo", "14": "Tiger", "15": "Buffalo", "16": "Tiger", "17": "Deer", "18": "Deer", "19": "Dog", "20": "Monkey", "21": "Mongoose", "22": "Monkey", "23": "Lion", "24": "Horse", "25": "Lion", "26": "Cow", "27": "Elephant"};
const _YONI_SEX = {"1": "M", "2": "F", "3": "F", "4": "F", "5": "M", "6": "F", "7": "F", "8": "M", "9": "M", "10": "M", "11": "F", "12": "F", "13": "M", "14": "F", "15": "M", "16": "F", "17": "F", "18": "M", "19": "M", "20": "F", "21": "M", "22": "M", "23": "F", "24": "M", "25": "F", "26": "M", "27": "F"};
const _YONI_ENEMIES = [
  new Set(['Dog', 'Deer']),
  new Set(['Monkey', 'Goat']),
  new Set(['Serpent', 'Mongoose']),
  new Set(['Elephant', 'Lion']),
  new Set(['Tiger', 'Cow']),
  new Set(['Cat', 'Rat']),
  new Set(['Buffalo', 'Horse']),
];


function _yoni_score(boy_nak, girl_nak) {
    const by = _YONI[boy_nak];
    const gy = _YONI[girl_nak];
    if (by === gy) {
        return [4.0, `Same Yoni (${by}) — full score`];
    }
    const isEnemy = _YONI_ENEMIES.some(enemySet => enemySet.has(by) && enemySet.has(gy));
    if (isEnemy) {
        return [0.0, `${by} and ${gy} are natural enemies — score 0`];
    }
    return [2.0, `${by} and ${gy} are neutral — score 2`];
}


const _RASHI_LORD = {"1": "Mars", "2": "Venus", "3": "Mercury", "4": "Moon", "5": "Sun", "6": "Mercury", "7": "Venus", "8": "Mars", "9": "Jupiter", "10": "Saturn", "11": "Saturn", "12": "Jupiter"};
const _PLANET_FRIEND = {"Sun": {"Moon": "F", "Mars": "F", "Mercury": "N", "Jupiter": "F", "Venus": "E", "Saturn": "E", "Sun": "\u2014"}, "Moon": {"Sun": "F", "Mars": "N", "Mercury": "F", "Jupiter": "N", "Venus": "N", "Saturn": "N", "Moon": "\u2014"}, "Mars": {"Sun": "F", "Moon": "F", "Mercury": "N", "Jupiter": "F", "Venus": "N", "Saturn": "N", "Mars": "\u2014"}, "Mercury": {"Sun": "F", "Moon": "N", "Mars": "N", "Jupiter": "N", "Venus": "F", "Saturn": "N", "Mercury": "\u2014"}, "Jupiter": {"Sun": "F", "Moon": "F", "Mars": "F", "Mercury": "E", "Venus": "E", "Saturn": "N", "Jupiter": "\u2014"}, "Venus": {"Sun": "E", "Moon": "N", "Mars": "N", "Mercury": "F", "Jupiter": "N", "Saturn": "F", "Venus": "\u2014"}, "Saturn": {"Sun": "E", "Moon": "E", "Mars": "N", "Mercury": "F", "Jupiter": "N", "Venus": "F", "Saturn": "\u2014"}};
const _FRIEND_LABEL = {"F": "friend", "N": "neutral", "E": "enemy"};
const _GM_SCORE = {"F": {"F": 5, "N": 4, "E": 1}, "N": {"F": 4, "N": 3, "E": 0.5}, "E": {"F": 1, "N": 0.5, "E": 0}};
const _NADI = {"1": "Adi", "2": "Madhya", "3": "Antya", "4": "Antya", "5": "Madhya", "6": "Adi", "7": "Adi", "8": "Madhya", "9": "Antya", "10": "Antya", "11": "Madhya", "12": "Adi", "13": "Adi", "14": "Madhya", "15": "Antya", "16": "Antya", "17": "Madhya", "18": "Adi", "19": "Adi", "20": "Madhya", "21": "Antya", "22": "Antya", "23": "Madhya", "24": "Adi", "25": "Adi", "26": "Madhya", "27": "Antya"};
const _NADI_MEANING = {"Adi": "Vata (wind)", "Madhya": "Pitta (fire)", "Antya": "Kapha (water)"};

// South India
const _RAJJU = {"1": "Pada", "2": "Kati", "3": "Nabhi", "4": "Kantha", "5": "Shira", "6": "Kantha", "7": "Nabhi", "8": "Kati", "9": "Pada", "10": "Pada", "11": "Kati", "12": "Nabhi", "13": "Kantha", "14": "Shira", "15": "Kantha", "16": "Nabhi", "17": "Kati", "18": "Pada", "19": "Pada", "20": "Kati", "21": "Nabhi", "22": "Pada", "23": "Shira", "24": "Katha", "25": "Nabhi", "26": "Kati", "27": "Pada"};
const _RAJJU_MEANING = {"Shira": "head \u2014 linked to widowhood", "Kantha": "neck \u2014 linked to husband's longevity", "Nabhi": "navel/stomach \u2014 linked to poverty", "Kati": "waist \u2014 linked to general suffering", "Pada": "feet \u2014 linked to wandering/instability", "Katha": "neck (alt) \u2014 linked to husband's longevity"};

function _vedha_pair(n1, n2) {
    const s = n1 + n2;
    return s === 19 || s === 28 || s === 37;
}

function _rasi_adhipati_pass(boy_rashi, girl_rashi) {
    const bl = _RASHI_LORD[boy_rashi];
    const gl = _RASHI_LORD[girl_rashi];
    if (bl === gl) return [true, `Both lords are ${bl} — same lord, compatible`];
    const br = _PLANET_FRIEND[bl][gl] || "N";
    const gr = _PLANET_FRIEND[gl][bl] || "N";
    if (br === "E" && gr === "E") return [false, `${bl} considers ${gl}: enemy; ${gl} considers ${bl}: enemy → Incompatible`];
    return [true, `${bl} considers ${gl}: ${_FRIEND_LABEL[br]}; ${gl} considers ${bl}: ${_FRIEND_LABEL[gr]} → Compatible`];
}

function _vasiya_pass(boy_rashi, girl_rashi) {
    const [score, reason] = _calc_vashya(boy_rashi, girl_rashi);
    return [score >= 1, reason];
}

function _yoni_pass(boy_nak, girl_nak) {
    const [sc, reason] = _yoni_score(boy_nak, girl_nak);
    return [sc > 0, reason];
}

function _gana_pass(boy_nak, girl_nak) {
    const bg = _GANA[boy_nak];
    const gg = _GANA[girl_nak];
    const score = _GANA_SCORE[bg][gg];
    if (score === 0) return [false, `Boy's Gana (${bg}) + Girl's Gana (${gg}) = incompatible combination`];
    return [true, `Boy's Gana (${bg}) + Girl's Gana (${gg}) = compatible`];
}

function _count_stars(n1, n2) {
    // Count from n1 to n2 inclusive
    let count = n2 - n1 + 1;
    if (count <= 0) count += 27;
    return count;
}

function _dina_pass(boy_nak, girl_nak) {
    let cfg = _count_stars(girl_nak, boy_nak);
    const rem = cfg % 9;
    const cat = _TARA_CAT[rem] || "";
    const is_bad = (rem === 3 || rem === 5 || rem === 7);
    return [!is_bad, cfg, cat];
}

function _calc_bhakoot(boy_rashi, girl_rashi) {
    const g_to_b = ((boy_rashi - girl_rashi + 12) % 12) + 1;
    const fav = new Set([1, 7, 8, 10, 11]);
    return fav.has(g_to_b) ? 7.0 : 0.0;
}

function calculate_north_workings(p1_nak, p2_nak, p1_rashi, p2_rashi) {
    const n1 = NAKSHATRA_NAMES[p1_nak - 1];
    const n2 = NAKSHATRA_NAMES[p2_nak - 1];
    const r1 = RASHI_SHORT[p1_rashi - 1];
    const r2 = RASHI_SHORT[p2_rashi - 1];
    
    let w = {};
    
    // Varna
    const v1 = _VARNA[p1_rashi];
    const v2 = _VARNA[p2_rashi];
    const v_score = _VARNA_RANK[v1] >= _VARNA_RANK[v2] ? 1 : 0;
    w["varna"] = {
        values: `Boy Rashi: ${r1} | Girl Rashi: ${r2}`,
        steps: [
            `Boy's Moon sign is ${r1} → Varna: ${v1}`,
            `Girl's Moon sign is ${r2} → Varna: ${v2}`,
            `Hierarchy check: ${v1} (rank ${_VARNA_RANK[v1]}) ${v_score ? '>=' : '<'} ${v2} (rank ${_VARNA_RANK[v2]})`,
            `Rule: Boy's Varna must be equal or higher than Girl's → ${v_score ? 'Compatible' : 'Incompatible'}`
        ],
        inference: `${v1} boy + ${v2} girl → ${v_score}/1 point`,
        score: v_score
    };

    // Vashya
    const [vs, vashya_reason] = _calc_vashya(p1_rashi, p2_rashi);
    w["vashya"] = {
        values: `Boy Rashi: ${r1} (#${p1_rashi}) | Girl Rashi: ${r2} (#${p2_rashi})`,
        steps: [
            `Boy's Moon sign ${r1} → attracts/dominates`,
            `Girl's Moon sign ${r2} → attracts/dominates`,
            "Rule: Girl's sign in Boy's list = 2 pts; Boy's sign in Girl's list = 1 pt; neither = 0 pts",
            vashya_reason
        ],
        inference: `${r1} boy + ${r2} girl → ${vs}/2 points`,
        score: vs
    };

    // Gana
    const bg_g = _GANA[p1_nak];
    const gg_g = _GANA[p2_nak];
    const gs = _GANA_SCORE[bg_g][gg_g];
    w["gana"] = {
        values: `Boy Nakshatra: ${n1} (${p1_nak}) | Girl Nakshatra: ${n2} (${p2_nak})`,
        steps: [
            `Boy's Nakshatra: ${n1} (${p1_nak}) → Gana: ${bg_g}`,
            `Girl's Nakshatra: ${n2} (${p2_nak}) → Gana: ${gg_g}`,
            `Score table: ${bg_g} + ${gg_g} = ${gs}/6`
        ],
        inference: `${bg_g} + ${gg_g} → ${gs}/6 points`,
        score: gs
    };

    // Tara
    const cfg = _count_stars(p2_nak, p1_nak);
    const cfb = _count_stars(p1_nak, p2_nak);
    const cfg_rem = cfg % 9;
    const cfb_rem = cfb % 9;
    const score_gf = (cfg_rem === 3 || cfg_rem === 5 || cfg_rem === 7) ? 0 : 1.5;
    const score_bf = (cfb_rem === 3 || cfb_rem === 5 || cfb_rem === 7) ? 0 : 1.5;
    const tara_total = score_gf + score_bf;
    w["tara"] = {
        values: `Boy Nakshatra: ${n1} (${p1_nak}) | Girl Nakshatra: ${n2} (${p2_nak})`,
        steps: [
            `Count Girl to Boy: ${cfg} stars → remainder ${cfg_rem} → ${score_gf} pts`,
            `Count Boy to Girl: ${cfb} stars → remainder ${cfb_rem} → ${score_bf} pts`
        ],
        inference: `Total Tara Score → ${tara_total}/3 points`,
        score: tara_total
    };

    // Yoni
    const by = _YONI[p1_nak];
    const gy = _YONI[p2_nak];
    const [ys, yreason] = _yoni_score(p1_nak, p2_nak);
    w["yoni"] = {
        values: `Boy Nakshatra: ${n1} (${p1_nak}) | Girl Nakshatra: ${n2} (${p2_nak})`,
        steps: [
            `Boy: ${by}`, `Girl: ${gy}`, yreason
        ],
        inference: `${by} (boy) + ${gy} (girl) → ${ys}/4 points`,
        score: ys
    };

    // Graha Maitri
    const bl = _RASHI_LORD[p1_rashi];
    const gl = _RASHI_LORD[p2_rashi];
    let gms = 0;
    if (bl === gl) gms = 5;
    else {
        const br = _PLANET_FRIEND[bl][gl] || "N";
        const gr = _PLANET_FRIEND[gl][bl] || "N";
        gms = _GM_SCORE[br][gr];
    }
    w["graha_maitri"] = {
        values: `Boy Rashi: ${r1} | Girl Rashi: ${r2}`,
        steps: [`Boy Lord: ${bl}`, `Girl Lord: ${gl}`, `Friendship Score: ${gms}/5`],
        inference: `${bl} + ${gl} → ${gms}/5 points`,
        score: gms
    };

    // Bhakoot
    const bks = _calc_bhakoot(p1_rashi, p2_rashi);
    w["bhakoot"] = {
        values: `Boy Rashi: ${r1} | Girl Rashi: ${r2}`,
        steps: [`Bhakoot score calculation`],
        inference: `Bhakoot → ${bks}/7 points`,
        score: bks
    };

    // Nadi
    const n1d = _NADI[p1_nak];
    const n2d = _NADI[p2_nak];
    const ns = (n1d === n2d) ? 0 : 8;
    w["nadi"] = {
        values: `Boy Nakshatra: ${n1} | Girl Nakshatra: ${n2}`,
        steps: [
            `Boy Nadi: ${n1d}`,
            `Girl Nadi: ${n2d}`,
            ns === 0 ? "NADI DOSHA!" : "Different Nadi, 8 pts"
        ],
        inference: `${n1d} vs ${n2d} → ${ns}/8 points`,
        score: ns
    };

    return w;
}

function calculate_south_poruthams(p1_nak, p2_nak, p1_rashi, p2_rashi) {
    const n1 = NAKSHATRA_NAMES[p1_nak - 1];
    const n2 = NAKSHATRA_NAMES[p2_nak - 1];
    let poruthams = [];

    // 1. Dina
    const [dpass, dcfg, dcat] = _dina_pass(p1_nak, p2_nak);
    poruthams.push({name: "Dina Porutham", pass: dpass});

    // 2. Gana
    const [gpass, greason] = _gana_pass(p1_nak, p2_nak);
    poruthams.push({name: "Gana Porutham", pass: gpass});

    // 3. Mahendra
    const mah_count = ((p1_nak - p2_nak + 27) % 27) + 1;
    const mah_pass = [4,7,10,13,16,19,22,25].includes(mah_count);
    poruthams.push({name: "Mahendra Porutham", pass: mah_pass});

    // 4. Sthree Dheerga
    poruthams.push({name: "Sthree Dheerga", pass: mah_count > 9});

    // 5. Yoni
    const [ypass, yreason2] = _yoni_pass(p1_nak, p2_nak);
    poruthams.push({name: "Yoni Porutham", pass: ypass});

    // 6. Rasi Adhipati
    const [rpass, rreason] = _rasi_adhipati_pass(p1_rashi, p2_rashi);
    poruthams.push({name: "Rasi Porutham", pass: rpass});

    // 7. Rajju
    const rj1 = _RAJJU[p1_nak];
    const rj2 = _RAJJU[p2_nak];
    poruthams.push({name: "Rajju Porutham", pass: rj1 !== rj2});

    // 8. Vedha
    poruthams.push({name: "Vedha Porutham", pass: !_vedha_pair(p1_nak, p2_nak)});

    // 9. Vasiya
    const [vpass, vreason] = _vasiya_pass(p1_rashi, p2_rashi);
    poruthams.push({name: "Vasiya Porutham", pass: vpass});

    // 10. Nadi
    const nd1 = _NADI[p1_nak];
    const nd2 = _NADI[p2_nak];
    poruthams.push({name: "Nadi Porutham", pass: nd1 !== nd2});

    return poruthams;
}

window.AstroCalc = {
    calculate_north: calculate_north_workings,
    calculate_south: calculate_south_poruthams
};

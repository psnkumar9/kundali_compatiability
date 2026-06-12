/**
 * astro_calc.js
 * Calculates Vedic Planetary Positions, D1/D9 Charts, and Vimshottari Dasha 
 * entirely locally using astronomy-engine.
 */

// Vimshottari Dasha configuration
const DASHA_LORDS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17];
const ZODIAC_SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

function getJulianCentury(date) {
    // JD at J2000.0 is 2451545.0
    // Astronomy.MakeTime(date).ut gives UT time in days since J2000.0
    const jd = Astronomy.MakeTime(date).ut;
    return jd / 36525.0;
}

function getLahiriAyanamsha(date) {
    const t = getJulianCentury(date);
    // Lahiri Ayanamsha at J2000 is approx 23° 51' 11" = 23.853055
    // Annual rate is ~50.29 arcsec = 1.396971 degrees/century
    return 23.853055 + (1.396971 * t);
}

function getTropicalEclipticLon(body, date) {
    const observer = new Astronomy.Observer(0, 0, 0);
    const equ = Astronomy.Equator(body, date, observer, true, true);
    const ecl = Astronomy.Ecliptic(equ.vec);
    return ecl.elon;
}

function getRahuMeanLon(date) {
    const t = getJulianCentury(date);
    let omega = 125.04452 - 1934.136261 * t + 0.0020708 * t * t;
    omega = omega % 360.0;
    if (omega < 0) omega += 360.0;
    return omega;
}

function getVedicPlanets(date) {
    const ayanamsha = getLahiriAyanamsha(date);
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    
    let results = {};
    for (const p of planets) {
        let trop = getTropicalEclipticLon(p, date);
        let vedic = (trop - ayanamsha + 360.0) % 360.0;
        results[p] = vedic;
    }
    
    let rahuTrop = getRahuMeanLon(date);
    let rahuVedic = (rahuTrop - ayanamsha + 360.0) % 360.0;
    results['Rahu'] = rahuVedic;
    results['Ketu'] = (rahuVedic + 180.0) % 360.0;
    
    return results;
}

// Maps degrees (0-360) to Zodiac Sign index (0-11)
function getSignIndex(degree) {
    return Math.floor(degree / 30.0) % 12;
}

// Calculates Navamsha (D9) sign index
function getNavamshaSignIndex(degree) {
    const signIndex = getSignIndex(degree);
    const degreeInSign = degree % 30.0;
    const navamshaPart = Math.floor(degreeInSign / (3.0 + 1.0/3.0)); // 3°20' = 3.3333...
    
    // Starting sign for navamshas:
    // Fire signs (Aries, Leo, Sag) start from Aries (0)
    // Earth signs (Taurus, Virgo, Cap) start from Capricorn (9)
    // Air signs (Gemini, Libra, Aqua) start from Libra (6)
    // Water signs (Cancer, Scorpio, Pisces) start from Cancer (3)
    let startSign = 0;
    if ([0, 4, 8].includes(signIndex)) startSign = 0;
    else if ([1, 5, 9].includes(signIndex)) startSign = 9;
    else if ([2, 6, 10].includes(signIndex)) startSign = 6;
    else if ([3, 7, 11].includes(signIndex)) startSign = 3;
    
    return (startSign + navamshaPart) % 12;
}

function generateChart(vedicPlanets, isNavamsha = false) {
    // Returns array of 12 arrays, each containing planet names for that sign index (0-11)
    let chart = Array.from({length: 12}, () => []);
    for (const [planet, deg] of Object.entries(vedicPlanets)) {
        let signIdx = isNavamsha ? getNavamshaSignIndex(deg) : getSignIndex(deg);
        chart[signIdx].push(planet);
    }
    return chart;
}

function calculateCurrentVimshottariDasha(moonVedicLon, birthDate) {
    const nakshatraLen = 13.0 + 1.0/3.0; // 13°20'
    const nakshatraIndex = Math.floor(moonVedicLon / nakshatraLen);
    const degInNak = moonVedicLon % nakshatraLen;
    const fractionLeft = 1.0 - (degInNak / nakshatraLen);
    
    let lordIdx = nakshatraIndex % 9;
    let balanceYears = fractionLeft * DASHA_YEARS[lordIdx];
    
    // Add years to birth date to trace periods
    let targetTime = Date.now();
    let birthTime = birthDate.getTime();
    const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
    
    let currentTime = birthTime;
    let dashaIdx = lordIdx;
    
    // Advance through Mahadashas
    let mahadashaLord = "";
    let mahadashaStart = 0;
    let mahadashaEnd = 0;
    let mdYears = 0;
    
    // Handle the first partial Mahadasha
    if (targetTime < currentTime + balanceYears * msPerYear) {
        mahadashaLord = DASHA_LORDS[dashaIdx];
        mahadashaStart = currentTime - ((DASHA_YEARS[dashaIdx] - balanceYears) * msPerYear);
        mahadashaEnd = currentTime + balanceYears * msPerYear;
        mdYears = DASHA_YEARS[dashaIdx];
    } else {
        currentTime += balanceYears * msPerYear;
        dashaIdx = (dashaIdx + 1) % 9;
        
        while (true) {
            let nextTime = currentTime + (DASHA_YEARS[dashaIdx] * msPerYear);
            if (targetTime >= currentTime && targetTime < nextTime) {
                mahadashaLord = DASHA_LORDS[dashaIdx];
                mahadashaStart = currentTime;
                mahadashaEnd = nextTime;
                mdYears = DASHA_YEARS[dashaIdx];
                break;
            }
            currentTime = nextTime;
            dashaIdx = (dashaIdx + 1) % 9;
        }
    }
    
    // Calculate Antardasha (Sub-period)
    let adCurrentTime = mahadashaStart;
    let adIdx = dashaIdx; // Antardasha sequence starts with MD lord
    let antardashaLord = "";
    
    for (let i = 0; i < 9; i++) {
        let adYears = (mdYears * DASHA_YEARS[adIdx]) / 120.0;
        let adNextTime = adCurrentTime + (adYears * msPerYear);
        if (targetTime >= adCurrentTime && targetTime < adNextTime) {
            antardashaLord = DASHA_LORDS[adIdx];
            break;
        }
        adCurrentTime = adNextTime;
        adIdx = (adIdx + 1) % 9;
    }
    
    return `${mahadashaLord} Mahadasha, ${antardashaLord} Antardasha`;
}

function processAstroData(dateStr, timeStr, tzOffsetHours) {
    // Construct local time string and parse it, subtracting tzOffset to get UT
    // The inputs e.g., "1990-01-28", "15:45", 5.5
    const tzSign = tzOffsetHours >= 0 ? '+' : '-';
    const tzH = String(Math.floor(Math.abs(tzOffsetHours))).padStart(2, '0');
    const tzM = String(Math.floor((Math.abs(tzOffsetHours) % 1) * 60)).padStart(2, '0');
    const isoString = `${dateStr}T${timeStr}:00${tzSign}${tzH}:${tzM}`;
    
    const birthDate = new Date(isoString);
    if (isNaN(birthDate.getTime())) return null;
    
    const planets = getVedicPlanets(birthDate);
    const d1 = generateChart(planets, false);
    const d9 = generateChart(planets, true);
    const dasha = calculateCurrentVimshottariDasha(planets['Moon'], birthDate);
    
    return {
        d1: d1,
        d9: d9,
        dasha: dasha,
        planets: planets
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { processAstroData };
}

const axios = require('axios');

const baseUrl = 'http://192.168.1.114:5003/api';
const SIKLUS = 'XIII';
const USER_ID = 32;

// Fungsi helper konversi tanggal DD/MM/YYYY -> YYYY-MM-DD
function parseDate(str) {
    if (!str) return '';
    // handle case 26,08/2025 like in B6
    str = str.replace(',', '/');
    const parts = str.split('/');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return str; // fallback
}

// Data Array untuk semua petak
const dataRaw = [
    // B1
    { kategori: 'PR', petak: 'B1', partial: 1, date: '26/08/2025', doc: 72, size: 59, tonase: '1328.6' },
    { kategori: 'PR', petak: 'B1', partial: 2, date: '06/09/2025', doc: 83, size: 46, tonase: '2643.8' },
    { kategori: 'PR', petak: 'B1', partial: 3, date: '16/09/2025', doc: 93, size: 42, tonase: '2352.4' },
    { kategori: 'PR', petak: 'B1', partial: 4, date: '29/09/2025', doc: 106, size: 35, tonase: '1163.1' },
    { kategori: 'PR', petak: 'B1', partial: 5, date: '12/11/2025', doc: 150, size: 23, tonase: '3131.5' },
    { kategori: 'PT', petak: 'B1', partial: 0, date: '27/11/2025', doc: 165, size: 21, tonase: '16059' },

    // B2
    { kategori: 'PR', petak: 'B2', partial: 1, date: '26/08/2025', doc: 72, size: 59, tonase: '1216.6' },
    { kategori: 'PR', petak: 'B2', partial: 2, date: '06/09/2025', doc: 83, size: 45, tonase: '2519.4' },
    { kategori: 'PR', petak: 'B2', partial: 3, date: '15/09/2025', doc: 92, size: 43, tonase: '2103' },
    { kategori: 'PR', petak: 'B2', partial: 4, date: '29/09/2025', doc: 106, size: 33, tonase: '1064' },
    { kategori: 'PR', petak: 'B2', partial: 5, date: '03/11/2025', doc: 141, size: 24, tonase: '2312' },
    { kategori: 'PT', petak: 'B2', partial: 0, date: '03/12/2025', doc: 171, size: 22, tonase: '19813.1' }, // total termasuk bu albert dll

    // B3
    { kategori: 'PR', petak: 'B3', partial: 1, date: '26/08/2025', doc: 72, size: 69, tonase: '1466' },
    { kategori: 'PR', petak: 'B3', partial: 2, date: '06/09/2025', doc: 83, size: 52, tonase: '2594.6', lm: 5 },
    { kategori: 'PR', petak: 'B3', partial: 3, date: '16/09/2025', doc: 93, size: 49, tonase: '2744.3' },
    { kategori: 'PR', petak: 'B3', partial: 4, date: '29/09/2025', doc: 106, size: 41, tonase: '1281.1' },
    { kategori: 'PR', petak: 'B3', partial: 5, date: '14/10/2025', doc: 121, size: 33, tonase: '2471.8' },
    { kategori: 'PR', petak: 'B3', partial: 6, date: '19/11/2025', doc: 157, size: 25, tonase: '3750' },
    { kategori: 'PT', petak: 'B3', partial: 0, date: '04/12/2025', doc: 172, size: 22, tonase: '19369.9', bs: 17, lm: 5 },

    // B4
    { kategori: 'PR', petak: 'B4', partial: 1, date: '26/08/2025', doc: 72, size: 64, tonase: '1641.8' },
    { kategori: 'PR', petak: 'B4', partial: 2, date: '06/09/2025', doc: 83, size: 50, tonase: '2593.7' },
    { kategori: 'PR', petak: 'B4', partial: 3, date: '15/09/2025', doc: 92, size: 48, tonase: '2962', lm: 5, bs: 20.6 },
    { kategori: 'PR', petak: 'B4', partial: 4, date: '29/09/2025', doc: 106, size: 37, tonase: '961.2' },
    { kategori: 'PR', petak: 'B4', partial: 5, date: '26/10/2025', doc: 133, size: 29, tonase: '3181.4' },
    { kategori: 'PR', petak: 'B4', partial: 6, date: '19/11/2025', doc: 157, size: 24, tonase: '2479.9' },
    { kategori: 'PT', petak: 'B4', partial: 0, date: '11/12/2025', doc: 177, size: 23, tonase: '17503.5', bs: 12, lm: 5 },

    // B5
    { kategori: 'PR', petak: 'B5', partial: 1, date: '26/08/2025', doc: 72, size: 66, tonase: '1435.1' },
    { kategori: 'PR', petak: 'B5', partial: 2, date: '06/09/2025', doc: 83, size: 53, tonase: '2604.4' },
    { kategori: 'PR', petak: 'B5', partial: 3, date: '16/09/2025', doc: 93, size: 49, tonase: '2734.9' },
    { kategori: 'PR', petak: 'B5', partial: 4, date: '29/09/2025', doc: 106, size: 41, tonase: '1044.2', lm: 5, bs: 5.3 },
    { kategori: 'PR', petak: 'B5', partial: 5, date: '27/10/2025', doc: 134, size: 28, tonase: '3232.3', lm: 4 },
    { kategori: 'PR', petak: 'B5', partial: 6, date: '19/11/2025', doc: 157, size: 25, tonase: '3198.2' },
    { kategori: 'PT', petak: 'B5', partial: 0, date: '05/12/2025', doc: 173, size: 23, tonase: '17981.3', bs: 50.5 },

    // B6
    { kategori: 'PR', petak: 'B6', partial: 1, date: '26/08/2025', doc: 72, size: 68, tonase: '1575.9' },
    { kategori: 'PR', petak: 'B6', partial: 2, date: '06/09/2025', doc: 83, size: 54, tonase: '2416.5' },
    { kategori: 'PR', petak: 'B6', partial: 3, date: '15/09/2025', doc: 92, size: 51, tonase: '2619.5' },
    { kategori: 'PR', petak: 'B6', partial: 4, date: '29/09/2025', doc: 106, size: 41, tonase: '1062.9' },
    { kategori: 'PR', petak: 'B6', partial: 5, date: '14/10/2025', doc: 121, size: 34, tonase: '3016' },
    { kategori: 'PR', petak: 'B6', partial: 6, date: '19/11/2025', doc: 157, size: 25, tonase: '3027' },
    { kategori: 'PT', petak: 'B6', partial: 0, date: '06/12/2025', doc: 174, size: 22, tonase: '17168.2', bs: 30, lm: 5 },

    // B7
    { kategori: 'PR', petak: 'B7', partial: 1, date: '26/08/2025', doc: 72, size: 76, tonase: '1431.8' },
    { kategori: 'PR', petak: 'B7', partial: 2, date: '06/09/2025', doc: 83, size: 55, tonase: '2862' },
    { kategori: 'PR', petak: 'B7', partial: 3, date: '16/09/2025', doc: 93, size: 52, tonase: '2766.8' },
    { kategori: 'PR', petak: 'B7', partial: 4, date: '29/09/2025', doc: 106, size: 42, tonase: '1032.1' },
    { kategori: 'PR', petak: 'B7', partial: 5, date: '14/10/2025', doc: 121, size: 34, tonase: '3199.9' },
    { kategori: 'PR', petak: 'B7', partial: 6, date: '03/11/2025', doc: 141, size: 28, tonase: '1762.3' },
    { kategori: 'PR', petak: 'B7', partial: 7, date: '27/11/2025', doc: 165, size: 24, tonase: '2964.1' },
    { kategori: 'PT', petak: 'B7', partial: 0, date: '11/12/2025', doc: 176, size: 23, tonase: '17859.7', bs: 22 },

    // B8
    { kategori: 'PR', petak: 'B8', partial: 1, date: '26/08/2025', doc: 72, size: 72, tonase: '1456.2' },
    { kategori: 'PR', petak: 'B8', partial: 2, date: '07/09/2025', doc: 84, size: 55, tonase: '2349.3' },
    { kategori: 'PR', petak: 'B8', partial: 3, date: '15/09/2025', doc: 91, size: 53, tonase: '2307.2' },
    { kategori: 'PR', petak: 'B8', partial: 4, date: '29/09/2025', doc: 106, size: 42, tonase: '1257.2' },
    { kategori: 'PR', petak: 'B8', partial: 5, date: '28/10/2025', doc: 135, size: 29, tonase: '3997.3', lm: 6 },
    { kategori: 'PR', petak: 'B8', partial: 6, date: '19/11/2025', doc: 157, size: 25, tonase: '3177' },
    { kategori: 'PT', petak: 'B8', partial: 0, date: '07/12/2025', doc: 175, size: 23, tonase: '17584', bs: 21, lm: 5 }, // 17576 + 8 kg P'Robby = 17584

    // B9
    { kategori: 'PR', petak: 'B9', partial: 1, date: '26/08/2025', doc: 72, size: 74, tonase: '1587.3' },
    { kategori: 'PR', petak: 'B9', partial: 2, date: '06/09/2025', doc: 83, size: 58, tonase: '2867.7', bs: 8 },
    { kategori: 'PR', petak: 'B9', partial: 3, date: '15/09/2025', doc: 92, size: 54, tonase: '2707.5' },
    { kategori: 'PR', petak: 'B9', partial: 4, date: '29/09/2025', doc: 106, size: 44, tonase: '1154' },
    { kategori: 'PR', petak: 'B9', partial: 5, date: '09/10/2025', doc: 116, size: 39, tonase: '3024.8', lm: 8 },
    { kategori: 'PR', petak: 'B9', partial: 6, date: '03/11/2025', doc: 141, size: 28, tonase: '2706.2' },
    { kategori: 'PR', petak: 'B9', partial: 7, date: '27/11/2025', doc: 165, size: 24, tonase: '1907.3' },
    { kategori: 'PT', petak: 'B9', partial: 0, date: '11/12/2025', doc: 179, size: 23, tonase: '18046.3', lm: 5 },

    // B10
    { kategori: 'PR', petak: 'B10', partial: 1, date: '26/08/2025', doc: 72, size: 61, tonase: '1516.1' },
    { kategori: 'PR', petak: 'B10', partial: 2, date: '07/09/2025', doc: 84, size: 49, tonase: '2268.7' },
    { kategori: 'PR', petak: 'B10', partial: 3, date: '15/09/2025', doc: 91, size: 47, tonase: '2521.9' },
    { kategori: 'PR', petak: 'B10', partial: 4, date: '29/09/2025', doc: 106, size: 38, tonase: '1069.9' },
    { kategori: 'PR', petak: 'B10', partial: 5, date: '28/10/2025', doc: 135, size: 27, tonase: '2847', lm: 4 },
    { kategori: 'PT', petak: 'B10', partial: 0, date: '26/11/2025', doc: 164, size: 23, tonase: '18336.5', bs: 20.5 },
];

async function insertData() {
    console.log(`Menyiapkan ${dataRaw.length} data untuk Blok B Siklus ${SIKLUS}...`);
    let successCount = 0;

    for (const item of dataRaw) {
        const payload = new URLSearchParams();
        payload.append('kategori', item.kategori); // PT / PR
        payload.append('blok', 'B');
        payload.append('petak', item.petak);
        payload.append('siklus', SIKLUS);
        payload.append('partial', item.partial);
        payload.append('date', parseDate(item.date));
        payload.append('doc', item.doc);
        payload.append('size', item.size);
        payload.append('tonase', item.tonase);
        payload.append('bs', item.bs || 0);
        payload.append('lm', item.lm || 0);
        payload.append('user_id', USER_ID);
        payload.append('updator', USER_ID);

        try {
            await axios.post(`${baseUrl}/tonase`, payload, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            console.log(`[OK] Inserted ${item.petak} | ${item.kategori} | ${item.date}`);
            successCount++;
        } catch (error) {
            console.error(`[ERROR] Failed at ${item.petak} ${item.date}:`, error.response?.data || error.message);
        }

        // Jeda 50ms per request supaya aman
        await new Promise(r => setTimeout(r, 50));
    }

    console.log(`\nSelesai! Berhasil insert ${successCount}/${dataRaw.length} baris.`);
}

insertData();

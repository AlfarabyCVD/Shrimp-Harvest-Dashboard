const axios = require('axios');
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://192.168.1.105:5003/api';
const SIKLUS = 'XVI';
const USER_ID = 32;

// Load checkpoint file
const checkpointPath = path.join(__dirname, 'checkpoint_blok_A_XVI.json');
const checkpoint = JSON.parse(fs.readFileSync(checkpointPath, 'utf8'));
const dataRaw = checkpoint.data;

async function insertData() {
    console.log(`Menyiapkan ${dataRaw.length} data untuk Blok A Siklus ${SIKLUS}...`);
    let successCount = 0;

    for (const item of dataRaw) {
        const payload = new URLSearchParams();
        payload.append('kategori', item.kategori); // PT / PR / PS
        payload.append('blok', 'A');
        payload.append('petak', item.petak);
        payload.append('siklus', SIKLUS);
        payload.append('partial', item.partial);
        payload.append('date', item.date);
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

        // Jeda 50ms per request
        await new Promise(r => setTimeout(r, 50));
    }

    console.log(`\nSelesai! Berhasil insert ${successCount}/${dataRaw.length} baris data Blok A Siklus ${SIKLUS}.`);
}

insertData();

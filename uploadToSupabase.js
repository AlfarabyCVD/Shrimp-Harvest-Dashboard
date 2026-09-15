const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://tdutywnzjefhlqufisaq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ACaWd12HjId2QNYngdrJrA_bVMzJgHA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Data Blok A Siklus XVI
const checkpointPath = path.join(__dirname, 'checkpoint_blok_A_XVI.json');
const checkpointA = JSON.parse(fs.readFileSync(checkpointPath, 'utf8'));
const dataBlokA = checkpointA.data;

// Data Blok B Siklus XIII
const dataBlokB = [
    { kategori: 'PR', petak: 'B1', partial: 1, date: '2025-08-26', doc: 72, size: 59, tonase: 1328.6, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B1', partial: 2, date: '2025-09-06', doc: 83, size: 46, tonase: 2643.8, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B1', partial: 3, date: '2025-09-16', doc: 93, size: 42, tonase: 2352.4, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B1', partial: 4, date: '2025-09-29', doc: 106, size: 35, tonase: 1163.1, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B1', partial: 5, date: '2025-11-12', doc: 150, size: 23, tonase: 3131.5, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B1', partial: 0, date: '2025-11-27', doc: 165, size: 21, tonase: 16059.0, bs: 0, lm: 0 },

    { kategori: 'PR', petak: 'B2', partial: 1, date: '2025-08-26', doc: 72, size: 59, tonase: 1216.6, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B2', partial: 2, date: '2025-09-06', doc: 83, size: 45, tonase: 2519.4, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B2', partial: 3, date: '2025-09-15', doc: 92, size: 43, tonase: 2103.0, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B2', partial: 4, date: '2025-09-29', doc: 106, size: 33, tonase: 1064.0, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B2', partial: 5, date: '2025-11-03', doc: 141, size: 24, tonase: 2312.0, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B2', partial: 0, date: '2025-12-03', doc: 171, size: 22, tonase: 19813.1, bs: 0, lm: 0 },

    { kategori: 'PR', petak: 'B3', partial: 1, date: '2025-08-26', doc: 72, size: 69, tonase: 1466.0, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B3', partial: 2, date: '2025-09-06', doc: 83, size: 52, tonase: 2594.6, bs: 0, lm: 5 },
    { kategori: 'PR', petak: 'B3', partial: 3, date: '2025-09-16', doc: 93, size: 49, tonase: 2744.3, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B3', partial: 4, date: '2025-09-29', doc: 106, size: 41, tonase: 1281.1, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B3', partial: 5, date: '2025-10-14', doc: 121, size: 33, tonase: 2471.8, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B3', partial: 6, date: '2025-11-19', doc: 157, size: 25, tonase: 3750.0, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B3', partial: 0, date: '2025-12-04', doc: 172, size: 22, tonase: 19369.9, bs: 17, lm: 5 },

    { kategori: 'PR', petak: 'B4', partial: 1, date: '2025-08-26', doc: 72, size: 64, tonase: 1641.8, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B4', partial: 2, date: '2025-09-06', doc: 83, size: 50, tonase: 2593.7, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B4', partial: 3, date: '2025-09-15', doc: 92, size: 48, tonase: 2962.0, bs: 20.6, lm: 5 },
    { kategori: 'PR', petak: 'B4', partial: 4, date: '2025-09-29', doc: 106, size: 37, tonase: 961.2, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B4', partial: 5, date: '2025-10-26', doc: 133, size: 29, tonase: 3181.4, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B4', partial: 6, date: '2025-11-19', doc: 157, size: 24, tonase: 2479.9, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B4', partial: 0, date: '2025-12-11', doc: 177, size: 23, tonase: 17503.5, bs: 12, lm: 5 },

    { kategori: 'PR', petak: 'B5', partial: 1, date: '2025-08-26', doc: 72, size: 66, tonase: 1435.1, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B5', partial: 2, date: '2025-09-06', doc: 83, size: 53, tonase: 2604.4, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B5', partial: 3, date: '2025-09-16', doc: 93, size: 49, tonase: 2734.9, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B5', partial: 4, date: '2025-09-29', doc: 106, size: 41, tonase: 1044.2, bs: 5.3, lm: 5 },
    { kategori: 'PR', petak: 'B5', partial: 5, date: '2025-10-27', doc: 134, size: 28, tonase: 3232.3, bs: 0, lm: 4 },
    { kategori: 'PR', petak: 'B5', partial: 6, date: '2025-11-19', doc: 157, size: 25, tonase: 3198.2, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B5', partial: 0, date: '2025-12-05', doc: 173, size: 23, tonase: 17981.3, bs: 50.5, lm: 0 },

    { kategori: 'PR', petak: 'B6', partial: 1, date: '2025-08-26', doc: 72, size: 68, tonase: 1575.9, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B6', partial: 2, date: '2025-09-06', doc: 83, size: 54, tonase: 2416.5, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B6', partial: 3, date: '2025-09-15', doc: 92, size: 51, tonase: 2619.5, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B6', partial: 4, date: '2025-09-29', doc: 106, size: 41, tonase: 1062.9, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B6', partial: 5, date: '2025-10-14', doc: 121, size: 34, tonase: 3016.0, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B6', partial: 6, date: '2025-11-19', doc: 157, size: 25, tonase: 3027.0, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B6', partial: 0, date: '2025-12-06', doc: 174, size: 22, tonase: 17168.2, bs: 30, lm: 5 },

    { kategori: 'PR', petak: 'B7', partial: 1, date: '2025-08-26', doc: 72, size: 76, tonase: 1431.8, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B7', partial: 2, date: '2025-09-06', doc: 83, size: 55, tonase: 2862.0, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B7', partial: 3, date: '2025-09-16', doc: 93, size: 52, tonase: 2766.8, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B7', partial: 4, date: '2025-09-29', doc: 106, size: 42, tonase: 1032.1, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B7', partial: 5, date: '2025-10-14', doc: 121, size: 34, tonase: 3199.9, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B7', partial: 6, date: '2025-11-03', doc: 141, size: 28, tonase: 1762.3, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B7', partial: 7, date: '2025-11-27', doc: 165, size: 24, tonase: 2964.1, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B7', partial: 0, date: '2025-12-11', doc: 176, size: 23, tonase: 17859.7, bs: 22, lm: 0 },

    { kategori: 'PR', petak: 'B8', partial: 1, date: '2025-08-26', doc: 72, size: 72, tonase: 1456.2, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B8', partial: 2, date: '2025-09-07', doc: 84, size: 55, tonase: 2349.3, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B8', partial: 3, date: '2025-09-15', doc: 91, size: 53, tonase: 2307.2, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B8', partial: 4, date: '2025-09-29', doc: 106, size: 42, tonase: 1257.2, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B8', partial: 5, date: '2025-10-28', doc: 135, size: 29, tonase: 3997.3, bs: 0, lm: 6 },
    { kategori: 'PR', petak: 'B8', partial: 6, date: '2025-11-19', doc: 157, size: 25, tonase: 3177.0, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B8', partial: 0, date: '2025-12-07', doc: 175, size: 23, tonase: 17584.0, bs: 21, lm: 5 },

    { kategori: 'PR', petak: 'B9', partial: 1, date: '2025-08-26', doc: 72, size: 74, tonase: 1587.3, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B9', partial: 2, date: '2025-09-06', doc: 83, size: 58, tonase: 2867.7, bs: 8, lm: 0 },
    { kategori: 'PR', petak: 'B9', partial: 3, date: '2025-09-15', doc: 92, size: 54, tonase: 2707.5, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B9', partial: 4, date: '2025-09-29', doc: 106, size: 44, tonase: 1154.0, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B9', partial: 5, date: '2025-10-09', doc: 116, size: 39, tonase: 3024.8, bs: 0, lm: 8 },
    { kategori: 'PR', petak: 'B9', partial: 6, date: '2025-11-03', doc: 141, size: 28, tonase: 2706.2, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B9', partial: 7, date: '2025-11-27', doc: 165, size: 24, tonase: 1907.3, bs: 0, lm: 0 },
    { kategori: 'PT', petak: 'B9', partial: 0, date: '2025-12-11', doc: 179, size: 23, tonase: 18046.3, bs: 0, lm: 5 },

    { kategori: 'PR', petak: 'B10', partial: 1, date: '2025-08-26', doc: 72, size: 61, tonase: 1516.1, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B10', partial: 2, date: '2025-09-07', doc: 84, size: 49, tonase: 2268.7, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B10', partial: 3, date: '2025-09-15', doc: 91, size: 47, tonase: 2521.9, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B10', partial: 4, date: '2025-09-29', doc: 106, size: 38, tonase: 1069.9, bs: 0, lm: 0 },
    { kategori: 'PR', petak: 'B10', partial: 5, date: '2025-10-28', doc: 135, size: 27, tonase: 2847.0, bs: 0, lm: 4 },
    { kategori: 'PT', petak: 'B10', partial: 0, date: '2025-11-26', doc: 164, size: 23, tonase: 18336.5, bs: 20.5, lm: 0 },
].map(item => ({ ...item, siklus: 'XIII', blok: 'B', user_id: 32, updator: 32 }));

async function uploadAll() {
    console.log('Menguji koneksi ke Supabase Cloud...');
    
    // Gabungkan data A & B
    const allRecords = [...dataBlokA, ...dataBlokB];
    console.log(`Menyiapkan ${allRecords.length} record data ke Supabase...`);

    const { data, error } = await supabase.from('tonase').insert(allRecords).select();

    if (error) {
        console.error('❌ Gagal upload ke Supabase:', error);
    } else {
        console.log(`✅ BERHASIL! ${data.length} record telah tersimpan di tabel 'tonase' Supabase!`);
    }
}

uploadAll();

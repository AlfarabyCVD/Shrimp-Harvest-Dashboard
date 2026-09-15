// ============================================================
// MOCK DATA — Data Dummy untuk Presentasi Dashboard
// ============================================================
// Data ini digunakan saat USE_MOCK = true di config/index.js
// Ubah USE_MOCK = false untuk kembali ke database asli.
// ============================================================

export const mockKategori = [
  {
    id: 1, kategoriBlok: 'A',
    petaks: [
      { id: 'pa1', nama: 'A1', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-09-06', doc: 78, size: 61, tonase: 19519.6, bs: 147, lm: 8 },
      { id: 'pa2', nama: 'A2', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-09-08', doc: 80, size: 55, tonase: 15769.9, bs: 0, lm: 5 },
      { id: 'pa3', nama: 'A3', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-12-07', doc: 171, size: 23, tonase: 35369.6, bs: 11, lm: 5 },
      { id: 'pa4', nama: 'A4', siklus: 'XVI', jenisPanen: 'Partial', tanggal: '2025-11-13', doc: 146, size: 24, tonase: 12732.4, bs: 0, lm: 0 },
      { id: 'pa5', nama: 'A5', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-11-27', doc: 161, size: 21, tonase: 31208.6, bs: 0, lm: 0 },
      { id: 'pa6', nama: 'A6', siklus: 'XVI', jenisPanen: 'Partial', tanggal: '2025-12-02', doc: 165, size: 24, tonase: 19113.7, bs: 0, lm: 8 },
      { id: 'pa7', nama: 'A7', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-12-04', doc: 169, size: 23, tonase: 29696.2, bs: 8, lm: 5 },
      { id: 'pa8', nama: 'A8', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-12-06', doc: 170, size: 22, tonase: 31802.8, bs: 17.5, lm: 5 },
      { id: 'pa9', nama: 'A9', siklus: 'XVI', jenisPanen: 'Partial', tanggal: '2025-12-02', doc: 168, size: 24, tonase: 19111.2, bs: 0, lm: 6 },
      { id: 'pa10', nama: 'A10', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-09-05', doc: 78, size: 57, tonase: 11647.9, bs: 9, lm: 5 },
      { id: 'pa11', nama: 'A11', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-12-05', doc: 171, size: 23, tonase: 32441.2, bs: 10.5, lm: 5 },
      { id: 'pa12', nama: 'A12', siklus: 'XVI', jenisPanen: 'Panen Total', tanggal: '2025-11-26', doc: 161, size: 22, tonase: 28600.8, bs: 25.6, lm: 5 },
    ]
  },
  {
    id: 2, kategoriBlok: 'B',
    petaks: [
      { id: 'pb1', nama: 'B1', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-11-27', doc: 165, size: 21, tonase: 16059, bs: 0, lm: 0 },
      { id: 'pb2', nama: 'B2', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-12-03', doc: 171, size: 22, tonase: 19813.1, bs: 0, lm: 0 },
      { id: 'pb3', nama: 'B3', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-12-04', doc: 172, size: 22, tonase: 19369.9, bs: 17, lm: 5 },
      { id: 'pb4', nama: 'B4', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-12-11', doc: 177, size: 23, tonase: 17503.5, bs: 12, lm: 5 },
      { id: 'pb5', nama: 'B5', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-12-05', doc: 173, size: 23, tonase: 17981.3, bs: 50.5, lm: 0 },
      { id: 'pb6', nama: 'B6', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-12-06', doc: 174, size: 22, tonase: 17168.2, bs: 30, lm: 5 },
      { id: 'pb7', nama: 'B7', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-12-11', doc: 176, size: 23, tonase: 17859.7, bs: 22, lm: 0 },
      { id: 'pb8', nama: 'B8', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-12-07', doc: 175, size: 23, tonase: 17584, bs: 21, lm: 5 },
      { id: 'pb9', nama: 'B9', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-12-11', doc: 179, size: 23, tonase: 18046.3, bs: 0, lm: 5 },
      { id: 'pb10', nama: 'B10', siklus: 'XIII', jenisPanen: 'Panen Total', tanggal: '2025-11-26', doc: 164, size: 23, tonase: 18336.5, bs: 20.5, lm: 0 },
    ]
  },
  {
    id: 3, kategoriBlok: 'C',
    petaks: [
      { id: 'pc1', nama: 'C1', siklus: 'X', jenisPanen: 'Panen Total', tanggal: '2025-10-20', doc: 160, size: 24, tonase: 16500, bs: 10, lm: 3 },
      { id: 'pc2', nama: 'C2', siklus: 'X', jenisPanen: 'Panen Total', tanggal: '2025-10-25', doc: 165, size: 23, tonase: 17200, bs: 14, lm: 4 },
      { id: 'pc3', nama: 'C3', siklus: 'X', jenisPanen: 'Partial', tanggal: '2025-10-15', doc: 155, size: 30, tonase: 3100, bs: 0, lm: 0 },
      { id: 'pc4', nama: 'C4', siklus: 'X', jenisPanen: 'Partial', tanggal: '2025-10-18', doc: 158, size: 28, tonase: 2900, bs: 0, lm: 0 },
    ]
  },
  {
    id: 4, kategoriBlok: 'D',
    petaks: [
      { id: 'pd1', nama: 'D1', siklus: 'VIII', jenisPanen: 'Panen Total', tanggal: '2025-09-15', doc: 150, size: 25, tonase: 15200, bs: 8, lm: 2 },
      { id: 'pd2', nama: 'D2', siklus: 'VIII', jenisPanen: 'Panen Total', tanggal: '2025-09-20', doc: 155, size: 24, tonase: 16100, bs: 11, lm: 3 },
      { id: 'pd3', nama: 'D3', siklus: 'VIII', jenisPanen: 'Partial', tanggal: '2025-09-10', doc: 145, size: 32, tonase: 2500, bs: 0, lm: 0 },
    ]
  },
  {
    id: 5, kategoriBlok: 'E',
    petaks: [
      { id: 'pe1', nama: 'E1', siklus: 'V', jenisPanen: 'Panen Total', tanggal: '2025-08-20', doc: 162, size: 23, tonase: 16800, bs: 13, lm: 4 },
      { id: 'pe2', nama: 'E2', siklus: 'V', jenisPanen: 'Panen Total', tanggal: '2025-08-25', doc: 167, size: 22, tonase: 17350, bs: 16, lm: 3 },
      { id: 'pe3', nama: 'E3', siklus: 'V', jenisPanen: 'Panen Total', tanggal: '2025-09-01', doc: 174, size: 21, tonase: 18200, bs: 19, lm: 5 },
      { id: 'pe4', nama: 'E4', siklus: 'V', jenisPanen: 'Partial', tanggal: '2025-08-10', doc: 152, size: 29, tonase: 3050, bs: 0, lm: 0 },
    ]
  },
  {
    id: 6, kategoriBlok: 'F',
    petaks: [
      { id: 'pf1', nama: 'F1', siklus: 'III', jenisPanen: 'Panen Total', tanggal: '2025-07-10', doc: 155, size: 24, tonase: 15500, bs: 9, lm: 2 },
      { id: 'pf2', nama: 'F2', siklus: 'III', jenisPanen: 'Panen Total', tanggal: '2025-07-15', doc: 160, size: 23, tonase: 16200, bs: 12, lm: 3 },
      { id: 'pf3', nama: 'F3', siklus: 'III', jenisPanen: 'Partial', tanggal: '2025-07-05', doc: 150, size: 30, tonase: 2750, bs: 0, lm: 0 },
    ]
  },
];

// ============================================================
// DATA TONASE — Data lengkap untuk tabel & grafik per blok
// ============================================================

export const mockTonaseData = [
  // ========================
  // BLOK A — Siklus XVI (Data Lengkap Checkpoint)
  // ========================
  // A1
  { id: 1001, kategori: 'PR', blok: 'A', petak: 'A1', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 69, size: 75, tonase: 1309.7, bs: 0, lm: 0 },
  { id: 1002, kategori: 'PT', blok: 'A', petak: 'A1', siklus: 'XVI', partial: 0, date: '2025-09-05', doc: 78, size: 61, tonase: 15729.9, bs: 6, lm: 0 },
  { id: 1003, kategori: 'PS', blok: 'A', petak: 'A1', siklus: 'XVI', partial: 0, date: '2025-09-06', doc: 78, size: 61, tonase: 2480.0, bs: 141, lm: 8 },

  // A2
  { id: 1004, kategori: 'PR', blok: 'A', petak: 'A2', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 68, size: 69, tonase: 1193.9, bs: 0, lm: 0 },
  { id: 1005, kategori: 'PR', blok: 'A', petak: 'A2', siklus: 'XVI', partial: 2, date: '2025-09-06', doc: 78, size: 57, tonase: 2243.0, bs: 0, lm: 5 },
  { id: 1006, kategori: 'PT', blok: 'A', petak: 'A2', siklus: 'XVI', partial: 0, date: '2025-09-08', doc: 80, size: 55, tonase: 12333.0, bs: 0, lm: 0 },

  // A3
  { id: 1007, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 69, size: 70, tonase: 1387.5, bs: 0, lm: 0 },
  { id: 1008, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 80, size: 55, tonase: 2287.2, bs: 0, lm: 0 },
  { id: 1009, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 87, size: 52, tonase: 2826.1, bs: 0, lm: 0 },
  { id: 1010, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 103, size: 42, tonase: 1595.9, bs: 0, lm: 0 },
  { id: 1011, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XVI', partial: 5, date: '2025-10-26', doc: 129, size: 30, tonase: 3214.3, bs: 0, lm: 0 },
  { id: 1012, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XVI', partial: 6, date: '2025-11-20', doc: 154, size: 25, tonase: 3179.4, bs: 0, lm: 0 },
  { id: 1013, kategori: 'PT', blok: 'A', petak: 'A3', siklus: 'XVI', partial: 0, date: '2025-12-07', doc: 171, size: 23, tonase: 20879.2, bs: 11, lm: 5 },

  // A4
  { id: 1014, kategori: 'PR', blok: 'A', petak: 'A4', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 68, size: 64, tonase: 1104.5, bs: 0, lm: 0 },
  { id: 1015, kategori: 'PR', blok: 'A', petak: 'A4', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 79, size: 51, tonase: 2287.0, bs: 0, lm: 0 },
  { id: 1016, kategori: 'PR', blok: 'A', petak: 'A4', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 85, size: 48, tonase: 2683.8, bs: 0, lm: 0 },
  { id: 1017, kategori: 'PR', blok: 'A', petak: 'A4', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 102, size: 37, tonase: 1178.4, bs: 0, lm: 0 },
  { id: 1018, kategori: 'PR', blok: 'A', petak: 'A4', siklus: 'XVI', partial: 5, date: '2025-10-08', doc: 110, size: 33, tonase: 3253.5, bs: 0, lm: 0 },
  { id: 1019, kategori: 'PR', blok: 'A', petak: 'A4', siklus: 'XVI', partial: 6, date: '2025-11-13', doc: 146, size: 24, tonase: 2225.2, bs: 0, lm: 0 },

  // A5
  { id: 1020, kategori: 'PR', blok: 'A', petak: 'A5', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 70, size: 64, tonase: 1588.3, bs: 0, lm: 0 },
  { id: 1021, kategori: 'PR', blok: 'A', petak: 'A5', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 81, size: 51, tonase: 2618.4, bs: 0, lm: 0 },
  { id: 1022, kategori: 'PR', blok: 'A', petak: 'A5', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 87, size: 47, tonase: 3008.6, bs: 0, lm: 0 },
  { id: 1023, kategori: 'PR', blok: 'A', petak: 'A5', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 104, size: 38, tonase: 1603.8, bs: 0, lm: 0 },
  { id: 1024, kategori: 'PR', blok: 'A', petak: 'A5', siklus: 'XVI', partial: 5, date: '2025-10-08', doc: 111, size: 33, tonase: 1877.0, bs: 0, lm: 0 },
  { id: 1025, kategori: 'PR', blok: 'A', petak: 'A5', siklus: 'XVI', partial: 6, date: '2025-11-12', doc: 146, size: 23, tonase: 2865.3, bs: 0, lm: 0 },
  { id: 1026, kategori: 'PT', blok: 'A', petak: 'A5', siklus: 'XVI', partial: 0, date: '2025-11-27', doc: 161, size: 21, tonase: 17647.2, bs: 0, lm: 0 },

  // A6
  { id: 1027, kategori: 'PR', blok: 'A', petak: 'A6', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 68, size: 79, tonase: 843.8, bs: 0, lm: 0 },
  { id: 1028, kategori: 'PR', blok: 'A', petak: 'A6', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 79, size: 63, tonase: 2455.4, bs: 0, lm: 0 },
  { id: 1029, kategori: 'PR', blok: 'A', petak: 'A6', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 85, size: 58, tonase: 2718.0, bs: 0, lm: 0 },
  { id: 1030, kategori: 'PR', blok: 'A', petak: 'A6', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 102, size: 47, tonase: 1251.9, bs: 0, lm: 0 },
  { id: 1031, kategori: 'PR', blok: 'A', petak: 'A6', siklus: 'XVI', partial: 5, date: '2025-10-09', doc: 111, size: 42, tonase: 3018.6, bs: 0, lm: 8 },
  { id: 1032, kategori: 'PR', blok: 'A', petak: 'A6', siklus: 'XVI', partial: 6, date: '2025-11-01', doc: 134, size: 32, tonase: 3824.0, bs: 0, lm: 0 },
  { id: 1033, kategori: 'PR', blok: 'A', petak: 'A6', siklus: 'XVI', partial: 7, date: '2025-11-20', doc: 153, size: 26, tonase: 2968.6, bs: 0, lm: 0 },
  { id: 1034, kategori: 'PR', blok: 'A', petak: 'A6', siklus: 'XVI', partial: 8, date: '2025-12-02', doc: 165, size: 24, tonase: 2033.4, bs: 0, lm: 0 },

  // A7
  { id: 1035, kategori: 'PR', blok: 'A', petak: 'A7', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 70, size: 64, tonase: 1566.7, bs: 0, lm: 0 },
  { id: 1036, kategori: 'PR', blok: 'A', petak: 'A7', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 81, size: 53, tonase: 2510.4, bs: 0, lm: 0 },
  { id: 1037, kategori: 'PR', blok: 'A', petak: 'A7', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 88, size: 49, tonase: 2883.8, bs: 0, lm: 0 },
  { id: 1038, kategori: 'PR', blok: 'A', petak: 'A7', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 104, size: 38, tonase: 1580.8, bs: 0, lm: 0 },
  { id: 1039, kategori: 'PR', blok: 'A', petak: 'A7', siklus: 'XVI', partial: 5, date: '2025-10-08', doc: 112, size: 34, tonase: 1372.8, bs: 0, lm: 0 },
  { id: 1040, kategori: 'PR', blok: 'A', petak: 'A7', siklus: 'XVI', partial: 6, date: '2025-11-13', doc: 148, size: 24.5, tonase: 2783.3, bs: 0, lm: 14.5 },
  { id: 1041, kategori: 'PT', blok: 'A', petak: 'A7', siklus: 'XVI', partial: 0, date: '2025-12-04', doc: 169, size: 23, tonase: 16998.4, bs: 8, lm: 5 },

  // A8
  { id: 1042, kategori: 'PR', blok: 'A', petak: 'A8', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 69, size: 69, tonase: 984.5, bs: 0, lm: 0 },
  { id: 1043, kategori: 'PR', blok: 'A', petak: 'A8', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 80, size: 54, tonase: 2384.0, bs: 0, lm: 0 },
  { id: 1044, kategori: 'PR', blok: 'A', petak: 'A8', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 86, size: 51, tonase: 2929.9, bs: 0, lm: 0 },
  { id: 1045, kategori: 'PR', blok: 'A', petak: 'A8', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 103, size: 40, tonase: 987.4, bs: 0, lm: 0 },
  { id: 1046, kategori: 'PR', blok: 'A', petak: 'A8', siklus: 'XVI', partial: 5, date: '2025-10-27', doc: 130, size: 29, tonase: 3011.2, bs: 0, lm: 3 },
  { id: 1047, kategori: 'PR', blok: 'A', petak: 'A8', siklus: 'XVI', partial: 6, date: '2025-11-20', doc: 154, size: 25, tonase: 2637.8, bs: 0, lm: 0 },
  { id: 1048, kategori: 'PT', blok: 'A', petak: 'A8', siklus: 'XVI', partial: 0, date: '2025-12-06', doc: 170, size: 22, tonase: 18868.0, bs: 17.5, lm: 5 },

  // A9
  { id: 1049, kategori: 'PR', blok: 'A', petak: 'A9', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 71, size: 70, tonase: 1459.2, bs: 0, lm: 0 },
  { id: 1050, kategori: 'PR', blok: 'A', petak: 'A9', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 82, size: 55, tonase: 2355.8, bs: 0, lm: 0 },
  { id: 1051, kategori: 'PR', blok: 'A', petak: 'A9', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 89, size: 52, tonase: 3111.8, bs: 0, lm: 0 },
  { id: 1052, kategori: 'PR', blok: 'A', petak: 'A9', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 105, size: 43, tonase: 1640.4, bs: 0, lm: 0 },
  { id: 1053, kategori: 'PR', blok: 'A', petak: 'A9', siklus: 'XVI', partial: 5, date: '2025-10-09', doc: 114, size: 38, tonase: 1988.1, bs: 0, lm: 6 },
  { id: 1054, kategori: 'PR', blok: 'A', petak: 'A9', siklus: 'XVI', partial: 6, date: '2025-11-01', doc: 137, size: 32, tonase: 3376.3, bs: 0, lm: 0 },
  { id: 1055, kategori: 'PR', blok: 'A', petak: 'A9', siklus: 'XVI', partial: 7, date: '2025-11-20', doc: 156, size: 25, tonase: 3012.2, bs: 0, lm: 0 },
  { id: 1056, kategori: 'PR', blok: 'A', petak: 'A9', siklus: 'XVI', partial: 8, date: '2025-12-02', doc: 168, size: 24, tonase: 2167.4, bs: 0, lm: 0 },

  // A10
  { id: 1057, kategori: 'PR', blok: 'A', petak: 'A10', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 69, size: 62, tonase: 1237.0, bs: 0, lm: 0 },
  { id: 1058, kategori: 'PT', blok: 'A', petak: 'A10', siklus: 'XVI', partial: 0, date: '2025-09-05', doc: 78, size: 57, tonase: 10410.9, bs: 9, lm: 5 },

  // A11
  { id: 1059, kategori: 'PR', blok: 'A', petak: 'A11', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 71, size: 66, tonase: 1366.0, bs: 0, lm: 0 },
  { id: 1060, kategori: 'PR', blok: 'A', petak: 'A11', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 82, size: 54, tonase: 2381.7, bs: 0, lm: 0 },
  { id: 1061, kategori: 'PR', blok: 'A', petak: 'A11', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 88, size: 53, tonase: 2941.8, bs: 18.5, lm: 5 },
  { id: 1062, kategori: 'PR', blok: 'A', petak: 'A11', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 105, size: 41, tonase: 1474.9, bs: 0, lm: 0 },
  { id: 1063, kategori: 'PR', blok: 'A', petak: 'A11', siklus: 'XVI', partial: 5, date: '2025-10-14', doc: 119, size: 33, tonase: 3001.3, bs: 0, lm: 0 },
  { id: 1064, kategori: 'PR', blok: 'A', petak: 'A11', siklus: 'XVI', partial: 6, date: '2025-11-20', doc: 156, size: 25, tonase: 3135.2, bs: 0, lm: 0 },
  { id: 1065, kategori: 'PT', blok: 'A', petak: 'A11', siklus: 'XVI', partial: 0, date: '2025-12-05', doc: 171, size: 23, tonase: 18140.3, bs: 10.5, lm: 5 },

  // A12
  { id: 1066, kategori: 'PR', blok: 'A', petak: 'A12', siklus: 'XVI', partial: 1, date: '2025-08-27', doc: 70, size: 62, tonase: 1630.4, bs: 0, lm: 0 },
  { id: 1067, kategori: 'PR', blok: 'A', petak: 'A12', siklus: 'XVI', partial: 2, date: '2025-09-07', doc: 81, size: 53, tonase: 2442.4, bs: 0, lm: 0 },
  { id: 1068, kategori: 'PR', blok: 'A', petak: 'A12', siklus: 'XVI', partial: 3, date: '2025-09-15', doc: 87, size: 51, tonase: 2821.3, bs: 25.6, lm: 5 },
  { id: 1069, kategori: 'PR', blok: 'A', petak: 'A12', siklus: 'XVI', partial: 4, date: '2025-09-30', doc: 104, size: 38, tonase: 1008.5, bs: 0, lm: 0 },
  { id: 1070, kategori: 'PR', blok: 'A', petak: 'A12', siklus: 'XVI', partial: 5, date: '2025-10-08', doc: 112, size: 34, tonase: 3288.6, bs: 0, lm: 0 },
  { id: 1071, kategori: 'PR', blok: 'A', petak: 'A12', siklus: 'XVI', partial: 6, date: '2025-11-12', doc: 147, size: 23, tonase: 1944.4, bs: 0, lm: 0 },
  { id: 1072, kategori: 'PT', blok: 'A', petak: 'A12', siklus: 'XVI', partial: 0, date: '2025-11-26', doc: 161, size: 22, tonase: 15465.2, bs: 0, lm: 0 },

  // ========================
  // BLOK B — Siklus XIII (Data lengkap dari insertB.js)
  // ========================
  // B1
  { id: 2001, kategori: 'PR', blok: 'B', petak: 'B1', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 59, tonase: 1328.6, bs: 0, lm: 0 },
  { id: 2002, kategori: 'PR', blok: 'B', petak: 'B1', siklus: 'XIII', partial: 2, date: '2025-09-06', doc: 83, size: 46, tonase: 2643.8, bs: 0, lm: 0 },
  { id: 2003, kategori: 'PR', blok: 'B', petak: 'B1', siklus: 'XIII', partial: 3, date: '2025-09-16', doc: 93, size: 42, tonase: 2352.4, bs: 0, lm: 0 },
  { id: 2004, kategori: 'PR', blok: 'B', petak: 'B1', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 35, tonase: 1163.1, bs: 0, lm: 0 },
  { id: 2005, kategori: 'PR', blok: 'B', petak: 'B1', siklus: 'XIII', partial: 5, date: '2025-11-12', doc: 150, size: 23, tonase: 3131.5, bs: 0, lm: 0 },
  { id: 2006, kategori: 'PT', blok: 'B', petak: 'B1', siklus: 'XIII', partial: 0, date: '2025-11-27', doc: 165, size: 21, tonase: 16059.0, bs: 0, lm: 0 },

  // B2
  { id: 2101, kategori: 'PR', blok: 'B', petak: 'B2', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 59, tonase: 1216.6, bs: 0, lm: 0 },
  { id: 2102, kategori: 'PR', blok: 'B', petak: 'B2', siklus: 'XIII', partial: 2, date: '2025-09-06', doc: 83, size: 45, tonase: 2519.4, bs: 0, lm: 0 },
  { id: 2103, kategori: 'PR', blok: 'B', petak: 'B2', siklus: 'XIII', partial: 3, date: '2025-09-15', doc: 92, size: 43, tonase: 2103.0, bs: 0, lm: 0 },
  { id: 2104, kategori: 'PR', blok: 'B', petak: 'B2', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 33, tonase: 1064.0, bs: 0, lm: 0 },
  { id: 2105, kategori: 'PR', blok: 'B', petak: 'B2', siklus: 'XIII', partial: 5, date: '2025-11-03', doc: 141, size: 24, tonase: 2312.0, bs: 0, lm: 0 },
  { id: 2106, kategori: 'PT', blok: 'B', petak: 'B2', siklus: 'XIII', partial: 0, date: '2025-12-03', doc: 171, size: 22, tonase: 19813.1, bs: 0, lm: 0 },

  // B3
  { id: 2201, kategori: 'PR', blok: 'B', petak: 'B3', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 69, tonase: 1466.0, bs: 0, lm: 0 },
  { id: 2202, kategori: 'PR', blok: 'B', petak: 'B3', siklus: 'XIII', partial: 2, date: '2025-09-06', doc: 83, size: 52, tonase: 2594.6, bs: 0, lm: 5 },
  { id: 2203, kategori: 'PR', blok: 'B', petak: 'B3', siklus: 'XIII', partial: 3, date: '2025-09-16', doc: 93, size: 49, tonase: 2744.3, bs: 0, lm: 0 },
  { id: 2204, kategori: 'PR', blok: 'B', petak: 'B3', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 41, tonase: 1281.1, bs: 0, lm: 0 },
  { id: 2205, kategori: 'PR', blok: 'B', petak: 'B3', siklus: 'XIII', partial: 5, date: '2025-10-14', doc: 121, size: 33, tonase: 2471.8, bs: 0, lm: 0 },
  { id: 2206, kategori: 'PR', blok: 'B', petak: 'B3', siklus: 'XIII', partial: 6, date: '2025-11-19', doc: 157, size: 25, tonase: 3750.0, bs: 0, lm: 0 },
  { id: 2207, kategori: 'PT', blok: 'B', petak: 'B3', siklus: 'XIII', partial: 0, date: '2025-12-04', doc: 172, size: 22, tonase: 19369.9, bs: 17, lm: 5 },

  // B4
  { id: 2301, kategori: 'PR', blok: 'B', petak: 'B4', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 64, tonase: 1641.8, bs: 0, lm: 0 },
  { id: 2302, kategori: 'PR', blok: 'B', petak: 'B4', siklus: 'XIII', partial: 2, date: '2025-09-06', doc: 83, size: 50, tonase: 2593.7, bs: 0, lm: 0 },
  { id: 2303, kategori: 'PR', blok: 'B', petak: 'B4', siklus: 'XIII', partial: 3, date: '2025-09-15', doc: 92, size: 48, tonase: 2962.0, bs: 20.6, lm: 5 },
  { id: 2304, kategori: 'PR', blok: 'B', petak: 'B4', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 37, tonase: 961.2, bs: 0, lm: 0 },
  { id: 2305, kategori: 'PR', blok: 'B', petak: 'B4', siklus: 'XIII', partial: 5, date: '2025-10-26', doc: 133, size: 29, tonase: 3181.4, bs: 0, lm: 0 },
  { id: 2306, kategori: 'PR', blok: 'B', petak: 'B4', siklus: 'XIII', partial: 6, date: '2025-11-19', doc: 157, size: 24, tonase: 2479.9, bs: 0, lm: 0 },
  { id: 2307, kategori: 'PT', blok: 'B', petak: 'B4', siklus: 'XIII', partial: 0, date: '2025-12-11', doc: 177, size: 23, tonase: 17503.5, bs: 12, lm: 5 },

  // B5
  { id: 2401, kategori: 'PR', blok: 'B', petak: 'B5', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 66, tonase: 1435.1, bs: 0, lm: 0 },
  { id: 2402, kategori: 'PR', blok: 'B', petak: 'B5', siklus: 'XIII', partial: 2, date: '2025-09-06', doc: 83, size: 53, tonase: 2604.4, bs: 0, lm: 0 },
  { id: 2403, kategori: 'PR', blok: 'B', petak: 'B5', siklus: 'XIII', partial: 3, date: '2025-09-16', doc: 93, size: 49, tonase: 2734.9, bs: 0, lm: 0 },
  { id: 2404, kategori: 'PR', blok: 'B', petak: 'B5', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 41, tonase: 1044.2, bs: 5.3, lm: 5 },
  { id: 2405, kategori: 'PR', blok: 'B', petak: 'B5', siklus: 'XIII', partial: 5, date: '2025-10-27', doc: 134, size: 28, tonase: 3232.3, bs: 0, lm: 4 },
  { id: 2406, kategori: 'PR', blok: 'B', petak: 'B5', siklus: 'XIII', partial: 6, date: '2025-11-19', doc: 157, size: 25, tonase: 3198.2, bs: 0, lm: 0 },
  { id: 2407, kategori: 'PT', blok: 'B', petak: 'B5', siklus: 'XIII', partial: 0, date: '2025-12-05', doc: 173, size: 23, tonase: 17981.3, bs: 50.5, lm: 0 },

  // B6
  { id: 2501, kategori: 'PR', blok: 'B', petak: 'B6', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 68, tonase: 1575.9, bs: 0, lm: 0 },
  { id: 2502, kategori: 'PR', blok: 'B', petak: 'B6', siklus: 'XIII', partial: 2, date: '2025-09-06', doc: 83, size: 54, tonase: 2416.5, bs: 0, lm: 0 },
  { id: 2503, kategori: 'PR', blok: 'B', petak: 'B6', siklus: 'XIII', partial: 3, date: '2025-09-15', doc: 92, size: 51, tonase: 2619.5, bs: 0, lm: 0 },
  { id: 2504, kategori: 'PR', blok: 'B', petak: 'B6', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 41, tonase: 1062.9, bs: 0, lm: 0 },
  { id: 2505, kategori: 'PR', blok: 'B', petak: 'B6', siklus: 'XIII', partial: 5, date: '2025-10-14', doc: 121, size: 34, tonase: 3016.0, bs: 0, lm: 0 },
  { id: 2506, kategori: 'PR', blok: 'B', petak: 'B6', siklus: 'XIII', partial: 6, date: '2025-11-19', doc: 157, size: 25, tonase: 3027.0, bs: 0, lm: 0 },
  { id: 2507, kategori: 'PT', blok: 'B', petak: 'B6', siklus: 'XIII', partial: 0, date: '2025-12-06', doc: 174, size: 22, tonase: 17168.2, bs: 30, lm: 5 },

  // B7
  { id: 2601, kategori: 'PR', blok: 'B', petak: 'B7', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 76, tonase: 1431.8, bs: 0, lm: 0 },
  { id: 2602, kategori: 'PR', blok: 'B', petak: 'B7', siklus: 'XIII', partial: 2, date: '2025-09-06', doc: 83, size: 55, tonase: 2862.0, bs: 0, lm: 0 },
  { id: 2603, kategori: 'PR', blok: 'B', petak: 'B7', siklus: 'XIII', partial: 3, date: '2025-09-16', doc: 93, size: 52, tonase: 2766.8, bs: 0, lm: 0 },
  { id: 2604, kategori: 'PR', blok: 'B', petak: 'B7', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 42, tonase: 1032.1, bs: 0, lm: 0 },
  { id: 2605, kategori: 'PR', blok: 'B', petak: 'B7', siklus: 'XIII', partial: 5, date: '2025-10-14', doc: 121, size: 34, tonase: 3199.9, bs: 0, lm: 0 },
  { id: 2606, kategori: 'PR', blok: 'B', petak: 'B7', siklus: 'XIII', partial: 6, date: '2025-11-03', doc: 141, size: 28, tonase: 1762.3, bs: 0, lm: 0 },
  { id: 2607, kategori: 'PR', blok: 'B', petak: 'B7', siklus: 'XIII', partial: 7, date: '2025-11-27', doc: 165, size: 24, tonase: 2964.1, bs: 0, lm: 0 },
  { id: 2608, kategori: 'PT', blok: 'B', petak: 'B7', siklus: 'XIII', partial: 0, date: '2025-12-11', doc: 176, size: 23, tonase: 17859.7, bs: 22, lm: 0 },

  // B8
  { id: 2701, kategori: 'PR', blok: 'B', petak: 'B8', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 72, tonase: 1456.2, bs: 0, lm: 0 },
  { id: 2702, kategori: 'PR', blok: 'B', petak: 'B8', siklus: 'XIII', partial: 2, date: '2025-09-07', doc: 84, size: 55, tonase: 2349.3, bs: 0, lm: 0 },
  { id: 2703, kategori: 'PR', blok: 'B', petak: 'B8', siklus: 'XIII', partial: 3, date: '2025-09-15', doc: 91, size: 53, tonase: 2307.2, bs: 0, lm: 0 },
  { id: 2704, kategori: 'PR', blok: 'B', petak: 'B8', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 42, tonase: 1257.2, bs: 0, lm: 0 },
  { id: 2705, kategori: 'PR', blok: 'B', petak: 'B8', siklus: 'XIII', partial: 5, date: '2025-10-28', doc: 135, size: 29, tonase: 3997.3, bs: 0, lm: 6 },
  { id: 2706, kategori: 'PR', blok: 'B', petak: 'B8', siklus: 'XIII', partial: 6, date: '2025-11-19', doc: 157, size: 25, tonase: 3177.0, bs: 0, lm: 0 },
  { id: 2707, kategori: 'PT', blok: 'B', petak: 'B8', siklus: 'XIII', partial: 0, date: '2025-12-07', doc: 175, size: 23, tonase: 17584.0, bs: 21, lm: 5 },

  // B9
  { id: 2801, kategori: 'PR', blok: 'B', petak: 'B9', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 74, tonase: 1587.3, bs: 0, lm: 0 },
  { id: 2802, kategori: 'PR', blok: 'B', petak: 'B9', siklus: 'XIII', partial: 2, date: '2025-09-06', doc: 83, size: 58, tonase: 2867.7, bs: 8, lm: 0 },
  { id: 2803, kategori: 'PR', blok: 'B', petak: 'B9', siklus: 'XIII', partial: 3, date: '2025-09-15', doc: 92, size: 54, tonase: 2707.5, bs: 0, lm: 0 },
  { id: 2804, kategori: 'PR', blok: 'B', petak: 'B9', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 44, tonase: 1154.0, bs: 0, lm: 0 },
  { id: 2805, kategori: 'PR', blok: 'B', petak: 'B9', siklus: 'XIII', partial: 5, date: '2025-10-09', doc: 116, size: 39, tonase: 3024.8, bs: 0, lm: 8 },
  { id: 2806, kategori: 'PR', blok: 'B', petak: 'B9', siklus: 'XIII', partial: 6, date: '2025-11-03', doc: 141, size: 28, tonase: 2706.2, bs: 0, lm: 0 },
  { id: 2807, kategori: 'PR', blok: 'B', petak: 'B9', siklus: 'XIII', partial: 7, date: '2025-11-27', doc: 165, size: 24, tonase: 1907.3, bs: 0, lm: 0 },
  { id: 2808, kategori: 'PT', blok: 'B', petak: 'B9', siklus: 'XIII', partial: 0, date: '2025-12-11', doc: 179, size: 23, tonase: 18046.3, bs: 0, lm: 5 },

  // B10
  { id: 2901, kategori: 'PR', blok: 'B', petak: 'B10', siklus: 'XIII', partial: 1, date: '2025-08-26', doc: 72, size: 61, tonase: 1516.1, bs: 0, lm: 0 },
  { id: 2902, kategori: 'PR', blok: 'B', petak: 'B10', siklus: 'XIII', partial: 2, date: '2025-09-07', doc: 84, size: 49, tonase: 2268.7, bs: 0, lm: 0 },
  { id: 2903, kategori: 'PR', blok: 'B', petak: 'B10', siklus: 'XIII', partial: 3, date: '2025-09-15', doc: 91, size: 47, tonase: 2521.9, bs: 0, lm: 0 },
  { id: 2904, kategori: 'PR', blok: 'B', petak: 'B10', siklus: 'XIII', partial: 4, date: '2025-09-29', doc: 106, size: 38, tonase: 1069.9, bs: 0, lm: 0 },
  { id: 2905, kategori: 'PR', blok: 'B', petak: 'B10', siklus: 'XIII', partial: 5, date: '2025-10-28', doc: 135, size: 27, tonase: 2847.0, bs: 0, lm: 4 },
  { id: 2906, kategori: 'PT', blok: 'B', petak: 'B10', siklus: 'XIII', partial: 0, date: '2025-11-26', doc: 164, size: 23, tonase: 18336.5, bs: 20.5, lm: 0 },

  // ========================
  // BLOK C — Siklus X
  // ========================
  // C1: 4 partial + 1 panen total
  { id: 3001, kategori: 'PR', blok: 'C', petak: 'C1', siklus: 'X', partial: 1, date: '2025-06-20', doc: 38, size: 82, tonase: 720.0,  bs: 0, lm: 0 },
  { id: 3002, kategori: 'PR', blok: 'C', petak: 'C1', siklus: 'X', partial: 2, date: '2025-07-18', doc: 66, size: 60, tonase: 1650.3, bs: 0, lm: 0 },
  { id: 3003, kategori: 'PR', blok: 'C', petak: 'C1', siklus: 'X', partial: 3, date: '2025-08-15', doc: 94, size: 45, tonase: 2480.0, bs: 3.5, lm: 0 },
  { id: 3004, kategori: 'PR', blok: 'C', petak: 'C1', siklus: 'X', partial: 4, date: '2025-09-10', doc: 120, size: 32, tonase: 3100.5, bs: 7.0, lm: 3 },
  { id: 3005, kategori: 'PT', blok: 'C', petak: 'C1', siklus: 'X', partial: 0, date: '2025-10-20', doc: 160, size: 24, tonase: 16500.0, bs: 10, lm: 3 },

  // C2: 3 partial + 1 panen total
  { id: 3101, kategori: 'PR', blok: 'C', petak: 'C2', siklus: 'X', partial: 1, date: '2025-06-25', doc: 43, size: 79, tonase: 800.0,  bs: 0, lm: 0 },
  { id: 3102, kategori: 'PR', blok: 'C', petak: 'C2', siklus: 'X', partial: 2, date: '2025-07-25', doc: 73, size: 56, tonase: 1850.5, bs: 0, lm: 0 },
  { id: 3103, kategori: 'PR', blok: 'C', petak: 'C2', siklus: 'X', partial: 3, date: '2025-09-01', doc: 111, size: 38, tonase: 2950.0, bs: 5.0, lm: 2 },
  { id: 3104, kategori: 'PT', blok: 'C', petak: 'C2', siklus: 'X', partial: 0, date: '2025-10-25', doc: 165, size: 23, tonase: 17200.0, bs: 14, lm: 4 },

  // C3: 5 partial + 1 panen total
  { id: 3201, kategori: 'PR', blok: 'C', petak: 'C3', siklus: 'X', partial: 1, date: '2025-06-22', doc: 40, size: 81, tonase: 680.5,  bs: 0, lm: 0 },
  { id: 3202, kategori: 'PR', blok: 'C', petak: 'C3', siklus: 'X', partial: 2, date: '2025-07-15', doc: 63, size: 64, tonase: 1420.0, bs: 0, lm: 0 },
  { id: 3203, kategori: 'PR', blok: 'C', petak: 'C3', siklus: 'X', partial: 3, date: '2025-08-10', doc: 89, size: 50, tonase: 2200.8, bs: 0, lm: 0 },
  { id: 3204, kategori: 'PR', blok: 'C', petak: 'C3', siklus: 'X', partial: 4, date: '2025-09-05', doc: 115, size: 36, tonase: 2850.3, bs: 6.0, lm: 3 },
  { id: 3205, kategori: 'PR', blok: 'C', petak: 'C3', siklus: 'X', partial: 5, date: '2025-10-01', doc: 141, size: 28, tonase: 3350.0, bs: 8.5, lm: 0 },
  { id: 3206, kategori: 'PT', blok: 'C', petak: 'C3', siklus: 'X', partial: 0, date: '2025-10-28', doc: 168, size: 22, tonase: 18100.0, bs: 16, lm: 5 },

  // C4: 3 partial + 1 panen total
  { id: 3301, kategori: 'PR', blok: 'C', petak: 'C4', siklus: 'X', partial: 1, date: '2025-06-28', doc: 46, size: 77, tonase: 910.0,  bs: 0, lm: 0 },
  { id: 3302, kategori: 'PR', blok: 'C', petak: 'C4', siklus: 'X', partial: 2, date: '2025-07-30', doc: 78, size: 55, tonase: 1780.0, bs: 0, lm: 0 },
  { id: 3303, kategori: 'PR', blok: 'C', petak: 'C4', siklus: 'X', partial: 3, date: '2025-09-08', doc: 118, size: 35, tonase: 2900.5, bs: 4.0, lm: 0 },
  { id: 3304, kategori: 'PT', blok: 'C', petak: 'C4', siklus: 'X', partial: 0, date: '2025-10-22', doc: 162, size: 24, tonase: 15800.0, bs: 11, lm: 3 },

  // ========================
  // BLOK D — Siklus VIII
  // ========================
  // D1: 4 partial + 1 panen total
  { id: 4001, kategori: 'PR', blok: 'D', petak: 'D1', siklus: 'VIII', partial: 1, date: '2025-05-15', doc: 35, size: 85, tonase: 650.0,  bs: 0, lm: 0 },
  { id: 4002, kategori: 'PR', blok: 'D', petak: 'D1', siklus: 'VIII', partial: 2, date: '2025-06-15', doc: 66, size: 62, tonase: 1550.7, bs: 0, lm: 0 },
  { id: 4003, kategori: 'PR', blok: 'D', petak: 'D1', siklus: 'VIII', partial: 3, date: '2025-07-20', doc: 101, size: 44, tonase: 2680.3, bs: 5.0, lm: 0 },
  { id: 4004, kategori: 'PR', blok: 'D', petak: 'D1', siklus: 'VIII', partial: 4, date: '2025-08-18', doc: 130, size: 30, tonase: 3200.0, bs: 8.0, lm: 4 },
  { id: 4005, kategori: 'PT', blok: 'D', petak: 'D1', siklus: 'VIII', partial: 0, date: '2025-09-15', doc: 158, size: 25, tonase: 15200.0, bs: 8, lm: 2 },

  // D2: 3 partial + 1 panen total
  { id: 4101, kategori: 'PR', blok: 'D', petak: 'D2', siklus: 'VIII', partial: 1, date: '2025-05-20', doc: 40, size: 80, tonase: 750.5,  bs: 0, lm: 0 },
  { id: 4102, kategori: 'PR', blok: 'D', petak: 'D2', siklus: 'VIII', partial: 2, date: '2025-06-25', doc: 76, size: 56, tonase: 1850.0, bs: 0, lm: 0 },
  { id: 4103, kategori: 'PR', blok: 'D', petak: 'D2', siklus: 'VIII', partial: 3, date: '2025-08-05', doc: 117, size: 38, tonase: 2900.0, bs: 6.5, lm: 3 },
  { id: 4104, kategori: 'PT', blok: 'D', petak: 'D2', siklus: 'VIII', partial: 0, date: '2025-09-20', doc: 163, size: 24, tonase: 16100.0, bs: 11, lm: 3 },

  // D3: 5 partial + 1 panen total
  { id: 4201, kategori: 'PR', blok: 'D', petak: 'D3', siklus: 'VIII', partial: 1, date: '2025-05-18', doc: 38, size: 83, tonase: 700.0,  bs: 0, lm: 0 },
  { id: 4202, kategori: 'PR', blok: 'D', petak: 'D3', siklus: 'VIII', partial: 2, date: '2025-06-18', doc: 69, size: 65, tonase: 1350.0, bs: 0, lm: 0 },
  { id: 4203, kategori: 'PR', blok: 'D', petak: 'D3', siklus: 'VIII', partial: 3, date: '2025-07-15', doc: 96, size: 48, tonase: 2250.5, bs: 0, lm: 0 },
  { id: 4204, kategori: 'PR', blok: 'D', petak: 'D3', siklus: 'VIII', partial: 4, date: '2025-08-10', doc: 122, size: 34, tonase: 3050.0, bs: 7.0, lm: 5 },
  { id: 4205, kategori: 'PR', blok: 'D', petak: 'D3', siklus: 'VIII', partial: 5, date: '2025-09-01', doc: 144, size: 27, tonase: 2800.0, bs: 4.5, lm: 0 },
  { id: 4206, kategori: 'PT', blok: 'D', petak: 'D3', siklus: 'VIII', partial: 0, date: '2025-09-25', doc: 168, size: 22, tonase: 17500.0, bs: 15, lm: 4 },

  // ========================
  // BLOK A — Siklus XV (riwayat siklus sebelumnya)
  // ========================
  // A1 Siklus XV
  { id: 5001, kategori: 'PR', blok: 'A', petak: 'A1', siklus: 'XV', partial: 1, date: '2025-02-10', doc: 40, size: 80, tonase: 780.0,  bs: 0, lm: 0 },
  { id: 5002, kategori: 'PR', blok: 'A', petak: 'A1', siklus: 'XV', partial: 2, date: '2025-03-05', doc: 63, size: 60, tonase: 1620.5, bs: 0, lm: 0 },
  { id: 5003, kategori: 'PR', blok: 'A', petak: 'A1', siklus: 'XV', partial: 3, date: '2025-04-01', doc: 90, size: 45, tonase: 2450.0, bs: 3.0, lm: 0 },
  { id: 5004, kategori: 'PT', blok: 'A', petak: 'A1', siklus: 'XV', partial: 0, date: '2025-05-15', doc: 134, size: 25, tonase: 14800.0, bs: 10, lm: 3 },
  // A2 Siklus XV
  { id: 5101, kategori: 'PR', blok: 'A', petak: 'A2', siklus: 'XV', partial: 1, date: '2025-02-12', doc: 42, size: 78, tonase: 820.0,  bs: 0, lm: 0 },
  { id: 5102, kategori: 'PR', blok: 'A', petak: 'A2', siklus: 'XV', partial: 2, date: '2025-03-10', doc: 68, size: 57, tonase: 1750.0, bs: 0, lm: 0 },
  { id: 5103, kategori: 'PT', blok: 'A', petak: 'A2', siklus: 'XV', partial: 0, date: '2025-05-20', doc: 139, size: 24, tonase: 15300.0, bs: 8, lm: 2 },
  // A3 Siklus XV
  { id: 5201, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XV', partial: 1, date: '2025-02-15', doc: 45, size: 76, tonase: 900.0,  bs: 0, lm: 0 },
  { id: 5202, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XV', partial: 2, date: '2025-03-15', doc: 73, size: 55, tonase: 1900.5, bs: 0, lm: 0 },
  { id: 5203, kategori: 'PR', blok: 'A', petak: 'A3', siklus: 'XV', partial: 3, date: '2025-04-10', doc: 99, size: 40, tonase: 2700.0, bs: 5.0, lm: 3 },
  { id: 5204, kategori: 'PT', blok: 'A', petak: 'A3', siklus: 'XV', partial: 0, date: '2025-05-25', doc: 144, size: 23, tonase: 16200.0, bs: 14, lm: 4 },

  // ========================
  // BLOK E — Siklus V
  // ========================
  // E1: 4 partial + 1 panen total
  { id: 6001, kategori: 'PR', blok: 'E', petak: 'E1', siklus: 'V', partial: 1, date: '2025-04-15', doc: 35, size: 82, tonase: 690.0,  bs: 0, lm: 0 },
  { id: 6002, kategori: 'PR', blok: 'E', petak: 'E1', siklus: 'V', partial: 2, date: '2025-05-12', doc: 62, size: 63, tonase: 1480.5, bs: 0, lm: 0 },
  { id: 6003, kategori: 'PR', blok: 'E', petak: 'E1', siklus: 'V', partial: 3, date: '2025-06-08', doc: 89, size: 46, tonase: 2550.0, bs: 4.0, lm: 0 },
  { id: 6004, kategori: 'PR', blok: 'E', petak: 'E1', siklus: 'V', partial: 4, date: '2025-07-10', doc: 121, size: 31, tonase: 3200.0, bs: 6.5, lm: 3 },
  { id: 6005, kategori: 'PT', blok: 'E', petak: 'E1', siklus: 'V', partial: 0, date: '2025-08-20', doc: 162, size: 23, tonase: 16800.0, bs: 13, lm: 4 },

  // E2: 3 partial + 1 panen total
  { id: 6101, kategori: 'PR', blok: 'E', petak: 'E2', siklus: 'V', partial: 1, date: '2025-04-18', doc: 38, size: 80, tonase: 750.0,  bs: 0, lm: 0 },
  { id: 6102, kategori: 'PR', blok: 'E', petak: 'E2', siklus: 'V', partial: 2, date: '2025-05-20', doc: 70, size: 58, tonase: 1680.0, bs: 0, lm: 0 },
  { id: 6103, kategori: 'PR', blok: 'E', petak: 'E2', siklus: 'V', partial: 3, date: '2025-06-25', doc: 106, size: 39, tonase: 2850.5, bs: 5.0, lm: 2 },
  { id: 6104, kategori: 'PT', blok: 'E', petak: 'E2', siklus: 'V', partial: 0, date: '2025-08-25', doc: 167, size: 22, tonase: 17350.0, bs: 16, lm: 3 },

  // E3: 5 partial + 1 panen total
  { id: 6201, kategori: 'PR', blok: 'E', petak: 'E3', siklus: 'V', partial: 1, date: '2025-04-12', doc: 32, size: 85, tonase: 620.0,  bs: 0, lm: 0 },
  { id: 6202, kategori: 'PR', blok: 'E', petak: 'E3', siklus: 'V', partial: 2, date: '2025-05-08', doc: 58, size: 67, tonase: 1350.0, bs: 0, lm: 0 },
  { id: 6203, kategori: 'PR', blok: 'E', petak: 'E3', siklus: 'V', partial: 3, date: '2025-06-02', doc: 83, size: 52, tonase: 2150.5, bs: 0, lm: 0 },
  { id: 6204, kategori: 'PR', blok: 'E', petak: 'E3', siklus: 'V', partial: 4, date: '2025-07-05', doc: 116, size: 36, tonase: 2980.0, bs: 8.0, lm: 4 },
  { id: 6205, kategori: 'PR', blok: 'E', petak: 'E3', siklus: 'V', partial: 5, date: '2025-08-01', doc: 143, size: 27, tonase: 2650.0, bs: 3.5, lm: 0 },
  { id: 6206, kategori: 'PT', blok: 'E', petak: 'E3', siklus: 'V', partial: 0, date: '2025-09-01', doc: 174, size: 21, tonase: 18200.0, bs: 19, lm: 5 },

  // E4: 3 partial + 1 panen sisa (PS)
  { id: 6301, kategori: 'PR', blok: 'E', petak: 'E4', siklus: 'V', partial: 1, date: '2025-04-20', doc: 40, size: 78, tonase: 810.0,  bs: 0, lm: 0 },
  { id: 6302, kategori: 'PR', blok: 'E', petak: 'E4', siklus: 'V', partial: 2, date: '2025-05-25', doc: 75, size: 54, tonase: 1920.0, bs: 0, lm: 0 },
  { id: 6303, kategori: 'PR', blok: 'E', petak: 'E4', siklus: 'V', partial: 3, date: '2025-07-01', doc: 112, size: 37, tonase: 2750.5, bs: 4.5, lm: 2 },
  { id: 6304, kategori: 'PS', blok: 'E', petak: 'E4', siklus: 'V', partial: 0, date: '2025-08-15', doc: 157, size: 26, tonase: 14500.0, bs: 25, lm: 8 },

  // ========================
  // BLOK F — Siklus III
  // ========================
  // F1: 4 partial + 1 panen total
  { id: 7001, kategori: 'PR', blok: 'F', petak: 'F1', siklus: 'III', partial: 1, date: '2025-03-10', doc: 30, size: 88, tonase: 580.0,  bs: 0, lm: 0 },
  { id: 7002, kategori: 'PR', blok: 'F', petak: 'F1', siklus: 'III', partial: 2, date: '2025-04-05', doc: 56, size: 68, tonase: 1320.0, bs: 0, lm: 0 },
  { id: 7003, kategori: 'PR', blok: 'F', petak: 'F1', siklus: 'III', partial: 3, date: '2025-05-10', doc: 91, size: 47, tonase: 2380.5, bs: 3.0, lm: 0 },
  { id: 7004, kategori: 'PR', blok: 'F', petak: 'F1', siklus: 'III', partial: 4, date: '2025-06-08', doc: 120, size: 33, tonase: 3050.0, bs: 6.0, lm: 3 },
  { id: 7005, kategori: 'PT', blok: 'F', petak: 'F1', siklus: 'III', partial: 0, date: '2025-07-10', doc: 152, size: 24, tonase: 15500.0, bs: 9, lm: 2 },

  // F2: 3 partial + 1 panen total
  { id: 7101, kategori: 'PR', blok: 'F', petak: 'F2', siklus: 'III', partial: 1, date: '2025-03-15', doc: 35, size: 84, tonase: 650.0,  bs: 0, lm: 0 },
  { id: 7102, kategori: 'PR', blok: 'F', petak: 'F2', siklus: 'III', partial: 2, date: '2025-04-15', doc: 66, size: 60, tonase: 1550.0, bs: 0, lm: 0 },
  { id: 7103, kategori: 'PR', blok: 'F', petak: 'F2', siklus: 'III', partial: 3, date: '2025-05-28', doc: 109, size: 40, tonase: 2780.5, bs: 5.5, lm: 2 },
  { id: 7104, kategori: 'PT', blok: 'F', petak: 'F2', siklus: 'III', partial: 0, date: '2025-07-15', doc: 157, size: 23, tonase: 16200.0, bs: 12, lm: 3 },

  // F3: 4 partial + 1 panen sisa (PS)
  { id: 7201, kategori: 'PR', blok: 'F', petak: 'F3', siklus: 'III', partial: 1, date: '2025-03-12', doc: 32, size: 86, tonase: 610.0,  bs: 0, lm: 0 },
  { id: 7202, kategori: 'PR', blok: 'F', petak: 'F3', siklus: 'III', partial: 2, date: '2025-04-10', doc: 61, size: 65, tonase: 1420.0, bs: 0, lm: 0 },
  { id: 7203, kategori: 'PR', blok: 'F', petak: 'F3', siklus: 'III', partial: 3, date: '2025-05-15', doc: 96, size: 48, tonase: 2200.0, bs: 0, lm: 0 },
  { id: 7204, kategori: 'PR', blok: 'F', petak: 'F3', siklus: 'III', partial: 4, date: '2025-06-15', doc: 127, size: 34, tonase: 2950.5, bs: 7.0, lm: 4 },
  { id: 7205, kategori: 'PS', blok: 'F', petak: 'F3', siklus: 'III', partial: 0, date: '2025-07-20', doc: 162, size: 25, tonase: 13800.0, bs: 30, lm: 10 },
];

export const mockLoginResponse = {
  success: true,
  data: {
    id: 32,
    username: 'admin_mock',
    name: 'Admin Simulasi',
    role: 1
  }
};

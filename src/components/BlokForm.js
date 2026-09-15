import React, { useState, useEffect } from 'react';

const KATEGORI_OPTIONS = ['A', 'B', 'C', 'D'];

const calcDoc = (tanggal, date_tabur) => {
    if (!tanggal || !date_tabur) return '';
    const diff = Math.round((new Date(tanggal) - new Date(date_tabur)) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : '';
};

const defaultPetak = () => ({
    id: Date.now() + Math.random(),
    nama: '',       // nomor petak (angka), contoh: 1 → akan jadi "A1"
    jenisPanenId: '',     // id dari /api/kategori, mis: "PR"
    jenisPanenLabel: '',  // label tampilan, mis: "Partial"
    partial: '',    // partial ke-N (hanya untuk Partial/PR)
    tanggal: '',
    date_tabur: '',
    doc: '',
    size: '',
    tonase: '',
    bs: '',
    lm: '',
});

const defaultForm = {
    kategoriBlok: '',
    siklus: '',         // siklus di level blok, berlaku untuk semua petak
    petaks: [],
};

// --- Komponen Form Petak (Mode Edit/Isi Data) ---
function PetakForm({ petak, index, onChange, onRemove, onSave, kategoriOptions }) {
    const showPanenFields = petak.jenisPanenId !== '';
    const isPartial = petak.jenisPanenId === 'PR';
    const showBsLm = petak.jenisPanenId === 'PT' || petak.jenisPanenId === 'PS';

    const handleField = (e) => {
        const { name, value } = e.target;
        let updated = { ...petak, [name]: value };
        if (name === 'jenisPanenId') {
            // cari label dari options
            const found = kategoriOptions.find((k) => k.id === value);
            updated = {
                ...updated,
                jenisPanenLabel: found?.kategori ?? value,
                tanggal: '', date_tabur: '', doc: '', size: '', tonase: '',
                bs: '', lm: '', partial: '',
            };
        }
        // Auto-hitung DOC jika tanggal atau date_tabur berubah
        if (name === 'tanggal') {
            updated.doc = calcDoc(value, petak.date_tabur);
        }
        if (name === 'date_tabur') {
            updated.doc = calcDoc(petak.tanggal, value);
        }
        onChange(petak.id, updated);
    };

    const handleSaveClick = () => {
        if (!petak.jenisPanenId) {
            alert('Jenis Panen wajib diisi!');
            return;
        }
        if (isPartial && !petak.partial) {
            alert('Partial ke- wajib diisi untuk Jenis Panen Partial!');
            return;
        }
        onSave(petak.id);
    };

    return (
        <div className="petak-form-block active-editing">
            <div className="petak-form-header">
                <div className="petak-form-title">
                    <span className="petak-form-num">{index + 1}</span>
                    <span className="petak-form-label">Mengedit: Petak {petak.nama || (index + 1)}</span>
                </div>
                <button type="button" className="btn-remove-petak" onClick={() => onRemove(petak.id)} title="Hapus petak">
                    ✕
                </button>
            </div>

            <div className="petak-form-body">
                <div className="form-group">
                    <label className="form-label">No. Petak</label>
                    <input
                        type="number"
                        name="nama"
                        value={petak.nama}
                        onChange={handleField}
                        className="form-input"
                        placeholder="1"
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Jenis Panen <span className="required">*</span></label>
                    <select name="jenisPanenId" value={petak.jenisPanenId} onChange={handleField} className="form-select">
                        <option value="">-- Pilih Jenis Panen --</option>
                        {kategoriOptions.map((k) => (
                            <option key={k.id} value={k.id}>{k.kategori}</option>
                        ))}
                    </select>
                </div>

                {isPartial && (
                    <div className="form-group">
                        <label className="form-label">Partial ke- <span className="required">*</span></label>
                        <input
                            type="number"
                            name="partial"
                            value={petak.partial}
                            onChange={handleField}
                            className="form-input"
                            placeholder="1"
                            min="1"
                        />
                    </div>
                )}
                <div className="form-group">
                    <label className="form-label">Tanggal Tabur</label>
                    <input type="date" name="date_tabur" value={petak.date_tabur} onChange={handleField} className="form-input" />
                </div>


                {showPanenFields && (
                    <div className="conditional-fields">
                        <div className="conditional-header">
                            <span className="conditional-badge">Detail {petak.jenisPanen}</span>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Tanggal</label>
                                <input type="date" name="tanggal" value={petak.tanggal} onChange={handleField} className="form-input" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">DOC <span style={{ fontSize: '0.75rem', color: '#888' }}>(otomatis)</span></label>
                                <input type="number" name="doc" value={petak.doc} readOnly className="form-input" placeholder="-" style={{ background: '#f0f4f8', cursor: 'not-allowed' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Size (cm)</label>
                                <input type="number" name="size" value={petak.size} onChange={handleField} className="form-input" placeholder="0" min="0" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Tonase (kg)</label>
                                <input type="number" name="tonase" value={petak.tonase} onChange={handleField} className="form-input" placeholder="0.00" step="0.01" min="0" />
                            </div>
                            {showBsLm && (
                                <>
                                    <div className="form-group">
                                        <label className="form-label">BS (KG)</label>
                                        <input type="number" name="bs" value={petak.bs} onChange={handleField} className="form-input" placeholder="0" min="0" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">LM (%)</label>
                                        <input type="number" name="lm" value={petak.lm} onChange={handleField} className="form-input" placeholder="0" min="0" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className="petak-form-actions">
                    <button type="button" className="btn btn-save-petak" onClick={handleSaveClick}>
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Komponen Petak View (Mode Read-Only/Tersimpan) ---
function PetakView({ petak, index, onEdit, onRemove }) {
    return (
        <div className="petak-view-block">
            <div className="petak-view-left">
                <span className="petak-view-num">{index + 1}</span>
                <div className="petak-view-info">
                    <span className="petak-view-name">Petak {petak.nama || (index + 1)}</span>
                    <span className="petak-view-desc">
                        {petak.jenisPanenLabel || '-'}
                        {petak.jenisPanenId === 'PR' && petak.partial ? ` ke-${petak.partial}` : ''}
                    </span>
                </div>
            </div>
            <div className="petak-view-actions">
                <button type="button" className="btn-edit-petak" onClick={() => onEdit(petak.id)}>Edit</button>
                <button type="button" className="btn-delete-petak" onClick={() => onRemove(petak.id)}>Hapus</button>
            </div>
        </div>
    );
}

// --- Komponen Utama BlokForm ---
function BlokForm({ initialData, onSave, onCancel }) {
    const [form, setForm] = useState(
        initialData
            ? { kategoriBlok: initialData.kategoriBlok, siklus: initialData.siklus || '', petaks: initialData.petaks || [] }
            : defaultForm
    );
    const [editingPetakIds, setEditingPetakIds] = useState([]);
    const [kategoriOptions, setKategoriOptions] = useState([]);

    // Jenis panen bersifat tetap: PR=Partial, PT=Panen Total, PS=Panen Sisa dari Tandon
    useEffect(() => {
        setKategoriOptions([
            { id: 'PR', kategori: 'Partial' },
            { id: 'PT', kategori: 'Panen Total' },
            { id: 'PS', kategori: 'Panen Sisa dari Tandon' },
        ]);
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({ kategoriBlok: initialData.kategoriBlok, siklus: initialData.siklus || '', petaks: initialData.petaks || [] });
            setEditingPetakIds([]);
        } else {
            setForm(defaultForm);
            setEditingPetakIds([]);
        }
    }, [initialData]);

    const handleKategori = (e) => {
        setForm((prev) => ({ ...prev, kategoriBlok: e.target.value }));
    };

    const handleSiklus = (e) => {
        setForm((prev) => ({ ...prev, siklus: e.target.value }));
    };

    const handleAddPetak = () => {
        const newPetak = defaultPetak();
        setForm((prev) => ({ ...prev, petaks: [...prev.petaks, newPetak] }));
        setEditingPetakIds([newPetak.id]);
    };

    const handleChangePetak = (id, updatedPetak) => {
        setForm((prev) => ({
            ...prev,
            petaks: prev.petaks.map((p) => (p.id === id ? updatedPetak : p)),
        }));
    };

    const handleRemovePetak = (id) => {
        setForm((prev) => ({ ...prev, petaks: prev.petaks.filter((p) => p.id !== id) }));
        setEditingPetakIds((prev) => prev.filter((pId) => pId !== id));
    };

    const handleEditPetak = (id) => {
        setEditingPetakIds([id]);
    };

    const handleSavePetak = (id) => {
        setEditingPetakIds((prev) => prev.filter((pId) => pId !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.kategoriBlok) {
            alert('Mohon pilih Kategori Blok!');
            return;
        }
        if (!form.siklus) {
            alert('Mohon isi Siklus!');
            return;
        }
        if (form.petaks.length === 0) {
            alert('Tambahkan minimal 1 Petak!');
            return;
        }
        // Auto-simpan petak yang masih terbuka (jika valid)
        if (editingPetakIds.length > 0) {
            const openPetaks = form.petaks.filter(p => editingPetakIds.includes(p.id));
            for (const p of openPetaks) {
                if (!p.jenisPanenId) {
                    alert('Jenis Panen wajib diisi pada semua petak!');
                    return;
                }
                if (p.jenisPanenId === 'PR' && !p.partial) {
                    alert('Partial ke- wajib diisi untuk Jenis Panen Partial!');
                    return;
                }
            }
            // Semua valid → tutup semua edit mode
            setEditingPetakIds([]);
        }
        onSave(form);
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-box modal-box-wide" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{initialData?.id ? 'Edit Blok' : 'Tambah Blok Baru'}</h2>
                    <button className="btn-close" onClick={onCancel}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="blok-form">
                    {/* Kategori Blok */}
                    <div className="form-group">
                        <label className="form-label">Kategori Blok <span className="required">*</span></label>
                        <select name="kategoriBlok" value={form.kategoriBlok} onChange={handleKategori} className="form-select" required>
                            <option value="">-- Pilih Blok --</option>
                            {KATEGORI_OPTIONS.map((k) => (
                                <option key={k} value={k}>{k}</option>
                            ))}
                        </select>
                    </div>

                    {/* Siklus (di level blok, berlaku untuk semua petak) */}
                    <div className="form-group">
                        <label className="form-label">Siklus <span className="required">*</span></label>
                        <input
                            type="text"
                            name="siklus"
                            value={form.siklus}
                            onChange={handleSiklus}
                            className="form-input"
                            placeholder="Contoh: XVI"
                        />
                    </div>

                    {/* Petak Section */}
                    <div className="petak-outer-section">
                        <div className="petak-section-header">
                            <div>
                                <span className="petak-section-title">Daftar Petak</span>
                                <span className="petak-count-badge">{form.petaks.length}</span>
                            </div>
                            <button type="button" className="btn-add-petak" onClick={handleAddPetak}>
                                + Tambah Petak
                            </button>
                        </div>

                        {form.petaks.length === 0 ? (
                            <p className="petak-empty-hint">Belum ada petak. Klik tombol di atas untuk menambah.</p>
                        ) : (
                            <div className="petak-forms-list">
                                {form.petaks.map((petak, index) => {
                                    const isEditing = editingPetakIds.includes(petak.id);
                                    if (isEditing) {
                                        return (
                                            <PetakForm
                                                key={petak.id}
                                                petak={petak}
                                                index={index}
                                                onChange={handleChangePetak}
                                                onRemove={handleRemovePetak}
                                                onSave={handleSavePetak}
                                                kategoriOptions={kategoriOptions}
                                            />
                                        );
                                    } else {
                                        return (
                                            <PetakView
                                                key={petak.id}
                                                petak={petak}
                                                index={index}
                                                onEdit={handleEditPetak}
                                                onRemove={handleRemovePetak}
                                            />
                                        );
                                    }
                                })}
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-cancel" onClick={onCancel}>Batal</button>
                        <button type="submit" className="btn btn-save">Simpan Blok</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BlokForm;

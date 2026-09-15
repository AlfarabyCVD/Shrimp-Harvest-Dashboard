import React, { useState, useEffect } from 'react';
import { baseUrl } from '../config';
import axios from 'axios';

const calcDoc = (tanggal, date_tabur) => {
    if (!tanggal || !date_tabur) return '';
    const diff = Math.round((new Date(tanggal) - new Date(date_tabur)) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : '';
};

const BLOK_OPTIONS = ['A', 'B', 'C', 'D'];

function EditTonaseModal({ data, onClose, onSaved }) {
    const [form, setForm] = useState({
        siklus: '',
        kategori: '',
        blok: '',
        petak: '',
        partial: '',
        date: '',
        date_tabur: '',
        doc: '',
        size: '',
        tonase: '',
        bs: '',
        lm: '',
        lm: '',
    });
    const [kategoriOptions, setKategoriOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch jenis panen dari API
    useEffect(() => {
        axios.get(`${baseUrl}/kategori`)
            .then((res) => setKategoriOptions(res.data || []))
            .catch(() => setKategoriOptions([]));
    }, []);

    // Isi form dari data yang diedit
    useEffect(() => {
        if (data) {
            const dateVal = data.date ? data.date.substring(0, 10) : '';
            const dateTaburVal = data.date_tabur ? data.date_tabur.substring(0, 10) : '';
            setForm({
                siklus: data.siklus || '',
                kategori: data.kategori || '',
                blok: data.blok || '',
                petak: data.petak || '',
                partial: data.partial || '',
                date: dateVal,
                date_tabur: dateTaburVal,
                doc: calcDoc(dateVal, dateTaburVal) !== '' ? calcDoc(dateVal, dateTaburVal) : (data.doc ?? ''),
                size: data.size ?? '',
                tonase: data.tonase ?? '',
                bs: data.bs ?? '',
                lm: data.lm ?? '',
            });
        }
    }, [data]);

    const isPartial = form.kategori === 'PR';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === 'date') {
                updated.doc = calcDoc(value, prev.date_tabur);
            }
            if (name === 'date_tabur') {
                updated.doc = calcDoc(prev.date, value);
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const params = new URLSearchParams();
            Object.entries(form).forEach(([k, v]) => params.append(k, v ?? ''));
            await axios.put(`${baseUrl}/tonase/edit/${data.id}`, params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            onSaved();
        } catch (err) {
            setError('Gagal menyimpan. Coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Data Tonase</h2>
                    <button className="btn-close" onClick={onClose}>x</button>
                </div>

                <form onSubmit={handleSubmit} className="blok-form">
                    {error && <div className="login-error">{error}</div>}

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Siklus <span className="required">*</span></label>
                            <input name="siklus" value={form.siklus} onChange={handleChange} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Blok <span className="required">*</span></label>
                            <select name="blok" value={form.blok} onChange={handleChange} className="form-select" required>
                                <option value="">-- Pilih --</option>
                                {BLOK_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Kategori <span className="required">*</span></label>
                            <select name="kategori" value={form.kategori} onChange={handleChange} className="form-select" required>
                                <option value="">-- Pilih --</option>
                                {kategoriOptions.map((k) => (
                                    <option key={k.id} value={k.id}>{k.kategori}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">No. Petak <span className="required">*</span></label>
                            <input name="petak" value={form.petak} onChange={handleChange} className="form-input" required />
                        </div>
                    </div>

                    {isPartial && (
                        <div className="form-group">
                            <label className="form-label">Partial ke- <span className="required">*</span></label>
                            <input type="number" name="partial" value={form.partial} onChange={handleChange} className="form-input" min="1" />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Tanggal Tabur</label>
                        <input type="date" name="date_tabur" value={form.date_tabur} onChange={handleChange} className="form-input" />
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Tanggal <span className="required">*</span></label>
                            <input type="date" name="date" value={form.date} onChange={handleChange} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">DOC <span style={{ fontSize: '0.75rem', color: '#888' }}>(otomatis)</span></label>
                            <input type="number" name="doc" value={form.doc} readOnly className="form-input" placeholder="-" style={{ background: '#f0f4f8', cursor: 'not-allowed' }} />
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Size (cm)</label>
                            <input type="number" name="size" value={form.size} onChange={handleChange} className="form-input" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tonase (kg) <span className="required">*</span></label>
                            <input type="number" name="tonase" value={form.tonase} onChange={handleChange} className="form-input" step="0.01" required />
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">BS (kg)</label>
                            <input type="number" name="bs" value={form.bs} onChange={handleChange} className="form-input" step="0.01" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">LM (%)</label>
                            <input type="number" name="lm" value={form.lm} onChange={handleChange} className="form-input" step="0.01" />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-cancel" onClick={onClose}>Batal</button>
                        <button type="submit" className="btn btn-save" disabled={loading}>
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default EditTonaseModal;

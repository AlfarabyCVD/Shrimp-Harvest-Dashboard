import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import axios from 'axios';
import galesongLogo from '../assets/galesong.png';

const PANEN_BADGE_COLOR = {
    'Partial': 'badge-partial',
    'Panen Total': 'badge-panen-total',
    'Panen Sisa': 'badge-panen-sisa',
    'Panen Sisa dari Tandon': 'badge-panen-sisa',
};

const KATEGORI_COLOR = {
    A: 'kat-a', B: 'kat-b', C: 'kat-c', D: 'kat-d',
};

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function BlokDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blok, setBlok] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseUrl}/kategori/${id}`);
                const data = res.data?.data || res.data;
                setBlok(data);
            } catch (err) {
                console.error('Gagal mengambil detail:', err);
                setError('Data blok tidak ditemukan.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="app">
                <header className="app-header">
                    <div className="header-content">
                        <div className="header-left">
                            <img src={galesongLogo} alt="Galesong" className="header-logo-img" />
                            <div>
                                <h1 className="header-title">Detail Blok</h1>
                                <p className="header-subtitle">Memuat data...</p>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="app-main">
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Memuat data...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !blok) {
        return (
            <div className="app">
                <header className="app-header">
                    <div className="header-content">
                        <div className="header-left">
                            <img src={galesongLogo} alt="Galesong" className="header-logo-img" />
                            <div>
                                <h1 className="header-title">Detail Blok</h1>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="app-main">
                    <div className="empty-state">
                        <h3>{error || 'Data tidak ditemukan'}</h3>
                        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
                            Kembali ke Dashboard
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const petaks = blok.petaks || [];
    const kategoriClass = KATEGORI_COLOR[blok.kategoriBlok] || '';

    return (
        <>
            <header className="app-header">
                <div className="header-content">
                    <div className="header-left">
                        <img src={galesongLogo} alt="Galesong" className="header-logo-img" />
                        <div>
                            <h1 className="header-title">Detail Blok</h1>
                            <p className="header-subtitle">Informasi lengkap blok dan petak</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <button className="btn btn-primary" onClick={() => navigate('/')}>
                            Kembali
                        </button>
                    </div>
                </div>
            </header>

            <main className="app-main">
                {/* Blok Info Card */}
                <div className="detail-info-card">
                    <div className="detail-info-header">
                        <div className="detail-info-left">
                            <span className={`kategori-badge ${kategoriClass}`}>
                                Blok {blok.kategoriBlok}
                            </span>
                            <span className="petak-count-badge-dark">{petaks.length} Petak</span>
                        </div>
                    </div>
                </div>

                {/* Daftar Petak */}
                <div className="section-header" style={{ marginTop: '1.5rem' }}>
                    <h2 className="section-title">Daftar Petak</h2>
                    <p className="section-desc">Semua petak yang terdaftar dalam blok ini</p>
                </div>

                {petaks.length === 0 ? (
                    <div className="empty-state">
                        <h3>Belum ada petak dalam blok ini</h3>
                    </div>
                ) : (
                    <div className="detail-petak-list">
                        {petaks.map((petak, index) => {
                            const displayJenisPanen = petak.jenisPanen === 'Panen Sisa dari Tandon'
                                ? 'Panen Sisa'
                                : petak.jenisPanen;
                            const showBsLm = petak.jenisPanen === 'Panen Total' || petak.jenisPanen === 'Panen Sisa' || petak.jenisPanen === 'Panen Sisa dari Tandon';

                            return (
                                <div className="detail-petak-card" key={petak.id || index}>
                                    <div className="detail-petak-header">
                                        <div className="detail-petak-title">
                                            <span className="petak-card-num">{index + 1}</span>
                                            <span className="petak-card-name">{petak.nama || `Petak ${index + 1}`}</span>
                                        </div>
                                        {displayJenisPanen && (
                                            <span className={`panen-badge ${PANEN_BADGE_COLOR[petak.jenisPanen] || ''}`}>
                                                {displayJenisPanen}
                                            </span>
                                        )}
                                    </div>

                                    <div className="detail-petak-body">
                                        {petak.siklus && (
                                            <div className="petak-row">
                                                <span className="petak-row-label">Siklus</span>
                                                <span className="petak-row-value">{petak.siklus}</span>
                                            </div>
                                        )}
                                        <div className="petak-detail-grid">
                                            <div className="petak-detail-item">
                                                <span className="detail-label">Tanggal</span>
                                                <span className="detail-value">{formatDate(petak.tanggal)}</span>
                                            </div>
                                            <div className="petak-detail-item">
                                                <span className="detail-label">DOC</span>
                                                <span className="detail-value">{petak.doc || '-'}</span>
                                            </div>
                                            <div className="petak-detail-item">
                                                <span className="detail-label">Size (cm)</span>
                                                <span className="detail-value">{petak.size || '-'}</span>
                                            </div>
                                            <div className="petak-detail-item">
                                                <span className="detail-label">Tonase (kg)</span>
                                                <span className="detail-value">
                                                    {petak.tonase ? parseFloat(petak.tonase).toFixed(2) : '-'}
                                                </span>
                                            </div>
                                            {showBsLm && (
                                                <>
                                                    <div className="petak-detail-item">
                                                        <span className="detail-label">BS (KG)</span>
                                                        <span className="detail-value">{petak.bs || '-'}</span>
                                                    </div>
                                                    <div className="petak-detail-item">
                                                        <span className="detail-label">LM (%)</span>
                                                        <span className="detail-value">{petak.lm || '-'}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </>
    );
}

export default BlokDetail;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PANEN_BADGE_COLOR = {
    'Partial': 'badge-partial',
    'Panen Total': 'badge-panen-total',
    'Panen Sisa': 'badge-panen-sisa',
    'Panen Sisa dari Tandon': 'badge-panen-sisa', // Fallback for existing data
};

const KATEGORI_COLOR = {
    A: 'kat-a', B: 'kat-b', C: 'kat-c', D: 'kat-d',
};

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function PetakCard({ petak, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const showBsLm = petak.jenisPanen === 'Panen Total' || petak.jenisPanen === 'Panen Sisa' || petak.jenisPanen === 'Panen Sisa dari Tandon';
    const hasDetail = petak.jenisPanen !== '';

    const displayJenisPanen = petak.jenisPanen === 'Panen Sisa dari Tandon'
        ? 'Panen Sisa'
        : petak.jenisPanen;

    return (
        <div className={`petak-card ${isExpanded ? 'expanded' : ''}`}>
            <div
                className="petak-card-header"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ cursor: 'pointer' }}
            >
                <div className="petak-card-title">
                    <span className="petak-card-num">{index + 1}</span>
                    <span className="petak-card-name" style={{ marginRight: '8px' }}>
                        {petak.nama || `Petak ${index + 1}`}
                    </span>
                    {displayJenisPanen && (
                        <span className={`panen-badge ${PANEN_BADGE_COLOR[petak.jenisPanen] || ''}`}>
                            {displayJenisPanen}
                        </span>
                    )}
                </div>
                <div className="expand-indicator" style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {isExpanded ? '▲' : '▼'}
                </div>
            </div>

            {isExpanded && (
                <div className="petak-card-body">
                    {petak.siklus && (
                        <div className="petak-row">
                            <span className="petak-row-label">Siklus</span>
                            <span className="petak-row-value">{petak.siklus}</span>
                        </div>
                    )}

                    {hasDetail && (
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
                    )}
                </div>
            )}
        </div>
    );
}

function BlokCard({ blok, onEdit, onDelete }) {
    const navigate = useNavigate();
    const petaks = blok.petaks || [];

    const handleCardClick = () => {
        navigate(`/blok/${blok.id}`);
    };

    return (
        <div className="blok-card">
            <div className="card-header" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <div className={`kategori-badge ${KATEGORI_COLOR[blok.kategoriBlok] || ''}`}>
                    Blok {blok.kategoriBlok}
                </div>
                <span className="petak-count-badge-dark">{petaks.length} Petak</span>
            </div>

            <div className="card-body" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                {petaks.length === 0 ? (
                    <p className="petak-empty-card">Belum ada petak</p>
                ) : (
                    <div className="petak-cards-list">
                        {petaks.map((petak, index) => (
                            <PetakCard key={petak.id} petak={petak} index={index} />
                        ))}
                    </div>
                )}
            </div>

            <div className="card-footer">
                <button className="btn btn-view" onClick={handleCardClick}>Lihat Detail</button>
                <div className="card-footer-actions">
                    <button className="btn btn-edit" onClick={(e) => { e.stopPropagation(); onEdit(blok); }}>Edit</button>
                    <button className="btn btn-delete" onClick={(e) => { e.stopPropagation(); onDelete(blok.id); }}>Hapus</button>
                </div>
            </div>
        </div>
    );
}

function BlokTable({ blokList, onEdit, onDelete }) {
    if (blokList.length === 0) {
        return (
            <div className="empty-state">
                <h3>Belum ada data Blok</h3>
                <p>Klik tombol "Tambah Blok" untuk menambahkan data baru.</p>
            </div>
        );
    }

    return (
        <div className="blok-grid">
            {blokList.map((blok) => (
                <BlokCard key={blok.id} blok={blok} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default BlokTable;

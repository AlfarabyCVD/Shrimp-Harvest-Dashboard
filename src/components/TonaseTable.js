import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const KATEGORI_LABEL = {
    PR: 'Partial',
    PS: 'Panen Sisa dari Tandon',
    PT: 'Panen Total',
};

const KATEGORI_BADGE = {
    PR: 'badge-partial',
    PS: 'badge-panen-sisa',
    PT: 'badge-panen-total',
};

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}


// Hitung status health berdasarkan LM dan BS
function getHealthStatus(lm, bs) {
    const lmVal = parseFloat(lm || 0);
    const bsVal = parseFloat(bs || 0);
    if (lmVal > 10 || bsVal > 20) return { label: '⚠ Perhatian', cls: 'health-red' };
    if (lmVal >= 5) return { label: '~ Normal', cls: 'health-yellow' };
    return { label: '✓ Baik', cls: 'health-green' };
}


// Card layout untuk mobile & desktop grid (dikumpulkan per petak)
function CompactPetakCard({ petakName, rows, onEdit, onDelete, isAdmin }) {
    const [isOpen, setIsOpen] = React.useState(false);

    // Urutkan supaya PR (Partial) tampil duluan, disusul PT, lalu PS
    const order = { 'PR': 1, 'PT': 2, 'PS': 3 };
    const sortedRows = [...rows].sort((a, b) => {
        if (order[a.kategori] !== order[b.kategori]) return order[a.kategori] - order[b.kategori];
        return new Date(a.date) - new Date(b.date); // urut tanggal jika sama
    });

    const totalTonase = rows.reduce((s, r) => s + parseFloat(r.tonase || 0), 0);
    const lastRow = sortedRows[sortedRows.length - 1];

    // Progress dari ukuran rata-rata atau ukuran panen terakhir
    const sizeVal = parseFloat(lastRow?.size || 0);
    const TARGET_SIZE = 100;
    const progress = Math.min(100, Math.max(0, Math.round(((TARGET_SIZE - sizeVal) / TARGET_SIZE) * 100)));

    return (
        <div className="tonase-mobile-card compact-card">
            <div
                className="tonase-card-header"
                style={{ padding: '0.6rem 1rem', background: 'var(--color-oxford)' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="tonase-card-petak">Petak {petakName}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-lightsea)' }}>
                        {totalTonase.toLocaleString('id-ID', { minimumFractionDigits: 1 })} kg total
                    </div>
                    <div className={`accordion-icon ${isOpen ? 'open' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </div>

            <div className={`compact-body-transition ${isOpen ? 'open' : ''}`}>
                <div className="compact-body-content">
                    <div className="compact-rows-container" style={{ padding: '0.5rem 0' }}>
                        {sortedRows.map(row => {
                            const health = getHealthStatus(row.lm, row.bs);
                            return (
                                <div key={row.id} className="compact-row" style={{ padding: '0.6rem 1rem', borderBottom: '1px solid #f3f4f6', position: 'relative' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                            <span className={`panen-badge ${KATEGORI_BADGE[row.kategori] || ''}`} style={{ fontSize: '0.6rem', padding: '0.15rem 0.4rem' }}>
                                                {row.kategori === 'PR' ? `Partial ${row.partial}` : KATEGORI_LABEL[row.kategori]}
                                            </span>
                                            {health.label !== '✓ Baik' && (
                                                <span className={`health-badge ${health.cls}`} style={{ fontSize: '0.55rem', padding: '0.1rem 0.3rem' }}>
                                                    {health.label}
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111827' }}>
                                            {parseFloat(row.tonase || 0).toLocaleString('id-ID', { minimumFractionDigits: 1 })} kg
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem', fontSize: '0.72rem', color: '#6b7280' }}>
                                        <span>Tgl: <strong style={{ color: '#374151' }}>{formatDate(row.date)}</strong></span>
                                        <span>DOC: <strong style={{ color: '#374151' }}>{row.doc ?? '-'}</strong></span>
                                        <span>Size: <strong style={{ color: '#374151' }}>{row.size ?? '-'} cm</strong></span>
                                        <span>BS/LM: <strong style={{ color: '#374151' }}>{row.bs || 0}kg / {row.lm || 0}%</strong></span>
                                    </div>

                                    {isAdmin && (
                                        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button className="btn btn-edit" style={{ padding: '0.2rem 0.6rem', fontSize: '0.65rem' }} onClick={(e) => { e.stopPropagation(); onEdit(row); }}>Edit</button>
                                            <button className="btn btn-delete" style={{ padding: '0.2rem 0.6rem', fontSize: '0.65rem' }} onClick={(e) => { e.stopPropagation(); onDelete(row.id); }}>Hapus</button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Progress Berdasarkan Data Panen Terakhir */}
            <div className="card-progress-wrap" style={{ borderTop: 'none', background: '#f8f9fa' }}>
                <div className="card-progress-header">
                    <span className="card-progress-label">Progres (Panen Terakhir)</span>
                    <span className="card-progress-pct">{progress}%</span>
                </div>
                <div className="card-progress-track">
                    <div
                        className="card-progress-fill"
                        style={{ width: `${progress}%`, background: progress >= 80 ? '#1CA7A6' : progress >= 50 ? '#f2994a' : '#e5e7eb' }}
                    />
                </div>
            </div>
        </div>
    );
}

// Komponen accordion khusus untuk bagian bawah (Total Tonase dan Laporan semua petak)
function MobileTotalAccordion({ sortedPetakNames, petakGroups, totalTonase, forceOpen }) {
    const [isOpen, setIsOpen] = React.useState(forceOpen || false);

    React.useEffect(() => {
        if (forceOpen) setIsOpen(true);
    }, [forceOpen]);

    return (
        <div style={{ background: 'var(--color-oxford)', borderRadius: '12px', marginTop: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <div
                className="tonase-mobile-total"
                style={{ margin: 0, cursor: 'pointer', borderBottom: isOpen ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '0.875rem 1rem' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Total Tonase</span>
                    <div className={`accordion-icon ${isOpen ? 'open' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
                <strong style={{ color: 'var(--color-lightsea)' }}>{totalTonase.toLocaleString('id-ID', { minimumFractionDigits: 1 })} kg</strong>
            </div>

            <div className={`compact-body-transition ${isOpen ? 'open' : ''}`}>
                <div className="compact-body-content" style={{ padding: '0 1rem 0.875rem', color: '#f3f4f6', fontSize: '0.85rem' }}>
                    <div style={{ marginBottom: '0.7rem', marginTop: '0.5rem', fontWeight: 600, borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '0.4rem', color: '#9ca3af', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Laporan Rekapitulasi :
                    </div>
                    {sortedPetakNames.map(pName => {
                        const rows = petakGroups[pName];
                        const totalPetak = rows.reduce((s, r) => s + parseFloat(r.tonase || 0), 0);
                        return (
                            <div key={pName} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                <span>Petak {pName}</span>
                                <span>
                                    <strong style={{ color: '#fff', fontWeight: 600 }}>{totalPetak.toLocaleString('id-ID', { minimumFractionDigits: 1 })} kg</strong>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function TonaseTable({ data, loading, onEdit, onDelete, isAdmin, activeTab, onViewChange, filterBlok, filterSiklus }) {
    const [viewMode, setViewMode] = React.useState('table'); // 'table' | 'card'

    React.useEffect(() => {
        if (activeTab === 'ringkasan') setViewMode('card');
        else if (activeTab === 'data_panen') setViewMode('table');
    }, [activeTab]);

    if (loading) {
        return (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Memuat data tonase...</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="empty-state">
                <h3>Tidak ada data tonase</h3>
                <p>Pilih Blok dan Siklus lalu klik Tampilkan.</p>
            </div>
        );
    }

    const totalTonase = data.reduce((sum, row) => sum + parseFloat(row.tonase || 0), 0);
    const totalBs = data.reduce((sum, row) => sum + parseFloat(row.bs || 0), 0);
    const totalLm = data.reduce((sum, row) => sum + parseFloat(row.lm || 0), 0);

    const HEADERS = ['No', 'Petak', 'Kategori', 'Partial ke-', 'Tanggal', 'DOC', 'Size (cm)', 'Tonase (kg)', 'BS (kg)', 'LM (%)'];

    const petakGroups = data.reduce((acc, row) => {
        const petakName = row.petak || '-';
        if (!acc[petakName]) acc[petakName] = [];
        acc[petakName].push(row);
        return acc;
    }, {});

    const sortedPetakNames = Object.keys(petakGroups).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );

    const generateExportRows = () => {
        const rows = [];
        let globalIndex = 0;

        sortedPetakNames.forEach(pName => {
            const petakRows = petakGroups[pName];
            const order = { 'PR': 1, 'PT': 2, 'PS': 3 };
            const sorted = [...petakRows].sort((a, b) => {
                if (order[a.kategori] !== order[b.kategori]) return order[a.kategori] - order[b.kategori];
                return new Date(a.date) - new Date(b.date);
            });

            // Add data rows
            sorted.forEach(row => {
                globalIndex++;
                rows.push([
                    globalIndex,
                    row.petak || '-',
                    KATEGORI_LABEL[row.kategori] || row.kategori,
                    row.kategori === 'PR' ? (row.partial || '-') : '-',
                    formatDate(row.date),
                    row.doc ?? '-',
                    row.size ?? '-',
                    parseFloat(row.tonase || 0),
                    parseFloat(row.bs || 0),
                    parseFloat(row.lm || 0),
                ]);
            });

            // Calculate subtotals (SUM, according to user request)
            const subTonase = sorted.reduce((s, r) => s + parseFloat(r.tonase || 0), 0);
            const subBs = sorted.reduce((s, r) => s + parseFloat(r.bs || 0), 0);
            const subLm = sorted.reduce((s, r) => s + parseFloat(r.lm || 0), 0);
            const subDoc = sorted.reduce((s, r) => s + parseFloat(r.doc || 0), 0);
            const subSize = sorted.reduce((s, r) => s + parseFloat(r.size || 0), 0);

            // Add subtotal row
            rows.push([
                `Subtotal Petak ${pName}`,
                '', '', '', '', 
                subDoc > 0 ? subDoc : '-',
                subSize > 0 ? subSize : '-',
                subTonase,
                subBs,
                subLm,
            ]);
        });

        // Add final total row
        rows.push([
            'TOTAL',
            '', '', '', '', '', '',
            totalTonase,
            totalBs,
            totalLm
        ]);

        return rows;
    };

    const exportCSV = () => {
        const rows = [HEADERS, ...generateExportRows()];
        const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `tonase-${Date.now()}.csv`);
    };

    const exportExcel = () => {
        const rows = [HEADERS, ...generateExportRows()];
        const ws = XLSX.utils.aoa_to_sheet(rows);
        ws['!cols'] = HEADERS.map((h) => ({ wch: Math.max(h.length + 2, 20) }));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Tonase');
        const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([buf], { type: 'application/octet-stream' }), `tonase-${Date.now()}.xlsx`);
    };

    const exportPDF = () => {
        const doc = new jsPDF('l', 'mm', 'a4'); // Landscape A4
        const title = `Laporan Tonase - Blok ${filterBlok || '-'} - Siklus ${filterSiklus || '-'}`;
        
        doc.setFontSize(18);
        doc.text(title, 14, 15);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 22);

        const rows = generateExportRows().map(row => {
            return row.map((cell, index) => {
                // Indices for numeric columns: 5 (DOC), 6 (Size), 7 (Tonase), 8 (BS), 9 (LM)
                if (index >= 5 && index <= 9) {
                    const val = parseFloat(cell);
                    if (isNaN(val) || cell === '-') return cell;
                    
                    // DOC and Size usually integers, others 2 decimals
                    const decimals = (index === 5 || index === 6) ? 0 : 2;
                    return val.toLocaleString('id-ID', {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals
                    });
                }
                return cell;
            });
        });
        
        autoTable(doc, {
            startY: 30,
            head: [HEADERS],
            body: rows,
            theme: 'striped',
            headStyles: { fillColor: [15, 48, 87], textColor: [255, 255, 255], fontSize: 9 },
            bodyStyles: { fontSize: 8 },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            didParseCell: (data) => {
                const cellText = data.cell.raw || '';
                if (typeof cellText === 'string') {
                    if (cellText.includes('Subtotal')) {
                        data.cell.styles.fontStyle = 'bold';
                        data.cell.styles.fillColor = [241, 245, 249];
                    } else if (cellText === 'TOTAL') {
                        data.cell.styles.fontStyle = 'bold';
                        data.cell.styles.fillColor = [28, 167, 166];
                        data.cell.styles.textColor = [255, 255, 255];
                    }
                }
            }
        });

        doc.save(`tonase-${Date.now()}.pdf`);
    };

    const exportWhatsApp = () => {
        const divider = '—————————————————';
        let text = `Data Partial & Panen Blok ${filterBlok || '-'}\n`;
        text += `====== Siklus ke ${filterSiklus || '-'} =======\n`;

        sortedPetakNames.forEach(pName => {
            text += `${divider}\n`;
            text += `*PETAK ${pName.toUpperCase()}*\n`;
            text += `${divider}\n`;

            const rows = petakGroups[pName];
            const order = { 'PR': 1, 'PT': 2, 'PS': 3 };
            const sortedRows = [...rows].sort((a, b) => {
                if (order[a.kategori] !== order[b.kategori]) return order[a.kategori] - order[b.kategori];
                return new Date(a.date) - new Date(b.date);
            });

            sortedRows.forEach(row => {
                const dateObj = new Date(row.date);
                const tgl = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
                const doc = row.doc ?? '-';
                const size = row.size ?? '-';
                const ton = parseFloat(row.tonase || 0).toLocaleString('id-ID', { minimumFractionDigits: 1 });
                const kat = row.kategori === 'PR' ? `Partial ke ${row.partial}` : KATEGORI_LABEL[row.kategori];

                text += `${kat}\n`;
                text += `Tgl : ${tgl}\n`;
                text += `DOC : ${doc}\n`;
                text += `Size : ${size}\n`;
                text += `Tonase : ${ton} kg\n`;

                if (row.bs && parseFloat(row.bs) > 0) text += `BS : ${row.bs} kg\n`;
                if (row.lm && parseFloat(row.lm) > 0) text += `LM : ${row.lm}%\n`;
                text += `\n`;
            });

            const totalPetak = rows.reduce((s, r) => s + parseFloat(r.tonase || 0), 0);
            const lastDate = new Date(Math.max(...rows.map(r => new Date(r.date))));
            const lastTgl = lastDate.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });

            text += `Total petak ${pName} : ${totalPetak.toLocaleString('id-ID', { minimumFractionDigits: 1 })} Kg\n`;
            text += `(F i n i s h - ${lastTgl})\n`;
        });

        text += `========================\n`;
        text += `Laporan Tonase Blok ${filterBlok || '-'} :\n`;
        sortedPetakNames.forEach(pName => {
            const sumPetak = petakGroups[pName].reduce((s, r) => s + parseFloat(r.tonase || 0), 0);
            text += `${pName} : ${sumPetak.toLocaleString('id-ID', { minimumFractionDigits: 1 })} Kg (f i n i s h)\n`;
        });

        text += `Total Tonase Blok ${filterBlok || '-'} = *${totalTonase.toLocaleString('id-ID', { minimumFractionDigits: 1 })} Kg*`;

        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    };

    const handlePrint = () => window.print();

    return (
        <div id="section-ringkasan" className="tonase-table-wrapper">
            {/* Summary Stats + Toolbar Ekspor */}
            <div className="tonase-stats-toolbar">
                <div className="tonase-stats-row">
                    <div className="tonase-stat-card">
                        <span className="tonase-stat-label">Total Data</span>
                        <span className="tonase-stat-value">{data.length}</span>
                    </div>
                    <div className="tonase-stat-card">
                        <span className="tonase-stat-label">Total Tonase</span>
                        <span className="tonase-stat-value">{totalTonase.toLocaleString('id-ID', { minimumFractionDigits: 2 })} kg</span>
                    </div>
                    <div className="tonase-stat-card">
                        <span className="tonase-stat-label">Total BS</span>
                        <span className="tonase-stat-value">{totalBs.toLocaleString('id-ID', { minimumFractionDigits: 2 })} kg</span>
                    </div>
                </div>
                {/* Tombol Ekspor + View Toggle */}
                <div className="export-toolbar no-print" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    {/* View Toggle */}
                    <button
                        className={`tn-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                        onClick={() => {
                            setViewMode('table');
                            if (onViewChange) onViewChange('table');
                        }}
                        title="Tampilan Tabel"
                        style={{ padding: '0.3rem 0.7rem', fontSize: '1rem' }}
                    >☰</button>
                    <button
                        className={`tn-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                        onClick={() => {
                            setViewMode('card');
                            if (onViewChange) onViewChange('card');
                        }}
                        title="Tampilan Kartu"
                        style={{ padding: '0.3rem 0.7rem', fontSize: '1rem', marginRight: '0.4rem' }}
                    >⊞</button>
                    {isAdmin && (
                        <button className="btn-wa" onClick={exportWhatsApp} title="Send Via WhatsApp">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </button>
                    )}
                    <button className="btn-export btn-csv" onClick={exportCSV} title="Unduh CSV">CSV</button>
                    <button className="btn-export btn-excel" onClick={exportExcel} title="Unduh Excel">Excel</button>
                    <button className="btn-export btn-pdf" onClick={exportPDF} title="Unduh PDF">PDF</button>
                    <button className="btn-export btn-print" onClick={handlePrint} title="Cetak / PDF">Print</button>
                </div>
            </div>

            {/* Card Grid View — aktif saat viewMode=card di semua layar */}
            {viewMode === 'card' && (
                <>
                    <div className="tonase-card-grid">
                        {sortedPetakNames.map(pName => (
                            <CompactPetakCard
                                key={pName}
                                petakName={pName}
                                rows={petakGroups[pName]}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                    <MobileTotalAccordion
                        sortedPetakNames={sortedPetakNames}
                        petakGroups={petakGroups}
                        totalTonase={totalTonase}
                        forceOpen={activeTab === 'ringkasan'}
                    />
                </>
            )}

            {/* Desktop: Table — aktif saat viewMode=table */}
            {viewMode === 'table' && (
                <div className="tonase-table-outer tonase-desktop-only">
                    <div className="tonase-table-scroll">
                        <table className="tonase-table">
                            <thead className="tonase-thead-sticky">
                                <tr>
                                    <th>No</th>
                                    <th>Petak</th>
                                    <th>Kategori</th>
                                    <th>Partial ke-</th>
                                    <th>Tanggal</th>
                                    <th>DOC</th>
                                    <th>Size (cm)</th>
                                    <th>Tonase (kg)</th>
                                    <th>BS (kg)</th>
                                    <th>LM (%)</th>
                                    {isAdmin && <th>Aksi</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                    let globalIndex = 0;
                                    const rows = [];

                                    sortedPetakNames.forEach(pName => {
                                        const petakRows = petakGroups[pName];
                                        const order = { 'PR': 1, 'PT': 2, 'PS': 3 };
                                        const sorted = [...petakRows].sort((a, b) => {
                                            if (order[a.kategori] !== order[b.kategori]) return order[a.kategori] - order[b.kategori];
                                            return new Date(a.date) - new Date(b.date);
                                        });

                                        // Baris data
                                        sorted.forEach(row => {
                                            globalIndex++;
                                            rows.push(
                                                <tr key={row.id}>
                                                    <td>{globalIndex}</td>
                                                    <td><strong>{row.petak || '-'}</strong></td>
                                                    <td>
                                                        <span className={`panen-badge ${KATEGORI_BADGE[row.kategori] || ''}`}>
                                                            {KATEGORI_LABEL[row.kategori] || row.kategori}
                                                        </span>
                                                    </td>
                                                    <td>{row.kategori === 'PR' ? (row.partial || '-') : '-'}</td>
                                                    <td>{formatDate(row.date)}</td>
                                                    <td>{row.doc ?? '-'}</td>
                                                    <td>{row.size ?? '-'}</td>
                                                    <td>{row.tonase != null ? parseFloat(row.tonase).toLocaleString('id-ID', { minimumFractionDigits: 2 }) : '-'}</td>
                                                    <td>{row.bs != null ? parseFloat(row.bs).toFixed(2) : '-'}</td>
                                                    <td>{row.lm != null ? parseFloat(row.lm).toFixed(2) : '-'}</td>
                                                    {isAdmin && (
                                                        <td>
                                                            <div className="tonase-row-actions">
                                                                <button className="btn btn-edit" onClick={() => onEdit(row)}>Edit</button>
                                                                <button className="btn btn-delete" onClick={() => onDelete(row.id)}>Hapus</button>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        });

                                        // Hitung subtotal petak
                                        const subTonase = sorted.reduce((s, r) => s + parseFloat(r.tonase || 0), 0);
                                        const subBs = sorted.reduce((s, r) => s + parseFloat(r.bs || 0), 0);
                                        const subLm = sorted.reduce((s, r) => s + parseFloat(r.lm || 0), 0);
                                        const sumDoc = sorted.reduce((s, r) => s + parseFloat(r.doc || 0), 0);
                                        const sumSize = sorted.reduce((s, r) => s + parseFloat(r.size || 0), 0);

                                        // Baris subtotal petak
                                        rows.push(
                                            <tr key={`subtotal-${pName}`} className="petak-subtotal-row">
                                                <td colSpan={2} className="subtotal-label-cell">
                                                    <strong>Subtotal Petak {pName}</strong>
                                                </td>
                                                <td colSpan={2} style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>
                                                    —
                                                </td>
                                                <td style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>—</td>
                                                <td style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>
                                                    {sumDoc > 0 ? sumDoc : '—'}
                                                </td>
                                                <td style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>
                                                    {sumSize > 0 ? sumSize : '—'}
                                                </td>
                                                <td className="subtotal-num-cell">
                                                    <span className="subtotal-sub-label">Tonase</span>
                                                    <strong>{subTonase.toLocaleString('id-ID', { minimumFractionDigits: 2 })} kg</strong>
                                                </td>
                                                <td className="subtotal-num-cell">
                                                    <span className="subtotal-sub-label">BS</span>
                                                    <strong>{subBs.toLocaleString('id-ID', { minimumFractionDigits: 2 })} kg</strong>
                                                </td>
                                                <td className="subtotal-num-cell">
                                                    <span className="subtotal-sub-label">LM</span>
                                                    <strong>{subLm > 0 ? subLm.toFixed(2) + ' %' : '-'}</strong>
                                                </td>
                                                {isAdmin && <td></td>}
                                            </tr>
                                        );
                                    });

                                    return rows;
                                })()}
                            </tbody>
                            <tfoot className="tonase-tfoot-sticky">
                                <tr className="tonase-table-total">
                                    <td className="total-label-cell"><strong>Total</strong></td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td className="total-num-cell">
                                        <span className="total-sub-label">Total Tonase</span>
                                        <strong>{totalTonase.toLocaleString('id-ID', { minimumFractionDigits: 2 })} kg</strong>
                                    </td>
                                    <td className="total-num-cell">
                                        <span className="total-sub-label">Total BS</span>
                                        <strong>{totalBs.toLocaleString('id-ID', { minimumFractionDigits: 2 })} kg</strong>
                                    </td>
                                    <td className="total-num-cell">
                                        <span className="total-sub-label">Total LM</span>
                                        <strong>{totalLm > 0 ? totalLm.toFixed(2) + ' %' : '-'}</strong>
                                    </td>
                                    {isAdmin && <td>-</td>}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}

            {/* Mobile: Cards */}
            <div className="tonase-mobile-only">
                {sortedPetakNames.map(pName => (
                    <CompactPetakCard
                        key={pName}
                        petakName={pName}
                        rows={petakGroups[pName]}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        isAdmin={isAdmin}
                    />
                ))}
                <MobileTotalAccordion
                    sortedPetakNames={sortedPetakNames}
                    petakGroups={petakGroups}
                    totalTonase={totalTonase}
                />
            </div>
        </div>
    );
}

export default TonaseTable;

import React, { useState } from 'react';
import {
    ResponsiveContainer,
    LineChart, Line,
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid,
    Tooltip, Legend,
} from 'recharts';

const KATEGORI_LABEL = { PR: 'Partial', PS: 'Panen Sisa', PT: 'Panen Total' };
const COLORS = { PR: '#1CA7A6', PT: '#0f3460', PS: '#f2994a' };

function fmt(n) {
    return parseFloat(n || 0).toLocaleString('id-ID', { minimumFractionDigits: 1 });
}

function fmtDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: '2-digit' });
}

// Natural sort A1, A2 ... A9, A10, A11, A12
function naturalSort(a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: '0.82rem', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
            <p style={{ fontWeight: 700, marginBottom: 4, color: '#0f3460' }}>{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} style={{ color: p.color, margin: '2px 0' }}>
                    {p.name}: <strong>{fmt(p.value)} kg</strong>
                </p>
            ))}
        </div>
    );
}

export default function TonaseCharts({ data }) {
    const [activeChart, setActiveChart] = useState('bar');
    const [chartKategori, setChartKategori] = useState('');  // '' = semua

    if (!data || data.length === 0) return null;

    // Filtered data untuk chart
    const chartData = chartKategori
        ? data.filter((r) => r.kategori === chartKategori)
        : data;

    // Line Chart — Tonase per tanggal diurutkan
    const lineData = [...chartData]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((row) => ({
            label: `${row.petak} ${fmtDate(row.date)}`,
            tonase: parseFloat(row.tonase || 0),
        }));

    // Bar Chart — Total tonase per petak, diurutkan natural (A1→A12)
    const petakMap = {};
    chartData.forEach((row) => {
        if (!petakMap[row.petak]) petakMap[row.petak] = { petak: row.petak, PR: 0, PT: 0, PS: 0 };
        const val = parseFloat(row.tonase || 0);
        petakMap[row.petak][row.kategori] = (petakMap[row.petak][row.kategori] || 0) + val;
    });
    const barData = Object.values(petakMap)
        .sort((a, b) => naturalSort(a.petak, b.petak)); // A1, A2 ... A10, A11, A12

    const hasKat = (k) => chartData.some((r) => r.kategori === k);

    return (
        <div className="charts-section">
            {/* Toolbar */}
            <div className="charts-toolbar">
                <span className="charts-title">Visualisasi Data</span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Filter Kategori */}
                    <select
                        className="form-select"
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', minWidth: 140 }}
                        value={chartKategori}
                        onChange={(e) => setChartKategori(e.target.value)}
                    >
                        <option value="">Semua Kategori</option>
                        <option value="PR">Partial</option>
                        <option value="PT">Panen Total</option>
                        <option value="PS">Panen Sisa</option>
                    </select>
                    {/* Toggle Chart */}
                    <div className="charts-toggle">
                        <button
                            className={`tn-toggle-btn ${activeChart === 'bar' ? 'active' : ''}`}
                            onClick={() => setActiveChart('bar')}
                        >Perbandingan Petak</button>
                        <button
                            className={`tn-toggle-btn ${activeChart === 'line' ? 'active' : ''}`}
                            onClick={() => setActiveChart('line')}
                        >Tren Tonase</button>
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            {activeChart === 'bar' && (
                <div className="chart-box">
                    <p className="chart-subtitle">
                        Total tonase per petak{chartKategori ? ` — ${KATEGORI_LABEL[chartKategori]}` : ' (semua kategori)'}
                    </p>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={barData} margin={{ top: 8, right: 20, left: 0, bottom: 8 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="petak" tick={{ fontSize: 11, fill: '#6b7280' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}t`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            {(!chartKategori || chartKategori === 'PR') && hasKat('PR') && (
                                <Bar dataKey="PR" name="Partial" fill={COLORS.PR} radius={[4, 4, 0, 0]} />
                            )}
                            {(!chartKategori || chartKategori === 'PT') && hasKat('PT') && (
                                <Bar dataKey="PT" name="Panen Total" fill={COLORS.PT} radius={[4, 4, 0, 0]} />
                            )}
                            {(!chartKategori || chartKategori === 'PS') && hasKat('PS') && (
                                <Bar dataKey="PS" name="Panen Sisa" fill={COLORS.PS} radius={[4, 4, 0, 0]} />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Line Chart */}
            {activeChart === 'line' && (
                <div className="chart-box">
                    <p className="chart-subtitle">
                        Naik-turun tonase per tanggal{chartKategori ? ` — ${KATEGORI_LABEL[chartKategori]}` : ''}
                    </p>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={lineData} margin={{ top: 8, right: 20, left: 0, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="label"
                                tick={{ fontSize: 9, fill: '#6b7280' }}
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                            />
                            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}t`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="tonase"
                                name="Tonase"
                                stroke="#1CA7A6"
                                strokeWidth={2.5}
                                dot={{ r: 3, fill: '#1CA7A6' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

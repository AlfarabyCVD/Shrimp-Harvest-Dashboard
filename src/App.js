import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import BlokForm from './components/BlokForm';
import BlokTable from './components/BlokTable';
import TonaseTable from './components/TonaseTable';
import TonaseCharts from './components/TonaseCharts';
import EditTonaseModal from './components/EditTonaseModal';
import BlokDetail from './components/BlokDetail';
import LoginPage from './pages/LoginPage';
import galesongLogo from './assets/galesong.png';
import { baseUrl, USE_MOCK } from './config';
import axios from 'axios';
import { supabase } from './supabaseClient';
import { useAuth } from './context/AuthContext';
import { mockKategori, mockTonaseData } from './mockData';

function Dashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [blokList, setBlokList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPetakGlobal, setTotalPetakGlobal] = useState(0);
  const [totalBlokGlobal, setTotalBlokGlobal] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter tonase
  const [filterBlok, setFilterBlok] = useState('A');
  const [filterSiklus, setFilterSiklus] = useState('');
  const [tonaseData, setTonaseData] = useState([]);
  const [tonaseLoading, setTonaseLoading] = useState(false);
  const [tonaseFetched, setTonaseFetched] = useState(false);
  const [editTonase, setEditTonase] = useState(null);
  const [activeTab, setActiveTab] = useState('beranda');

  // Ref to prevent ScrollSpy from updating activeTab during a navigation click (programmatic scroll)
  const isScrollingRef = useRef(false);

  // Statistik global: cache petak unik per blok (persistent via localStorage)
  const loadCache = () => {
    try {
      const stored = localStorage.getItem('petakCache');
      if (!stored) return {};
      const parsed = JSON.parse(stored);
      // Konversi array kembali ke Set
      const result = {};
      Object.keys(parsed).forEach(k => { result[k] = new Set(parsed[k]); });
      return result;
    } catch { return {}; }
  };
  const [petakCache, setPetakCache] = useState(loadCache);

  // Riwayat Blok+Siklus yang pernah ditampilkan (persistent)
  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('dataHistory');
      return stored ? JSON.parse(stored) : {}; // { 'A': ['XVI', 'XV'], 'B': ['XIII'] }
    } catch { return {}; }
  };
  const [dataHistory, setDataHistory] = useState(loadHistory);
  const [showHistory, setShowHistory] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter tambahan (client-side)
  const [filterKategori, setFilterKategori] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // Data setelah filter tanggal & kategori
  const filteredData = tonaseData.filter((row) => {
    if (filterKategori && row.kategori !== filterKategori) return false;
    if (filterDateFrom && new Date(row.date) < new Date(filterDateFrom)) return false;
    if (filterDateTo && new Date(row.date) > new Date(filterDateTo + 'T23:59:59')) return false;
    return true;
  });

  const ambilData = async () => {
    if (USE_MOCK) {
      setLoading(true);
      setTimeout(() => {
        setBlokList(mockKategori);
        setTotalBlokGlobal(mockKategori.length);
        const totalPetak = mockKategori.reduce((sum, blok) => sum + (blok.petaks?.length || 0), 0);
        setTotalPetakGlobal(totalPetak);
        
        // Mock dataHistory
        const mockHistory = {};
        mockTonaseData.forEach(item => {
          if (!mockHistory[item.blok]) mockHistory[item.blok] = [];
          if (!mockHistory[item.blok].includes(item.siklus)) mockHistory[item.blok].push(item.siklus);
        });
        setDataHistory(mockHistory);
        setLoading(false);
      }, 500);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tonase')
        .select('blok, siklus, petak');

      if (error) throw error;

      if (data && data.length > 0) {
        const historyMap = {};
        const petakMap = {};

        data.forEach(item => {
          if (!item.blok || !item.siklus) return;
          if (!historyMap[item.blok]) historyMap[item.blok] = [];
          if (!historyMap[item.blok].includes(item.siklus)) {
            historyMap[item.blok].push(item.siklus);
          }
          if (!petakMap[item.blok]) petakMap[item.blok] = new Set();
          if (item.petak) petakMap[item.blok].add(item.petak);
        });

        Object.keys(historyMap).forEach(b => historyMap[b].sort());

        const bloks = Object.keys(historyMap).sort().map((b, idx) => ({
          id: idx + 1,
          kategoriBlok: b,
          petaks: Array.from(petakMap[b] || []).map(p => ({ nama: p }))
        }));

        setBlokList(bloks);
        setTotalBlokGlobal(Object.keys(historyMap).length);
        const totalPetaks = Object.values(petakMap).reduce((acc, set) => acc + set.size, 0);
        setTotalPetakGlobal(totalPetaks);
        setDataHistory(historyMap);
        localStorage.setItem('dataHistory', JSON.stringify(historyMap));
      } else {
        setBlokList([]);
        setTotalBlokGlobal(0);
        setTotalPetakGlobal(0);
      }
    } catch (err) {
      console.error('Gagal mengambil data dari Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  const ambilTonase = async () => {
    if (USE_MOCK) {
      setTonaseLoading(true);
      setTonaseFetched(true);
      setTimeout(() => {
        const filtered = mockTonaseData.filter(d => d.blok === filterBlok && d.siklus === filterSiklus);
        setTonaseData(filtered);
        setTonaseLoading(false);
      }, 500);
      return;
    }

    if (!filterBlok || !filterSiklus) {
      alert('Pilih Blok dan isi Siklus terlebih dahulu!');
      return;
    }
    setTonaseLoading(true);
    setTonaseFetched(true);
    try {
      const { data, error } = await supabase
        .from('tonase')
        .select('*')
        .eq('blok', filterBlok)
        .eq('siklus', filterSiklus)
        .order('date', { ascending: true });

      if (error) throw error;

      const fetchedData = data || [];
      setTonaseData(fetchedData);
      if (fetchedData.length > 0) {
        const uniquePetak = [...new Set(fetchedData.map(r => r.petak))];
        setPetakCache(prev => {
          const updated = { ...prev };
          if (!updated[filterBlok]) updated[filterBlok] = new Set();
          else updated[filterBlok] = new Set(updated[filterBlok]);
          uniquePetak.forEach(p => updated[filterBlok].add(p));
          const toStore = {};
          Object.keys(updated).forEach(k => { toStore[k] = [...updated[k]]; });
          localStorage.setItem('petakCache', JSON.stringify(toStore));
          return updated;
        });
        setDataHistory(prev => {
          const updated = { ...prev };
          if (!updated[filterBlok]) updated[filterBlok] = [];
          if (!updated[filterBlok].includes(filterSiklus)) {
            updated[filterBlok] = [...updated[filterBlok], filterSiklus].sort();
          }
          localStorage.setItem('dataHistory', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) {
      console.error('Gagal mengambil data tonase dari Supabase:', err);
      setTonaseData([]);
    } finally {
      setTonaseLoading(false);
    }
  };

  const loadFromHistory = async (blok, siklus) => {
    if (USE_MOCK) {
      setFilterBlok(blok);
      setFilterSiklus(siklus);
      setTonaseLoading(true);
      setTonaseFetched(true);
      setTimeout(() => {
        const filtered = mockTonaseData.filter(d => d.blok === blok && d.siklus === siklus);
        setTonaseData(filtered);
        setTonaseLoading(false);
      }, 500);
      return;
    }

    setFilterBlok(blok);
    setFilterSiklus(siklus);
    setTonaseLoading(true);
    setTonaseFetched(true);
    try {
      const { data, error } = await supabase
        .from('tonase')
        .select('*')
        .eq('blok', blok)
        .eq('siklus', siklus)
        .order('date', { ascending: true });

      if (error) throw error;

      const fetchedData = data || [];
      setTonaseData(fetchedData);
      if (fetchedData.length > 0) {
        const uniquePetak = [...new Set(fetchedData.map(r => r.petak))];
        setPetakCache(prev => {
          const updated = { ...prev };
          if (!updated[blok]) updated[blok] = new Set();
          else updated[blok] = new Set(updated[blok]);
          uniquePetak.forEach(p => updated[blok].add(p));
          const toStore = {};
          Object.keys(updated).forEach(k => { toStore[k] = [...updated[k]]; });
          localStorage.setItem('petakCache', JSON.stringify(toStore));
          return updated;
        });
      }
    } catch (err) {
      console.error('Gagal load dari Supabase:', err);
      setTonaseData([]);
    } finally {
      setTonaseLoading(false);
    }
  };

  const handleEditTonase = (row) => setEditTonase(row);

  const handleDeleteTonase = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data ini?')) return;
    try {
      if (!USE_MOCK) {
        const { error } = await supabase.from('tonase').delete().eq('id', id);
        if (error) throw error;
      }
      const remaining = tonaseData.filter((r) => r.id !== id);
      setTonaseData(remaining);

      // Jika tidak ada data tersisa untuk blok+siklus ini
      if (remaining.length === 0) {
        const updatedHistory = { ...dataHistory };
        if (updatedHistory[filterBlok]) {
          updatedHistory[filterBlok] = updatedHistory[filterBlok].filter(s => s !== filterSiklus);
          if (updatedHistory[filterBlok].length === 0) {
            delete updatedHistory[filterBlok];
          }
        }
        setDataHistory(updatedHistory);
        localStorage.setItem('dataHistory', JSON.stringify(updatedHistory));

        setPetakCache(prev => {
          const updated = { ...prev };
          if (!updatedHistory[filterBlok]) {
            delete updated[filterBlok];
          }
          const toStore = {};
          Object.keys(updated).forEach(k => { toStore[k] = [...updated[k]]; });
          localStorage.setItem('petakCache', JSON.stringify(toStore));
          return updated;
        });

        if (!updatedHistory[filterBlok]) {
          await ambilData();
          alert(`Blok ${filterBlok} telah dihapus otomatis karena tidak memiliki data.`);
          setTonaseFetched(false);
        }
      }
    } catch (err) {
      console.error('Gagal menghapus data:', err);
      alert('Gagal menghapus data.');
    }
  };

  // Hapus seluruh data dalam satu siklus sekaligus
  const handleDeleteSiklus = async () => {
    const jumlah = tonaseData.length;
    const labelJumlah = jumlah > 0 ? `${jumlah} record akan dihapus permanen` : `Blok ini kosong dan akan dihapus dari riwayat`;
    const konfirmasi = window.confirm(
      `Yakin ingin menghapus Blok ${filterBlok} Siklus ${filterSiklus}?\n(${labelJumlah})`
    );
    if (!konfirmasi) return;
    try {
      if (!USE_MOCK) {
        if (jumlah > 0) {
          const { error } = await supabase.from('tonase').delete().eq('blok', filterBlok).eq('siklus', filterSiklus);
          if (error) throw error;
        }
      }
      setTonaseData([]);

      const updatedHistory = { ...dataHistory };
      if (updatedHistory[filterBlok]) {
        updatedHistory[filterBlok] = updatedHistory[filterBlok].filter(s => s !== filterSiklus);
        if (updatedHistory[filterBlok].length === 0) delete updatedHistory[filterBlok];
      }
      setDataHistory(updatedHistory);
      localStorage.setItem('dataHistory', JSON.stringify(updatedHistory));

      setPetakCache(prev => {
        const updated = { ...prev };
        if (!updatedHistory[filterBlok]) delete updated[filterBlok];
        const toStore = {};
        Object.keys(updated).forEach(k => { toStore[k] = [...updated[k]]; });
        localStorage.setItem('petakCache', JSON.stringify(toStore));
        return updated;
      });

      if (!updatedHistory[filterBlok]) {
        await ambilData();
        alert(`Blok ${filterBlok} berhasil dihapus dari sistem.`);
      } else {
        alert(`Blok ${filterBlok} Siklus ${filterSiklus} berhasil dihapus.`);
      }
      setTonaseFetched(false);
    } catch (err) {
      console.error('Gagal menghapus siklus:', err);
      alert('Gagal menghapus siklus. Coba lagi.');
    }
  };


  useEffect(() => {
    ambilData();
  }, []);

  // PR = Partial, PS = Panen Sisa dari tandon, PT = Panen Total
  const IS_PARTIAL_TYPE = { 'PR': true, 'PS': false, 'PT': false };

  const handleSave = async (formData) => {
    console.log('Data yang dikirim:', formData);

    const USER_ID = 32;

    const buildPayload = (petak) => {
      const isPartial = IS_PARTIAL_TYPE[petak.jenisPanenId] ?? false;
      return {
        siklus: formData.siklus,
        kategori: petak.jenisPanenId,
        blok: formData.kategoriBlok,
        petak: formData.kategoriBlok + (petak.nama || ''),
        partial: isPartial ? (petak.partial || 0) : 0,
        date: petak.tanggal,
        doc: petak.doc || 0,
        size: petak.size || 0,
        tonase: petak.tonase || 0,
        bs: petak.bs || 0,
        lm: petak.lm || 0,
        user_id: USER_ID,
        updator: USER_ID,
      };
    };

    try {
      if (USE_MOCK) {
        if (editData) {
          setBlokList(prev => prev.map(b => b.id === editData.id ? { ...formData, id: editData.id } : b));
        } else {
          setBlokList(prev => [...prev, { ...formData, id: Date.now() }]);
        }
        setShowForm(false);
        setEditData(null);
        return;
      }

      if (editData) {
        // Mode EDIT
        const payload = buildPayload(formData.petaks[0]);
        console.log('EDIT Supabase payload:', payload);
        const { error } = await supabase.from('tonase').update(payload).eq('id', editData.id);
        if (error) throw error;
      } else {
        // Mode CREATE
        const payloads = formData.petaks.map((petak) => buildPayload(petak));
        console.log('CREATE Supabase payloads:', payloads);
        const { error } = await supabase.from('tonase').insert(payloads);
        if (error) throw error;

        const newBlok = formData.kategoriBlok;
        const newSiklus = formData.siklus;
        const newPetaks = formData.petaks.map(p => newBlok + (p.nama || ''));
        setDataHistory(prev => {
          const updated = { ...prev };
          if (!updated[newBlok]) updated[newBlok] = [];
          if (!updated[newBlok].includes(newSiklus)) {
            updated[newBlok] = [...updated[newBlok], newSiklus].sort();
          }
          localStorage.setItem('dataHistory', JSON.stringify(updated));
          return updated;
        });
        setPetakCache(prev => {
          const updated = { ...prev };
          if (!updated[newBlok]) updated[newBlok] = new Set();
          else updated[newBlok] = new Set(updated[newBlok]);
          newPetaks.forEach(p => updated[newBlok].add(p));
          const toStore = {};
          Object.keys(updated).forEach(k => { toStore[k] = [...updated[k]]; });
          localStorage.setItem('petakCache', JSON.stringify(toStore));
          return updated;
        });
      }
      await ambilData();
    } catch (err) {
      console.error('Gagal menyimpan data ke Supabase:', err);
      if (editData) {
        setBlokList((prev) =>
          prev.map((b) => (b.id === editData.id ? { ...formData, id: editData.id } : b))
        );
      } else {
        setBlokList((prev) => [...prev, { ...formData, id: Date.now() }]);
      }
    }
    setEditData(null);
    setShowForm(false);
  };

  const handleEdit = (blok) => {
    setEditData(blok);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus blok ini?')) {
      try {
        if (!USE_MOCK) {
          const blokObj = blokList.find(b => b.id === id);
          if (blokObj) {
            await supabase.from('tonase').delete().eq('blok', blokObj.kategoriBlok);
          }
        }
        await ambilData();
      } catch (err) {
        console.error('Gagal menghapus data:', err);
        setBlokList((prev) => prev.filter((b) => b.id !== id));
      }
    }
  };

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setEditData(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditData(null);
    setShowForm(false);
  };

  // Komponen Avatar & Dropdown Profil
  const ProfileDropdown = () => (
    <div className="profile-dropdown-container">
      <div
        className="profile-avatar-trigger"
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
      >
        <div className="avatar-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <span className="profile-name-desktop">{user?.username || user?.name || (isAdmin ? 'Admin' : 'User')}</span>
        <svg className={`dropdown-arrow ${showProfileDropdown ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {showProfileDropdown && (
        <div className="profile-dropdown-menu">
          <div className="dropdown-user-info">
            <span className="dropdown-name">{user?.username || user?.name || (isAdmin ? 'Admin' : 'User')}</span>
            <span className="dropdown-role">{isAdmin ? 'Administrator' : 'Viewer'}</span>
          </div>
          <div className="dropdown-divider"></div>
          {isAdmin && (
            <div className="dropdown-mobile-only">
              <button className="dropdown-item" onClick={() => { handleOpenCreate(); setShowProfileDropdown(false); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Tambah Blok
              </button>
            </div>
          )}
          <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Keluar
          </button>
        </div>
      )}
    </div>
  );


  return (
    <>
      {isAdmin ? (
        /* ===== ADMIN HEADER: Animated Gradient + Stats ===== */
        <header className="app-header">
          <div className="header-content">
            <div className="header-left">
              <img src={galesongLogo} alt="Galesong" className="header-logo-img" />
              <div>
                <h1 className="header-title">Dashboard Blok</h1>
                <p className="header-subtitle">Manajemen Data Blok Panen</p>
              </div>
            </div>
            <div className="header-right desktop-only">
              <div className="stats-badge">
                <span className="stats-number">
                  {Math.max(totalBlokGlobal, Object.keys(dataHistory).length) || '-'}
                </span>
                <span className="stats-label">Total Blok</span>
              </div>
              <div className="stats-badge">
                <span className="stats-number">
                  {totalPetakGlobal > 0 ? totalPetakGlobal : '-'}
                </span>
                <span className="stats-label">Total Petak</span>
              </div>
              <button className="btn btn-primary add-blok-desktop" onClick={handleOpenCreate}>
                + Tambah Blok
              </button>
              <ProfileDropdown />
            </div>
            <button className="hamburger-btn mobile-only" onClick={() => setIsMobileMenuOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </header>
      ) : (
        /* ===== USER HEADER: Dark Minimal Navbar ===== */
        <header className="user-header">
          <div className="user-header-content">
            <div className="user-header-left">
              <img src={galesongLogo} alt="Galesong" className="header-logo-img" />
            </div>
            <nav className="user-header-nav desktop-only">
              <span
                className={`user-nav-item ${activeTab === 'beranda' ? 'user-nav-active' : ''}`}
                onClick={() => {
                  isScrollingRef.current = true;
                  setActiveTab('beranda');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => { isScrollingRef.current = false; }, 1000);
                }}
              >
                Beranda
              </span>
              <span
                className={`user-nav-item ${activeTab === 'data_panen' ? 'user-nav-active' : ''}`}
                onClick={() => {
                  isScrollingRef.current = true;
                  setActiveTab('data_panen');
                  setTimeout(() => {
                    document.getElementById('section-data-panen')?.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => { isScrollingRef.current = false; }, 1000);
                  }, 350);
                }}
              >
                Data Panen
              </span>
              <span
                className={`user-nav-item ${activeTab === 'ringkasan' ? 'user-nav-active' : ''}`}
                onClick={() => {
                  isScrollingRef.current = true;
                  setActiveTab('ringkasan');
                  setShowHistory(true);
                  setTimeout(() => {
                    document.getElementById('section-ringkasan')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => { isScrollingRef.current = false; }, 1000);
                  }, 350);
                }}
              >
                Ringkasan
              </span>
            </nav>
            <div className="user-header-right desktop-only">
              <ProfileDropdown />
            </div>
            <button className="hamburger-btn mobile-only" onClick={() => setIsMobileMenuOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </header>
      )}

      {/* ===== MOBILE SIDEBAR ===== */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <span className="mobile-sidebar-title">Menu utama</span>
          <button className="mobile-sidebar-close" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>

        <div className="mobile-sidebar-content">
          {!isAdmin && (
            <nav className="mobile-nav">
              <span
                className={`mobile-nav-item ${activeTab === 'beranda' ? 'active' : ''}`}
                onClick={() => {
                  isScrollingRef.current = true;
                  setActiveTab('beranda');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                  setTimeout(() => { isScrollingRef.current = false; }, 1000);
                }}
              >
                Beranda
              </span>
              <span
                className={`mobile-nav-item ${activeTab === 'data_panen' ? 'active' : ''}`}
                onClick={() => {
                  isScrollingRef.current = true;
                  setActiveTab('data_panen');
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('section-data-panen')?.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => { isScrollingRef.current = false; }, 1000);
                  }, 350);
                }}
              >
                Data Panen
              </span>
              <span
                className={`mobile-nav-item ${activeTab === 'ringkasan' ? 'active' : ''}`}
                onClick={() => {
                  isScrollingRef.current = true;
                  setActiveTab('ringkasan');
                  setShowHistory(true);
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('section-ringkasan')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => { isScrollingRef.current = false; }, 1000);
                  }, 350);
                }}
              >
                Ringkasan
              </span>
            </nav>
          )}
        </div>

        <div className="mobile-sidebar-footer">
          <div className="mobile-profile">
            <div className="avatar-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="mobile-profile-info">
              <span className="mobile-profile-name">{user?.username || user?.name || (isAdmin ? 'Admin' : 'User')}</span>
              <span className="mobile-profile-role">{isAdmin ? 'Administrator' : 'Viewer'}</span>
            </div>
          </div>
          <button className="mobile-logout-btn" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Keluar
          </button>
        </div>
      </div>


      <main className="app-main">
        {/* Admin Mobile Main Content Block (Stats + Add Button) */}
        {isAdmin && (
          <div className="admin-mobile-stats mobile-only">
            <div className="mobile-stats-grid">
              <div className="stats-badge">
                <span className="stats-number">
                  {Math.max(totalBlokGlobal, Object.keys(dataHistory).length) || '-'}
                </span>
                <span className="stats-label">Total Blok</span>
              </div>
              <div className="stats-badge">
                <span className="stats-number">
                  {totalPetakGlobal > 0 ? totalPetakGlobal : '-'}
                </span>
                <span className="stats-label">Total Petak</span>
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={handleOpenCreate}>
              + Tambah Blok
            </button>
          </div>
        )}

        {/* Filter & Tabel Tonase */}
        <div className="section-header">
          <h2 className="section-title">Data Tonase</h2>
          <p className="section-desc">Filter berdasarkan Blok dan Siklus</p>
        </div>
        {/* Panel Filter Dinamis: Dropdown Blok + Siklus */}
        <div id="section-history" className="data-filter-panel">
          <div className="data-filter-header">
            <span className="data-filter-title">Pilih Data Tonase</span>
            {loading && <span className="data-filter-loading">Memuat data...</span>}
          </div>
          <div className="data-filter-body">
            {/* Dropdown Level 1: Blok */}
            <div className="data-filter-group">
              <label className="data-filter-label">Blok</label>
              <div className="data-filter-select-wrap">
                <select
                  className="data-filter-select"
                  value={filterBlok}
                  onChange={(e) => {
                    setFilterBlok(e.target.value);
                    setFilterSiklus('');
                    setTonaseFetched(false);
                  }}
                  disabled={Object.keys(dataHistory).length === 0}
                >
                  <option value="">-- Pilih Blok --</option>
                  {Object.keys(dataHistory).sort().map(blok => (
                    <option key={blok} value={blok}>Blok {blok}</option>
                  ))}
                </select>
                <svg className="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {/* Dropdown Level 2: Siklus (dependen pada Blok) */}
            <div className="data-filter-group">
              <label className="data-filter-label">Siklus</label>
              <div className="data-filter-select-wrap">
                <select
                  className="data-filter-select"
                  value={filterSiklus}
                  onChange={(e) => {
                    setFilterSiklus(e.target.value);
                    setTonaseFetched(false);
                  }}
                  disabled={!filterBlok || !(dataHistory[filterBlok]?.length > 0)}
                >
                  <option value="">
                    {!filterBlok ? '-- Pilih Blok dahulu --' : '-- Pilih Siklus --'}
                  </option>
                  {filterBlok && (dataHistory[filterBlok] || []).map(siklus => (
                    <option key={siklus} value={siklus}>Siklus {siklus}</option>
                  ))}
                </select>
                <svg className="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <button
              className="data-filter-btn"
              onClick={() => {
                if (filterBlok && filterSiklus) loadFromHistory(filterBlok, filterSiklus);
              }}
              disabled={!filterBlok || !filterSiklus || tonaseLoading}
            >
              {tonaseLoading ? 'Memuat...' : 'Tampilkan Data'}
            </button>
          </div>
        </div>

        {/* Summary Cards — muncul setelah data difilter */}
        {tonaseFetched && !tonaseLoading && (
          <div className="tonase-summary-grid">
            <div className="tonase-summary-card">
              <div>
                <span className="summary-label">Blok</span>
                <span className="summary-value">{filterBlok}</span>
              </div>
            </div>
            <div className="tonase-summary-card">
              <div>
                <span className="summary-label">Siklus</span>
                <span className="summary-value">{filterSiklus}</span>
              </div>
            </div>
            <div className="tonase-summary-card">
              <div>
                <span className="summary-label">Total Petak</span>
                <span className="summary-value">{tonaseData.length}</span>
              </div>
            </div>
            <div className="tonase-summary-card">
              <div>
                <span className="summary-label">Total Tonase</span>
                <span className="summary-value">
                  {tonaseData.reduce((s, d) => s + parseFloat(d.tonase || 0), 0)
                    .toLocaleString('id-ID', { minimumFractionDigits: 2 })} kg
                </span>
              </div>
            </div>
            <div className="tonase-summary-card">
              <div>
                <span className="summary-label">Total BS</span>
                <span className="summary-value">
                  {tonaseData.reduce((s, d) => s + parseFloat(d.bs || 0), 0)
                    .toLocaleString('id-ID', { minimumFractionDigits: 2 })} kg
                </span>
              </div>
            </div>
            <div className="tonase-summary-card">
              <div>
                <span className="summary-label">Total LM</span>
                <span className="summary-value">
                  {tonaseData.reduce((s, d) => s + parseFloat(d.lm || 0), 0)
                    .toLocaleString('id-ID', { minimumFractionDigits: 2 })} %
                </span>
              </div>
            </div>
          </div>
        )}


        {/* Charts & Data Area */}
        <div id="section-data-panen">
          {tonaseFetched && !tonaseLoading && filteredData.length > 0 && (
            <TonaseCharts data={filteredData} />
          )}

          {/* Filter Tambahan: Tanggal & Kategori */}
          {tonaseFetched && !tonaseLoading && (
            <div className="tonase-filter-bar tonase-filter-secondary">
              <div className="filter-group">
                <label className="filter-label">Kategori</label>
                <select
                  className="form-select"
                  value={filterKategori}
                  onChange={(e) => setFilterKategori(e.target.value)}
                >
                  <option value="">Semua</option>
                  <option value="PR">Partial</option>
                  <option value="PT">Panen Total</option>
                  <option value="PS">Panen Sisa dari Tandon</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Dari Tanggal</label>
                <input
                  type="date"
                  className="form-input"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label className="filter-label">Sampai Tanggal</label>
                <input
                  type="date"
                  className="form-input"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                />
              </div>
              {(filterKategori || filterDateFrom || filterDateTo) && (
                <button
                  className="btn btn-cancel"
                  onClick={() => {
                    setFilterKategori('');
                    setFilterDateFrom('');
                    setFilterDateTo('');
                  }}
                >
                  Reset Filter
                </button>
              )}
              {isAdmin && (
                <button
                  className="btn btn-delete-siklus"
                  style={{ marginLeft: 'auto' }}
                  onClick={handleDeleteSiklus}
                  title={`Hapus Blok ${filterBlok} Siklus ${filterSiklus} (${tonaseData.length} record)`}
                >
                  Hapus Siklus
                </button>
              )}
            </div>
          )}

          {tonaseFetched &&
            <TonaseTable
              data={filteredData}
              loading={tonaseLoading}
              onEdit={handleEditTonase}
              onDelete={handleDeleteTonase}
              isAdmin={isAdmin}
              activeTab={activeTab}
              filterBlok={filterBlok}
              filterSiklus={filterSiklus}
              onViewChange={(mode) => {
                if (mode === 'card') {
                  setActiveTab('ringkasan');
                  setShowHistory(true);
                } else {
                  setActiveTab('data_panen');
                }
              }}
            />
          }
        </div>
      </main>

      {isAdmin && showForm && (
        <BlokForm initialData={editData} onSave={handleSave} onCancel={handleCloseForm} />
      )}

      {
        editTonase && (
          <EditTonaseModal
            data={editTonase}
            onClose={() => setEditTonase(null)}
            onSaved={() => { setEditTonase(null); ambilTonase(); }}
          />
        )
      }
    </>
  );
}

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/blok/:id" element={user ? <BlokDetail /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { baseUrl, USE_MOCK } from '../config';
import { supabase } from '../supabaseClient';
import galesongLogo from '../assets/galesong.png';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('Username dan Password wajib diisi.');
            return;
        }
        setLoading(true);
        if (USE_MOCK) {
            // Bypass login in mock mode
            const mockUser = { id: 32, username: username || 'admin_mock', role: 1, name: 'Admin Simulasi' };
            login(mockUser);
            navigate('/');
            setLoading(false);
            return;
        }

        try {
            // Attempt Supabase Auth login
            const emailInput = username.includes('@') ? username : `${username}@galesong.com`;
            const { data: supabaseData, error: supabaseError } = await supabase.auth.signInWithPassword({
                email: emailInput,
                password: password,
            });

            if (!supabaseError && supabaseData?.user) {
                // DEBUG: lihat isi metadata dari Supabase
                console.log('=== DEBUG SUPABASE LOGIN ===');
                console.log('user_metadata:', JSON.stringify(supabaseData.user.user_metadata, null, 2));
                console.log('app_metadata:', JSON.stringify(supabaseData.user.app_metadata, null, 2));
                console.log('full user:', JSON.stringify(supabaseData.user, null, 2));

                const rawRole = supabaseData.user.user_metadata?.role ?? supabaseData.user.app_metadata?.role;
                console.log('rawRole:', rawRole, 'type:', typeof rawRole);

                let userRole = (rawRole !== undefined && rawRole !== null) ? rawRole : 0;
                // Jika tidak ada role di metadata tapi email mengandung 'admin', berikan role 1
                if (userRole === 0 && supabaseData.user.email?.toLowerCase().includes('admin')) {
                    userRole = 1;
                }
                
                console.log('userRole final:', userRole);

                const userObj = {
                    id: supabaseData.user.id,
                    email: supabaseData.user.email,
                    username: username,
                    role: userRole,
                    name: supabaseData.user.user_metadata?.name || username,
                };
                console.log('userObj:', JSON.stringify(userObj, null, 2));
                localStorage.setItem('auth_user_type', 'supabase');
                login(userObj);
                navigate('/');
                return;
            }

            // Fallback to legacy REST API backend
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);

            const res = await axios.post(`${baseUrl}/users/login-user`, params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            const data = res.data?.data || res.data;
            if (data) {
                localStorage.setItem('auth_user_type', 'legacy');
                login(data);
                navigate('/');
            } else {
                setError(supabaseError?.message || 'Login gagal. Periksa email/username dan password di Supabase.');
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Login gagal. Periksa username dan password.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* Import Google Fonts - Poppins */}
            {/* Google Fonts - Poppins */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                @keyframes floating {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }

                @keyframes meshGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .antigravity-bg {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Poppins', sans-serif;
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(-45deg, #0f172a, #134e4a, #1e1b4b, #0f172a);
                    background-size: 400% 400%;
                    animation: meshGradient 15s ease infinite;
                    padding: 1rem;
                }

                .glass-card {
                    width: 100%;
                    max-width: 420px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 30px;
                    padding: 2.5rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    animation: floating 4s ease-in-out infinite;
                    color: white;
                }

                .gl-logo-wrap {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 2rem;
                    gap: 0.5rem;
                }

                .gl-logo {
                    max-height: 40px;
                    opacity: 0.9;
                    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
                }

                .gl-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 0.25rem;
                }

                .gl-subtitle {
                    font-size: 0.875rem;
                    text-align: center;
                    color: rgba(153, 246, 245, 0.7);
                    font-weight: 300;
                    margin-bottom: 2rem;
                }

                .gl-field {
                    margin-bottom: 1.5rem;
                }

                .gl-label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    color: rgba(204, 251, 241, 1);
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                }

                .gl-input-wrap {
                    position: relative;
                }

                .gl-input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 0.75rem;
                    padding: 0.75rem 1rem;
                    font-size: 0.925rem;
                    font-family: inherit;
                    color: white;
                    outline: none;
                    transition: all 0.2s;
                }

                .gl-input::placeholder {
                    color: rgba(255, 255, 255, 0.3);
                }

                .gl-input:focus {
                    border-color: #2dd4bf;
                    box-shadow: 0 0 0 1px #2dd4bf;
                }

                .gl-pw-toggle {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: rgba(255, 255, 255, 0.4);
                    display: flex;
                    align-items: center;
                    transition: color 0.2s;
                }

                .gl-pw-toggle:hover {
                    color: white;
                }

                .gl-btn {
                    width: 100%;
                    background: linear-gradient(to right, #14b8a6, #2563eb);
                    padding: 0.75rem;
                    border: none;
                    border-radius: 0.75rem;
                    color: white;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 10px 15px -3px rgba(20, 184, 166, 0.2);
                    transition: all 0.2s;
                }

                .gl-btn:hover:not(:disabled) {
                    background: linear-gradient(to right, #2dd4bf, #3b82f6);
                }

                .gl-btn:active:not(:disabled) {
                    transform: scale(0.95);
                }

                .gl-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .gl-error {
                    background: rgba(239, 68, 68, 0.15);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 0.5rem;
                    padding: 0.75rem;
                    color: #fca5a5;
                    font-size: 0.85rem;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .gl-footer {
                    margin-top: 2rem;
                    text-align: center;
                    font-size: 10px;
                    color: rgba(255, 255, 255, 0.4);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
            `}</style>

            <div className="antigravity-bg">
                <div className="glass-card">
                    {/* Logo & Title */}
                    <div className="gl-logo-wrap">
                        <img src={galesongLogo} alt="Galesong" className="gl-logo" />
                        <h1 className="gl-title">Dashboard Blok</h1>
                        <p className="gl-subtitle">Manajemen Data Blok Panen</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Error Message */}
                        {error && (
                            <div className="gl-error">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                {error}
                            </div>
                        )}

                        {/* Username */}
                        <div className="gl-field">
                            <label className="gl-label">Username</label>
                            <div className="gl-input-wrap">
                                <input
                                    type="text"
                                    className="gl-input"
                                    placeholder="Masukkan username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoFocus
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="gl-field">
                            <label className="gl-label">Password</label>
                            <div className="gl-input-wrap">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="gl-input"
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="gl-pw-toggle"
                                    onClick={() => setShowPassword(v => !v)}
                                    tabIndex={-1}
                                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                >
                                    {showPassword ? (
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="gl-btn" disabled={loading}>
                            {loading ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    <div className="gl-footer">PT Galesong Prima — Sistem Manajemen Tambak</div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;

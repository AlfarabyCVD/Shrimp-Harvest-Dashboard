import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('auth_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [session, setSession] = useState(null);

    useEffect(() => {
        const extractUser = (sbUser) => {
            const rawRole = sbUser.user_metadata?.role ?? sbUser.app_metadata?.role;
            // Jika role tidak diisi di Supabase metadata, default ke 0 (User/Read-only)
            let role = (rawRole !== undefined && rawRole !== null) ? rawRole : 0;
            if (role === 0 && sbUser.email?.toLowerCase().includes('admin')) {
                role = 1;
            }
            return {
                id: sbUser.id,
                email: sbUser.email,
                username: sbUser.user_metadata?.username || sbUser.email?.split('@')[0],
                role: role,
                name: sbUser.user_metadata?.name || sbUser.email,
            };
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                const mappedUser = extractUser(session.user);
                setUser(mappedUser);
                localStorage.setItem('auth_user', JSON.stringify(mappedUser));
            }
        }).catch((err) => {
            console.warn('Supabase getSession error:', err);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session?.user) {
                const mappedUser = extractUser(session.user);
                setUser(mappedUser);
                localStorage.setItem('auth_user', JSON.stringify(mappedUser));
            } else if (!session && localStorage.getItem('auth_user_type') === 'supabase') {
                setUser(null);
                localStorage.removeItem('auth_user');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
        } catch (e) {
            console.warn('Supabase signOut error:', e);
        }
        setUser(null);
        setSession(null);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_user_type');
    };

    // role 1 = admin (bisa tambah/edit/hapus)
    const isAdmin = user?.role === 1 || user?.role === '1' || user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');

    return (
        <AuthContext.Provider value={{ user, session, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}


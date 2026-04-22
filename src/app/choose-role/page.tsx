'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../lib/supabase';
import Link from 'next/link';

export default function ChooseRolePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.replace('/login');
      return;
    }
    setAuthChecked(true);
  }

  async function chooseRole(role: 'artist' | 'organizer') {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          user_type: role,
          updated_at: new Date(),
        })
        .eq('id', user.id);

      if (error) throw error;

      router.push(role === 'artist' ? '/onboarding/artist' : '/onboarding/organizer');

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao escolher tipo');
    } finally {
      setLoading(false);
    }
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
      <div className="max-w-4xl w-full">

        <div className="text-center mb-16">
          <Link href="/" className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em]">— DANCEHUB</Link>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mt-6 mb-4">
            ESCOLHE O TEU<br />
            <span className="text-yellow-400">PAPEL.</span>
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest">Como queres participar na cena?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10">
          {/* ARTISTA */}
          <div className="p-10">
            <div className="text-6xl font-black text-white/10 mb-4 leading-none">01</div>
            <h2 className="text-3xl font-black text-yellow-400 uppercase tracking-widest mb-3">Artista</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Queres dar workshops, participar em battles, mostrar a tua arte e conectar com outros dancers.
            </p>
            <ul className="text-sm text-gray-400 mb-8 space-y-3">
              {[
                'Criar perfil de artista',
                'Definir preços e estilos',
                'Participar em battles',
                'Ser descoberto pela comunidade',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-yellow-400 font-black mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => chooseRole('artist')}
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-4 font-black text-sm uppercase tracking-widest hover:bg-yellow-300 transition-all disabled:opacity-60"
            >
              {loading ? 'A processar...' : 'Sou Artista →'}
            </button>
          </div>

          {/* ORGANIZADOR */}
          <div className="p-10">
            <div className="text-6xl font-black text-white/10 mb-4 leading-none">02</div>
            <h2 className="text-3xl font-black text-yellow-400 uppercase tracking-widest mb-3">Organizador</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Queres criar eventos, battles, workshops e gerir a cena na tua cidade.
            </p>
            <ul className="text-sm text-gray-400 mb-8 space-y-3">
              {[
                'Criar eventos e battles',
                'Gerir inscrições',
                'Promover workshops',
                'Conectar com artistas',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-yellow-400 font-black mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => chooseRole('organizer')}
              disabled={loading}
              className="w-full border border-white/30 text-white py-4 font-black text-sm uppercase tracking-widest hover:border-white transition-all disabled:opacity-60"
            >
              {loading ? 'A processar...' : 'Sou Organizador →'}
            </button>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/feed"
            className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
          >
            Por agora quero só ver eventos →
          </Link>
        </div>
      </div>
    </div>
  );
}

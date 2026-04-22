'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../../lib/supabase';
import { DISTRITOS_PORTUGAL } from '../../../lib/constants';

export default function OrganizerOnboarding() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('Lisboa');
  const [organizacao, setOrganizacao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [website, setWebsite] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) router.push('/login');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Sem user');

      let avatarUrl = '';

      if (file) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        avatarUrl = publicUrl;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          artistic_name: nome,
          current_location: cidade,
          avatar_url: avatarUrl,
          is_freelancer: false,
          user_type: 'organizer',
          updated_at: new Date(),
        });

      if (profileError) throw profileError;

      const { error: organizerError } = await supabase
        .from('organizers')
        .insert({
          profile_id: user.id,
          organization_name: organizacao,
          phone: telefone,
          website,
          verified: false,
        });

      if (organizerError) throw organizerError;

      router.push('/feed');

    } catch (err: any) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
      <div className="max-w-md w-full border border-white/10 p-10">
        <div className="text-center mb-10">
          <span className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em]">— Passo 1 de 1</span>
          <h2 className="text-3xl font-black uppercase tracking-tight mt-4">
            PERFIL DE<br />
            <span className="text-yellow-400">ORGANIZADOR.</span>
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-3">Cria e gere eventos na cena</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <label className="cursor-pointer group">
              <div className="w-28 h-28 bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden group-hover:border-yellow-400 transition-all">
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest text-center p-2">Upload<br />Logo</span>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>

          <div>
            <label className="block text-[10px] font-black text-yellow-400 uppercase tracking-[0.25em] mb-2">Nome / Crew</label>
            <input
              type="text" required value={nome}
              className="w-full p-4 bg-white/5 border border-white/10 outline-none focus:border-yellow-400 text-white placeholder:text-gray-600"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-yellow-400 uppercase tracking-[0.25em] mb-2">Distrito</label>
            <select
              value={cidade}
              className="w-full p-4 bg-white/5 border border-white/10 outline-none focus:border-yellow-400 text-white"
              onChange={(e) => setCidade(e.target.value)}
            >
              {DISTRITOS_PORTUGAL.map(d => (
                <option key={d} value={d} className="bg-black">{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-yellow-400 uppercase tracking-[0.25em] mb-2">Nome da Organização (opcional)</label>
            <input
              type="text" value={organizacao}
              className="w-full p-4 bg-white/5 border border-white/10 outline-none focus:border-yellow-400 text-white placeholder:text-gray-600"
              onChange={(e) => setOrganizacao(e.target.value)}
              placeholder="Ex: Breaking Lx"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-yellow-400 uppercase tracking-[0.25em] mb-2">Telefone (opcional)</label>
            <input
              type="tel" value={telefone}
              className="w-full p-4 bg-white/5 border border-white/10 outline-none focus:border-yellow-400 text-white placeholder:text-gray-600"
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="912345678"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-yellow-400 uppercase tracking-[0.25em] mb-2">Website (opcional)</label>
            <input
              type="url" value={website}
              className="w-full p-4 bg-white/5 border border-white/10 outline-none focus:border-yellow-400 text-white placeholder:text-gray-600"
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-yellow-400 text-black py-4 font-black text-base uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-60 transition-all"
          >
            {loading ? 'A GUARDAR...' : 'TORNAR-ME ORGANIZADOR →'}
          </button>

          {errorMsg && (
            <p className="text-red-400 text-xs font-black text-center uppercase tracking-widest">— {errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}

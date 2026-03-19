'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../../lib/supabase';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'battle',
    event_date: '',
    event_time: '',
    location: '',
    price: '0',
    max_participants: '',
  });

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace('/login'); return; }

    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    if (profile?.user_type !== 'organizer') {
      router.replace('/feed');
      return;
    }

    setAuthChecked(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Combinar data e hora
      const eventDatetime = formData.event_time
        ? `${formData.event_date}T${formData.event_time}:00`
        : `${formData.event_date}T00:00:00`;

      const { data, error } = await supabase
        .from('events')
        .insert({
          creator_id:       user.id,
          title:            formData.title,
          description:      formData.description,
          event_type:       formData.event_type,
          event_date:       eventDatetime,
          location:         formData.location,
          price:            parseFloat(formData.price) || 0,
          max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        })
        .select()
        .single();

      if (error) throw error;

      router.push(`/events/${data.id}`);

    } catch (err: any) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="mb-8">
            <span className="text-4xl">🎪</span>
            <h1 className="text-3xl font-black text-gray-900 mt-2">Criar Evento</h1>
            <p className="text-gray-500 mt-1">Preenche os detalhes do teu evento</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Título */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Nome do Evento *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Lisboa B-Boy Session 2025"
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Tipo de Evento *
              </label>
              <select
                name="event_type"
                value={formData.event_type}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black"
              >
                <option value="battle">⚔️ Battle</option>
                <option value="workshop">📚 Workshop</option>
                <option value="cypher">🔄 Cypher</option>
                <option value="jam">🎶 Jam</option>
                <option value="other">📌 Outro</option>
              </select>
            </div>

            {/* Data e Hora */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Data *
                </label>
                <input
                  type="date"
                  name="event_date"
                  required
                  value={formData.event_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Hora
                </label>
                <input
                  type="time"
                  name="event_time"
                  value={formData.event_time}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black"
                />
              </div>
            </div>

            {/* Localização */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Localização *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: Lisboa, Pavilhão Carlos Lopes"
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreve o evento, categorias, regras..."
                rows={4}
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black resize-none"
              />
            </div>

            {/* Preço e Vagas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Preço (€)
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.5"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black"
                />
                <p className="text-xs text-gray-400 mt-1">0 = gratuito</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Nº máx. participantes
                </label>
                <input
                  type="number"
                  name="max_participants"
                  min="1"
                  value={formData.max_participants}
                  onChange={handleChange}
                  placeholder="Sem limite"
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm font-bold text-center">❌ {errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-purple-700 disabled:opacity-60 transition-all"
            >
              {loading ? 'A CRIAR...' : 'CRIAR EVENTO'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

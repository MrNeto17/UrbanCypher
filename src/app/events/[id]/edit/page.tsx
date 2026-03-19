'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import supabase from '../../../../lib/supabase';
import Link from 'next/link';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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
    loadEvent();
  }, [params.id]);

  async function loadEvent() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace('/login'); return; }

      const { data: event, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      // Só o criador pode editar
      if (event.creator_id !== user.id) {
        router.replace('/events');
        return;
      }

      const date = new Date(event.event_date);
      const dateStr = date.toISOString().split('T')[0];
      const timeStr = date.toTimeString().slice(0, 5);

      setFormData({
        title:            event.title || '',
        description:      event.description || '',
        event_type:       event.event_type || 'battle',
        event_date:       dateStr,
        event_time:       timeStr,
        location:         event.location || '',
        price:            String(event.price ?? 0),
        max_participants: event.max_participants ? String(event.max_participants) : '',
      });

    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const eventDatetime = formData.event_time
        ? `${formData.event_date}T${formData.event_time}:00`
        : `${formData.event_date}T00:00:00`;

      const { error } = await supabase
        .from('events')
        .update({
          title:            formData.title,
          description:      formData.description,
          event_type:       formData.event_type,
          event_date:       eventDatetime,
          location:         formData.location,
          price:            parseFloat(formData.price) || 0,
          max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
          updated_at:       new Date(),
        })
        .eq('id', params.id);

      if (error) throw error;
      router.push(`/events/${params.id}`);

    } catch (err: any) {
      setErrorMsg(err.message);
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', params.id);

      if (error) throw error;
      router.push('/events');

    } catch (err: any) {
      setErrorMsg(err.message);
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  if (loading) {
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

          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Editar Evento</h1>
              <p className="text-gray-500 mt-1">Atualiza os detalhes do teu evento</p>
            </div>
            <Link href={`/events/${params.id}`} className="text-gray-400 hover:text-gray-600 font-bold text-sm">
              ← Voltar
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Evento *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange}
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tipo *</label>
              <select name="event_type" value={formData.event_type} onChange={handleChange}
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black">
                <option value="battle">⚔️ Battle</option>
                <option value="workshop">📚 Workshop</option>
                <option value="cypher">🔄 Cypher</option>
                <option value="jam">🎶 Jam</option>
                <option value="other">📌 Outro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Data *</label>
                <input type="date" name="event_date" required value={formData.event_date} onChange={handleChange}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Hora</label>
                <input type="time" name="event_time" value={formData.event_time} onChange={handleChange}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Localização *</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange}
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Preço (€)</label>
                <input type="number" name="price" min="0" step="0.5" value={formData.price} onChange={handleChange}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Máx. participantes</label>
                <input type="number" name="max_participants" min="1" value={formData.max_participants} onChange={handleChange}
                  placeholder="Sem limite"
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-black" />
              </div>
            </div>

            {errorMsg && <p className="text-red-500 text-sm font-bold text-center">❌ {errorMsg}</p>}

            <button type="submit" disabled={saving}
              className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-purple-700 disabled:opacity-60 transition-all">
              {saving ? 'A GUARDAR...' : 'GUARDAR ALTERAÇÕES'}
            </button>
          </form>

          {/* Zona de perigo */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Zona de Perigo</h3>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full border-2 border-red-200 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 transition-all"
              >
                🗑️ Apagar Evento
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <p className="font-bold text-red-700 mb-1">Tens a certeza?</p>
                <p className="text-sm text-red-500 mb-4">Esta ação não pode ser desfeita.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-white border border-gray-200 text-gray-600 py-2.5 rounded-xl font-bold hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-bold hover:bg-red-600 disabled:opacity-60"
                  >
                    {deleting ? 'A apagar...' : 'Apagar'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

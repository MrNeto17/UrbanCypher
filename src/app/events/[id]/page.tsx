'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import supabase from '../../../lib/supabase';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  event_type: string;
  price: number;
  max_participants: number | null;
  creator_id: string;
};

type EventRole = {
  id: string;
  role: string;
  notes: string | null;
  profile: {
    id: string;
    artistic_name: string;
    avatar_url: string;
    current_location: string;
  };
};

const EVENT_TYPE_CONFIG: Record<string, { emoji: string; label: string; color: string }> = {
  battle:   { emoji: '⚔️', label: 'Battle',   color: 'bg-red-100 text-red-700' },
  workshop: { emoji: '📚', label: 'Workshop', color: 'bg-green-100 text-green-700' },
  cypher:   { emoji: '🔄', label: 'Cypher',   color: 'bg-yellow-100 text-yellow-700' },
  jam:      { emoji: '🎶', label: 'Jam',      color: 'bg-blue-100 text-blue-700' },
  other:    { emoji: '📌', label: 'Outro',    color: 'bg-gray-100 text-gray-600' },
};

const ROLE_CONFIG: Record<string, { emoji: string; label: string }> = {
  winner:      { emoji: '🏆', label: 'Vencedor' },
  top3:        { emoji: '🥉', label: 'Top 3' },
  host:        { emoji: '🎤', label: 'Host' },
  judge:       { emoji: '⚖️', label: 'Jurado' },
  dj:          { emoji: '🎧', label: 'DJ' },
  mc:          { emoji: '🎙️', label: 'MC' },
  participant: { emoji: '🕺', label: 'Participante' },
};

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [roles, setRoles] = useState<EventRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    loadEvent();
  }, [params.id]);

  async function loadEvent() {
    try {
      // Obter user atual (pode ser null se não autenticado)
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id ?? null);

      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', params.id)
        .single();

      if (eventError) throw eventError;
      setEvent(eventData);

      const { data: rolesData } = await supabase
        .from('event_roles')
        .select(`
          id, role, notes,
          profile:profiles (id, artistic_name, avatar_url, current_location)
        `)
        .eq('event_id', params.id);

      setRoles((rolesData as any) || []);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Evento não encontrado</p>
          <Link href="/events" className="text-indigo-600 font-bold">← Voltar aos eventos</Link>
        </div>
      </div>
    );
  }

  const typeConfig = EVENT_TYPE_CONFIG[event.event_type] ?? EVENT_TYPE_CONFIG.other;
  const eventDate = new Date(event.event_date);
  const isPast = eventDate < new Date();
  const isCreator = currentUserId === event.creator_id;

  const grouped = roles.reduce((acc, r) => {
    if (!acc[r.role]) acc[r.role] = [];
    acc[r.role].push(r);
    return acc;
  }, {} as Record<string, EventRole[]>);

  const roleOrder = ['winner', 'top3', 'judge', 'host', 'dj', 'mc', 'participant'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link href="/events" className="text-sm text-gray-500 hover:text-indigo-600 font-bold">
            ← Todos os eventos
          </Link>
          {isCreator && (
            <Link
              href={`/events/${event.id}/edit`}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl transition-all"
            >
              ✏️ Editar
            </Link>
          )}
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className={`p-8 ${isPast ? 'bg-gray-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
            <div className="flex items-start gap-3 mb-3 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">
                {typeConfig.emoji} {typeConfig.label}
              </span>
              {isPast && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">
                  Terminado
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-white">{event.title}</h1>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Data</p>
                <p className="font-black text-gray-900">
                  {eventDate.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-sm text-gray-500">
                  {eventDate.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Local</p>
                <p className="font-black text-gray-900">{event.location}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Entrada</p>
                <p className="font-black text-gray-900 text-xl">
                  {event.price === 0 ? 'Gratuito' : `${event.price}€`}
                </p>
                {event.max_participants && (
                  <p className="text-xs text-gray-500 mt-1">Máx. {event.max_participants} participantes</p>
                )}
              </div>
            </div>

            {event.description && (
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase mb-2">Sobre o Evento</h2>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Pessoas ligadas ao evento */}
        {roles.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              {isPast ? 'Quem esteve presente' : 'Quem vai estar presente'}
            </h2>
            <div className="space-y-6">
              {roleOrder
                .filter(role => grouped[role]?.length > 0)
                .map(role => (
                  <div key={role}>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">
                      {ROLE_CONFIG[role]?.emoji} {ROLE_CONFIG[role]?.label}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {grouped[role].map(er => (
                        <Link
                          key={er.id}
                          href={`/profile/${er.profile.id}`}
                          className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all"
                        >
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600 flex-shrink-0">
                            {er.profile.avatar_url ? (
                              <img src={er.profile.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              er.profile.artistic_name?.charAt(0) || '?'
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate">{er.profile.artistic_name}</p>
                            {er.notes && <p className="text-xs text-gray-500 truncate">{er.notes}</p>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Sem pessoas ainda */}
        {roles.length === 0 && !isPast && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-400 text-sm">Ainda não há jurados, hosts ou participantes registados.</p>
          </div>
        )}

      </div>
    </div>
  );
}

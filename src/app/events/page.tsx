'use client';

import { useState, useEffect } from 'react';
import supabase from '../../lib/supabase';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  event_type: string;
  price?: number;
  organizer_id?: string;
};

const EVENT_TYPE_STYLES: Record<string, { label: string; color: string }> = {
  battle:    { label: 'Battle',    color: 'bg-red-100 text-red-700' },
  workshop:  { label: 'Workshop',  color: 'bg-green-100 text-green-700' },
  showcase:  { label: 'Showcase',  color: 'bg-purple-100 text-purple-700' },
  cypher:    { label: 'Cypher',    color: 'bg-yellow-100 text-yellow-700' },
};

function EventTypeTag({ type }: { type: string }) {
  const style = EVENT_TYPE_STYLES[type?.toLowerCase()] ?? { label: type, color: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${style.color}`}>
      {style.label}
    </span>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
  const weekday = date.toLocaleDateString('pt-PT', { weekday: 'short' });
  const time = date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  return { day, weekday, time };
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    setEvents(data || []);
    setLoading(false);
  }

  const tiposDisponiveis = ['Todos', ...Array.from(new Set(events.map(e => e.event_type).filter(Boolean)))];

  const eventosFiltrados = filtro === 'Todos'
    ? events
    : events.filter(e => e.event_type?.toLowerCase() === filtro.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/feed" className="text-2xl font-black text-indigo-900">DANCEHUB</Link>
          <div className="flex items-center gap-4">
            <Link href="/artists" className="text-gray-600 hover:text-indigo-600 font-bold">Artistas</Link>
            <Link href="/events" className="text-indigo-600 font-bold">Eventos</Link>
            <Link href="/profile/me" className="text-gray-600 hover:text-indigo-600 font-bold">Perfil</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Título + filtros */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-indigo-900 mb-2">EVENTOS</h1>
          <p className="text-gray-500 mb-6">Battles, workshops e showcases perto de ti.</p>

          <div className="flex flex-wrap gap-3">
            {tiposDisponiveis.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltro(tipo)}
                className={`px-5 py-2 rounded-full font-semibold capitalize transition-all text-sm ${
                  filtro === tipo
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-indigo-600 animate-pulse font-bold text-xl">
            A carregar eventos...
          </div>
        ) : eventosFiltrados.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Ainda não há eventos nesta categoria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosFiltrados.map((event) => {
              const { day, weekday, time } = formatDate(event.event_date);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col"
                >
                  {/* Data destaque */}
                  <div className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase opacity-75 capitalize">{weekday}</p>
                      <p className="text-2xl font-black capitalize">{day}</p>
                    </div>
                    {event.event_type && <EventTypeTag type={event.event_type} />}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-xl font-black text-gray-900 mb-2">{event.title}</h2>

                    {event.description && (
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>
                    )}

                    <div className="mt-auto space-y-2">
                      {event.location && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          📍 <span>{event.location}</span>
                        </p>
                      )}
                      {event.event_date && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          🕐 <span>{time}</span>
                        </p>
                      )}
                      {event.price !== undefined && event.price !== null && (
                        <p className="text-sm font-bold text-indigo-600 flex items-center gap-2">
                          💶 <span>{event.price === 0 ? 'Gratuito' : `${event.price}€`}</span>
                        </p>
                      )}
                    </div>

                    <button className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors text-sm">
                      VER DETALHES
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

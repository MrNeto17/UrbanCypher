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
  price: number;
};

const EVENT_TYPE_STYLES: Record<string, { label: string; color: string }> = {
  battle:   { label: 'Battle',   color: 'bg-red-100 text-red-700' },
  workshop: { label: 'Workshop', color: 'bg-green-100 text-green-700' },
  cypher:   { label: 'Cypher',   color: 'bg-yellow-100 text-yellow-700' },
  jam:      { label: 'Jam',      color: 'bg-blue-100 text-blue-700' },
  other:    { label: 'Outro',    color: 'bg-gray-100 text-gray-600' },
};

function EventTypeTag({ type }: { type: string }) {
  const style = EVENT_TYPE_STYLES[type?.toLowerCase()] ?? { label: type, color: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${style.color}`}>
      {style.label}
    </span>
  );
}

function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
  const date = new Date(event.event_date);
  const day = date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
  const weekday = date.toLocaleDateString('pt-PT', { weekday: 'short' });
  const time = date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

  return (
    <Link href={`/events/${event.id}`} className="block group">
      <div className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-xl transition-all flex flex-col h-full ${past ? 'opacity-60' : ''}`}>
        <div className={`px-6 py-4 flex items-center justify-between ${past ? 'bg-gray-400' : 'bg-indigo-600'}`}>
          <div className="text-white">
            <p className="text-xs font-bold uppercase opacity-75 capitalize">{weekday}</p>
            <p className="text-2xl font-black capitalize">{day}</p>
          </div>
          {event.event_type && <EventTypeTag type={event.event_type} />}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-xl font-black text-gray-900 mb-2">{event.title}</h2>
          {event.description && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>
          )}
          <div className="mt-auto space-y-1.5">
            {event.location && <p className="text-sm text-gray-600">📍 {event.location}</p>}
            <p className="text-sm text-gray-600">🕐 {time}</p>
            {event.price !== undefined && (
              <p className="text-sm font-bold text-indigo-600">
                💶 {event.price === 0 ? 'Gratuito' : `${event.price}€`}
              </p>
            )}
          </div>
          <div className={`mt-5 w-full py-3 rounded-xl font-bold text-sm text-center transition-colors ${
            past
              ? 'bg-gray-100 text-gray-500'
              : 'bg-gray-900 text-white group-hover:bg-indigo-600'
          }`}>
            {past ? 'VER RESULTADOS' : 'VER DETALHES'}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('Todos');
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });
    setAllEvents(data || []);
    setLoading(false);
  }

  const now = new Date();
  const upcoming = allEvents.filter(e => new Date(e.event_date) >= now);
  const past = [...allEvents.filter(e => new Date(e.event_date) < now)].reverse();
  const activeList = tab === 'upcoming' ? upcoming : past;
  const tipos = ['Todos', ...Array.from(new Set(allEvents.map(e => e.event_type).filter(Boolean)))];
  const filtered = filtro === 'Todos'
    ? activeList
    : activeList.filter(e => e.event_type?.toLowerCase() === filtro.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-5xl font-black text-indigo-900 mb-2">EVENTOS</h1>
          <p className="text-gray-500">Battles, workshops e cyphers por todo o país.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              tab === 'upcoming'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Próximos {upcoming.length > 0 && `(${upcoming.length})`}
          </button>
          <button
            onClick={() => setTab('past')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              tab === 'past'
                ? 'bg-gray-700 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Passados {past.length > 0 && `(${past.length})`}
          </button>
        </div>

        {/* Filtro por tipo */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tipos.map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={`px-4 py-1.5 rounded-full font-semibold capitalize text-sm transition-all ${
                filtro === tipo
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-indigo-600 animate-pulse font-bold text-xl">
            A carregar eventos...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            {tab === 'upcoming'
              ? 'Não há eventos próximos nesta categoria.'
              : 'Não há eventos passados nesta categoria.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} past={tab === 'past'} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

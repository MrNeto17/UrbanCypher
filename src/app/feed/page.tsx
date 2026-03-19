'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../lib/supabase';
import Link from 'next/link';

type Profile = {
  id: string;
  artistic_name: string;
  current_location: string;
  bio: string;
  avatar_url: string;
  is_freelancer: boolean;
  user_type: 'user' | 'artist' | 'organizer';
};

type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  event_type: string;
};

export default function FeedPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [artists, setArtists] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedData();
  }, []);

  async function loadFeedData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) setProfile(profileData);

      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(5);

      setEvents(eventsData || []);

      const { data: artistsData } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_freelancer', true)
        .limit(5);

      setArtists(artistsData || []);

    } catch (error) {
      console.error('Erro a carregar feed:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Boas-vindas */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-3xl font-black text-gray-900">
            Bem-vindo{profile?.artistic_name ? `, ${profile.artistic_name}` : ''}! 👋
          </h2>
          <p className="text-gray-600 mt-2">
            {!profile
              ? 'Ainda não tens perfil. Escolhe o teu papel para começar.'
              : 'O que vamos fazer hoje?'}
          </p>
          {profile?.user_type === 'user' && (
            <Link
              href="/choose-role"
              className="inline-block mt-4 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all"
            >
              Tornar-me Artista ou Organizador →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Próximos Eventos */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Próximos Eventos</h3>
              <Link href="/events" className="text-indigo-600 text-sm font-bold hover:underline">
                Ver todos →
              </Link>
            </div>

            {events.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Ainda não há eventos</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="block border-b border-gray-100 pb-4 last:border-0 hover:opacity-75 transition-opacity"
                  >
                    <h4 className="font-bold text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.event_date).toLocaleDateString('pt-PT')} · {event.location}
                    </p>
                    {event.event_type && (
                      <span className="inline-block mt-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                        {event.event_type}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Artistas */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Artistas</h3>
              <Link href="/artists" className="text-indigo-600 text-sm font-bold hover:underline">
                Ver todos →
              </Link>
            </div>

            {artists.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Ainda não há artistas</p>
            ) : (
              <div className="space-y-4">
                {artists.map((artist) => (
                  <Link
                    key={artist.id}
                    href={`/profile/${artist.id}`}
                    className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-0 hover:opacity-75 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-xl font-bold text-indigo-600 overflow-hidden flex-shrink-0">
                      {artist.avatar_url
                        ? <img src={artist.avatar_url} alt="" className="w-full h-full object-cover" />
                        : artist.artistic_name?.charAt(0) || '?'
                      }
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{artist.artistic_name || 'Sem nome'}</h4>
                      <p className="text-sm text-gray-600">{artist.current_location || 'Local desconhecido'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

// VARIANTE C — MOVIMENTO
// Escuro quente + âmbar, energia de crew/comunidade, mais dinâmico
export default function PreviewC() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0C0900', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6">
        <span className="text-2xl font-black tracking-tight" style={{ color: '#F59E0B' }}>DANCEHUB</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="font-bold text-sm transition-colors" style={{ color: '#78716C' }}>
            Entrar
          </Link>
          <Link
            href="/register"
            className="text-black px-5 py-2.5 rounded-full font-black text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: '#F59E0B' }}
          >
            Registar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 pt-12 pb-24">
        <div className="max-w-5xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-10 border"
            style={{ borderColor: '#F59E0B33', color: '#F59E0B', backgroundColor: '#F59E0B11' }}>
            PT — Cena Urbana Portuguesa
          </div>

          {/* Título assimétrico */}
          <div className="mb-8">
            <h1 className="font-black leading-none tracking-tight" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}>
              A CENA
            </h1>
            <div className="flex items-end gap-6">
              <h1 className="font-black leading-none tracking-tight" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', color: '#F59E0B' }}>
                TODA
              </h1>
              <span className="text-2xl font-bold mb-4 pb-2" style={{ color: '#57534E' }}>
                battles · workshops · artistas
              </span>
            </div>
            <h1 className="font-black leading-none tracking-tight" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}>
              NUM SÓ LUGAR.
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              href="/register"
              className="text-black px-8 py-4 rounded-full font-black text-base transition-all hover:opacity-90"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Entrar na Cena →
            </Link>
            <Link
              href="/events"
              className="border text-white px-8 py-4 rounded-full font-black text-base transition-all"
              style={{ borderColor: '#44403C', color: '#A8A29E' }}
            >
              Ver Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Divider com texto */}
      <div className="border-t border-b px-6 md:px-12 py-6 flex flex-wrap gap-8 md:gap-16 text-xs font-black uppercase tracking-[0.2em]"
        style={{ borderColor: '#1C1A14', color: '#44403C' }}>
        <span>Breakdance</span>
        <span>Hip-Hop</span>
        <span>Locking</span>
        <span>Popping</span>
        <span>Waacking</span>
        <span>Vogue</span>
        <span>House</span>
        <span>Krump</span>
      </div>

      {/* Stats */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Artistas', sub: 'Com perfis profissionais na plataforma' },
            { label: 'Battles & Eventos', sub: 'Espalhados por todo o país' },
            { label: 'Marcos de Carreira', sub: 'Registados e reconhecidos' },
          ].map((s, i) => (
            <div key={s.label} className="rounded-2xl p-6" style={{ backgroundColor: '#141108', border: '1px solid #1C1A14' }}>
              <div className="text-xs font-black mb-3 tracking-widest" style={{ color: '#F59E0B' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-xl font-black text-white mb-1">{s.label}</div>
              <div className="text-sm" style={{ color: '#57534E' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-white">Para quem é?</h2>
            <p className="mt-2 text-sm" style={{ color: '#57534E' }}>Uma plataforma pensada para toda a cena.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Artistas',
                desc: 'Cria o teu perfil profissional, regista a tua carreira e sê descoberto.',
                items: [
                  'Perfil com bio e contactos',
                  'Historial de battles e workshops',
                  'Sê descoberto por organizadores',
                ],
                highlight: true,
              },
              {
                title: 'Organizadores',
                desc: 'Gere eventos, equipas e toda a logística num só lugar.',
                items: [
                  'Cria e gere eventos facilmente',
                  'Define preços e datas',
                  'Liga jurados, hosts e DJs',
                ],
                highlight: false,
              },
              {
                title: 'Público',
                desc: 'Descobre o que está a acontecer na cena urbana perto de ti.',
                items: [
                  'Eventos na tua cidade',
                  'Segue os teus artistas',
                  'Faz parte da cena PT',
                ],
                highlight: false,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: card.highlight ? '#1A1400' : '#141108',
                  border: card.highlight ? '1px solid #F59E0B44' : '1px solid #1C1A14',
                }}
              >
                <h3 className="text-xl font-black mb-2" style={{ color: card.highlight ? '#F59E0B' : 'white' }}>
                  {card.title}
                </h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#57534E' }}>{card.desc}</p>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#A8A29E' }}>
                      <span style={{ color: '#F59E0B' }} className="mt-0.5 font-black">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-12 md:p-16 text-center" style={{ backgroundColor: '#1A1400', border: '1px solid #F59E0B33' }}>
            <div className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#F59E0B' }}>
              Junta-te à comunidade
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Pronto para entrar?
            </h2>
            <p className="mb-8 text-base" style={{ color: '#57534E' }}>
              Regista-te grátis e começa a construir o teu nome na cena.
            </p>
            <Link
              href="/register"
              className="inline-block text-black px-10 py-4 rounded-full font-black text-base transition-all hover:opacity-90"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 md:px-12 py-8" style={{ borderColor: '#1C1A14' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-black text-lg" style={{ color: '#F59E0B' }}>DANCEHUB</span>
          <p className="text-xs" style={{ color: '#44403C' }}>
            Feito para a cena urbana portuguesa
          </p>
          <div className="flex gap-6">
            {[['Artistas', '/artists'], ['Eventos', '/events'], ['Entrar', '/login']].map(([l, h]) => (
              <Link key={l} href={h} className="text-xs font-bold transition-colors" style={{ color: '#44403C' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}

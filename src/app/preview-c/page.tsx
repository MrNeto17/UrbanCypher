import Link from 'next/link';

// VARIANTE B — CULTURA
// Preto + vermelho, layout editorial estilo revista urbana (Hypebeast / Highsnobiety)
export default function PreviewB() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden" style={{ fontFamily: 'Georgia, serif' }}>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 border-b border-zinc-800">
        <span className="text-xl font-black tracking-tight text-white uppercase" style={{ fontFamily: 'Arial Black, Arial, sans-serif', letterSpacing: '0.05em' }}>
          DANCE<span className="text-red-500">HUB</span>
        </span>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest" style={{ fontFamily: 'Arial, sans-serif' }}>
            Entrar
          </Link>
          <Link
            href="/register"
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 font-bold text-xs uppercase tracking-widest transition-all"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Registar
          </Link>
        </div>
      </nav>

      {/* Hero — editorial split layout */}
      <section className="px-6 md:px-16 pt-16 pb-20 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto">
          {/* Overline */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-px bg-red-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-red-500" style={{ fontFamily: 'Arial, sans-serif' }}>
              Plataforma da cena urbana portuguesa
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-end">
            {/* Título */}
            <div>
              <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight uppercase mb-0"
                style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                A CENA<br />
                <span className="text-red-500">TODA</span><br />
                NUM SÓ<br />
                LUGAR.
              </h1>
            </div>

            {/* Texto + CTAs */}
            <div className="pb-2">
              <div className="border-t border-zinc-700 pt-6 mb-8">
                <p className="text-zinc-400 text-base leading-relaxed mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Battles, workshops, perfis de artistas, marcos de carreira.
                </p>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Tudo o que a cena urbana portuguesa precisava — finalmente junto.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/register"
                  className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 font-black text-sm uppercase tracking-widest transition-all text-center"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Entrar na Cena →
                </Link>
                <Link
                  href="/events"
                  className="text-center border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white px-8 py-4 font-bold text-sm uppercase tracking-widest transition-all"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Ver Eventos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — horizontal com números editoriais */}
      <section className="px-6 md:px-16 py-12 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x divide-zinc-800">
          {[
            { num: '01', label: 'Artistas', sub: 'Perfis profissionais' },
            { num: '02', label: 'Battles & Eventos', sub: 'Por todo o país' },
            { num: '03', label: 'Marcos', sub: 'Registados na plataforma' },
          ].map((s) => (
            <div key={s.label} className="px-8 first:pl-0 last:pr-0 flex gap-4 items-start">
              <span className="text-red-500 text-xs font-black mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>{s.num}</span>
              <div>
                <div className="text-white font-black text-sm uppercase tracking-wide" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>{s.label}</div>
                <div className="text-zinc-600 text-xs mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features — lista editorial */}
      <section className="px-6 md:px-16 py-20 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Para quem</p>
              <h2 className="text-3xl font-black leading-tight" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>É para todos<br />na cena.</h2>
            </div>
            <div className="md:col-span-3 grid md:grid-cols-3 gap-px bg-zinc-800">
              {[
                {
                  num: '01',
                  title: 'Artistas',
                  items: [
                    'Perfil profissional com bio e contactos',
                    'Historial de battles, vitórias e workshops',
                    'Sê descoberto por organizadores',
                  ],
                },
                {
                  num: '02',
                  title: 'Organizadores',
                  items: [
                    'Cria e gere eventos facilmente',
                    'Define preços, datas e localização',
                    'Liga jurados, hosts e DJs',
                  ],
                },
                {
                  num: '03',
                  title: 'Público',
                  items: [
                    'Descobre eventos na tua cidade',
                    'Segue os teus artistas favoritos',
                    'Fica a par da cena urbana PT',
                  ],
                },
              ].map((card) => (
                <div key={card.title} className="bg-zinc-950 p-8">
                  <div className="text-red-500 text-xs font-black mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>{card.num}</div>
                  <h3 className="text-lg font-black uppercase tracking-wide mb-6 text-white" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>{card.title}</h3>
                  <ul className="space-y-4">
                    {card.items.map((item) => (
                      <li key={item} className="text-zinc-500 text-sm leading-relaxed border-t border-zinc-800 pt-4 first:border-0 first:pt-0" style={{ fontFamily: 'Georgia, serif' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="border border-zinc-800 p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-red-500 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Começa agora</p>
              <h2 className="text-4xl md:text-6xl font-black leading-none" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
                Pronto para<br />
                entrar na cena?
              </h2>
            </div>
            <div className="min-w-fit">
              <p className="text-zinc-500 text-sm mb-6 max-w-xs" style={{ fontFamily: 'Georgia, serif' }}>
                Regista-te grátis e começa a construir o teu nome na cena.
              </p>
              <Link
                href="/register"
                className="inline-block bg-red-600 hover:bg-red-500 text-white px-10 py-4 font-black text-sm uppercase tracking-widest transition-all"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Criar Conta Grátis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-black text-white" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
            DANCE<span className="text-red-500">HUB</span>
          </span>
          <p className="text-zinc-700 text-xs uppercase tracking-widest" style={{ fontFamily: 'Arial, sans-serif' }}>
            Feito para a cena urbana portuguesa
          </p>
          <div className="flex gap-6">
            {['Artistas', 'Eventos', 'Entrar'].map((l) => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="text-zinc-700 hover:text-zinc-400 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'Arial, sans-serif' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}

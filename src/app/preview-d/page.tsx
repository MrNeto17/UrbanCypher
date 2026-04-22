import Link from 'next/link';

// VARIANTE D — UNDERGROUND
// Preto + verde lima, estética técnica/raw, energia de rave underground
export default function PreviewD() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: 'monospace' }}>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/5">
        <span className="text-lg font-bold tracking-widest uppercase" style={{ color: '#84CC16', fontFamily: 'monospace' }}>
          [ DANCEHUB ]
        </span>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-xs font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-widest">
            Entrar
          </Link>
          <Link
            href="/register"
            className="text-xs font-bold px-5 py-2 uppercase tracking-widest transition-all hover:bg-lime-400 hover:text-black"
            style={{ border: '1px solid #84CC16', color: '#84CC16' }}
          >
            Registar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 pb-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs uppercase tracking-[0.4em] mb-10" style={{ color: '#84CC16' }}>
            &gt;_ plataforma da cena urbana portuguesa
          </div>

          <h1 className="font-bold leading-none tracking-tighter uppercase mb-12"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontFamily: 'monospace' }}>
            A CENA<br />
            <span style={{ color: '#84CC16' }}>TODA</span><br />
            NUM SÓ<br />
            LUGAR.
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-zinc-500 text-sm leading-loose border-l-2 pl-4" style={{ borderColor: '#84CC1633' }}>
              Battles, workshops, perfis de artistas, marcos de carreira.
              Tudo o que a cena urbana portuguesa precisava — finalmente junto.
            </p>
            <div className="flex gap-4">
              <Link
                href="/register"
                className="flex-1 text-center text-black text-sm font-bold py-4 uppercase tracking-widest transition-all hover:opacity-90"
                style={{ backgroundColor: '#84CC16' }}
              >
                Entrar na Cena →
              </Link>
              <Link
                href="/events"
                className="flex-1 text-center text-sm font-bold py-4 uppercase tracking-widest transition-all hover:border-zinc-500 hover:text-zinc-400"
                style={{ border: '1px solid #27272A', color: '#52525B' }}
              >
                Ver Eventos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker de estilos */}
      <div className="border-b border-white/5 py-3 px-6 overflow-hidden">
        <div className="flex gap-12 text-xs uppercase tracking-widest whitespace-nowrap" style={{ color: '#27272A' }}>
          {['Breakdance', 'Hip-Hop', 'Locking', 'Popping', 'Waacking', 'Vogue', 'House', 'Krump', 'Afro', 'Dancehall', 'Tutting', 'Animation'].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>

      {/* Stats — tabela técnica */}
      <section className="px-6 md:px-12 py-12 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 text-xs uppercase tracking-widest font-bold" style={{ color: '#84CC16' }}>#</th>
                <th className="text-left py-3 text-xs uppercase tracking-widest font-bold" style={{ color: '#84CC16' }}>Módulo</th>
                <th className="text-left py-3 text-xs uppercase tracking-widest font-bold" style={{ color: '#84CC16' }}>Descrição</th>
                <th className="text-left py-3 text-xs uppercase tracking-widest font-bold" style={{ color: '#84CC16' }}>Status</th>
              </tr>
            </thead>
            <tbody className="text-zinc-500">
              {[
                { n: '01', mod: 'ARTISTAS', desc: 'Perfis profissionais com bio e contactos', status: 'ATIVO' },
                { n: '02', mod: 'BATTLES', desc: 'Eventos e competições por todo o país', status: 'ATIVO' },
                { n: '03', mod: 'MARCOS', desc: 'Historial de carreira registado', status: 'ATIVO' },
              ].map((row) => (
                <tr key={row.n} className="border-b border-white/5">
                  <td className="py-4 text-xs" style={{ color: '#3F3F46' }}>{row.n}</td>
                  <td className="py-4 font-bold text-white text-xs tracking-widest">{row.mod}</td>
                  <td className="py-4 text-xs">{row.desc}</td>
                  <td className="py-4">
                    <span className="text-xs font-bold px-2 py-1" style={{ color: '#84CC16', border: '1px solid #84CC1633' }}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs uppercase tracking-[0.4em] mb-12" style={{ color: '#84CC16' }}>
            &gt;_ Para quem é
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                title: 'ARTISTAS',
                items: [
                  'Perfil com bio e contactos',
                  'Historial de battles e workshops',
                  'Sê descoberto por organizadores',
                ],
              },
              {
                title: 'ORGANIZADORES',
                items: [
                  'Cria e gere eventos facilmente',
                  'Define preços e datas',
                  'Liga jurados, hosts e DJs',
                ],
              },
              {
                title: 'PÚBLICO',
                items: [
                  'Eventos na tua cidade',
                  'Segue os teus artistas',
                  'Faz parte da cena PT',
                ],
              },
            ].map((card) => (
              <div key={card.title} className="bg-black p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#84CC16' }}>
                  [ {card.title} ]
                </h3>
                <ul className="space-y-4">
                  {card.items.map((item) => (
                    <li key={item} className="text-sm text-zinc-500 flex gap-2">
                      <span style={{ color: '#84CC1666' }}>—</span>
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
        <div className="max-w-5xl mx-auto border border-white/5 p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: '#84CC16' }}>&gt;_ Começa agora</div>
            <h2 className="font-bold leading-tight uppercase" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              PRONTO PARA<br />
              ENTRAR?
            </h2>
          </div>
          <div className="min-w-fit flex flex-col gap-4">
            <p className="text-zinc-600 text-xs max-w-xs leading-relaxed">
              Regista-te grátis e começa a construir o teu nome na cena.
            </p>
            <Link
              href="/register"
              className="text-center text-black text-sm font-bold px-10 py-4 uppercase tracking-widest transition-all hover:opacity-90"
              style={{ backgroundColor: '#84CC16' }}
            >
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 md:px-12 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-bold tracking-widest" style={{ color: '#84CC16' }}>[ DANCEHUB ]</span>
          <p className="text-zinc-800 text-xs uppercase tracking-widest">
            Feito para a cena urbana portuguesa
          </p>
          <div className="flex gap-6">
            {[['Artistas', '/artists'], ['Eventos', '/events'], ['Entrar', '/login']].map(([l, h]) => (
              <Link key={l} href={h} className="text-zinc-700 hover:text-zinc-500 text-xs uppercase tracking-widest">{l}</Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}

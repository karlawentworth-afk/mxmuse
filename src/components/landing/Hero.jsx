export default function Hero() {
  return (
    <section className="bg-muse-teal relative overflow-hidden">
      {/* MX Muse mark as large watermark */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <img
          src="/assets/White logo no words.png"
          alt=""
          className="h-[70%] max-h-[500px] opacity-[0.07] translate-x-[15%]"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 lg:py-40 relative">
        <h1 className="text-[2.75rem] md:text-[5rem] lg:text-[6.5rem] font-heading font-semibold leading-[1.05] text-white max-w-4xl">
          It's 2pm. You haven't done any actual marketing yet.
        </h1>

        <p className="mt-8 md:mt-12 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
          You've fixed a broken automation. Pulled a report manually. Sat through
          a vendor demo. Updated the CMS. Same day. Same grind. Four completely
          different ways it hits you.
        </p>

        <p className="mt-12 md:mt-16 text-2xl md:text-3xl font-heading font-medium text-white">
          Which one sounds like yours?
        </p>
      </div>
    </section>
  )
}

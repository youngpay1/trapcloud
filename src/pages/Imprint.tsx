const Imprint = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16">
      <div className="container max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Legal Notice / Impressum
        </p>

        <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Provider (§ 5 DDG)</p>
            <p>Trapcloud</p>
            <p>Inhaber: Peimaan Nazary (Einzelunternehmen)</p>
            <p>Speckerhohlweg 8</p>
            <p>61462 Königstein im Taunus</p>
            <p>Germany</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Business</p>
            <p>Konzert- und Eventveranstaltungen, Künstlerbooking</p>
            <p>Concert and event promotion, artist booking</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <p>
              <a href="mailto:info@trapcloud.eu" className="nav-link">
                info@trapcloud.eu
              </a>
            </p>
            <p>
              <a href="tel:+4915787743194" className="nav-link">
                +49 157 87743194
              </a>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Responsible for Content (§ 18 Abs. 2 MStV)</p>
            <p>Peimaan Nazary</p>
            <p>Speckerhohlweg 8, 61462 Königstein im Taunus</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Imprint;

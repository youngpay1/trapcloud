const Imprint = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16">
      <div className="container max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Legal Notice
        </p>

        <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Company</p>
            <p>GI Invest GmbH</p>
            <p>Heinrichstraße 187</p>
            <p>64283 Darmstadt</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Management</p>
            <p>Michael Holstein</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <p>
              <a href="mailto:info@trapcloud.eu" className="nav-link">
                info@trapcloud.eu
              </a>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Register</p>
            <p>Amtsgericht Darmstadt</p>
            <p>HRB 89040</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">VAT — § 27a UStG</p>
            <p>DE271990122</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Responsible for Content</p>
            <p>Michael Holstein</p>
            <p>Heinrichstraße 187, 64283 Darmstadt</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Imprint;

// AutoSavingsPanel.jsx
export default function AutoSavingsPanel({
    pool = 0,
    next = { percent: 30, interest: 3, duration: 30, badge: "30+d" },
    nextRun = "10/2/2025, 5:52:09 PM",
    onDocs = () => {},
    onClose
  }) {
    return (
      <div className="w-full max-w-[360px] max-h-[calc(100vh-100px)]  text-white ">
        {/* Header */}
        <div className="px-4 py-3 bg-[#0b1420] border-b border-white/10 flex items-center justify-between">
          <h2 className="text-[18px] font-extrabold drop-shadow-[0_0_6px_rgba(56,189,248,.35)]">
            Auto-Savings Mechanism
          </h2>
          {/* nút đóng -> để bạn gắn sự kiện ở ngoài modal */}
          <button className="text-white/70 hover:text-white/100" onClick={onClose}>✕</button>
        </div>
  
        <div className="p-4 space-y-4 overflow-y-scroll max-h-[calc(100vh-200px)] ">
          {/* Pool */}
          <div className="rounded-xl bg-gradient-to-br from-[#101d2a] to-[#0b1724] border border-[#EAB308]/40 shadow-[0_0_0_1px_rgba(234,179,8,.2),0_10px_30px_rgba(0,0,0,.35)]">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 grid place-items-center text-sky-300">ⓖ</div>
              <div className="flex-1">
                <div className="text-[#ffd54a] font-semibold tracking-wide">Auto-Savings Pool</div>
                <div className="text-2xl font-extrabold">{pool.toFixed(2)}</div>
              </div>
            </div>
          </div>
  
          {/* How it works */}
          <section className="space-y-2">
            <h3 className="font-bold text-white/90">How Auto-Savings Works</h3>
            <p className="text-[13px] leading-5 text-white/70">
              <span className="font-bold text-white">Auto-Savings</span> grows your wealth automatically
              based on how long you’ve owned your cars.
            </p>
            <p className="text-[13px] leading-5 text-white/70">
              When you claim rewards: System checks your car age → Splits rewards automatically (part to wallet,
              part to savings) → Saved portion earns additional interest over time.
            </p>
            <p className="text-[13px] leading-5 text-white/70">
              The longer you hold cars, the more gets auto-saved. New owners keep 100% of claims, while veteran
              holders (270+ days) get 30% immediately + 70% saved at 1% interest.
            </p>
          </section>
  
          {/* Status title */}
          <h3 className="font-bold text-white/90">Your Auto-Savings Status</h3>
  
          {/* Status cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* No Savings */}
            <div className="rounded-xl border border-white/10 p-3 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(255,255,255,.06),rgba(88,28,28,.55))]">
              <div className="text-[15px] font-semibold">No Savings</div>
              <div className="text-[12px] text-white/70">Need 31+ days</div>
            </div>
  
            {/* Next */}
            <div className="relative rounded-xl border border-[#7dd3fc]/40 p-3 bg-gradient-to-br from-[#1d2640] via-[#2a2e6b]/70 to-[#2e1f55]/70 shadow-[0_10px_30px_rgba(2,8,23,.45)]">
              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#7c3aed] text-white/90 shadow-[0_2px_10px_rgba(124,58,237,.6)]">
                {next.badge}
              </div>
              <div className="text-[12px] text-white/70">Next</div>
  
              <div className="mt-2 space-y-2">
                <Row label="Auto-Save" value={`${next.percent}%`} valueClass="text-yellow-300" />
                <Row label="Interest" value={`${next.interest}%`} valueClass="text-green-300" />
                <Row label="Duration" value={`${next.duration}d`} valueClass="text-sky-300" />
              </div>
  
              <button className="mt-3 w-full text-[12px] py-1.5 rounded-md border border-white/20 bg-white/10 hover:bg-white/15 transition">
                Available now
              </button>
            </div>
          </div>
  
          {/* Docs button */}
          <div className="pt-1">
            <button
              onClick={onDocs}
              className="w-full gap-2 inline-flex items-center justify-center px-3 py-2 rounded-lg
                         bg-[#152235] hover:bg-[#182a44] transition border border-white/15 text-white/90"
            >
              <span className="text-sky-300">📘</span>
              <span className="text-[13px] font-medium">View Full Documentation</span>
            </button>
          </div>
  
          {/* Next Auto-Savings */}
          <div className="rounded-xl border border-white/10 p-3 bg-gradient-to-br from-[#152235] to-[#111a2a]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 grid place-items-center text-sky-300">⏱</div>
              <div>
                <div className="text-[12px] text-white/70">Next Auto-Savings</div>
                <div className="text-[14px] font-semibold">{nextRun}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function Row({ label, value, valueClass = "" }) {
    return (
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-white/80">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-white/30">•</span>
          <span className={`font-extrabold ${valueClass}`}>{value}</span>
        </div>
      </div>
    );
  }
  
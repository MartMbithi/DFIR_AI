export default function Pricing() {
  return (
    <main className="px-12 py-24">
      <h2 className="text-4xl font-bold mb-12">Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-900 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold">Starter</h3>
          <p className="text-gray-400 mt-4">For small incident response teams</p>
          <p className="text-3xl font-bold mt-6">$99 / mo</p>
        </div>
        <div className="bg-slate-900 p-8 rounded-xl border border-cyan-500">
          <h3 className="text-2xl font-semibold">Enterprise</h3>
          <p className="text-gray-400 mt-4">For SOCs & regulated environments</p>
          <p className="text-3xl font-bold mt-6">Custom</p>
        </div>
        <div className="bg-slate-900 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold">MSSP</h3>
          <p className="text-gray-400 mt-4">Multi-tenant service providers</p>
          <p className="text-3xl font-bold mt-6">Custom</p>
        </div>
      </div>
    </main>
  );
}

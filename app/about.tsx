const About = () => {
  return (
    <footer id="about" className="w-full bg-[#0a1224] text-white py-16 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">TechForge Store</h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Saddam Tech products with unmatched quality and customer support.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm mb-12">
          <a href="#" className="px-6 py-3 rounded-full border border-white/30 hover:border-white transition">Shipping</a>
          <a href="#" className="px-6 py-3 rounded-full border border-white/30 hover:border-white transition">Returns</a>
          <a href="#" className="px-6 py-3 rounded-full border border-white/30 hover:border-white transition">Support</a>
          <a href="#" className="px-6 py-3 rounded-full border border-white/30 hover:border-white transition">Warranty</a>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://github.com/akatsukiduck" target="_blank" className="hover:text-blue-400 transition">GitHub</a>
          <a href="#" target="_blank" className="hover:text-blue-400 transition">LinkedIn</a>
          <a href="#" target="_blank" className="hover:text-blue-400 transition">Instagram</a>
          <a href="#" target="_blank" className="hover:text-blue-400 transition">X / Twitter</a>
        </div>

        <div className="text-center text-xs text-gray-500 mt-16">
          © {new Date().getFullYear()} Saddam Tech • Built with React & Tailwind
        </div>
      </div>
    </footer>
  );
};

export default About;
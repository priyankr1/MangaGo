import React from 'react';
const About = () => {
  return (
    <section className="py-16 px-8 h-[90vh] bg-gradient-to-r  text-gray-500">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[40px] sm:text-[50px] leading-[108.333%] pl-10 sm:pl-0">About MangaGo</h2>
        <p className="text-lg mb-8 opacity-90 text-black leading-relaxed">
          MangaGo is the ultimate platform for manga lovers and creators! Whether you're here to read the latest manga or publish your own, we provide the tools you need to share your stories with the world.
        </p>
        <div className="bg-white p-8 rounded-xl shadow-2xl text-gray-900">
          <h3 className="break-words text-[#2b282a] whitespace-pre-wrap font-risque max-w-full max-h-m bg-none  font-m  text-[40px] sm:text-[50px] leading-[108.333%] pl-10 sm:pl-0">Why Choose MangaGo?</h3>
          <ul className="text-lg list-disc list-inside space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-black">✔</span> Publish your manga and earn revenue through our monetization program.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-black">✔</span> Support your favorite creators by reading and sharing their work.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-black">✔</span> Seamless and user-friendly interface for a smooth experience.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-black">✔</span> Secure payments and earnings with Stripe integration.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;

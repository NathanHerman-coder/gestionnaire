import React from 'react'
import { Link } from 'react-router-dom'
import { Rocket, Users, FileText, DollarSign } from 'lucide-react'

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-teal-500 text-white rounded-lg font-bold">NH</div>
            <div>
              <h1 className="text-xl font-semibold">Gestionnaire</h1>
              <p className="text-sm text-gray-500">Gestion de factures simple et modulaire</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm">Se connecter</Link>
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Fonctionnalités</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-4">Créez, envoyez et suivez vos factures en toute simplicité</h2>
            <p className="text-gray-600 mb-6">Une interface claire, des modèles adaptables et des outils pour gérer vos clients et vos factures, afin que vous puissiez vous concentrer sur votre activité.</p>

            <div className="flex gap-3">
              <Link to="/login" className="px-5 py-3 bg-teal-500 text-white rounded-md font-semibold">Commencer</Link>
              <a href="#features" className="px-5 py-3 border border-gray-200 rounded-md text-gray-700">En savoir plus</a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-3">Aperçu rapide</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Création rapide de clients et factures</li>
              <li>• Export PDF & impression</li>
              <li>• Historique et recherche</li>
              <li>• Authentification sécurisée (JWT)</li>
            </ul>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Fonctionnalités clés</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="text-teal-500" />
                <h4 className="font-semibold">Rapide et léger</h4>
              </div>
              <p className="text-gray-600 text-sm">Interface réactive conçue pour être rapide et évolutive, parfaite pour les petites équipes.</p>
            </article>

            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-teal-500" />
                <h4 className="font-semibold">Gestion des clients</h4>
              </div>
              <p className="text-gray-600 text-sm">Fiches clients complètes, import/export, et historique des transactions.</p>
            </article>

            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-teal-500" />
                <h4 className="font-semibold">Factures & modèles</h4>
              </div>
              <p className="text-gray-600 text-sm">Créez des factures personnalisées et envoyez-les directement à vos clients.</p>
            </article>
          </div>
        </section>

        {/* CTA / Pricing */}
        <section className="mt-16 bg-gradient-to-r from-teal-50 to-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xl font-bold">Prêt à démarrer ?</h4>
              <p className="text-gray-600">Créez votre compte et gérez vos premières factures en quelques minutes.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 bg-teal-600 text-white rounded-md">Créer un compte</Link>
              <Link to="/clients" className="px-4 py-2 border border-gray-200 rounded-md text-gray-700">Voir les clients</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <div>© {new Date().getFullYear()} Gestionnaire — Tous droits réservés</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Politique de confidentialité</a>
            <a href="#" className="hover:underline">Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

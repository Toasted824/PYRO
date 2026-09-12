import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { SEO } from '../components/SEO'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'

export function Terms() {
  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <SEO
        title="Terms and Conditions — FoodLoop"
        description="FoodLoop terms for restaurants and community kitchens in Kathmandu Valley covering listings, food safety, pickup coordination, and privacy."
        canonicalPath="/terms"
      />
      <Header />
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-6 pb-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms and Conditions' }]} />
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 mt-6">
          <div className="text-xs font-semibold tracking-widest text-stone-500">LEGAL</div>
          <h1 className="mt-2 text-[28px] font-bold tracking-tight text-stone-900">Terms and Conditions</h1>
          <p className="mt-1 text-sm text-stone-500">Last updated: September 12, 2026</p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-stone-700">
            <section>
              <h2 className="font-semibold text-stone-900">1. About FoodLoop</h2>
              <p className="mt-1">FoodLoop is a non commercial listing tool that helps restaurants in Kathmandu Valley share information about surplus food with verified community kitchens and shelters. FoodLoop does not buy, sell, store, or deliver food. All pickups are coordinated directly between the restaurant and the beneficiary.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">2. Accounts</h2>
              <p className="mt-1">You must provide accurate contact information and keep your login details secure. Restaurant and beneficiary accounts are subject to basic verification. We may suspend accounts that provide false information or misuse the service.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">3. Listings and accuracy</h2>
              <p className="mt-1">Restaurants are responsible for ensuring that listings are accurate, including food type, quantity, preparation time, storage conditions, and pickup window. List only food that has been handled and stored safely and that you would consider suitable to share. Remove a listing if it is no longer available.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">4. Food safety</h2>
              <p className="mt-1">Food safety remains the responsibility of both parties. Restaurants must follow local food safety practices. Beneficiaries must assess food on collection and decide whether it is suitable for their needs. If there is any doubt about safety, do not collect or serve the food. FoodLoop is not liable for the condition of food shared through the platform.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">5. Pickup and coordination</h2>
              <p className="mt-1">Pickup times and locations are agreed directly between restaurant and beneficiary. Be punctual and communicate clearly if plans change. FoodLoop does not arrange transport or guarantee availability. A listing may be claimed by another beneficiary first.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">6. Verification</h2>
              <p className="mt-1">Beneficiary accounts are verified to a basic level by our team. Verification does not imply endorsement. We encourage straightforward communication between both sides before and after pickup.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">7. Prohibited use</h2>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>Do not post food that is spoiled, expired, or unsafe.</li>
                <li>Do not use the service to sell food or request payment.</li>
                <li>Do not share false information or impersonate another organization.</li>
                <li>Do not use contact details for marketing or unrelated purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">8. Privacy</h2>
              <p className="mt-1">We store only what is needed to operate the service: name, location, contact, and listing details. Contact information is shared only with the other party involved in a specific donation. We do not sell your data. For a small demonstration instance, data is stored locally and may be reset between demos.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">9. Content and images</h2>
              <p className="mt-1">FoodLoop does not use AI generated images. Any photos used are either provided by participants or are simple interface elements. Do not upload images that you do not have rights to share.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">10. Limitation of liability</h2>
              <p className="mt-1">FoodLoop provides the platform as is. We are not responsible for the quality, safety, or outcome of any donation. Use of the service is at your own discretion. Nothing in these terms limits liability where it cannot be limited by law.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">11. Changes</h2>
              <p className="mt-1">We may update these terms as the project evolves. Continued use after changes means you accept the updated terms. If you do not agree, please stop using the service.</p>
            </section>

            <section>
              <h2 className="font-semibold text-stone-900">12. Contact</h2>
              <p className="mt-1">For questions about these terms or to report an issue with a listing, contact the FoodLoop team through your account or at the contact details provided during registration. For now, Kathmandu Valley is our primary operating area.</p>
            </section>
          </div>

          <div className="mt-8 flex gap-3">
            <Link to="/join" className="inline-flex bg-leaf hover:bg-leaf-dark text-white font-medium px-5 py-2.5 rounded-lg text-sm">Create account</Link>
            <Link to="/" className="inline-flex bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium px-5 py-2.5 rounded-lg text-sm">Back to home</Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-stone-500 leading-relaxed">
          This document is provided for demonstration purposes and does not constitute legal advice. Adapt it with proper review before any public launch. See also <Link to="/about" className="underline underline-offset-4">About</Link> and <Link to="/how-it-works" className="underline underline-offset-4">How it works</Link>.
        </p>
      </div>
    </div>
  )
}

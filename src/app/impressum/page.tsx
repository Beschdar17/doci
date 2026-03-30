import { COMPANY_INFO } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | DOCI",
  description: "Impressum der DOCI GmbH gemäß § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-3xl font-bold text-doci-dark">Impressum</h1>

      <div className="space-y-8 text-doci-dark leading-relaxed">
        {/* § 5 DDG */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Angaben gemäß § 5 DDG
          </h2>
          {/* TODO: Vor Livegang mit echten Firmendaten ersetzen */}
          <p>
            {COMPANY_INFO.name}
            <br />
            {COMPANY_INFO.street}
            <br />
            {COMPANY_INFO.zip} {COMPANY_INFO.city}
          </p>
          <p className="mt-3">
            <strong>Vertreten durch:</strong>
            <br />
            Geschäftsführer: {COMPANY_INFO.geschaeftsfuehrer}
          </p>
        </section>

        {/* Kontakt */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">Kontakt</h2>
          <p>
            Telefon: {COMPANY_INFO.phone}
            <br />
            E-Mail: {COMPANY_INFO.email}
          </p>
        </section>

        {/* Handelsregister */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">Handelsregister</h2>
          <p>
            Registergericht: {COMPANY_INFO.registergericht}
            <br />
            Registernummer: {COMPANY_INFO.registernummer}
          </p>
        </section>

        {/* USt-ID */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a
            Umsatzsteuergesetz:
            <br />
            {COMPANY_INFO.ustIdNr}
          </p>
        </section>

        {/* Verantwortlich */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            {COMPANY_INFO.geschaeftsfuehrer}
            <br />
            {COMPANY_INFO.street}
            <br />
            {COMPANY_INFO.zip} {COMPANY_INFO.city}
          </p>
        </section>

        {/* Haftungsausschluss */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Haftungsausschluss (Disclaimer)
          </h2>

          <h3 className="mb-2 mt-4 font-semibold">Haftung für Inhalte</h3>
          <p className="text-sm text-doci-gray">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
            oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
            jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h3 className="mb-2 mt-4 font-semibold">Haftung für Links</h3>
          <p className="text-sm text-doci-gray">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
            Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
            nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>

          <h3 className="mb-2 mt-4 font-semibold">Urheberrecht</h3>
          <p className="text-sm text-doci-gray">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>

        {/* Datenschutz-Hinweis */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">Datenschutz</h2>
          <p className="text-sm text-doci-gray">
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe
            personenbezogener Daten möglich. Soweit auf unseren Seiten
            personenbezogene Daten (beispielsweise Name, Anschrift oder
            E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
            auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
            Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin,
            dass die Datenübertragung im Internet (z.B. bei der Kommunikation
            per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
            der Daten vor dem Zugriff durch Dritte ist nicht möglich.
          </p>
          <p className="mt-3 text-sm text-doci-gray">
            {/* TODO: Vollständige Datenschutzerklärung auf separater Seite */}
            Eine ausführliche Datenschutzerklärung wird in Kürze auf einer
            separaten Seite bereitgestellt.
          </p>
        </section>
      </div>
    </div>
  );
}

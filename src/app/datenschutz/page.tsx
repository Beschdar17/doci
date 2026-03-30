import { COMPANY_INFO } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | DOCI",
  description: "Datenschutzerklärung der DOCI GmbH.",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-3xl font-bold text-doci-dark">
        Datenschutzerklärung
      </h1>

      <div className="space-y-8 text-doci-dark leading-relaxed">
        {/* TODO: Vor Livegang vollständige Datenschutzerklärung einfügen */}

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            1. Datenschutz auf einen Blick
          </h2>
          <h3 className="mb-2 mt-4 font-semibold">Allgemeine Hinweise</h3>
          <p className="text-sm text-doci-gray">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können. Ausführliche Informationen
            zum Thema Datenschutz entnehmen Sie unserer unter diesem Text
            aufgeführten Datenschutzerklärung.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            2. Verantwortliche Stelle
          </h2>
          <p className="text-sm text-doci-gray">
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser
            Website ist:
          </p>
          <p className="mt-2 text-sm text-doci-gray">
            {COMPANY_INFO.name}
            <br />
            {COMPANY_INFO.street}
            <br />
            {COMPANY_INFO.zip} {COMPANY_INFO.city}
            <br />
            <br />
            Telefon: {COMPANY_INFO.phone}
            <br />
            E-Mail: {COMPANY_INFO.email}
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            3. Datenerfassung auf dieser Website
          </h2>
          <h3 className="mb-2 mt-4 font-semibold">
            Wer ist verantwortlich für die Datenerfassung?
          </h3>
          <p className="text-sm text-doci-gray">
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
            „Verantwortliche Stelle" in dieser Datenschutzerklärung entnehmen.
          </p>

          <h3 className="mb-2 mt-4 font-semibold">
            Wie erfassen wir Ihre Daten?
          </h3>
          <p className="text-sm text-doci-gray">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
            mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in
            ein Kontaktformular eingeben. Andere Daten werden automatisch oder
            nach Ihrer Einwilligung beim Besuch der Website durch unsere
            IT-Systeme erfasst. Das sind vor allem technische Daten (z.B.
            Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h3 className="mb-2 mt-4 font-semibold">
            Wofür nutzen wir Ihre Daten?
          </h3>
          <p className="text-sm text-doci-gray">
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung
            der Website zu gewährleisten. Andere Daten können zur Analyse Ihres
            Nutzerverhaltens verwendet werden.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            4. Hosting
          </h2>
          <p className="text-sm text-doci-gray">
            Diese Website wird bei einem externen Dienstleister gehostet
            (Hoster). Die personenbezogenen Daten, die auf dieser Website
            erfasst werden, werden auf den Servern des Hosters gespeichert.
            Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta-
            und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
            Websitezugriffe und sonstige Daten, die über eine Website generiert
            werden, handeln.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            5. Ihre Rechte
          </h2>
          <p className="text-sm text-doci-gray">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
            Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
            erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
            Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
            Datenverarbeitung erteilt haben, können Sie diese Einwilligung
            jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht,
            unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
            Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          </p>
          <p className="mt-2 text-sm text-doci-gray">
            Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
            sich jederzeit an uns wenden.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            6. Kontaktformular
          </h2>
          <p className="text-sm text-doci-gray">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
            Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
            Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
            nicht ohne Ihre Einwilligung weiter.
          </p>
        </section>
      </div>
    </div>
  );
}

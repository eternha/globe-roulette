import { useState, useCallback } from "react";
import { LegalModal } from "./LegalModal";
import type { LegalPage } from "./LegalModal";
import {
  PRIVACY_TITLE,
  PRIVACY_LAST_UPDATED,
  PRIVACY_SECTIONS,
  TERMS_TITLE,
  TERMS_LAST_UPDATED,
  TERMS_SECTIONS,
  AFFILIATE_DISCLOSURE_TITLE,
  AFFILIATE_DISCLOSURE_LAST_UPDATED,
  AFFILIATE_DISCLOSURE_SECTIONS,
} from "./legal-copy";
import "./legal-modal.css";

/* ── Page data map ──────────────────────────────────────────── */

const PAGES = {
  privacy: {
    title: PRIVACY_TITLE,
    lastUpdated: PRIVACY_LAST_UPDATED,
    sections: PRIVACY_SECTIONS,
  },
  terms: {
    title: TERMS_TITLE,
    lastUpdated: TERMS_LAST_UPDATED,
    sections: TERMS_SECTIONS,
  },
  disclosure: {
    title: AFFILIATE_DISCLOSURE_TITLE,
    lastUpdated: AFFILIATE_DISCLOSURE_LAST_UPDATED,
    sections: AFFILIATE_DISCLOSURE_SECTIONS,
  },
} as const;

/* ── Component ──────────────────────────────────────────────── */

export function SiteFooter() {
  const [activePage, setActivePage] = useState<LegalPage | null>(null);

  const openPage = useCallback((page: LegalPage) => {
    setActivePage(page);
  }, []);

  const closePage = useCallback(() => {
    setActivePage(null);
  }, []);

  const pageData = activePage ? PAGES[activePage] : null;

  return (
    <>
      <footer className="site-footer">
        <button
          type="button"
          className="site-footer-link"
          onClick={() => openPage("privacy")}
        >
          Privacy
        </button>
        <span className="site-footer-dot" />
        <button
          type="button"
          className="site-footer-link"
          onClick={() => openPage("terms")}
        >
          Terms
        </button>
        <span className="site-footer-dot" />
        <button
          type="button"
          className="site-footer-link"
          onClick={() => openPage("disclosure")}
        >
          Disclosure
        </button>
      </footer>

      {pageData && (
        <LegalModal
          title={pageData.title}
          lastUpdated={pageData.lastUpdated}
          sections={pageData.sections}
          onClose={closePage}
        />
      )}
    </>
  );
}

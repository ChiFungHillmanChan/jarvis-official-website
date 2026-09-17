import { describe, it, expect } from "vitest";
import { company, getCompanyL10n } from "./company";
import { routing } from "@/i18n/routing";
import { copy as en } from "./copy.en";
import { copy as zhHk } from "./copy.zh-hk";

// Cap. 622B ss.4-5 requires a Hong Kong company to display its registered name
// on any website of the company. These tests pin the registered details to the
// Certificate of Incorporation and Business Registration Certificate so a copy
// edit cannot quietly drop them.

describe("registered company identity", () => {
  it("carries the registered name exactly as incorporated", () => {
    expect(company.legalName).toBe("JARVIS AI LIMITED");
  });

  it("keeps the trade name separate from the registered name", () => {
    // The site still brands as "JARVIS AI"; the disclosure duty is about the
    // registered name, so both have to exist independently.
    expect(company.name).toBe("JARVIS AI");
    expect(company.legalName).not.toBe(company.name);
  });

  it("states liability status through the registered name ending", () => {
    // A name ending in "LIMITED" discloses limited liability on its face, so no
    // separate liability statement is needed alongside it.
    expect(company.legalName.endsWith("LIMITED")).toBe(true);
  });

  it("carries the Companies Registry number and the business registration number", () => {
    expect(company.companyNumber).toBe("81247037");
    expect(company.businessRegistrationNumber).toBe("81247037-000-09-26-7");
    // The BRN is the company number plus the branch and expiry suffix.
    expect(company.businessRegistrationNumber.startsWith(company.companyNumber)).toBe(true);
  });

  it("carries the registered office address", () => {
    expect(company.registeredAddress).toContain("Unit 1806");
    expect(company.registeredAddress).toContain("9 Wing Hong Street");
    expect(company.registeredAddress).toContain("Hong Kong");
  });

  it("shows the registered name in every locale, since no Chinese name is registered", () => {
    // The CI and BR are issued in English only. A translated company name would
    // not be the registered name and would not satisfy the disclosure.
    for (const locale of routing.locales) {
      expect(getCompanyL10n(locale).legalLine).toContain("JARVIS AI LIMITED");
    }
  });

  it("names the registered office in every locale", () => {
    for (const locale of routing.locales) {
      expect(getCompanyL10n(locale).registeredOfficeLine).toContain("1806");
    }
  });
});

describe("legal pages identify the contracting entity", () => {
  const pages = [
    { name: "privacy", en: en.privacy.sections, zh: zhHk.privacy.sections },
    { name: "terms", en: en.terms.sections, zh: zhHk.terms.sections },
  ];

  for (const page of pages) {
    it(`names the registered company on the ${page.name} page in both locales`, () => {
      // "JARVIS AI" alone is a trade name. A reader has to be able to tell which
      // legal person holds their data, or is on the other side of the terms.
      for (const sections of [page.en, page.zh]) {
        const text = sections.map((s) => `${s.title} ${s.body}`).join("\n");
        expect(text).toContain("JARVIS AI LIMITED");
        expect(text).toContain("81247037");
      }
    });
  }
});

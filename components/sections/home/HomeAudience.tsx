import { BookOpen, CalendarDays, FileText, GitPullRequest, Mail } from "lucide-react";
import { getCopy } from "@/content/getCopy";

export async function HomeAudience() {
  const { home } = await getCopy();
  const icons = [Mail, CalendarDays, FileText, GitPullRequest, BookOpen];
  return (
    <section className="home-section integrations-section" aria-labelledby="integrations-heading">
      <div className="site-container">
        <div className="section-intro centered">
          <h2 id="integrations-heading">{home.integrations.title}</h2>
          <p>{home.integrations.sub}</p>
        </div>
        <ul className="integration-list">
          {home.integrations.items.map((item, index) => {
            const Icon = icons[index]!;
            return (
              <li key={item.name}>
                <span className={`integration-icon integration-icon-${index}`}>
                  <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </li>
            );
          })}
        </ul>
        <p className="section-footnote">{home.integrations.note}</p>
      </div>
    </section>
  );
}

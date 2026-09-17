import { Brain, Check, FileText, Mail, MessageSquare, MoveRight } from "lucide-react";
import { getCopy } from "@/content/getCopy";

export async function HomeProduct() {
  const { home } = await getCopy();
  const icons = [Mail, FileText, Brain];
  return (
    <section
      className="home-section product-section"
      id="product"
      aria-labelledby="product-heading"
    >
      <div className="site-container">
        <div className="section-intro">
          <h2 id="product-heading">{home.product.title}</h2>
          <p>{home.product.sub}</p>
        </div>
        <div className="workflow-grid">
          {home.product.items.map((item, index) => {
            const Icon = icons[index]!;
            return (
              <article className="workflow-feature" key={item.title}>
                <div className={`feature-visual feature-visual-${index}`} aria-hidden="true">
                  <span className="feature-app-icon">
                    <Icon size={26} strokeWidth={1.5} />
                  </span>
                  <div className="feature-prompt">
                    <MessageSquare size={17} />
                    <span>{item.prompt}</span>
                  </div>
                  <span className="feature-completion">
                    {index === 1 ? <MoveRight size={17} /> : <Check size={17} />}
                  </span>
                </div>
                <p className="feature-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p className="feature-body">{item.body}</p>
                <p className="feature-detail">{item.result}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

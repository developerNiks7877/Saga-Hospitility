import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { publicAsset } from '../utils/publicAsset';
import PublicFooter from '../components/PublicFooter';
import './Blog.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  useEffect(() => {
    if (!post) return;
    const description = post.excerpt || 'Stories and field notes from SAGA Hospitality in Rajasthan.';
    const siteTitle = 'Luxury Heritage Hospitality in Rajasthan | SAGA Hospitality';
    document.title = `${post.title} | SAGA Journal`;
    const tags = [
      ['name', 'description', description],
      ['name', 'keywords', post.keywords.join(', ')],
      ['property', 'og:title', `${post.title} | SAGA Journal`],
      ['property', 'og:description', description],
      ['name', 'twitter:title', `${post.title} | SAGA Journal`],
      ['name', 'twitter:description', description],
    ];
    const previous = tags.map(([attribute, name]) => {
      const selector = `meta[${attribute}="${name}"]`;
      let tag = document.head.querySelector(selector);
      const existed = Boolean(tag);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      const content = tag.content;
      return { tag, existed, content };
    });
    tags.forEach(([, , content], index) => { previous[index].tag.content = content; });
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.dataset.sagaFaq = 'true';
    faqSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map(({ question, answer }) => ({
        '@type': 'Question', name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
    document.head.appendChild(faqSchema);
    return () => {
      document.title = siteTitle;
      faqSchema.remove();
      previous.forEach(({ tag, existed, content }) => {
        if (existed) tag.content = content;
        else tag.remove();
      });
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const sections = post.sections || post.paragraphs.map((paragraph, index) => ({
    id: `story-part-${index + 1}`,
    heading: `A closer look · ${String(index + 1).padStart(2, '0')}`,
    paragraphs: [paragraph],
  }));

  return (
    <main className="journal-page journal-article-page">
      <header className="journal-header">
        <Link className="journal-logo" to="/" aria-label="SAGA Hospitality home">
          <img src={publicAsset('/assets/logo/saga-hospitality-logo.png')} alt="SAGA Hospitality" />
        </Link>
        <Link className="journal-home-link" to="/blog">ALL STORIES</Link>
      </header>

      <section className="journal-article-hero">
        {post.image && (
          <img
            src={post.image}
            alt=""
            fetchPriority="high"
            decoding="async"
            onError={(event) => {
              const image = event.currentTarget;
              if (image.dataset.driveFallbackTried) return;
              image.dataset.driveFallbackTried = 'true';
              const fileId = post.image.match(/\/d\/([^=]+)/)?.[1];
              if (fileId) image.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
            }}
          />
        )}
        <div className="journal-article-hero-shade" />
        <div className="journal-article-title">
          <span>{post.category} · SAGA JOURNAL</span>
          <h1>{post.title}</h1>
        </div>
      </section>

      <article className="journal-article-body">
        <p className="journal-article-description">{post.excerpt}</p>
        <nav className="article-toc" aria-label="On this page">
          <span>IN THIS STORY</span>
          {sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`}>
              <small>{String(index + 1).padStart(2, '0')}</small>{section.heading}
            </a>
          ))}
          <a href="#story-faq"><small>↘</small>Frequently asked questions</a>
        </nav>
        {sections.map((section) => (
          <section className="journal-story-section" id={section.id} key={section.id}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <section className="journal-faq" id="story-faq">
          <span>GOOD TO KNOW</span>
          <h2>Frequently asked questions</h2>
          {post.faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
        <div className="journal-keywords" aria-label="Article keywords">
          <span>EXPLORE BY KEYWORD</span>
          {post.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
        </div>
        <Link className="journal-return-link" to="/blog">← BACK TO ALL STORIES</Link>
      </article>

      <section className="journal-related">
        <span>CONTINUE EXPLORING</span>
        <div>
          {relatedPosts.map((item) => (
            <Link key={item.slug} to={`/blog/${item.slug}`}>
              <small>{item.category}</small>
              <strong>{item.title}</strong>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

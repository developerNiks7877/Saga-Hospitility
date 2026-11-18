import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { publicAsset } from '../utils/publicAsset';
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
    return () => {
      document.title = siteTitle;
      previous.forEach(({ tag, existed, content }) => {
        if (existed) tag.content = content;
        else tag.remove();
      });
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

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
        {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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

      <footer className="journal-footer">
        <img src={publicAsset('/assets/logo/saga-hospitality-logo.png')} alt="SAGA Hospitality" />
        <span>WILD BY NATURE · ROOTED IN PURPOSE</span>
      </footer>
    </main>
  );
}

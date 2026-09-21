import { useEffect, useRef, useState, type CSSProperties } from 'react';
import '../styles/timeline.css';

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  summary: string;
  category: 'personal' | 'work' | 'project';
  image?: string;
  imageAlt?: string;
  href?: string;
}

interface Props {
  items: TimelineItem[];
}

const categoryLabels: Record<TimelineItem['category'], string> = {
  personal: 'Personal',
  work: 'Work',
  project: 'Project',
};

export default function Timeline({ items }: Props) {
  const rootRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const updateProgress = () => {
      const bounds = root.getBoundingClientRect();
      const start = window.innerHeight * 0.7;
      const distance = bounds.height + window.innerHeight * 0.2;
      const nextProgress = Math.min(1, Math.max(0, (start - bounds.top) / distance));
      setProgress(nextProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { rootMargin: '-35% 0px -45%', threshold: 0 },
    );

    root.querySelectorAll<HTMLElement>('[data-index]').forEach((item) => observer.observe(item));
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const timelineStyle = { '--timeline-progress': progress } as CSSProperties;

  return (
    <ol className="timeline" ref={rootRef} style={timelineStyle} aria-label="Personal timeline">
      {items.map((item, index) => (
        <li
          className={index <= activeIndex ? 'timeline-item is-active' : 'timeline-item'}
          data-index={index}
          key={item.id}
        >
          <div className="timeline-marker" aria-hidden="true">
            <span />
          </div>

          <article className="timeline-card">
            <div className="timeline-copy">
              <p className="timeline-meta">
                <span>{item.period}</span>
                <span>{categoryLabels[item.category]}</span>
              </p>
              <h3>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</h3>
              <p>{item.summary}</p>
              {item.href && (
                <a className="timeline-link" href={item.href}>
                  View the work <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>

            <div className="timeline-media">
              {item.image ? (
                <img src={item.image} alt={item.imageAlt ?? ''} loading="lazy" decoding="async" />
              ) : (
                <span aria-hidden="true">Media placeholder</span>
              )}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

import { useEffect, useRef } from 'react';

const GradientCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    // Hide on mobile
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = '1';
        outline.style.opacity = '1';
        // Snap outline to cursor on first appear to avoid slide-in from corner
        outlinePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      dot.style.opacity = '0';
      outline.style.opacity = '0';
    };

    const onMouseEnterLink = () => {
      dot.classList.add('cursor-dot--hover');
      outline.classList.add('cursor-outline--hover');
    };

    const onMouseLeaveLink = () => {
      dot.classList.remove('cursor-dot--hover');
      outline.classList.remove('cursor-outline--hover');
    };

    // Lerp helper
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      // Dot snaps instantly
      dot.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;

      // Outline lags with lerp (factor 0.12 = smooth lag)
      outlinePos.current.x = lerp(outlinePos.current.x, mousePos.current.x, 0.12);
      outlinePos.current.y = lerp(outlinePos.current.y, mousePos.current.y, 0.12);
      outline.style.transform = `translate(${outlinePos.current.x}px, ${outlinePos.current.y}px) translate(-50%, -50%)`;

      rafId.current = requestAnimationFrame(animate);
    };

    // Add hover effects to interactive elements
    const addLinkListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-hover'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    addLinkListeners();

    rafId.current = requestAnimationFrame(animate);

    // Re-scan for new interactive elements on DOM changes
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  // Don't render on mobile (SSR-safe check skipped; handled in useEffect)
  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={outlineRef}
        className="cursor-outline"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
};

export default GradientCursor;

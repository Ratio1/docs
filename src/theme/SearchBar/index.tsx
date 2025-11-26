import React, {useCallback, useEffect, useRef, useState} from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';

export default function SearchBar(): JSX.Element {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const buildLabel =
    typeof process !== 'undefined' && process.env
      ? process.env.NEXT_PUBLIC_VERSION_HASH ??
        process.env.BUILD_HASH ??
        process.env.VERCEL_GIT_COMMIT_SHA ??
        process.env.GIT_COMMIT_SHA ??
        process.env.VERSION ??
        'local'
      : 'local';

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    let autocompleteInput: HTMLInputElement | null = null;
    let focusInterval: number | null = null;

    const findModalInput = () =>
      modalRef.current?.querySelector<HTMLInputElement>('.navbar__search-input');

    const tryFocus = () => {
      const input = findModalInput();
      if (input) {
        autocompleteInput = input;
        input.focus({preventScroll: true});
        input.select();
        if (focusInterval !== null) {
          clearInterval(focusInterval);
          focusInterval = null;
        }
      }
    };

    // Try a few times to grab focus as autocomplete attaches.
    tryFocus();
    let attempts = 0;
    focusInterval = window.setInterval(() => {
      if (attempts > 10) {
        if (focusInterval !== null) {
          clearInterval(focusInterval);
          focusInterval = null;
        }
        return;
      }
      attempts += 1;
      tryFocus();
    }, 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    const onSelected = () => {
      setTimeout(() => closeModal(), 0);
    };

    autocompleteInput?.addEventListener('autocomplete:selected', onSelected as EventListener);
    document.addEventListener('autocomplete:selected', onSelected as EventListener, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      autocompleteInput?.removeEventListener('autocomplete:selected', onSelected as EventListener);
      document.removeEventListener('autocomplete:selected', onSelected as EventListener, true);
      if (focusInterval !== null) {
        clearInterval(focusInterval);
      }
    };
  }, [open, closeModal]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCmdOrCtrlK =
        (event.metaKey || event.ctrlKey) && (event.key === 'k' || event.key === 'K');
      if (isCmdOrCtrlK) {
        event.preventDefault();
        openModal();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openModal]);

  return (
    <>
      <div className="search-trigger-row">
        <span className="search-trigger-version">v.{buildLabel}</span>
        <button
          type="button"
          className="search-trigger-pill"
          aria-label="Open search"
          onClick={openModal}>
          <span className="search-trigger-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </span>
          <span className="search-trigger-label">Search</span>
          <span className="search-trigger-hint">⌘/Ctrl + K</span>
        </button>
      </div>

      {open && (
        <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search documentation">
          <div className="search-modal__backdrop" onClick={() => setOpen(false)} />
          <div className="search-modal__content" ref={modalRef}>
            <div className="search-modal__header">
              <div className="search-modal__input">
                <OriginalSearchBar />
              </div>
            </div>
            <div className="search-modal__legend">
              <span className="legend-item">
                <kbd>↑</kbd> <kbd>↓</kbd> Navigate
              </span>
              <span className="legend-item">
                <kbd>Enter</kbd> Open
              </span>
              <span className="legend-item">
                <kbd>Esc</kbd> Close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

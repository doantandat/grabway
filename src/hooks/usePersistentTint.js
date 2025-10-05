// usePersistentTint.js
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export function usePersistentTint(storageKey = "carColor",isPreview=true) {
  const readLS = () => {
    try {
      return localStorage.getItem(storageKey) || undefined;
    } catch {
      return undefined;
    }
  };

  const [savedTint, setSavedTint] = useState(readLS);

  useEffect(() => {
    
    const read = () => setSavedTint(readLS());

    // 1) thay đổi từ TAB KHÁC
    const onStorage = (e) => {
      if (e.key === storageKey) read();
    };

    // 2) thay đổi trong CÙNG TAB (sau khi save/reset)
    const onCustom = (e) => {
      setSavedTint(e.detail ?? readLS());
    };

    // 3) khi quay lại tab / điều hướng client-side
    const onFocus = () => read();

    window.addEventListener("storage", onStorage);
    window.addEventListener(`${storageKey}-updated`, onCustom);
    window.addEventListener("focus", onFocus);
    window.addEventListener("pageshow", onFocus);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(`${storageKey}-updated`, onCustom);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pageshow", onFocus);
    };
  }, [storageKey,isPreview]);

  const broadcast = (value) => {
    window.dispatchEvent(new CustomEvent(`${storageKey}-updated`, { detail: value }));
  };

  const save = useCallback(
    (hex, { broadcastEvent = true } = {}) => {
      if (!hex) return;
      try {
        localStorage.setItem(storageKey, hex);
        setSavedTint(hex);
        if (broadcastEvent) broadcast(hex);

        toast.success("Save success")
      } catch {toast.error("Save fail")}
    },
    [storageKey]
  );

  const reset = useCallback(
    ({ broadcastEvent = true } = {}) => {
      try {
        localStorage.removeItem(storageKey);
        setSavedTint(undefined);
        if (broadcastEvent) broadcast(undefined);
        
      } catch {}
    },
    [storageKey]
  );

  const refresh = useCallback(() => setSavedTint(readLS()), [storageKey]);

  return { savedTint, save, reset, refresh };
}

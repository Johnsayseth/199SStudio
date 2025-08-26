import { useState, useEffect } from "react";

interface PWAState {
  isInstalled: boolean;
  isInstallable: boolean;
  isOffline: boolean;
  isUpdateAvailable: boolean;
}

export const usePWA = () => {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstalled: false,
    isInstallable: false,
    isOffline: false,
    isUpdateAvailable: false,
  });

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Check if PWA is installed
  useEffect(() => {
    const checkInstallation = () => {
      if (typeof window !== "undefined") {
        // Check if running in standalone mode (installed)
        const isStandalone = window.matchMedia(
          "(display-mode: standalone)"
        ).matches;
        const isInStandaloneMode = (window.navigator as any).standalone;

        setPwaState((prev) => ({
          ...prev,
          isInstalled: isStandalone || isInStandaloneMode,
        }));
      }
    };

    checkInstallation();
  }, []);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setPwaState((prev) => ({
        ...prev,
        isInstallable: true,
      }));
    };

    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      }
    };
  }, []);

  // Listen for appinstalled event
  useEffect(() => {
    const handleAppInstalled = () => {
      setPwaState((prev) => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
      }));
      setDeferredPrompt(null);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("appinstalled", handleAppInstalled);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("appinstalled", handleAppInstalled);
      }
    };
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setPwaState((prev) => ({
        ...prev,
        isOffline: false,
      }));
    };

    const handleOffline = () => {
      setPwaState((prev) => ({
        ...prev,
        isOffline: true,
      }));
    };

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Set initial state
      setPwaState((prev) => ({
        ...prev,
        isOffline: !navigator.onLine,
      }));
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      }
    };
  }, []);

  // Install PWA
  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("PWA installed successfully");
      } else {
        console.log("PWA installation declined");
      }

      setDeferredPrompt(null);
      setPwaState((prev) => ({
        ...prev,
        isInstallable: false,
      }));
    }
  };

  // Check for updates
  const checkForUpdates = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.update();
        });
      });
    }
  };

  return {
    ...pwaState,
    installPWA,
    checkForUpdates,
  };
};

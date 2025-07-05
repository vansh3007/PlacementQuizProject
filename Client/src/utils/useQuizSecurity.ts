let cleanupFns: (() => void)[] = [];

const emitSecurityAlert = (message: string, fullscreen = false) => {
  const event = new CustomEvent("security-alert", {
    detail: { message, fullscreen },
  });
  window.dispatchEvent(event);
};

export const activateBackNavigationBlock = () => {
  const handlePopState = () => {
    window.history.pushState(null, "", window.location.href);
    emitSecurityAlert("Back navigation is disabled during the quiz.");
  };

  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
};

export const activateTabSwitchPrevention = () => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      let attempts = Number(localStorage.getItem("switchAttempts") || "0");
      attempts += 1;
      localStorage.setItem("switchAttempts", String(attempts));

      if (attempts >= 3) {
        emitSecurityAlert(
          "You have switched tabs too many times. Click OK to submit."
        );
      } else {
        emitSecurityAlert("Switching tabs is not allowed!");
      }
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
};


export const activateContextMenuBlock = () => {
  const handler = (e: MouseEvent) => e.preventDefault();
  document.addEventListener("contextmenu", handler);
  return () => document.removeEventListener("contextmenu", handler);
};

export const activateFullscreenEnforcement = () => {
  const enterFullScreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      emitSecurityAlert(
        "Exiting fullscreen is not allowed. Returning to quiz.",
        true
      );
    }
  };

  enterFullScreen();
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  };
};

export const activateAllSecurityHooks = () => {
  cleanupFns = [
    activateBackNavigationBlock(),
    activateTabSwitchPrevention(),
    activateContextMenuBlock(),
    activateFullscreenEnforcement(),
  ];
  return cleanupFns;
};

export const deactivateSecurityHooks = () => {
  cleanupFns.forEach((fn) => fn && fn());
  cleanupFns = [];

  if (document.fullscreenElement) {
    document.exitFullscreen?.();
  }
};

// Auto deactivate on custom event
window.addEventListener("deactivate-security", deactivateSecurityHooks);

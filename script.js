// URL Parameters
const params = new URLSearchParams(window.location.search);
const modelType = params.get("model");

// Model URLs
const models = {
  card_reader: {
    android:
      "https://diversityandinclusion.blob.core.windows.net/android/card_reader.glb",
    ios: "https://diversityandinclusion.blob.core.windows.net/ios/card_reader.usdz",
    tips: "TIP: Don’t use the same PIN for each card. Never write it down or email it.",
  },
  wifi_router: {
    android:
      "https://diversityandinclusion.blob.core.windows.net/android/igame_wifi_router.glb",
    ios: "https://diversityandinclusion.blob.core.windows.net/ios/igame_wifi_router.usdz",
    tips: "TIP: Always change your default router password.",
  },
  phone_samsung: {
    android:
      "https://diversityandinclusion.blob.core.windows.net/android/Samsung_S24_Ultra_Com.glb",
    ios: "https://diversityandinclusion.blob.core.windows.net/ios/Samsung_S24_Ultra_Com.usdz",
    tips: "TIP: Always have a unique security PIN set on your phone.",
  },
  surface_pro: {
    android:
      "https://diversityandinclusion.blob.core.windows.net/android/surface_pro_4.glb",
    ios: "https://diversityandinclusion.blob.core.windows.net/ios/Surface_Pro_4.usdz",
    tips: "TIP: Always lock your laptop when not in use. Use a unique passphrase as your password.",
  },
};

// Detect Device Type
function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/windows phone/i.test(userAgent)) return "Windows Phone";
  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
  return "unknown";
}

// Directly Trigger AR on Button Click
document.addEventListener("DOMContentLoaded", () => {
  const selectedModel = models[modelType];
  const operatingSystem = getMobileOperatingSystem();
  const arButton = document.getElementById("launch-ar");
  const modelViewer = document.getElementById("model-viewer");

  if (selectedModel) {
    // Button Click: Trigger AR Experience
    arButton.addEventListener("click", () => {
      if (operatingSystem === "Android") {
        modelViewer.src = selectedModel.android;
      } else if (operatingSystem === "iOS") {
        modelViewer.setAttribute("ios-src", selectedModel.ios);
      } else {
        alert("Unsupported platform. Please use Android or iOS.");
        return;
      }

      // Force AR Button Click
      const viewArButton = modelViewer.querySelector('[slot="ar-button"]');
      if (viewArButton) viewArButton.click();
    });

    // Update Tech Tip
    const techTip = document.getElementById("tech-tip");
    if (techTip) techTip.innerText = selectedModel.tips;
  } else {
    console.error("Model type not found in URL parameters.");
    alert("Error: Invalid model type.");
  }
});

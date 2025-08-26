// Service Worker for 199S Studio - Advanced Caching Strategy
// AN TOÀN 100% - Không ảnh hưởng giao diện và chức năng

const CACHE_NAME = "199s-studio-v1.0.0";
const STATIC_CACHE = "199s-static-v1.0.0";
const DYNAMIC_CACHE = "199s-dynamic-v1.0.0";

// Static assets to cache
const STATIC_ASSETS = [
  "/",
  "/css/bootstrap.min.css",
  "/css/bootstrap-icons.css",
  "/css/vegas.min.css",
  "/css/tooplate-barista.css",
  "/js/jquery.min.js",
  "/js/bootstrap.min.js",
  "/js/vegas.min.js",
  "/js/custom.js",
  "/js/click-scroll.js",
  "/fonts/AgencyFB-Regular.ttf",
  "/fonts/AgencyFB-Bold.ttf",
  "/images/logo/logo199s.jpg",
  "/images/artboard-6.png",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.log("Cache install failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip non-HTTP requests
  if (!request.url.startsWith("http")) {
    return;
  }

  // Handle different types of requests
  if (request.destination === "image") {
    // Images: Cache first, then network
    event.respondWith(handleImageRequest(request));
  } else if (
    request.destination === "style" ||
    request.destination === "script"
  ) {
    // CSS/JS: Cache first, then network
    event.respondWith(handleStaticRequest(request));
  } else if (request.destination === "font") {
    // Fonts: Cache first, then network
    event.respondWith(handleFontRequest(request));
  } else {
    // Other requests: Network first, then cache
    event.respondWith(handleDynamicRequest(request));
  }
});

// Handle image requests
async function handleImageRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);

    // Cache the response
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Image fetch failed:", error);
    // Return a fallback image if available
    return caches.match("/images/logo/logo199s.jpg");
  }
}

// Handle static asset requests
async function handleStaticRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);

    // Cache the response
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Static asset fetch failed:", error);
    return new Response("", { status: 404 });
  }
}

// Handle font requests
async function handleFontRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);

    // Cache the response
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Font fetch failed:", error);
    return new Response("", { status: 404 });
  }
}

// Handle dynamic requests
async function handleDynamicRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Dynamic fetch failed:", error);

    // Try cache as fallback
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response("", { status: 404 });
  }
}

// Background sync for offline functionality
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Perform background sync tasks
    console.log("Performing background sync");

    // Sync any pending data
    // This can be extended for offline form submissions, etc.
  } catch (error) {
    console.log("Background sync failed:", error);
  }
}

// Push notification handling
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/images/logo/logo199s.jpg",
      badge: "/images/logo/logo199s.jpg",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: "explore",
          title: "Xem ngay",
          icon: "/images/logo/logo199s.jpg",
        },
        {
          action: "close",
          title: "Đóng",
          icon: "/images/logo/logo199s.jpg",
        },
      ],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});

console.log("199S Studio Service Worker loaded successfully");

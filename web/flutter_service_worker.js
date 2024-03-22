'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/asset/a1.png": "b90bdbb10f61b71ca4d5f05e3568fcb8",
"assets/asset/ac11.jpg": "8b5250c5746a6c8a931f612a268ef325",
"assets/asset/ac12.jpg": "9c65e4584d4d6101004de0f01565566c",
"assets/asset/ac13.png": "b339a8d9b7bc299b19af50a5268e5eec",
"assets/asset/ac14.png": "c1ba34b2512beada1c2c69a754d9dfac",
"assets/asset/ac15.png": "56fa2cce4e8bd66c2d7f5239f0f114a5",
"assets/asset/ac16.jpg": "9b58c6dd64260f5d7628fc61142903b6",
"assets/asset/ac17.jpg": "f4d52bb27a0a5771a0557aac2a1495b0",
"assets/asset/ac18.jpg": "453dc71b9e2c41a42e7d721e62b2e39d",
"assets/asset/ac19.jpg": "ceda8bb137442dfcf0cd5e9689a43d68",
"assets/asset/ac20.jpg": "d41a0e71ed45b6837a3a1410e3d1988a",
"assets/asset/ac21.jpg": "0c2b5b0c112f4260f9706ab321dafbbb",
"assets/asset/dd.jpg": "a0609423f2a0687eb2d8295f3748e42b",
"assets/asset/hr2.png": "601daabb00c934a21d75369c8d34e9cd",
"assets/asset/icons8-github-64.png": "cfb8f1a7d2497e4e433b25bbb8b5b962",
"assets/asset/jj.png": "7f1d37c86aa8f6979747a62ca263c759",
"assets/asset/lin.png": "5a16070f1535d82d6653b566996aedc9",
"assets/asset/tt.png": "2c090fb039760c9560da5353895cf908",
"assets/asset/U2.png": "8288676d060532c6953c76030a8b8f60",
"assets/asset/UI.jpeg": "28054cf44515bb881e39a8cfd1f88bd0",
"assets/asset/V1.jpeg": "f9877775634d307315fa60d1e5588719",
"assets/asset/V2.png": "69027068a107477f6040e7fde1a35d53",
"assets/asset/xx.png": "69027068a107477f6040e7fde1a35d53",
"assets/asset/zz.png": "70707f0f4d18fc32e281f60919e855c0",
"assets/AssetManifest.bin": "89531284fce1108e4b66fbfdfd54eaec",
"assets/AssetManifest.bin.json": "3bb003da8426748330e9b59b1612eced",
"assets/AssetManifest.json": "fa56a71d71e48440321d518890850293",
"assets/FontManifest.json": "e363a47fc8878b322af0dea56540fe8e",
"assets/fonts/MaterialIcons-Regular.otf": "a13d9c37bdd5deb598a84e4f7c10de21",
"assets/NOTICES": "1f17216045a4b5ce62de35871afab304",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "302dbd9f3334ff132921b54ab4f2a69b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "f3307f62ddff94d2cd8b103daf8d1b0f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "04f83c01dded195a11d21c2edf643455",
"assets/packages/simple_icons/fonts/SimpleIcons.ttf": "63bd8ab21692f43d782be84edfe85245",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "3d408597af3b72bba5cfdcc3a189b566",
"/": "3d408597af3b72bba5cfdcc3a189b566",
"main.dart.js": "d2fc9b34d2148ef44ed8c970257b11b7",
"manifest.json": "ad843575e406b8dcaf23fb6bd99bb354",
"version.json": "966810e9f2566454cf0de422953610db"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
